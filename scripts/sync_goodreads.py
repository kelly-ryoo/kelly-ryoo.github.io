import json
import os
from datetime import datetime, timezone
from pathlib import Path

import requests
from dotenv import load_dotenv


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "public" / "data" / "bookshelf.json"
GOODREADS_USER_ID = "68326103"


def nested_list(value):
    if isinstance(value, list):
        return value
    if isinstance(value, dict):
        for key in ("data", "GoodreadsResponse", "goodreadsResponse", "reviews", "review", "books"):
            if key in value:
                found = nested_list(value[key])
                if found is not None:
                    return found
    return None


def scalar(value):
    if isinstance(value, (str, int)):
        return str(value)
    if isinstance(value, dict):
        for key in ("#text", "text", "value"):
            if key in value:
                return scalar(value[key])
    return None


def collect_shelves(value):
    if isinstance(value, str):
        return {name.strip().lower() for name in value.split(",") if name.strip()}
    if isinstance(value, list):
        return set().union(*(collect_shelves(item) for item in value)) if value else set()
    if isinstance(value, dict):
        names = set()
        for key in ("name", "@name", "shelf_name", "exclusive_shelf"):
            if key in value:
                name = scalar(value[key])
                if name:
                    names.add(name.strip().lower())
        for key in ("shelves", "shelf", "user_shelves", "shelf_names"):
            if key in value:
                names.update(collect_shelves(value[key]))
        return names
    return set()


def parse_read_books(payload):
    if isinstance(payload, dict) and (payload.get("success") is False or payload.get("error")):
        raise RuntimeError("NoCodeAPI returned an error while fetching Goodreads books.")

    records = nested_list(payload)
    if records is None:
        raise RuntimeError("NoCodeAPI returned an unrecognized Goodreads response.")

    books = []
    seen_ids = set()
    has_shelf_metadata = False
    for record in records:
        if not isinstance(record, dict):
            continue
        book = record.get("book") if isinstance(record.get("book"), dict) else record
        shelf_names = collect_shelves(record)
        if not shelf_names:
            shelf_names = collect_shelves(book)
        has_shelf_metadata = has_shelf_metadata or bool(shelf_names)
        if "read" not in shelf_names:
            continue

        title = scalar(book.get("title") or record.get("title"))
        book_id = scalar(book.get("id") or book.get("book_id") or record.get("book_id"))
        if not title or not book_id or book_id in seen_ids:
            continue
        books.append({"title": title, "book_id": book_id})
        seen_ids.add(book_id)

    if records and not has_shelf_metadata:
        raise RuntimeError(
            "Goodreads results did not include shelf names, so the read-only list could not be verified."
        )
    return books


def fetch_read_books(cloud_name, token):
    url = f"https://v1.nocodeapi.com/{cloud_name}/gr/{token}/myBooks"
    try:
        response = requests.get(url, params={"uid": GOODREADS_USER_ID}, timeout=45)
        response.raise_for_status()
        payload = response.json()
    except requests.RequestException as error:
        status = error.response.status_code if error.response is not None else "unavailable"
        raise RuntimeError(f"NoCodeAPI request failed (HTTP {status}).") from None
    except ValueError:
        raise RuntimeError("NoCodeAPI returned invalid JSON.") from None
    return parse_read_books(payload)


def main():
    load_dotenv(ROOT / ".env.local")
    cloud_name = os.getenv("NOCODEAPI_CLOUD_NAME")
    token = os.getenv("NOCODEAPI_TOKEN")
    if not cloud_name or not token:
        raise SystemExit(
            "Set NOCODEAPI_CLOUD_NAME and NOCODEAPI_TOKEN in .env.local or GitHub Actions secrets."
        )

    books = fetch_read_books(cloud_name, token)
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