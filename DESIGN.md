# Design System Specification: The Architectural Minimalist

## 1. Overview & Creative North Star

### The Creative North Star: "Precision Fluidity"

This design system moves beyond the standard "SaaS-in-a-box" aesthetic. Our objective is to create a digital environment that feels like a high-end architectural firm: structured, airy, and undeniably premium. We achieve this by rejecting the rigid "box-and-border" mentality.

Instead of traditional grids, we utilize **Intentional Asymmetry** and **Tonal Depth**. By overlapping elements and utilizing a sophisticated scale of surface levels, we create a sense of curated space. The goal is to make the user feel they are navigating a physical gallery of services, where the interface recedes to let the content lead.

---

## 2. Colors & Surface Philosophy

The palette is a sophisticated interplay of high-performance blues and atmospheric neutrals.

### The "No-Line" Rule

**Borders are a failure of hierarchy.** Within this system, 1px solid borders for sectioning are strictly prohibited. Boundaries must be defined solely through background color shifts. Use `surface-container-low` for large section blocks sitting on a `surface` background to create natural, soft-edge transitions.

### Surface Hierarchy & Nesting

Treat the UI as a series of physical layers. We use the Material surface tiers to define importance:

- **Base Layer:** `surface` (#f8f9ff) – The expansive canvas.
- **Sectioning:** `surface-container-low` (#eff4ff) – Use for subtle grouping of related content.
- **Interactive Cards:** `surface-container-lowest` (#ffffff) – These "pop" against the lower tiers.
- **Elevated Overlays:** `surface-container-highest` (#d3e4fe) – Reserved for navigation or critical modals.

### The "Glass & Gradient" Rule

To add "soul" to the tech-focused aesthetic:

- **Glassmorphism:** For floating headers or sidebars, use `surface` with 80% opacity and a `20px` backdrop-blur.
- **Signature Textures:** Main CTAs and Hero backgrounds should utilize a subtle linear gradient (135°) from `on-primary-container` (#7671ff) to `primary_container` (#0f0069). This prevents the "flat" look and adds professional dimension.

---

## 3. Typography

We utilize **Inter** across the board, but we treat it with editorial intent.

- **Display Scale (`display-lg` to `display-sm`):** These are the "voice" of the brand. Use tight letter-spacing (-0.02em) and heavy weights to create a sense of authority.
- **Headline & Title:** Use `headline-lg` (#0b1c30) for major entry points. Contrast these with `title-sm` in `secondary` (#515f74) for sub-headers to create a clear "read-next" path.
- **Body & Labels:** `body-md` is our workhorse. We prioritize legibility by using `on_surface_variant` (#45464d) for long-form text, ensuring the contrast is accessible but softer than pure black to reduce eye strain.

---

## 4. Elevation & Depth

Depth is a function of light and layering, not artificial lines.

### The Layering Principle

Stacking tiers is our primary method of elevation.

- _Example:_ Place a `surface-container-lowest` card on top of a `surface-container-low` background. This creates a "lift" of `0.5rem` (Spacing 1.5) without a single pixel of shadow.

### Ambient Shadows

When an element must float (e.g., a dropdown or a primary card), use **Ambient Shadows**:

- **Color:** Use `on-surface` (#0b1c30) at 6% opacity.
- **Blur:** Large values (e.g., `40px` to `60px`).
- **Offset:** Only Y-axis (`8px` to `12px`). This mimics soft overhead gallery lighting.

### The "Ghost Border" Fallback

If accessibility requires a container boundary, use a **Ghost Border**: `outline-variant` (#c6c6cd) at 15% opacity. Never use 100% opacity.

---

## 5. Components

### Buttons (The "Electric" Accent)

- **Primary:** Background: Linear Gradient (Electric Indigo transition); Text: `on_primary`. Shape: `md` (0.75rem).
- **Secondary:** Background: `secondary_container`; Text: `on_secondary_container`. No border.
- **Tertiary:** Text-only in `on_tertiary_fixed_variant` (#005049) for a sophisticated teal-tech look.

### Cards & Lists

- **Rule:** **No Divider Lines.**
- Use Spacing `8` (2.75rem) to separate list items.
- For cards, use `roundedness-lg` (1rem) and the **Layering Principle** (background color shifts) to define the card area.

### Input Fields

- **Default State:** `surface-container-lowest` background with a `Ghost Border`.
- **Focus State:** Increase border opacity to 40% and add a `2px` glow using `surface_tint`.
- **Labels:** Always use `label-md` in `on_surface_variant`, positioned `0.7rem` (Spacing 2) above the field.

### Signature Component: The "Service Tile"

A large-format card (300px+ height) using `tertiary_container` (#00201d) with an icon in `tertiary_fixed` (#89f5e7). This creates a high-contrast, "tech-noir" moment within the otherwise bright interface.

---

## 6. Do’s and Don’ts

### Do:

- **Do** embrace negative space. If a section feels crowded, increase the padding to `20` (7rem).
- **Do** use asymmetrical layouts. A 2-column grid where the left column is 40% width and the right is 60% creates a modern, editorial feel.
- **Do** use the `full` (9999px) roundedness for Chips and Tags to contrast against the `lg` card corners.

### Don’t:

- **Don't** use pure black (#000000) for text. Use `on_surface` (#0b1c30) to maintain tonal harmony with the blues.
- **Don't** use standard "Drop Shadows." If it looks like a default CSS shadow, it’s too heavy.
- **Don't** use dividers. Use a background color change from `surface` to `surface-container-low` to signal a new section.
