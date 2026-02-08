## Deployment notes

The live site is currently hosted on a local machine and served via nginx in Docker.

`docker-compose.yml` mounts the project folder into `/usr/share/nginx/html`, so updates
are reflected immediately after replacing `index.html`.

Backups of previous deployed `index.html` versions live in `docs/backups/`.
