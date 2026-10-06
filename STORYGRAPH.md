# StoryGraph bookshelf

The bookshelf page reads `public/data/bookshelf.json`. GitHub Actions refreshes the Read, Currently reading, and Want to read shelves daily, and can also be run manually from the Actions tab.

## GitHub setup

1. In the repository settings, add an Actions secret named `STORYGRAPH_COOKIE` containing the `remember_user_token` cookie. Never put the cookie in source files or commit it. If the cookie previously shared in chat has not been rotated, invalidate it and sign in again before configuring this secret.
2. Enable GitHub Actions for the repository. The `Sync StoryGraph bookshelf` workflow runs once per day and can also be started with **Run workflow**.
3. Allow GitHub Actions to write repository contents so it can commit changed shelf data. The workflow only commits when the book lists have changed; a connected Vercel Git integration can automatically deploy that update.

## Local sync

1. Create and activate a virtual environment with `python3 -m venv .venv` and `source .venv/bin/activate`, then install dependencies with `python -m pip install -r requirements.txt`. Google Chrome must be installed because the StoryGraph library uses Selenium.
2. Put `STORYGRAPH_COOKIE=your_cookie_value` in the root `.env.local` file. This file is gitignored; never commit or share the cookie.
3. Run `npm run sync:bookshelf` to refresh the public JSON locally.

The synced shelf titles and StoryGraph book IDs are public because they are served by the website. The cookie is only used by the sync job and is never written into that data file.