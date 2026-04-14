# UI elements
Consistent, clear, and concise text helps users understand actions and data faster. This guide defines how to write titles, labels, buttons, placeholders, and helper text in the Kodiak Hub UI.

## Match length to the component

Before you draft or review copy, **identify the UI component** (info box, modal title, button, tooltip, and so on). String length, depth, and structure must **fit that component**, not a generic paragraph.

- **Do** use the targets in **Per-string constraints** for the surface you are writing for.
- **Do not** paste long explanatory copy into a button, wizard label, or search placeholder because it “sounds better” elsewhere — move extra detail to helper text, info box body, or a linked article.
- If engineering gives a **hard limit** (pixels, truncation, line clamp), treat that as stricter than the ranges below.

## Titles and modals
*Length targets: **Per-string constraints — Modal**.*

- Use sentence case (capitalize only the first word and proper nouns).
- Titles should clearly describe the purpose or action, using a verb + noun ("Create supplier", "Delete account") or a short question ("Delete account?").
- Avoid filler words like "a new" unless necessary for clarity.
- Titles and primary action buttons must align in meaning (e.g., "Create supplier" → button "Create").
- Never use generic modal buttons ("OK", "Yes", "Submit"). Be explicit about the outcome ("Delete supplier", "Save changes").
- Keep modal titles brief and scannable — users should understand the purpose at a glance.

| Modal title | Primary button |
|---|---|
| Create supplier | Create |
| Edit supplier details | Save changes |
| Delete contract? | Delete contract |

## Input placeholders
*Length targets: **Per-string constraints — Placeholder**.*

- Placeholders do not replace labels — labels must remain visible.
- Because of the configurability of Kodiak Hub, we can't have placeholders for all inputs. We can start with placeholders for the four required datapoints for importing suppliers:
  - Supplier contact email
  - Supplier name
  - Supplier ID
  - Supplier country
- Use placeholders only as short examples or hints of expected input.
- Always start with e.g. followed by a realistic value.
- Keep them concise, neutral, and visually unobtrusive (e.g. gray color).
- Never duplicate the label text in the placeholder.
- For inline inputs (e.g., editable table rows), avoid placeholders to prevent visual clutter unless a format example is critical.
- Be mindful of accessibility — placeholders should never contain essential instructions since they disappear on input.

| Label | Placeholder |
|---|---|
| Supplier contact email | e.g. contact@company.com |
| Supplier name | e.g. Green Chemicals Ltd. |
| Supplier ID | e.g. CN-2025-001 |
| Prompt (AI generated actions) | e.g. Generate Smart Action to renew ISO 9001 certificate 30 days before expiry. |

## Buttons
*Length targets: **Per-string constraints — Button**.*

- Always start with a verb, optionally followed by a noun (e.g., "Save changes", "Add supplier").
- Avoid generic labels ("OK", "Submit", "Yes") unless context is crystal-clear ("Submit" assessment).
- Keep short (1–3 words) but prioritize clarity ("Continue to payment" > "Continue").
- Use sentence case, no punctuation.
- Ensure consistency — use the same label for the same action everywhere.
- Match the tone to context: neutral, straightforward, no slang or playful language in functional actions.

| Good example | Do not use |
|---|---|
| Add supplier | New supplier |
| Save changes | OK |
| Continue to review | Continue |
| Delete account | Confirm |

## Input and dropdown labels
*Length targets: **Per-string constraints — Field label**.*

- Use nouns or noun phrases to describe the field ("Supplier name", "Contract type").
- Avoid verbs or full instructions ("Enter name", "Choose country").
- Use sentence case, no colon at the end.
- Keep labels short and scannable (1–3 words ideally).
- If you need to show format or additional guidance, move it to helper text below the field.
- Always include a label for accessibility — never rely on a placeholder alone.

| Good example | Do not use |
|---|---|
| Country | Select your country |
| Supplier name | Enter supplier name |
| Contract type | Choose type of contract |

## Search fields
*Length targets: **Per-string constraints — Search**.*

- If no visible label is present, the placeholder must show the search scope.
- Pattern: Search [entity]… (e.g., Search suppliers, Search assessments).
- Keep it short, specific, and scoped.
- Use sentence case.
- Add an accessible name (aria-label) if the field lacks a visible label.
- Avoid redundancy (don't repeat "Search" on both input and button).

Examples:
- Search suppliers
- Search products
- Search assessments

## Info boxes (informational messages)
*Length targets: **Per-string constraints — Info box** (standard) or **Special info box** when used for null states, access errors, AI disclaimers, or load failures.*

- Structure: optional title + short body (1–3 sentences).
- Title should summarize the message; body adds context or guidance — don't repeat the title.
- Tone: neutral, helpful, supportive.
- Keep messages brief and scannable (ideally one short paragraph).
- Use bold sparingly to highlight key terms or actions.
- If the message includes a next step, provide a link or action in the body (e.g., "Learn more", "Go to settings").

| Type | Title | Body |
|---|---|---|
| Info | AI suggestions available | The system can help you generate supplier assessments based on past data. |
| Tip | Use filters to refine results | You can filter by region, category, or supplier type. |

## Wizard steps
*Length targets: **Per-string constraints — Wizard step**.*

- Name steps with nouns or short noun phrases ("Supplier details", "Documents", "Review").
- Keep style consistent across all steps — don't mix verbs and nouns.
- Avoid adding "Step 1/2/3" in the text (the UI can handle numbering).
- Keep it short (1–3 words) and distinct to help orientation.
- Reflect the content of the step, not the action ("Supplier details" > "Enter supplier details").

| Good example | Do not use |
|---|---|
| Supplier details | Enter supplier details |
| Documents | Upload documents here |
| Review | Review and submit |

## Tooltips and helper text
*Length targets: **Per-string constraints — Tooltip** and **Helper text**.*

- Use tooltips sparingly. The user should be able to understand, through context, what behavior is expected from them. In other words, the UI should guide them to the expected behavior.
- Keep to one short sentence or phrase — answer the user's likely question.
- Front-load key info (start with the essential word or concept).
- Use bold only for key terms when clarity requires it (avoid excessive emphasis).
- Avoid repeating the label; provide new, helpful context.
- Keep tone reassuring and neutral, not formal or playful.
- Never rely on tooltip text for critical info — users may not hover or may be on touch devices.

| Type | Example |
|---|---|
| Tooltip | Shows your public profile name |
| Helper text | Format: YYYY-MM-DD |
| Helper text with emphasis | **Password**: must include 8–20 characters. |

## Per-string constraints

Character counts are **approximate** (Latin script, typical UI width). Adjust if localization or a design spec says otherwise; always prefer the spec when it conflicts with a range here.

### Modal

| String | Words | Characters (approx.) |
|---|---|---|
| Modal title | 2–8 | ~22–48 |
| Primary button | 1–3 | ~8–22 |
| Secondary / destructive button | 1–3 | ~8–24 |
| Short supporting line under title (if used) | 1 sentence | ~40–90 |

### Button

| String | Words | Characters (approx.) |
|---|---|---|
| Default / primary / secondary | 1–3 | ~8–24 |
| Allowed exception when meaning needs it | up to 4 | up to ~32 |

### Field label

| String | Words | Characters (approx.) |
|---|---|---|
| Input or dropdown label | 1–3 | ~10–32 |
| Group / section label | 2–5 | ~18–40 |

### Placeholder

| String | Words | Characters (approx.) |
|---|---|---|
| After `e.g.` (example only) | 2–12 | ~18–55 |
| Full placeholder including `e.g.` | — | ~22–65 |

### Search

| String | Words | Characters (approx.) |
|---|---|---|
| Placeholder (`Search [entity]`) | 2–4 | ~16–36 |

### Wizard step

| String | Words | Characters (approx.) |
|---|---|---|
| Step name | 1–3 | ~8–28 |

### Tooltip

| String | Words | Characters (approx.) |
|---|---|---|
| Tooltip line | 1 short sentence | ~45–95 |

### Helper text

| String | Words | Characters (approx.) |
|---|---|---|
| Single line under field | 3–14 | ~28–85 |
| With short bold lead (e.g. **Password**:) | — | ~35–100 |

### Info box

| String | Words | Characters (approx.) |
|---|---|---|
| Title | 3–6 | ~30–40 |
| Body text | 1–3 sentences | ~100–160 |
| Link / action text | 2–4 | ~15–25 |
| Button label (in box) | 1–3 | ~8–20 |
| Badge / tag label | 1–2 | ~5–15 |

### Special info box

Used for null states, access errors, AI disclaimers, and load failures. Prefer **tighter** copy than a standard info box.

| String | Words | Characters (approx.) |
|---|---|---|
| Title | 2–5 | ~15–35 |
| Body text | 1–2 sentences | ~50–120 |
| Inline link text | 3–6 | ~20–35 |
| AI disclaimer body | 2 sentences | ~130–160 |
| Banner title | 2–4 | ~20–35 |
| Banner body | 1 sentence | ~50–80 |