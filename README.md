# MateCollab — Phase 0 prototype

An interactive frontend for NetaMate Solutions: conversations, meetings and teamwork in one calm workspace. Built with React, TypeScript, Radix/shadcn primitives, Lucide icons and custom light/dark styles.

## Open the prototype

**Fastest:** download `MateCollab-Prototype.html` and open it in a modern desktop browser. The application, styles, original logo and exact supplied HemiHead font are embedded. No installation is needed. File preview panes may disable JavaScript; download and open the actual HTML file if necessary.

The ZIP also contains this standalone file. For a local HTTP origin, serve its folder:

```sh
python3 -m http.server 8080
```

Open `http://localhost:8080/MateCollab-Prototype.html`.

## Develop and rebuild

Use Node 22.13 or newer and pnpm. From the extracted source directory:

```sh
pnpm install --frozen-lockfile
pnpm prototype:dev
```

Open the URL printed by Vite followed by `/preview.html`.

```sh
pnpm typecheck
pnpm prototype:build
```

Output: `prototype-dist/MateCollab-Prototype.html`. The Vite prototype build is frontend-only. The source retains its original framework wrapper and dependencies; no backend is required for the prototype. Starter infrastructure is not connected to the simulated product integrations.

## Suggested review

1. Open Engineering → general. Send a message and try the message hover menu: react, quote, save, pin or create an action.
2. Open the roadmap message's thread and reply. Create a support request from it; compare the selected-message and selected-thread context previews before submitting.
3. Open My support requests to inspect the local ticket, source, attachments and replies.
4. Start a huddle or meeting, share the sample screen, open participants/chat, minimize, return and leave.
5. Schedule a meeting; inspect Upcoming and Past meeting details.
6. Switch Light/Dark/System in Settings → Appearance.
7. Organisation menu → Organisation administration → Integrations: test SMTP and HelpDesk success/failure with sample inputs.
8. Organisation menu → Product identity shows branding. Prototype states opens empty/error/loading examples and a role selector.

`Ctrl/Cmd + K` opens search. `Enter` sends; `Shift + Enter` inserts a line break. Drag the sidebar edge to resize, or focus the separator and use arrow keys.

## Route and screen inventory

Hash routes work after the HTML filename or application root. The app encodes spaces in route values.

| Route | Screens and interactions |
| --- | --- |
| `#/home` | Resume conversations, activity, files, meetings, assigned actions and support |
| `#/chats/dm-shahbaj` | Direct chat, presence, rich message actions, audio/video calls, details |
| `#/chats/group-release` | Group chat; New message creates a DM or group |
| `#/spaces/browse` | Browse/join Spaces; create Team, Project or Private Space |
| `#/spaces/engineering` | Space overview, Channels, Files, Meetings and Members |
| `#/spaces/eng-general` | Channel messages, threads, attachments, pins, notifications and huddles |
| `#/meetings/Upcoming` | Upcoming, Today, Past; scheduling and meeting details/history |
| Call overlay | Pre-call devices; immersive grid/speaker/share views; participants, chat, hand, reactions and recovery |
| `#/files/Recent` | Recent, Shared with me, Space files; search, list/grid, upload, preview, rename, download and remove |
| `#/activity` | Mentions, replies, meetings, actions, support and Space events; mark read |
| `#/actions` | Assigned to me, Created by me, Completed; create, detail, source and completion |
| `#/saved` | Saved messages with source context |
| `#/support` | My support requests; create, ticket details, replies and status |
| `#/settings/Profile` | Profile, Appearance, Notifications, Audio & Video, Privacy, Security and Accessibility |
| `#/admin/General` | General, Members, Roles & Permissions, Spaces, Messaging, Meetings, Files, Integrations, Security, Notifications, Audit Logs, Billing & Plan |
| `#/admin/Integrations/SMTP` | Sender, host, port, encryption, username/password, tests and disconnect |
| `#/admin/Integrations/HelpDesk` | Native API/SMTP fallback, mappings, context permissions and tests |
| `#/login` | Branded demo sign-in, password recovery and workspace selection |
| `#/brand` | Horizontal light/dark lockups, compact icon, size tests and app icon concept |
| `#/prototype` | Fifteen empty/loading/error examples and Owner/Admin/Member/Guest previews |

Use visible navigation for newly created entities. Seed IDs are defined in `lib/matecollab/data.ts`.

## Reusable components

| Module | Responsibility |
| --- | --- |
| `components/matecollab/app.tsx` | Adaptive shell, rail, resizable sidebar, right context panel, login and identity board |
| `components/matecollab/store.tsx` | Shared state, local persistence, routing, confirmation and call lifecycle |
| `components/matecollab/ui.tsx` | Logo, avatars, buttons, fields, selectors, menus, tabs, switches, badges, modals and empty states |
| `components/matecollab/messaging.tsx` | Conversation, message row, composer, attachments, reactions and thread actions |
| `components/matecollab/pages.tsx` | Home, Spaces, files, meetings, actions, activity, saved and support |
| `components/matecollab/settings.tsx` | Personal/organisation settings and integration forms |
| `components/matecollab/meeting.tsx` | Pre-call, meeting stage, sharing sample, participants/chat and floating call |
| `components/matecollab/overlays.tsx` | Search and focused creation/detail flows |
| `lib/matecollab/data.ts` | Typed sample entities and fixtures |
| `app/globals.css` | Light/dark tokens and responsive component styles |

## Intentional simulations and limits

This is a local frontend prototype, not a multi-user service. Messages, reactions, invitations, settings, support requests and actions update local state. Most data persists under `matecollab-*` browser storage keys. The role preview resets to Owner on reload. File-origin storage varies by browser; use the local HTTP option for reliable review sessions.

Calls, camera, devices, screen sharing, presence, typing, read receipts and connection recovery are simulated. No camera, microphone or screen permission is requested. Sharing shows a designed roadmap. No calendar invitations are sent.

SMTP and HelpDesk tests use timers and explicit failure controls. They never contact external services. Sample password/token fields are cleared on save and not persisted. Account, notifications, security, retention and audit settings demonstrate the intended experience without production enforcement. Billing, recording and AI summaries are labeled future placeholders.

Guest mode filters the sample workspace to Sales & Marketing and restricts administration. This demonstrates intended visibility; it is not an authentication or authorization boundary.

Seed documents are illustrative previews. Downloads identify their sample content. Uploaded files use local object URLs; metadata can persist but file bytes are available only in the current session. Re-select an uploaded file after reopening. There is no server storage.

The sample workday is fixed to October 7, 2026 so conversations and calendars remain coherent. Scheduling retains the selected timezone but is not a production scheduling engine. Additional sample employees and conversations are fictional demonstration content.

## UX and branding decisions

- A 70px rail contains six main modules. Actions and support remain in Home/contextual areas.
- The sidebar starts at 274px and resizes from 240–320px. Threads open in a right panel. Narrow screens use drawers; mobile uses bottom navigation.
- Support creation defaults to the selected message. Thread sharing is explicit and previewed; the full private conversation is never automatically attached.
- UI text uses a readable system sans-serif. The exact supplied `HemiHead-Bold.otf` is reserved for branding. Primary blue: `#2463EB`; navy: `#152235`; neutral: `#F4F6F9`.
- The original icon's connected, forward-leaning forms echo the wordmark. It is distinct from the NetaMate company logo. Exported light, dark, monochrome and app-icon SVGs are in `public/brand/`. Outlined wordmarks preserve the supplied glyphs without needing an installed font.
- Controls use restrained 6px radii and modals 8px. Meetings hide workspace navigation while retaining a floating return path.
- Destructive local actions use confirmation. Toasts acknowledge actions; empty/error states offer a next step.

## Validation

TypeScript checking and the standalone build pass. Browser review covered all primary modules and administration sections, light/dark themes, thread replies, selected-thread support creation, SMTP success/failure, meeting join/share/minimize/leave, and 390px Home/channel layouts. The final standalone HTML and its HemiHead identity board were verified in Chrome; the included screenshot is from that output.

This was a focused Chrome review, not exhaustive cross-browser testing. A feature-detected WebMCP adapter is included for navigation and opening the support form; the review browser did not expose that API, so regular controls were used.

No production deployment, domain configuration or real backend integration was performed.
