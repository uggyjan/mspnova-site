# Pages added to the website, and image sources

Every image on the site is now a real render of Nova's own pages (main branch,
2026-10-18), dark mode, with a small made-up dataset and readable American names.
No invented features, fields or numbers. This file lives at the repo root and is
never served.

Backup of the site before this work: git tag `backup-2026-10-18-pre-images`
(also `~/mspnova-site-backups/site-2026-10-18-pre-images.tgz` on the Mini, and a
copy on the Dell at `~/nova-backups/mspnova-site/site-2026-10-18-pre-images/`).

## New pages

| # | Page | URL | Main image | Rendered from |
|---|---|---|---|---|
| 08 | Lobby & TV Displays | /features/lobby/ | shots/lobby.webp (+ lobby-mobile.webp) | lobby.html |
| 09 | Reports & Client Reviews | /features/reports/ | shots/reports-scorecard.webp, reports-scorecard-top.webp | dispatch-scorecard.html |
| 10 | Billing Accuracy | /features/billing-accuracy/ | shots/seat-audit.webp | reconciliation.html (Seat Audit) |
| 11 | Time & Payroll | /features/time-payroll/ | shots/timesheet.webp, field-checkin.webp | timesheet.html, checkin.html |
| 12 | Coaching & QA | /features/coaching-qa/ | shots/time-score.webp | time-score.html |

Linked from: Features deep-dive cards 08–12 and the matching feature tiles
(Time Clock & Payroll, Ticket QA, Reports & Analytics, CIPP / M365 Sync),
footer Product column, Sitemap page.

## Image sources (assets/shots/)

| Image | Nova page | Used on |
|---|---|---|
| triage.webp | triage.html (v3), 3 tickets | Home hero + deep dive, Features, Triage |
| triage-control.webp | triage.html (Sensitive + low confidence first) | Triage "You stay in control" |
| needs-attention.webp | needs-attention.html | Home, Needs Attention hero |
| needs-attention-rows.webp | needs-attention.html (crop) | Needs Attention "Grouped by reason" |
| pull-ticket.webp | home.html (tech Home, pull card) | Needs Attention "Pull Ticket" |
| huddle.webp | huddle.html (Daily Huddle) | Home, Pulse, About |
| status-board.webp / status-board-top.webp | status.html | Status Board, Features, Field Ops, Contact |
| ai-accuracy.webp | accuracy.html, Learned Corrections tab | Triage, Features |
| call-linking.webp | calls.html (Classic skin — see note) | Call Linking, Features |
| portal-tickets.webp / portal-signin.webp | client portal (React build), dark brand colors | Client Portal, Features |
| field-checkin.webp | checkin.html at phone size | Field Ops, Time & Payroll |
| integrations.webp | integrations.html (Integration Credentials, crop) | Integrations |
| reports-scorecard-top.webp | dispatch-scorecard.html | Pricing, Reports |
| lobby.webp | lobby.html | Lobby, Status Board, Customers |
| portal-report.webp | client portal Monthly Service Report (React build) | Client Portal "Open the results together" |

Old drawn images in assets/mocks/ are no longer referenced by any page; they are
left in place (not deleted) until Alex decides.

## Notes found while rendering (product, not website)
- **Calls page, Modern skin:** the call detail panel stacks *under* the list
  instead of beside it (Classic lays out correctly). Likely a Modern-skin CSS
  conflict on `.main`. The site image uses the Classic layout.
- **Lobby layout builder:** the grid drew panels stacked at one row in the
  headless renderer. Not verified in a real browser; not shown on the site.
- **Integrations page:** shows the owner-only "Ticket Intelligence" panel at the
  top; cropped out of the site image because it is unreleased.

## 2026-10-18 follow-ups
- Phone menu had no background (white links over the page); now a solid panel, button right-aligned, Escape closes it.
- Hero Triage image cut to 3 tickets; Status Board now shows six different states (GoTo call, Teams call, on site, working, lunch timer, traveling).
- Every product screenshot opens a larger preview on click (keyboard too); on phones it opens tall and pans sideways.
- Client Portal page: new "Client reviews" section with the monthly service report.
