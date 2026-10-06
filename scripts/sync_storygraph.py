import json
import os
from datetime import datetime, timezone
from pathlib import Path

from dotenv import load_dotenv


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "public" / "data" / "bookshelf.json"
USERNAME = "kellyryoo"
SHELVES = {
    "read": "books_read",
    "currently_reading": "currently_reading",
    "to_read": "to_read",
}


def decode_books(result, shelf_name):
    try:
        books = json.loads(result) if isinstance(result, str) else result
    except json.JSONDecodeError as error:
        raise RuntimeError(f"StoryGraph returned invalid data for {shelf_name}.") from error

    if isinstance(books, dict) and "error" in books:
        raise RuntimeError(f"StoryGraph could not load {shelf_name}: {books['error']}")
    if not isinstance(books, list):
        raise RuntimeError(f"StoryGraph returned an unexpected response for {shelf_name}.")

    cleaned = []
    seen_ids = set()
    for book in books:
        if not isinstance(book, dict):
            continue
        title = book.get("title")
        book_id = book.get("book_id")
        if not isinstance(title, str) or not isinstance(book_id, str) or book_id in seen_ids:
            continue
        cleaned.append({"title": title, "book_id": book_id})
        seen_ids.add(book_id)
    return cleaned


def main():
    load_dotenv(ROOT / ".env.local")
    cookie = os.getenv("STORYGRAPH_COOKIE")
    if not cookie:
        raise SystemExit(
            "Set STORYGRAPH_COOKIE in .env.local before syncing. See STORYGRAPH.md."
        )

    from storygraph_api import User

    user = User()
    shelves = {}
    for shelf_name, method_name in SHELVES.items():
        result = getattr(user, method_name)(USERNAME, cookie=cookie)
        shelves[shelf_name] = decode_books(result, shelf_name)

    if OUTPUT.exists():
        existing_payload = json.loads(OUTPUT.read_text(encoding="utf-8"))
        if existing_payload.get("shelves") == shelves:
            print("StoryGraph shelves are unchanged.")
            return

    payload = {
        "username": USERNAME,
        "syncedAt": datetime.now(timezone.utc).isoformat(),
        "shelves": shelves,
    }
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    temporary_output = OUTPUT.with_suffix(".json.tmp")
    temporary_output.write_text(json.dumps(payload, indent=2) + "\n", encoding="utf-8")
    temporary_output.replace(OUTPUT)

    counts = ", ".join(f"{len(books)} {shelf}" for shelf, books in shelves.items())
    print(f"Updated {OUTPUT.relative_to(ROOT)} ({counts}).")


if __name__ == "__main__":
    main()