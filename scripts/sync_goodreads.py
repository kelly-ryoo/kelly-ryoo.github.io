import json
from datetime import datetime, timezone
from email.utils import parsedate_to_datetime
from pathlib import Path
from xml.etree import ElementTree

import requests


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "public" / "data" / "bookshelf.json"
GOODREADS_USER_ID = "204863493"


def parse_read_books(payload):
    try:
        root = ElementTree.fromstring(payload)
    except ElementTree.ParseError:
        raise RuntimeError("Goodreads returned invalid RSS data.") from None

    channel = root.find("channel")
    if channel is None or "bookshelf: read" not in (channel.findtext("title") or "").lower():
        raise RuntimeError("Goodreads did not return the public read shelf RSS feed.")

    books = []
    seen_ids = set()
    for item in channel.findall("item"):
        title = (item.findtext("title") or "").strip()
        book_id = (item.findtext("book_id") or "").strip()
        cover_url = (item.findtext("book_large_image_url") or item.findtext("book_image_url") or "").strip()
        read_at = (item.findtext("user_read_at") or "").strip()
        if not title or not book_id or book_id in seen_ids:
            continue
        try:
            read_year = parsedate_to_datetime(read_at).year if read_at else None
        except (TypeError, ValueError):
            read_year = None
        books.append({"title": title, "book_id": book_id, "cover_url": cover_url, "read_year": read_year})
        seen_ids.add(book_id)
    return books


def fetch_read_books():
    url = f"https://www.goodreads.com/review/list_rss/{GOODREADS_USER_ID}?shelf=read&per_page=200"
    try:
        response = requests.get(url, headers={"User-Agent": "personal-website bookshelf sync"}, timeout=45)
        response.raise_for_status()
    except requests.RequestException as error:
        status = error.response.status_code if error.response is not None else "unavailable"
        raise RuntimeError(f"Goodreads RSS request failed (HTTP {status}).") from None
    return parse_read_books(response.content)


def main():
    books = fetch_read_books()
    if OUTPUT.exists():
        existing_payload = json.loads(OUTPUT.read_text(encoding="utf-8"))
        if existing_payload.get("books") == books:
            print("Goodreads read shelf is unchanged.")
            return

    payload = {
        "source": "Goodreads",
        "userId": GOODREADS_USER_ID,
        "syncedAt": datetime.now(timezone.utc).isoformat(),
        "books": books,
    }
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    temporary_output = OUTPUT.with_suffix(".json.tmp")
    temporary_output.write_text(json.dumps(payload, indent=2) + "\n", encoding="utf-8")
    temporary_output.replace(OUTPUT)
    print(f"Updated {OUTPUT.relative_to(ROOT)} ({len(books)} read books).")


if __name__ == "__main__":
    try:
        main()
    except RuntimeError as error:
        raise SystemExit(str(error)) from None