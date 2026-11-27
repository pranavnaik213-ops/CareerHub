---
name: unslop
description: >-
  Systematically refactors vibecoded, generic AI-generated user interfaces into clean,
  distinctive, human-crafted interfaces. Audits for AI tells, proposes a 5-line creative
  direction, and executes 9 sequential revision passes (Spacing, Color, Icons, Copy,
  Typography, Layout, Details, Visuals, Motion).
---

# Unslop Skill Guide

`unslop` is an agent skill created by Damir Sokolovsky (`@heydamir`) for refactoring generic AI-generated interfaces into refined, deliberate, production-grade products.

## The Telltale Signs of AI Slop
AI-generated code frequently suffers from predictable tropes:
- **Color**: Gratuitous purple/violet/indigo gradients, gradient text (`bg-clip-text text-transparent`), neon glows, floating blurred gradient orbs/blobs.
- **Icons**: Emoji labels, sparkle icons (`✨`), rocket emojis (`🚀`), inconsistent icon sets and mismatched stroke weights.
- **Copy**: Empty hype phrases ("Supercharge your workflow", "The Future of X", "AI-Powered Magic!"), exclamation marks, shouty uppercase labels.
- **Spacing**: Inconsistent, arbitrary padding and margins (e.g. `p-[17px]`, `mt-[13px]`) breaking the 4px/8px grid.
- **Typography**: Universal bold/extrabold, lack of typographic scale, raw numbers without `tabular-nums` or monospace alignment.
- **Radii**: Slapping `rounded-full` or `rounded-3xl` uniformly everywhere without nested radius proportion (`outer_radius - padding = inner_radius`).
- **Motion**: Blanket `transition-all` on every element, gratuitous pulse or bounce animations.

## The Unslop Process

### Phase 1: Audit
Inspect the target views and list every specific AI slop indicator present in the code.

### Phase 2: Creative Direction (5 Lines)
Formulate a strict, concise creative direction tailored to the real domain:
1. **Character**: What real-world world-class product does this resemble? (e.g., Linear, Stripe, GitHub, Vercel)
2. **Tone**: Editorial tone (e.g., High-contrast, dense, technical, disciplined)
3. **Palette**: Neutral anchor + single functional accent + semantic indicators
4. **Signature Details**: Micro-interactions, crisp 1px borders, subtle hover outlines
5. **Anti-Patterns**: Explicitly banned tropes (no violet/purple gradients, no emoji labels, no decorative blur blobs)

### Phase 3: The 9 Ordered Passes

1. **Pass 1 — Spacing**: Enforce a strict 4px/8px grid system (`p-4`, `p-6`, `gap-3`, `gap-4`). Remove arbitrary padding/margin classes.
2. **Pass 2 — Color**: Strip out neon gradients, glowing rings, and violet/indigo clutter. Unify to a solid dark neutral scale (`#090d16`, `slate-950`, `slate-900`, `slate-800`, `slate-700`) with a single high-trust functional accent (e.g., `#2563eb` electric blue) and purposeful semantic states (`emerald` success, `rose` destructive, `amber` warning).
3. **Pass 3 — Icons**: Standardize on Lucide icons with uniform sizing (`w-4 h-4`, `w-3.5 h-3.5`). Replace all emoji badges, `✨`, `✕`, and `✓` characters with clean SVG icons (`Check`, `X`, `Sparkles` only when functional).
4. **Pass 4 — Copy**: Eliminate conversational filler, hype claims, and exclamation marks. Write concise, precise, production-grade copy.
5. **Pass 5 — Typography**: Refine weights (400 regular, 500 medium, 600 semibold). Use `font-mono tabular-nums` for financial numbers, percentages, and metrics.
6. **Pass 6 — Layout**: Align visual hierarchy, fix column widths, remove awkward clipping and overflow.
7. **Pass 7 — Details**: Apply nested border-radii (`inner = outer - padding`). Ensure crisp 1px borders and accessible `focus-visible:ring-2 focus-visible:ring-blue-500` focus states.
8. **Pass 8 — Visuals**: Eliminate decorative background blur orbs and artificial gradients. Let structured content, real data, and authentic branding drive the design.
9. **Pass 9 — Motion**: Remove blanket `transition-all`. Use targeted `transition-colors duration-150` and functional micro-transitions.
