import json
import re
from datetime import datetime, timezone
from html.parser import HTMLParser
from pathlib import Path
from xml.etree import ElementTree

import requests


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "public" / "data" / "letterboxd.json"
FEED_URL = "https://letterboxd.com/jerryryoo/rss/"


class DescriptionParser(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.image_url = ""
        self.text = []

    def handle_starttag(self, tag, attrs):
        if tag.lower() == "img" and not self.image_url:
            self.image_url = dict(attrs).get("src", "")

    def handle_data(self, data):
        self.text.append(data)


def parse_feed(payload):
    try:
        root = ElementTree.fromstring(payload)
    except ElementTree.ParseError:
        raise RuntimeError("Letterboxd returned invalid RSS data.") from None

    channel = root.find("channel")
    if channel is None or "letterboxd" not in (channel.findtext("title") or "").lower():
        raise RuntimeError("Letterboxd did not return the expected RSS feed.")

    films = []
    for item in channel.findall("item"):
        title = (item.findtext("title") or "").strip()
        link = (item.findtext("link") or "").strip()
        if not title or not link:
            continue

        description = item.findtext("description") or ""
        parser = DescriptionParser()
        parser.feed(description)
        tag_match = re.search(r"\[([^\]]+)\]", " ".join(parser.text))
        thumbnail = parser.image_url.replace("http://", "https://", 1)
        films.append({
            "title": title,
            "link": link,
            "guid": (item.findtext("guid") or link).strip(),
            "thumbnail": thumbnail,
            "tag": tag_match.group(1).strip() if tag_match else "",
        })
    return films


def fetch_films():
    try:
        response = requests.get(FEED_URL, headers={"User-Agent": "personal-website Letterboxd sync"}, timeout=45)
        response.raise_for_status()
    except requests.RequestException as error:
        status = error.response.status_code if error.response is not None else "unavailable"
        raise RuntimeError(f"Letterboxd RSS request failed (HTTP {status}).") from None
    return parse_feed(response.content)


def main():
    films = fetch_films()
    if OUTPUT.exists():
        existing_payload = json.loads(OUTPUT.read_text(encoding="utf-8"))
        if existing_payload.get("films") == films:
            print("Letterboxd feed is unchanged.")
            return

    payload = {
        "source": "Letterboxd",
        "syncedAt": datetime.now(timezone.utc).isoformat(),
        "films": films,
    }
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    temporary_output = OUTPUT.with_suffix(".json.tmp")
    temporary_output.write_text(json.dumps(payload, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    temporary_output.replace(OUTPUT)
    print(f"Updated {OUTPUT.relative_to(ROOT)} ({len(films)} feed entries).")


if __name__ == "__main__":
    try:
        main()
    except RuntimeError as error:
        raise SystemExit(str(error)) from None