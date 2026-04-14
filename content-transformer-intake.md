# Content transformer — intake format

Use the block below every time you run the transformer. Fill in all three sections in your own words. **You** are the person using this tool (writer, PM, designer). **The user** is the person using Kodiak Hub in the product.

---

## Terminology

| Who | Meaning |
|-----|--------|
| **You** | The teammate submitting this intake — the author of the request. |
| **The user** | The platform user — the person who will read the copy inside Kodiak Hub. |

---

## Paste this when requesting copy

```
message:
[What are you asking for? What should the user know, think, or feel?]

context:
[What can change how we say it?
• What type of copy is this? (e.g. empty state, error, success, modal title, BJÖRN output, marketing string)
• Any limits from UI, interaction, or usability? (character count, truncation, mobile, no tooltip-only critical info)
• Where in the flow and on the screen does it appear?
• Where did the user come from before this?
• What was the last action they took, and what did that UI say?
• How might the user be feeling here?]

goal:
[What is the concrete thing we want the user to do next? Action, task, or decision to complete?]
```

---

## How the transformer should use this

1. **Message** — Sets intent, emotional tone bounds, and what must land in the user’s head.
2. **Context** — Constrains wording (length, pattern, legal/trust, BJÖRN vs general voice). If the copy is BJÖRN-specific, apply `bjorn-specific-instructions.md` first where it conflicts with `style-tone-basics.md`; otherwise use `style-tone-basics.md`, plus `ui-elements.md` and `glossary.md` as relevant.
3. **Goal** — Drives the primary call-to-action, button labels, and what “done” looks like for the user.

---

## Optional: draft line to paste under your filled block

**Draft / existing copy to transform:**  
[paste rough or legacy text here]

**Output I need:**  
[e.g. one modal title + primary button + helper line / BJÖRN insight block / full paragraph]
