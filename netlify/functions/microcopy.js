/**
 * Proxies OpenAI so the browser can get CORS-friendly microcopy generation.
 * Set OPENAI_API_KEY in Netlify Site settings → Environment variables (optional if clients always send a key).
 */

const OPENAI_URL = "https://api.openai.com/v1/chat/completions";

function corsHeaders(extra) {
  return Object.assign(
    {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
    },
    extra || {}
  );
}

exports.handler = async function (event) {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers: corsHeaders() };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: corsHeaders({ "Content-Type": "application/json" }),
      body: JSON.stringify({ error: "Use POST" }),
    };
  }

  var body;
  try {
    body = JSON.parse(event.body || "{}");
  } catch (e) {
    return {
      statusCode: 400,
      headers: corsHeaders({ "Content-Type": "application/json" }),
      body: JSON.stringify({ error: "Invalid JSON body" }),
    };
  }

  var openaiKey = (body.openaiKey || "").trim() || process.env.OPENAI_API_KEY;
  if (!openaiKey) {
    return {
      statusCode: 400,
      headers: corsHeaders({ "Content-Type": "application/json" }),
      body: JSON.stringify({
        error: "Missing OpenAI key. Add OPENAI_API_KEY in Netlify env, or send openaiKey in the request body.",
      }),
    };
  }

  var message = (body.message || "").trim();
  if (!message) {
    return {
      statusCode: 400,
      headers: corsHeaders({ "Content-Type": "application/json" }),
      body: JSON.stringify({ error: "message is required" }),
    };
  }

  var guides = (body.guidesMarkdown || "").trim();
  if (guides.length > 120000) {
    guides = guides.slice(0, 120000) + "\n\n[Guides truncated for token limits.]";
  }

  var system =
    "You are an expert UX writer for Kodiak Hub (B2B procurement software). " +
    "Transform the user's rough inputs into polished, production-ready microcopy.\n\n" +
    "Apply the STYLE GUIDES in the next message exactly: voice, terminology, UI patterns, " +
    "component-appropriate length (modal vs info box vs button), sentence case, button rules (verb first, 1–3 words, no generic OK/Yes/Submit unless clearly justified), " +
    "Kodiak Hub naming, glossary terms for modules.\n\n" +
    "Write only the final strings a user would see in the product — no lecture, no \"here is your copy\" meta text.\n\n" +
    "Respond with ONLY valid JSON (no markdown fences) matching this shape:\n" +
    '{"figma_block":"string","slack_block":"string"}\n' +
    "figma_block: Use lines starting with em dash + space + label, then the string on the next line(s). " +
    "Include only relevant sections (e.g. — Headline / title, — Body / supporting copy, — Primary button, — Secondary button, — Helper or microcopy) based on the output format and context. No character counts in the labels unless helpful.\n" +
    "slack_block: Short stakeholder-friendly handoff: one title line, then tight bullets or short paragraphs suitable for Slack. Use *single asterisks* for emphasis where useful.";

  var userPayload = {
    message: message,
    context: (body.context || "").trim(),
    goal: (body.goal || "").trim(),
    draft: (body.draft || "").trim(),
    output_format: (body.outputShape || "").trim(),
  };

  var userContent =
    "## Style guides (follow strictly)\n\n" +
    guides +
    "\n\n## Intake (transform this into microcopy)\n\n" +
    JSON.stringify(userPayload, null, 2);

  var openaiRes;
  try {
    openaiRes = await fetch(OPENAI_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + openaiKey,
      },
      body: JSON.stringify({
        model: body.model || "gpt-4o-mini",
        temperature: 0.45,
        max_tokens: 2000,
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: system },
          { role: "user", content: userContent },
        ],
      }),
    });
  } catch (err) {
    return {
      statusCode: 502,
      headers: corsHeaders({ "Content-Type": "application/json" }),
      body: JSON.stringify({ error: "Could not reach OpenAI: " + String(err.message || err) }),
    };
  }

  var raw = await openaiRes.text();
  if (!openaiRes.ok) {
    return {
      statusCode: openaiRes.status >= 500 ? 502 : 400,
      headers: corsHeaders({ "Content-Type": "application/json" }),
      body: JSON.stringify({
        error: "OpenAI error",
        detail: raw.slice(0, 2000),
      }),
    };
  }

  var parsed;
  try {
    parsed = JSON.parse(raw);
  } catch (e) {
    return {
      statusCode: 502,
      headers: corsHeaders({ "Content-Type": "application/json" }),
      body: JSON.stringify({ error: "Invalid OpenAI response JSON" }),
    };
  }

  var choice = parsed.choices && parsed.choices[0];
  var content = choice && choice.message && choice.message.content;
  if (!content) {
    return {
      statusCode: 502,
      headers: corsHeaders({ "Content-Type": "application/json" }),
      body: JSON.stringify({ error: "Empty model response", detail: raw.slice(0, 500) }),
    };
  }

  var out;
  try {
    out = JSON.parse(content.trim());
  } catch (e) {
    return {
      statusCode: 502,
      headers: corsHeaders({ "Content-Type": "application/json" }),
      body: JSON.stringify({
        error: "Model did not return valid JSON",
        detail: content.slice(0, 1500),
      }),
    };
  }

  var figma = (out.figma_block || out.figmaBlock || "").trim();
  var slack = (out.slack_block || out.slackBlock || "").trim();
  if (!figma && !slack) {
    return {
      statusCode: 502,
      headers: corsHeaders({ "Content-Type": "application/json" }),
      body: JSON.stringify({ error: "Model JSON missing figma_block / slack_block", detail: content.slice(0, 800) }),
    };
  }

  return {
    statusCode: 200,
    headers: corsHeaders({ "Content-Type": "application/json" }),
    body: JSON.stringify({
      figma_block: figma,
      slack_block: slack,
      all: "=== FIGMA-STYLE ===\n\n" + figma + "\n\n=== SLACK / PLAIN ===\n\n" + slack,
    }),
  };
};
