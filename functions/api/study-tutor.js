const JSON_HEADERS = {
  "content-type": "application/json; charset=utf-8",
  "cache-control": "no-store"
};

const MODEL_ID = "@cf/google/gemma-4-26b-a4b-it";

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: JSON_HEADERS
  });
}

function cleanText(value, max = 1200) {
  return typeof value === "string"
    ? value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "").trim().slice(0, max)
    : "";
}

export async function onRequestPost({ request, env }) {
  if (!env?.AI || typeof env.AI.run !== "function") {
    return json({
      error: "The AI service is not connected yet. In Cloudflare Pages, add a Workers AI binding named AI, then redeploy."
    }, 503);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: "The request was not valid JSON." }, 400);
  }

  const question = cleanText(body?.question, 3000);
  if (question.length < 2) {
    return json({ error: "Please enter a question." }, 400);
  }

  const grade = Number(body?.grade);
  if (!Number.isInteger(grade) || grade < 6 || grade > 12) {
    return json({ error: "Choose a grade from 6 to 12." }, 400);
  }

  const language = body?.language === "Arabic" ? "Arabic" : "English";
  const curriculum = cleanText(body?.curriculum, 40) || "CBSE";
  const subject = cleanText(body?.subject, 80) || "General study";
  const chapter = cleanText(body?.chapter, 120);

  const history = Array.isArray(body?.history)
    ? body.history.slice(-10).map(item => ({
        role: item?.role === "assistant" ? "assistant" : "user",
        content: cleanText(item?.content, 1000)
      })).filter(item => item.content.length > 0)
    : [];

  const system = [
    "You are the Saudi Student Hub AI Tutor and general assistant for learners in Grades 6–12.",
    "Answer a broad range of appropriate questions, including school subjects, general knowledge, writing, language learning, creativity, coding, study skills, and harmless everyday questions. Do not force every answer to be about school.",
    "When a question is about school, teach clearly and patiently. Use age-appropriate language, short sections, examples, and step-by-step explanations when useful.",
    "Reply in " + language + ". For Arabic answers, use clear modern standard Arabic. Keep equations and scientific symbols readable.",
    "The selected context is: curriculum " + curriculum + "; Grade " + grade + "; subject " + subject + (chapter ? "; selected chapter/topic " + chapter : "") + ".",
    "Do not claim that material is an exact school syllabus requirement unless you are sure. For uncertain chapter alignment, say the student should compare with the prescribed textbook.",
    "Support learning honestly. You may show worked examples, explain methods, brainstorm ideas, review writing, and help with harmless everyday tasks.",
    "Keep all answers age-appropriate. Do not provide explicit sexual content, instructions facilitating violence or weapons, dangerous activities, self-harm, substance use, or other harmful conduct. Briefly decline such requests and offer a safe alternative.",
    "Do not ask for or encourage sharing names, addresses, school IDs, passwords, phone numbers, private photos, or other personal information.",
    "Format answers cleanly in Markdown. Use headings only when helpful, short paragraphs, correctly numbered steps, and readable bullet lists. Put important equations on their own display-math lines using balanced LaTeX delimiters. Define symbols and show calculation steps when solving a problem.",
    "For chemistry equilibrium questions, define every symbol and state assumptions. For example, explain that Kp = Kc(RT)^Delta n for gaseous equilibria, where Delta n is moles of gaseous products minus moles of gaseous reactants, using balanced-equation coefficients.",
    "Give a complete answer that ends naturally. Do not cut off a sentence or leave a list unfinished.",
    "Do not claim to browse live sources or see the student's screen. If you do not know, say so."
  ].join(" ");

  try {
    const result = await env.AI.run(MODEL_ID, {
      messages: [
        { role: "system", content: system },
        ...history,
        { role: "user", content: question }
      ],
      max_tokens: 1200,
      temperature: 0.3
    });

    const rawReply =
      (typeof result === "string" ? result : "") ||
      result?.response ||
      result?.choices?.[0]?.message?.content ||
      result?.result?.response ||
      "";

    const reply = cleanText(rawReply, 12000);
    if (!reply) {
      return json({ error: "The tutor returned an empty answer. Please try asking in a different way." }, 502);
    }

    return json({ reply });
  } catch {
    return json({
      error: "The AI service could not answer right now. The daily free AI allowance may be used up, or Cloudflare may be temporarily busy. Please try again later."
    }, 503);
  }
}
