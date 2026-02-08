# Khokhlov’s Spring Speakeasy (Cocktails)

A playful, single‑page cocktail menu built as a personal/portfolio project.

- Bilingual UI: **English / Ukrainian** toggle
- Spirit + mood filters
- Recipe modal with **measured ingredients** + **step‑by‑step method**
- Static site served via **nginx** (Docker)

Live (may change): https://cocktails.khokhlov.org/

## Run locally (Docker)

```bash
docker compose up --build
```

Then open: http://localhost:8090

## Project structure

- `index.html` — the whole app (HTML/CSS/JS)
- `images/` — cocktail images
- `Dockerfile`, `docker-compose.yml` — nginx container setup
- `docs/` — notes and backups

## Editing recipes

Recipes live in the `cocktails` array inside `index.html`.

Each drink has:
- `spirit` and `mood` (for filtering)
- `en` and `ua` blocks with:
  - `name`
  - `ingredients` (with amounts)
  - `instructions` (step‑by‑step)
  - `history` (optional)
  - `joke`

## License

MIT (see `LICENSE`).
