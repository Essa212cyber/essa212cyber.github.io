# Saudi Student Hub

**Public website:** https://saudistudenthub.netlify.app/

- English homepage: https://saudistudenthub.netlify.app/index-en.html
- Arabic homepage: https://saudistudenthub.netlify.app/index.html
- Separate AI Tutor chat: https://saudistudenthub.netlify.app/ai-tutor.html

## Current features

- Curriculum, grade, subject and lesson-language selectors.
- Selected CBSE Class 11 chapter libraries with locally authored notes, definitions, question sets and video resources.
- CBSE Grades 6–12 starter study packs for selected subjects; this is not yet a complete chapter-by-chapter library for every subject.
- English video playlists where a checked playlist is available, plus topic-search links for other combinations.
- Arabic video links and selected embedded playlists. Official Ain Doroos pages open separately because they do not reliably allow embedded playback.
- Four learning games: quick quiz, flashcards, true/false and matching pairs.
- Saudi Ministry textbook links and Ain Doroos resources for Saudi curriculum choices.
- Dedicated ChatGPT-style AI Tutor page with separate conversations, reply-language selection, optional grade/curriculum/subject context, readable Markdown lists/tables/code and common LaTeX equation formatting.
- AI Tutor conversation history automatically saves in the current browser. Users can delete one conversation, delete all history, export the active conversation, and start a new chat. History is local to each browser/device and is not synced.
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

The AI Tutor sends requests to a Netlify Function at `/api/study-tutor`. The function uses Netlify AI Gateway's server-side environment variables; no provider API key is placed in public JavaScript.

Conversation history is stored in local browser storage on the current device. Clearing browser site data may erase it. Export important chats before clearing site data. Do not use this feature on a shared/public computer for private conversations, and do not enter names, addresses, phone numbers, school IDs, passwords, or other private information.

AI answers may be wrong or incomplete. Check important academic information with your teacher and prescribed textbook. The function applies a per-IP rate limit to control usage. AI requests consume Netlify AI Gateway credits; the team owner should review credit usage and plan limits in Netlify before the tutor is widely shared.

## Official curriculum sources

- CBSE Academic: https://cbseacademic.nic.in/
- NCERT ePathshala: https://epathshala.nic.in/
- Saudi Ministry study plans: https://www.moe.gov.sa/ar/education/general-education/study-plans
- Saudi Ministry textbook catalogue: https://madrasatibeta.moe.gov.sa/books?Language=1
- Saudi Ain Doroos lesson directory: https://www.ientv.edu.sa/ar/doros
- Netlify AI Gateway docs: https://docs.netlify.com/build/ai-gateway/overview/
