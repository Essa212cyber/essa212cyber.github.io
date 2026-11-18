const JSON_HEADERS = { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" };

function json(body, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: JSON_HEADERS });
}

function cleanText(value, max = 800) {
  return typeof value === "string" ? value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "").trim().slice(0, max) : "";
}

export default async function studyTutor(request) {
  if (request.method !== "POST") return json({ error: "Use POST for study questions." }, 405);

  let body;
  try { body = await request.json(); }
  catch { return json({ error: "The request was not valid JSON." }, 400); }

  const question = cleanText(body?.question, 3000);
  if (question.length < 2) return json({ error: "Please enter a school question." }, 400);

  const grade = Number(body?.grade);
  if (!Number.isInteger(grade) || grade < 6 || grade > 12) return json({ error: "Choose a grade from 6 to 12." }, 400);

  const language = body?.language === "Arabic" ? "Arabic" : "English";
  const curriculum = cleanText(body?.curriculum, 40) || "CBSE";
  const subject = cleanText(body?.subject, 80) || "General study";
  const chapter = cleanText(body?.chapter, 120);
  const history = Array.isArray(body?.history) ? body.history.slice(-12).map(item => ({
    role: item?.role === "assistant" ? "assistant" : "user",
    content: cleanText(item?.content, 1200)
  })).filter(item => item.content.length > 0) : [];

  const apiKey = process.env.OPENAI_API_KEY || process.env.NETLIFY_AI_GATEWAY_KEY;
  const baseUrl = process.env.OPENAI_BASE_URL || process.env.NETLIFY_AI_GATEWAY_BASE_URL;
  if (!apiKey || !baseUrl) {
    return json({
      error: "The AI service is not available yet. Check that Netlify AI Features are enabled for this site and that the latest production deploy is published."
    }, 503);
  }

  const system = [
    "You are the Saudi Student Hub AI Tutor and general assistant for learners in Grades 6–12.",
    "Answer a broad range of appropriate questions, including school topics, general knowledge, writing, language learning, creativity, coding, study skills, everyday explanations, and harmless questions that are not related to school. Do not force every answer to be about school.",
    "When a question is about school, teach clearly and patiently. Use age-appropriate language, short sections, examples, and step-by-step explanations when useful. When a question is not about school, answer it normally and helpfully.",
    "Reply in " + language + ". Keep subject terminology accurate; when helpful, include the key English term in parentheses in Arabic replies.",
    "The selected context is: curriculum " + curriculum + "; Grade " + grade + "; subject " + subject + (chapter ? "; selected chapter/topic " + chapter : "") + ".",
    "Do not claim that material is an exact CBSE or school syllabus requirement unless you are sure. For uncertain chapter alignment, say the student should compare with the prescribed textbook.",
    "Support learning and honest work. You may show worked examples, explain methods, brainstorm ideas, review writing, and help with harmless everyday tasks.",
    "Keep all answers age-appropriate. Do not provide sexual or explicit content, instructions facilitating violence or weapons, dangerous activities, self-harm, substance use, or other harmful conduct. If asked for such help, briefly decline and offer a safe, relevant alternative.",
    "Do not ask for or encourage sharing names, addresses, school IDs, passwords, phone numbers, private photos, or other personal information.",
    "Format answers cleanly in Markdown: use headings only when helpful, short paragraphs, correctly numbered steps, and readable bullet lists. Put important equations on their own display-math lines using balanced LaTeX delimiters. Define symbols and show calculation steps when solving a problem.",
    "Give a complete answer that ends naturally. Do not cut off a sentence, leave a list unfinished, or append a dangling invitation. If the topic is broad, give a useful complete overview rather than starting more detail than you can finish.",
    "Do not claim to browse live sources or see the student screen. If you do not know, say so."
  ].join(" ");

  try {
    const response = await fetch(baseUrl.replace(/\/$/, "") + "/v1/chat/completions", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "authorization": "Bearer " + apiKey
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        temperature: 0.3,
        max_tokens: 1800,
        messages: [
          { role: "system", content: system },
          ...history,
          { role: "user", content: question }
        ]
      })
    });

    const result = await response.json().catch(() => ({}));
    if (!response.ok) {
      const status = response.status === 429 ? 429 : 502;
      return json({
        error: status === 429
          ? "The AI tutor is temporarily busy or its monthly usage limit has been reached. Please try again later."
          : "The AI tutor could not answer right now. Please try again in a moment."
      }, status);
    }

    let reply = cleanText(result?.choices?.[0]?.message?.content, 12000);
    if (!reply) return json({ error: "The tutor returned an empty answer. Please try asking in a different way." }, 502);

    // If the model explicitly hit its output limit, ask it to finish the answer
    // rather than sending the student a sentence cut off in the middle.
    if (result?.choices?.[0]?.finish_reason === "length") {
      try {
        const continuation = await fetch(baseUrl.replace(/\/$/, "") + "/v1/chat/completions", {
          method: "POST",
          headers: {
            "content-type": "application/json",
            "authorization": "Bearer " + apiKey
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            temperature: 0.3,
            max_tokens: 700,
            messages: [
              { role: "system", content: system + " Continue the answer from the exact point where it stopped. Do not repeat the previous paragraphs. Finish all sentences and lists." },
              ...history,
              { role: "user", content: question },
              { role: "assistant", content: reply },
              { role: "user", content: "Continue from the last word, do not repeat, and finish the answer naturally." }
            ]
          })
        });
        if (continuation.ok) {
          const extra = await continuation.json().catch(() => ({}));
          const tail = cleanText(extra?.choices?.[0]?.message?.content, 5000);
          if (tail) reply += "\n\n" + tail;
        }
      } catch (_) {
        // Keep the useful partial answer if a continuation request fails.
      }
    }
    return json({ reply: reply.slice(0, 16000) });
  } catch {
    return json({ error: "The AI tutor could not connect. Please check the deployment and try again." }, 502);
  }
}

export const config = {
  path: "/api/study-tutor",
  rateLimit: {
    windowLimit: 4,
    windowSize: 60,
    aggregateBy: ["ip", "domain"]
  }
};
