# Goodreads bookshelf

The bookshelf page reads `public/data/bookshelf.json` and displays only books marked as belonging to the Goodreads `read` shelf. The NoCodeAPI response must include shelf names; the sync fails closed if it cannot verify which books are read.

## GitHub setup

1. Make your Goodreads profile or read shelf visible to NoCodeAPI. Your profile currently appears private, so the API may not be able to retrieve it until its visibility allows access.
2. Create a Goodreads API integration in NoCodeAPI and add repository Actions secrets named `NOCODEAPI_CLOUD_NAME` and `NOCODEAPI_TOKEN`. Never put the API token in source files or commit it.
3. Enable GitHub Actions and allow workflows to write repository contents. The `Sync Goodreads read shelf` workflow runs daily and can also be started manually from the Actions tab.
4. The workflow commits only when the read list changes. A connected Vercel Git integration can automatically deploy that update.

## Local sync

1. Create and activate a virtual environment with `python3 -m venv .venv` and `source .venv/bin/activate`, then install dependencies with `python -m pip install -r requirements.txt`.
2. Put `NOCODEAPI_CLOUD_NAME=your_cloud_name` and `NOCODEAPI_TOKEN=your_api_token` in the root `.env.local` file. This file is gitignored; never commit or share the token.
3. Run `npm run sync:bookshelf` to refresh the public JSON locally.

The synced book titles and Goodreads IDs are public because they are served by the website. NoCodeAPI credentials are used only by the sync job and are never written into that data file or sent to the browser.