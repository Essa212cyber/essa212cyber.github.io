# Saudi Student Hub

**Public website:** https://saudistudenthub.netlify.app/

- English page: https://saudistudenthub.netlify.app/index-en.html
- Arabic page: https://saudistudenthub.netlify.app/index.html

## Current features

- Curriculum, grade, subject and lesson-language selectors.
- Selected CBSE Class 11 chapter libraries with locally authored notes, definitions, question sets and video resources.
- CBSE Grades 6–12 starter study packs for selected subjects, including bilingual practice and revision examples. The content is not yet a complete chapter-by-chapter curriculum for every subject.
- English video playlists embedded where a checked playlist is available, plus targeted chapter-search links for other combinations.
- Arabic video players for selected verified individual clips and grade playlists. Other Arabic topics show focused video-search links; Arabic videos from other national curricula are labelled as supplementary, not CBSE-aligned.
- Saudi Ministry textbook links and Ain Doroos lesson resources, with embeds only where a YouTube playlist is available.
- Four study games: quick quiz, flashcards, true/false and matching pairs.
- AI Tutor with English/Arabic replies. It can answer school questions and ordinary age-appropriate general questions, while refusing unsafe or explicit requests.
- AI Tutor runs through a protected Netlify Function and Netlify AI Gateway. No AI API key is placed in public JavaScript.
- Attendance and marks calculators, study task list, focus timer and dark mode.

## Content accuracy and coverage

This is an expanding beta, not a complete textbook replacement.

- The most developed local chapter notes and question banks are selected CBSE Class 11 subjects.
- Grades 6–12 have starter practice sets for selected common subjects. Some subject/grade combinations still need a proper chapter list and chapter-specific question bank.
- Playlist and search results are supplementary. Match every video and topic to the current textbook followed by your school.
- Arabic videos from other national curricula are clearly labelled as supplementary rather than being presented as exact CBSE lessons.
- Always compare revision material with the current textbook and your school's course plan.

## AI usage and safety

The AI Tutor calls Netlify AI Gateway from a server-side Function at `/api/study-tutor`. The browser does not receive a provider API key. The function limits prompt length and applies a per-IP rate limit of four requests per minute.

AI requests use the Netlify team's AI credits. The team owner should review AI Features and credit usage before the public tutor is widely shared. AI responses can be inaccurate; check important answers with textbooks and teachers. Do not enter names, addresses, school IDs, passwords, or other private information.

## Official curriculum sources

- CBSE Academic: https://cbseacademic.nic.in/
- NCERT ePathshala: https://epathshala.nic.in/
- Saudi Ministry study plans: https://www.moe.gov.sa/ar/education/general-education/study-plans
- Saudi Ministry textbook catalogue: https://madrasatibeta.moe.gov.sa/books?Language=1
- Saudi Ain Doroos lesson directory: https://www.ientv.edu.sa/ar/doros
