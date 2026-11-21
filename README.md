# Saudi Student Hub

**Current Cloudflare Pages website:** https://saudi-student-hub.pages.dev/

- English homepage: https://saudi-student-hub.pages.dev/index-en
- Arabic homepage: https://saudi-student-hub.pages.dev/index.html
- AI Tutor: https://saudi-student-hub.pages.dev/ai-tutor.html

The GitHub `main` branch is connected to Cloudflare Pages. Commits to `main` trigger a production deployment.

## Hosting and deployment

- Static website hosting: Cloudflare Pages.
- Production branch: `main`.
- Site root / build output: repository root (`.`).
- No framework build is required; this is a plain HTML, CSS and JavaScript website.
- Pages Functions live in the root `functions/` directory.
- The production AI endpoint is `POST /api/study-tutor`.

The older Netlify site may remain online as a backup while the Cloudflare version is tested. `netlify.toml` and `netlify/functions/study-tutor.mjs` are retained only for that backup; Cloudflare Pages does not use them. The Cloudflare AI Tutor uses `functions/api/study-tutor.js`.

## Cloudflare Pages setup required for the AI Tutor

In the Cloudflare dashboard:

1. Open **Workers & Pages** and select the `saudi-student-hub` Pages project.
2. Open **Settings → Bindings**.
3. Add a **Workers AI** binding.
4. Set its variable name to exactly `AI`.
5. Add it to the Production environment.
6. Save and trigger a new production deployment.

The Pages Function uses the Cloudflare-hosted model `@cf/google/gemma-4-26b-a4b-it`. It requires no OpenAI API key and no public API key in the browser.

## AI usage and free-plan limits

Cloudflare Workers AI currently includes a daily free allocation of 10,000 Neurons. Usage resets daily at 00:00 UTC. If the free allocation is exhausted, requests fail until the daily reset. Do not upgrade to a paid Workers plan or add paid AI credits unless the account owner explicitly chooses that. Monitor usage in the Cloudflare dashboard because free allocations and pricing may change.

The Pages Function validates input, limits conversation history and uses a best-effort per-isolate request throttle. This throttle is not a guaranteed global abuse-prevention system. The account-wide Workers AI daily allocation is the hard usage cap.

## Current features

- Curriculum, grade, subject and lesson-language selectors.
- Selected CBSE Class 11 chapter libraries with locally authored notes, definitions, question sets and video resources.
- CBSE Grades 6–12 starter study packs for selected subjects; this is not yet a complete chapter-by-chapter library for every subject.
- English video playlists where a checked playlist is available, plus topic-search links for other combinations.
- Arabic video links and selected embedded playlists. Official Ain Doroos pages open separately because they do not reliably allow embedded playback.
- Four learning games: quick quiz, flashcards, true/false and matching pairs.
- Saudi Ministry textbook links and Ain Doroos resources for Saudi curriculum choices.
- Dedicated AI Tutor page with separate conversations, reply-language selection, optional grade/curriculum/subject context, readable Markdown lists/tables/code and common LaTeX equation formatting.
- AI Tutor conversation history saves in the current browser. Users can delete one conversation, delete all history, export the active conversation, and start a new chat. History is local to each browser/device and is not synced.
- AI Tutor handles school topics and ordinary age-appropriate general questions; it is not an unrestricted answer service.
- Attendance and marks calculators, study task list, focus timer and royal navy/ivory/gold visual theme.

## Content accuracy and coverage

This is an expanding beta, not a complete textbook replacement.

- The most developed local chapter notes and question banks are selected CBSE Class 11 subjects.
- Grades 6–12 have starter practice sets for selected common subjects. Some combinations still need proper chapter lists and chapter-specific question banks.
- Playlist and search results are supplementary. Match every video and topic to the current textbook followed by your school.
- Arabic videos from other national curricula are labelled as supplementary rather than being presented as exact CBSE lessons.
- Always compare revision material with the current textbook and the school's course plan.

## AI usage, privacy and safety

The AI Tutor sends questions and up to 10 recent conversation messages to a Cloudflare Pages Function at `/api/study-tutor`. The Function uses a Workers AI binding named `AI`; no provider API key is placed in public JavaScript.

Conversation history is stored in local browser storage on the current device. Clearing browser site data may erase it. Export important chats before clearing site data. Do not use this feature on a shared/public computer for private conversations, and do not enter names, addresses, phone numbers, school IDs, passwords, or other private information.

AI answers may be wrong or incomplete. Check important academic information with your teacher and prescribed textbook.

## Official curriculum sources

- CBSE Academic: https://cbseacademic.nic.in/
- NCERT ePathshala: https://epathshala.nic.in/
- Saudi Ministry study plans: https://www.moe.gov.sa/ar/education/general-education/study-plans
- Saudi Ministry textbook catalogue: https://madrasatibeta.moe.gov.sa/books?Language=1
- Saudi Ain Doroos lesson directory: https://www.ientv.edu.sa/ar/doros
- Cloudflare Pages Git integration: https://developers.cloudflare.com/pages/get-started/git-integration/
- Cloudflare Pages Functions bindings: https://developers.cloudflare.com/pages/functions/bindings/
- Cloudflare Workers AI pricing: https://developers.cloudflare.com/workers-ai/platform/pricing/
