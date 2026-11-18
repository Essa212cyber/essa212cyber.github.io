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

  const question = cleanText(body?.question, 800);
  if (question.length < 2) return json({ error: "Please enter a school question." }, 400);

  const grade = Number(body?.grade);
  if (!Number.isInteger(grade) || grade < 6 || grade > 12) return json({ error: "Choose a grade from 6 to 12." }, 400);

  const language = body?.language === "Arabic" ? "Arabic" : "English";
  const curriculum = cleanText(body?.curriculum, 40) || "CBSE";
  const subject = cleanText(body?.subject, 80) || "General study";
  const chapter = cleanText(body?.chapter, 120);
  const history = Array.isArray(body?.history) ? body.history.slice(-6).map(item => ({
    role: item?.role === "assistant" ? "assistant" : "user",
    content: cleanText(item?.content, 500)
  })).filter(item => item.content.length > 0) : [];

  const apiKey = process.env.OPENAI_API_KEY;
  const baseUrl = process.env.OPENAI_BASE_URL;
  if (!apiKey || !baseUrl) {
    return json({
      error: "The AI service is not available yet. Check that Netlify AI Features are enabled for this site and that the latest production deploy is published."
    }, 503);
  }

  const system = [
    "You are the Saudi Student Hub Study Tutor for school learners in Grades 6–12.",
    "Teach school subjects clearly and patiently. Use age-appropriate language, short sections, simple examples, and step-by-step explanations when useful.",
    "Reply in " + language + ". Keep subject terminology accurate; when helpful, include the key English term in parentheses in Arabic replies.",
    "The selected context is: curriculum " + curriculum + "; Grade " + grade + "; subject " + subject + (chapter ? "; selected chapter/topic " + chapter : "") + ".",
    "Do not claim that material is an exact CBSE or school syllabus requirement unless you are sure. For uncertain chapter alignment, say the student should compare with the prescribed textbook.",
    "Support understanding and practice rather than helping students misrepresent work as their own. You may show worked examples and explain methods.",
    "Stay focused on education. Do not provide instructions that facilitate violence, weapons, dangerous activities, sexual content, or self-harm. For such requests, briefly decline and redirect to safe, age-appropriate support.",
    "Do not ask for or encourage sharing names, addresses, school IDs, passwords, phone numbers, private photos, or other personal information.",
    "Do not claim to browse live sources or see the student's screen. If you do not know, say so."
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
        max_tokens: 500,
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

    const reply = cleanText(result?.choices?.[0]?.message?.content, 3500);
    if (!reply) return json({ error: "The tutor returned an empty answer. Please try asking in a different way." }, 502);
    return json({ reply });
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
