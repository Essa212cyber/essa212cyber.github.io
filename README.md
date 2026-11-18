# Saudi Student Hub

**Public website:** https://saudistudenthub.netlify.app/

- English page: https://saudistudenthub.netlify.app/index-en.html
- Arabic page: https://saudistudenthub.netlify.app/index.html

## Current features

- Curriculum, grade, subject and lesson-language selectors.
- CBSE Class 11 starter libraries with locally authored notes, definitions, practice questions and selected topic videos.
- CBSE Grades 6–12 starter study sets for selected common subjects, with questions, definitions, worked explanations and lesson-finding links.
- English video playlists embedded where a checked playlist is available; chapter search links for other subject and grade combinations.
- Arabic video links for all grades and subjects. Verified individual Arabic lessons are linked directly; other topics open a focused YouTube search. Ain Doroos pages open directly because the official pages do not reliably allow iframe playback.
- Four study games: quick quiz, flashcards, true/false and matching pairs.
- AI Study Tutor through a protected Netlify Function and Netlify AI Gateway. The browser never contains an AI API key.
- Attendance and marks calculators, study task list, focus timer and dark mode.

## Content accuracy and coverage

This is an expanding beta, not a complete chapter-by-chapter library for every CBSE grade and subject.

- The most developed local chapter notes and question banks are selected CBSE Class 11 subjects.
- Grades 6–12 have starter practice sets for selected common subjects. Some optional/senior subjects show general study-skill prompts until subject-specific material is curated.
- Video playlists and search results are supplementary. Check the title and topic against the current NCERT/CBSE textbook followed by your school.
- The CBSE 2026–27 official curriculum page covers Classes IX–XII; Grades VI–VIII should be checked against the NCERT and school-prescribed materials.
- AI replies can be inaccurate and should be checked against textbooks and teachers. Do not enter personal information in the tutor.

## AI usage and safety

The tutor runs in a Netlify Function and calls Netlify AI Gateway from the server. No API key is placed in public JavaScript. The function limits questions to 800 characters, limits response length, and applies a per-IP rate limit of four requests per minute.

Netlify AI Gateway usage consumes the site's Netlify credits. Netlify's Free plan currently includes 300 credits per month with a hard limit and no automatic recharge. Confirm the team's current plan and credit settings in Netlify before sharing the public AI tutor widely.

## Official curriculum and lesson sources

- CBSE curriculum 2026–27: https://cbseacademic.nic.in/curriculum_2027.html
- NCERT ePathshala: https://epathshala.nic.in/
- Saudi Ministry study plans: https://www.moe.gov.sa/ar/education/general-education/study-plans
- Saudi Ministry textbook catalogue: https://madrasatibeta.moe.gov.sa/books?Language=1
- Saudi Ain Doroos lesson directory: https://www.ientv.edu.sa/ar/doros
