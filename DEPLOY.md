# DEPLOY.md — mspnova.com runbook

How to operate the **www.mspnova.com** marketing site.

## Architecture

```
                   ┌─ www.mspnova.com  (Cloudflare DNS, proxied)
                   │
Browser  ──HTTPS─→ Cloudflare Edge ──TLS terminated here──┐
                                                          │
                   ┌──────────────────────────────────────┘
                   │
                   ↓ (private QUIC tunnel)
                Mac Mini:
                   • cloudflared    (LaunchAgent)  ──→  http://localhost:8081
                   • Caddy          (LaunchAgent)  ──→  /Users/nova/mspnova-site/site/

Apex (mspnova.com)  ──301 via Cloudflare Redirect Rule──→  https://www.mspnova.com/
```

## Repo

- GitHub: `git@github.com:uggyjan/mspnova-site.git` (private)
- Branch: `main`
- Mini clone: `/Users/nova/mspnova-site`
- Deploy key on the Mini: `~/.ssh/github_deploy` (also entry in `~/.ssh/config` for `github.com`)

## Deploy a new version

After commits land on `main`, run from anywhere with Tailscale + the SSH key:

```
ssh nova@100.106.98.98 'bash ~/bin/deploy-mspnova-site.sh'
```

That single command:

1. cd /Users/nova/mspnova-site
2. git pull --ff-only origin main
3. Regenerates site/robots.txt and site/sitemap.xml from the file tree

Caddy serves files directly from disk, so no restart needed after the pull. Page changes are live within a second.

## Manual roll-back

```
ssh nova@100.106.98.98
cd ~/mspnova-site
git log --oneline -5         # find the good commit
git reset --hard <sha>       # roll back working tree
bash ~/bin/regen-sitemap.sh
```

## Server software

| Service | Where | Managed by | Restart |
|---|---|---|---|
| Caddy | binds *:8081, serves /Users/nova/mspnova-site/site/ | brew services (LaunchAgent) | `brew services restart caddy` |
| cloudflared (mspnova-www-mini tunnel) | LaunchAgent connector | ~/Library/LaunchAgents/com.cloudflare.tunnel-www.plist | `launchctl kickstart -k gui/$(id -u)/com.cloudflare.tunnel-www` |

Caddy listens on `*:8081` (any Host header — required because the tunnel forwards with `Host: www.mspnova.com`).

## Config files

| Path | Purpose |
|---|---|
| /opt/homebrew/etc/Caddyfile | Caddy site definition (try_files for clean URLs) |
| ~/Library/LaunchAgents/homebrew.mxcl.caddy.plist | Caddy launchd plist (auto-managed by brew) |
| ~/Library/LaunchAgents/com.cloudflare.tunnel-www.plist | Cloudflare tunnel launchd plist (token in plist, perms 600) |
| ~/.ssh/github_deploy / ~/.ssh/github_deploy.pub | GitHub deploy key |
| ~/.ssh/config | Routes github.com to deploy key |
| ~/bin/regen-sitemap.sh | Sitemap + robots regenerator |
| ~/bin/deploy-mspnova-site.sh | One-shot deploy wrapper |

## Logs

| What | Where |
|---|---|
| Caddy access (JSON, 10 MB rotation, keep 5) | /Users/nova/mspnova-site/logs/access.log |
| cloudflared | /Users/nova/mspnova-site/logs/cloudflared.log |
| Caddy stderr / startup | `brew services info caddy --verbose` |

Live tail:

```
ssh nova@100.106.98.98 'tail -f /Users/nova/mspnova-site/logs/access.log'
```

## Cloudflare resources

- Zone: https://dash.cloudflare.com/?to=/:account/:zone/mspnova.com
- Tunnel `mspnova-www-mini`: Zero Trust → Networks → Tunnels → mspnova-www-mini
- Tunnel UUID: f605094d-0215-46c8-98a3-c0fe1b879b3a
- Public hostname: www.mspnova.com → http://localhost:8081
- Apex redirect rule: zone → Rules → Redirect Rules → "apex to www"
- DNS: zone → DNS → Records (apex AAAA 100:: proxied; www CNAME → <uuid>.cfargotunnel.com proxied)
- SSL/TLS mode: zone → SSL/TLS → Overview → **Full**
- Web Analytics: dashboard → Analytics → Web Analytics → www.mspnova.com

## When it breaks

| Symptom | First thing to check |
|---|---|
| Site times out | Mini reachable? `ping 100.106.98.98` (via Tailscale). If Mini is up, check `brew services list` and `launchctl print gui/$(id -u)/com.cloudflare.tunnel-www`. |
| Returns 200 but blank body | Caddy not matching the Host header. Confirm Caddyfile site address is `:8081` (NOT `127.0.0.1:8081`). |
| Returns 404 for a page that exists | try_files typo? Test locally on Mini: `curl http://127.0.0.1:8081/<path>/`. |
| Returns Cloudflare 5xx | Tunnel disconnected. tail the cloudflared log, restart with `launchctl kickstart`. |
| Newly-pushed change not visible | git pull didn't run. SSH in and re-run `bash ~/bin/deploy-mspnova-site.sh`. |
| `git pull` says "permission denied" | Deploy key broken. `ssh -T git@github.com` should say "Hi uggyjan/mspnova-site!". If not, fix perms 600 on ~/.ssh/github_deploy. |

## Contacts

- Domain owner: Alex (alex@techital.com)
- Repo owner: @uggyjan
- _TBD: who else gets paged_

## Things still TBD

- [ ] Real design replaces placeholder site/index.html
- [ ] Cloudflare Web Analytics `<script>` snippet pasted into `<head>` of every page (design Claude)
- [ ] Contact form: replace `formspree.io/f/your-form-id` with a real Formspree form ID
- [ ] Verify `hello@novamsp.com` vs `hello@mspnova.com` (likely typo on the page)
- [ ] Privacy page at site/privacy/index.html
- [ ] Real Glendale address + phone on contact page
