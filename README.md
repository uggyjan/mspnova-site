# mspnova-site

Static marketing site for **www.mspnova.com**.

## Layout

```
site/             ← actual HTML/CSS/JS served by Caddy
  index.html      ← placeholder until design is published
```

## Deploy

The site is hosted on a Mac Mini behind a Cloudflare tunnel.

To deploy a new version, push to `main`. Then on the Mini:

```
ssh nova@<mini> "cd ~/mspnova-site && git pull && bash ~/bin/regen-sitemap.sh"
```

See DEPLOY.md for the full runbook.
