# Website gaps — original intent not yet built

The site text was corrected on 2026-10-18 so it only claims what Nova's code does.
Rule: **the code wins.** Every item below was on the site, described a capability
we intended, and was removed because Nova doesn't do it yet. Use this list to decide
what to build — and put the wording back only once it ships.

This file lives at the repo root, outside `site/`, so it is never served.

## Field Ops and time
- **Time entry written to Autotask at check-out** — with the check-out summary as the note. (Home, Field Ops, Security, Status Board)
- **Client SMS "your tech is on-site"** at check-in. (Field Ops, Status Board)
- **Long-visit flag at 25% over the ETA** — overrun exists; the exact rule was unverified, so the wording is now general.
- **Payroll exports** (CSV/file) — Nova has payroll reports, not an export file.

## Triage and learning
- **Auto-Accept writing high-confidence triage straight to Autotask** (≥85%). The setting exists, is off by default, defaults to 90, and only records what it would have done. Turning this on would need a decision against "AI suggests, humans decide."
- **Auto-route policy per queue and per client tier**; **pause AI per queue**. (Triage page)
- **Daily classification report posted to Teams.**
- **Approved learned rules changing triage** — candidates and approval exist; applying approved rules to live triage is the next step.
- **Pulse "storm" / pattern detection** (e.g. three M365 tickets in two hours).
- Triage fields "work type", "source" and "assignee" — the AI suggests priority, queue, type, issue, sub-issue, category, title and contact.

## Dispatch and Needs Attention
- **Client-tier multiplier** in the pull score (MSP vs T&M contracts).
- **Pin a ticket to the top** of the queue.
- **Rebalancing** so one tech doesn't get all the easy tickets.
- **Holding lanes** (active, awaiting client, scheduled, blocked, onsite, snoozed).
- **Auto-resurface when the client replies** (Outlook integration); **stale-chase alerts at 3/7/14 days**; **auto-close suggestions**.

## Status Board
- **Wall mode** (`/status?wall=1`), **IP-pinned kiosk token**, auto-rotating layouts.
- **Storm mode** (5+ P1s reorder by overdue SLA); **P1 chime / missed-Ping reminder**.
- **Keyboard shortcuts 1–5** for filter chips.
- **Per-team and per-location boards.**
- **Teams presence by webhook push** — today it is polled every few seconds.
- **Caller-ID contact shown on hover**; **idle >30 min flagged on Pulse**.
- **Ping replies ("ack", "5min") posting back to the board.**
- Note: the real TV surface is **Lobby displays**, now described on the Status Board page.

## Pulse messages
- **SLA breach warning** (<1 hour), **capacity warning**, **weekly QBR digest**, **custom briefing** cards.

## Call Linking
- **Embeddings-based scoring** with four weighted signals, a 0–100 score and a 30% cutoff. Today matching is an AI prompt over the company's open tickets.
- **"First time we've seen this caller" flag**, **"create contact" prompt**, **hide a call**.
- **Per-extension / per-line filters** in Admin.
- **Retention cap per tenant** for transcripts.
- **Accuracy figure (~80%)** — never measured.

## Client Portal
- **SAML 2.0** sign-in (staff and portal). Nova has Microsoft, Google and email only.
- **Four portal roles** (user, manager, billing, admin) — Nova has user and manager.
- **Per-client MFA enforcement**; **per-client co-branding**.
- **Configurable per-client new-ticket form.**
- **SLA dashboard** in the portal.
- **Knowledge base** with AI-suggested articles.
- **Asset register pulling M365 licenses and software from CIPP** — the portal Assets page shows devices, holders and history.

## Integrations and security
- **Entra group → Nova role mapping** (roles are set inside Nova).
- **CIPP feeding triage** and **tenant health**.
- **Slack** (was "Q1 2026"); **Autotask webhooks for real-time ticket intake** (was "Datto Autotask Webhooks").
- **PII redaction before AI calls.**
- **Configurable staff session timeout** (sessions last 7 days).
- **Published sub-processor page** at `/security/subprocessors` (now "on request").
- **Encryption at rest (AES-256) / TLS 1.3** — not confirmed in code; the site now says "encrypted in transit". Confirm RDS encryption and restore the claim if true.

## Numbers removed (no verified source)
94% SLA hit rate · ~32% CSAT capture · 95% of the day automatic · ~80% call-match accuracy ·
$0.05 per ticket · $0.10–0.20 per call · 3–5x more effective · "Twenty-one capabilities" ·
"under 30 seconds" (now "under a minute") · $3–6/day AI cost (replaced with our measured $5–9/day).

## Open decisions for Alex (not product gaps)
- **Contact form** posts to a placeholder Formspree ID — messages go nowhere until a real form endpoint is set.
- **Plan limits** (Starter 100 tickets/month, single queue, user caps) are not enforced anywhere in Nova.
- **Starter user cap** set to 5 on the site — confirm.
- **Terms of Service** says "Last updated April 1, 2025", before Nova existed — needs a legal review and real date.
- **Site images** still show drawn mockups of features above (auto-route editor, holding lanes, wall board, pricing dashboard with old plans). Replace with real screenshots.
