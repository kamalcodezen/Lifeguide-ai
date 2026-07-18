# LifeGuide AI – Design System Specification

## Version 1.0.0 (MVP)

# Official Theme Name

Aurora Blossom

Status

Approved

This document serves as the **Single Source of Truth** for all user interfaces, user experiences, and visual components within the **LifeGuide AI – Career & Learning Copilot** ecosystem. All future UI screens, components, mockups, and front-end layouts must strictly adhere to these specifications.

---

## 1. Design Philosophy

LifeGuide AI's design philosophy is centered around **"Intelligent Warmth"** and **"Luxury Minimalism"**.

Traditional career planning tools are often cluttered, stressful, and utility-driven, while AI products frequently lean into clinical, high-tech, or cyberpunk themes (neon blues, harsh glows, dark mode grids). LifeGuide AI reverses this trend by designing a digital sanctuary.

- **Calm Clarity**: We reduce cognitive load. The path to a new career is intimidating; the UI must feel like a calming workspace.
- **Soft Modernism**: We use soft curves, subtle glass layers, and generous whitespace to create a light, premium, and human-centric experience.
- **The Guided Light**: Visual pathways are illuminated through soft, warm tones (peach, warm white, and lavender) rather than high-contrast alerts or clinical grids.
- **Luxury Minimalist Execution**: Every border, shadow, and transition is executed with extreme restraint. High margins, low-opacity borders, and smooth ambient light are prioritized.

---

## 2. Brand Personality

The brand voice and identity must be communicated through every visual element. The five core brand attributes are:

| Attribute       | Visual Representation                                | UX Execution                                            |
| :-------------- | :--------------------------------------------------- | :------------------------------------------------------ |
| **Warm**        | Soft peach and pink accents, warm white canvases.    | Empathetic micro-copy, gentle loading indicators.       |
| **Calm**        | Soft lavender support colors, deep navy backgrounds. | Spacious padding, restricted animation speeds.          |
| **Trustworthy** | Precise typography alignment, structural grids.      | Clear data states, visible system statuses.             |
| **Inspiring**   | Dual-tone gradients, glowing interactive states.     | Fluid roadmap nodes, celebratory micro-interactions.    |
| **Friendly**    | Generous border radiuses, soft pill-like buttons.    | Conversational AI elements, rounded illustration style. |

---

# Official Theme Reference

Inspired by

Lunavia

This project captures

• Warm Feeling

• Soft Purple

• Premium Pink

• Peach Accent

• Luxury Minimalism

This is NOT a copy.

It is an original design system inspired by the emotional feeling of the reference.

---

## 3. Light Theme Palette

The Light Theme utilizes a warm, clean canvas with soft pastels, designed to evoke a fresh morning workspace. **All colors are defined strictly in RGBA.**

| Token                          | Semantic Name    | RGBA Value               | Usage                                             |
| :----------------------------- | :--------------- | :----------------------- | :------------------------------------------------ |
| `color-light-canvas`           | Main Background  | `rgba(253, 251, 247, 1)` | Full screen background canvas (Warm White)        |
| `color-light-surface`          | Default Surface  | `rgba(255, 255, 255, 1)` | Container background, cards, navbar, sidebar      |
| `color-light-surface-elevated` | Elevated Surface | `rgba(254, 247, 248, 1)` | Hover states, active panels, highlighted sections |
| `color-light-primary`          | Primary Purple   | `rgba(99, 74, 186, 1)`   | Primary actions, branding, key indicators         |
| `color-light-primary-hover`    | Primary Hover    | `rgba(83, 61, 160, 1)`   | Primary button hover, text link hover             |
| `color-light-secondary`        | Secondary Pink   | `rgba(235, 126, 162, 1)` | Secondary CTAs, decorative accents, indicators    |
| `color-light-accent`           | Accent Peach     | `rgba(247, 166, 131, 1)` | Highlights, onboarding nodes, progression alerts  |
| `color-light-support`          | Support Lavender | `rgba(167, 155, 224, 1)` | Secondary details, icon backing, tag categories   |
| `color-light-text-primary`     | Text Primary     | `rgba(30, 27, 46, 1)`    | Core headings, body paragraphs, label text        |
| `color-light-text-secondary`   | Text Secondary   | `rgba(90, 84, 115, 1)`   | Subtitles, helper text, system descriptions       |
| `color-light-text-muted`       | Text Muted       | `rgba(145, 138, 173, 1)` | Placeholders, disabled states, timestamps         |
| `color-light-border`           | Light Border     | `rgba(238, 235, 245, 1)` | Dividers, standard card/input borders             |
| `color-light-border-strong`    | Strong Border    | `rgba(220, 215, 232, 1)` | Focus states, active border highlights            |

---

## 4. Dark Theme Palette

The Dark Theme evokes a calm evening sanctuary. Heavy blacks and high-contrast neon accents are avoided in favor of deep navy, rich purples, and soft glowing pinks.

| Token                         | Semantic Name    | RGBA Value               | Usage                                             |
| :---------------------------- | :--------------- | :----------------------- | :------------------------------------------------ |
| `color-dark-canvas`           | Main Background  | `rgba(12, 13, 29, 1)`    | Full screen background canvas (Deep Navy)         |
| `color-dark-surface`          | Default Surface  | `rgba(20, 19, 41, 1)`    | Container background, cards, navbar, sidebar      |
| `color-dark-surface-elevated` | Elevated Surface | `rgba(28, 24, 51, 1)`    | Hover states, active panels, highlighted sections |
| `color-dark-primary`          | Primary Purple   | `rgba(147, 122, 234, 1)` | Primary actions, branding, key indicators         |
| `color-dark-primary-hover`    | Primary Hover    | `rgba(168, 146, 245, 1)` | Primary button hover, text link hover             |
| `color-dark-secondary`        | Secondary Pink   | `rgba(247, 168, 194, 1)` | Secondary CTAs, accents (Soft Pink)               |
| `color-dark-accent`           | Accent Peach     | `rgba(250, 190, 165, 1)` | Highlights, onboarding nodes, progression alerts  |
| `color-dark-support`          | Support Lavender | `rgba(197, 187, 242, 1)` | Secondary details, icon backing, tag categories   |
| `color-dark-text-primary`     | Text Primary     | `rgba(245, 244, 247, 1)` | Core headings, body paragraphs, label text        |
| `color-dark-text-secondary`   | Text Secondary   | `rgba(182, 177, 204, 1)` | Subtitles, helper text, system descriptions       |
| `color-dark-text-muted`       | Text Muted       | `rgba(132, 126, 158, 1)` | Placeholders, disabled states, timestamps         |
| `color-dark-border`           | Light Border     | `rgba(38, 35, 68, 1)`    | Dividers, standard card/input borders             |
| `color-dark-border-strong`    | Strong Border    | `rgba(55, 50, 92, 1)`    | Focus states, active border highlights            |

---

## 5. Semantic Colors

Semantic colors provide instant contextual feedback. They are designed to blend into the soft theme with reduced saturation, preventing harsh visual interruptions.

### Light Theme Semantics

- **Success**:
  - Text: `rgba(34, 139, 99, 1)`
  - Background: `rgba(235, 251, 244, 1)`
  - Border: `rgba(198, 240, 222, 1)`
- **Warning**:
  - Text: `rgba(196, 107, 5, 1)`
  - Background: `rgba(254, 245, 230, 1)`
  - Border: `rgba(250, 226, 190, 1)`
- **Danger**:
  - Text: `rgba(214, 69, 87, 1)`
  - Background: `rgba(255, 240, 242, 1)`
  - Border: `rgba(255, 217, 221, 1)`
- **Info**:
  - Text: `rgba(79, 70, 229, 1)`
  - Background: `rgba(240, 240, 255, 1)`
  - Border: `rgba(224, 224, 255, 1)`

### Dark Theme Semantics

- **Success**:
  - Text: `rgba(52, 211, 153, 1)`
  - Background: `rgba(14, 49, 39, 0.4)`
  - Border: `rgba(20, 83, 61, 0.6)`
- **Warning**:
  - Text: `rgba(245, 158, 11, 1)`
  - Background: `rgba(50, 36, 14, 0.4)`
  - Border: `rgba(92, 63, 20, 0.6)`
- **Danger**:
  - Text: `rgba(244, 114, 130, 1)`
  - Background: `rgba(54, 21, 31, 0.4)`
  - Border: `rgba(94, 30, 48, 0.6)`
- **Info**:
  - Text: `rgba(129, 140, 248, 1)`
  - Background: `rgba(24, 25, 66, 0.4)`
  - Border: `rgba(45, 48, 115, 0.6)`

---

# Theme Switching Rules

| Rule              | Value               |
| :---------------- | :------------------ |
| **Theme Modes**   | Light, Dark, System |
| **Default Theme** | System              |

---

## 6. Gradient Library

Gradients are calculated to maintain soft transitions. Solid, flat colors are used for secondary structural panels, while gradients are reserved for premium visual elements (hero states, progress tracking, primary headers).

| Gradient Name               | Light Theme CSS Definition                                                                      | Dark Theme CSS Definition                                                                     | Core Purpose                                            |
| :-------------------------- | :---------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------- | :------------------------------------------------------ |
| **Warm Dawn** (Primary)     | `linear-gradient(135deg, rgba(99, 74, 186, 1) 0%, rgba(235, 126, 162, 1) 100%)`                 | `linear-gradient(135deg, rgba(147, 122, 234, 1) 0%, rgba(247, 168, 194, 1) 100%)`             | Main call-to-actions, primary progress bar, hero nodes  |
| **Sunset Peach** (Accent)   | `linear-gradient(135deg, rgba(235, 126, 162, 1) 0%, rgba(247, 166, 131, 1) 100%)`               | `linear-gradient(135deg, rgba(247, 168, 194, 1) 0%, rgba(250, 190, 165, 1) 100%)`             | Accent highlights, completion badges, dashboard accents |
| **Lavender Mist** (Support) | `linear-gradient(135deg, rgba(167, 155, 224, 0.8) 0%, rgba(254, 237, 222, 0.8) 100%)`           | `linear-gradient(135deg, rgba(55, 50, 92, 0.6) 0%, rgba(28, 24, 51, 0.6) 100%)`               | Soft content overlays, inactive roadmap state, cards    |
| **Ambient Glow** (Radial)   | `radial-gradient(circle at top right, rgba(254, 237, 222, 0.3) 0%, rgba(253, 251, 247, 0) 70%)` | `radial-gradient(circle at top right, rgba(147, 122, 234, 0.08) 0%, rgba(12, 13, 29, 0) 65%)` | Page corner atmospheric glows, dashboard backgrounds    |

---

## 7. Typography

The typography strategy leverages **Outfit** for elegant, clean headings, and **Inter** for exceptional readability across interface layouts and body copy.

- **Primary Font Family**: `Inter, system-ui, -apple-system, sans-serif`
- **Heading Font Family**: `Outfit, Inter, system-ui, sans-serif`

### Type Scale Specification

| Size Name       | Category           | Font Family | Size (px) | Line Height | Letter Spacing | Weight           |
| :-------------- | :----------------- | :---------- | :-------- | :---------- | :------------- | :--------------- |
| **Display**     | Hero Title         | Outfit      | `44px`    | `1.2`       | `-0.02em`      | `600` (SemiBold) |
| **H1**          | Main Header        | Outfit      | `36px`    | `1.25`      | `-0.02em`      | `600` (SemiBold) |
| **H2**          | Section Header     | Outfit      | `30px`    | `1.3`       | `-0.015em`     | `500` (Medium)   |
| **H3**          | Block Title        | Outfit      | `24px`    | `1.35`      | `-0.01em`      | `500` (Medium)   |
| **H4**          | Sub-section Header | Outfit      | `20px`    | `1.4`       | `0em`          | `500` (Medium)   |
| **Body Large**  | Intro Paragraph    | Inter       | `18px`    | `1.5`       | `0em`          | `400` (Regular)  |
| **Body Medium** | Default Body Text  | Inter       | `16px`    | `1.5`       | `0em`          | `400` (Regular)  |
| **Body Small**  | Metadata / Details | Inter       | `14px`    | `1.6`       | `0.01em`       | `400` (Regular)  |
| **Caption**     | Micro Label / Help | Inter       | `12px`    | `1.6`       | `0.02em`       | `500` (Medium)   |
| **Button Text** | Component Labels   | Inter       | `14px`    | `1.0`       | `0.02em`       | `600` (SemiBold) |

---

## 8. Spacing System

LifeGuide AI runs on a strict **4px-base spacing system** to ensure mathematical layout alignment and visual rhythm.

```
4px   -->  8px   -->  12px  -->  16px  -->  20px  -->  24px  -->  32px  -->  48px  -->  64px  -->  80px  -->  128px
(xs)       (sm)       (md)       (lg)       (xl)       (2xl)      (3xl)      (4xl)      (5xl)      (6xl)      (7xl)
```

### Spacing Usage Rules

- **4px (xs)**: Padding within chips, vertical text spacing between subtitle and details.
- **8px (sm)**: Padding inside small inputs, gap between avatar and text, gap between horizontal inline tags.
- **12px (md)**: Gap between items inside dropdown lists, spacing between labels and text fields.
- **16px (lg)**: Inner padding for small cards, gap between primary dashboard widgets, margin between paragraph segments.
- **20px (xl)**: Spacing for list layouts, input field heights margins.
- **24px (2xl)**: Standard modal padding, inner padding for dashboard blocks and content wrappers.
- **32px (3xl)**: Margin between main dashboard panels, grid layout column gap.
- **48px (4xl)**: Top padding for standard page headers, layout boundaries.
- **64px (5xl)**: Hero section vertical margins, empty state graphic spacing.

---

## 9. Border Radius

A highly rounded aesthetic is required to achieve the "Soft Modern, Friendly AI" feeling. Sharp corners are strictly avoided.

| Radius Name   | Value    | Usage                                                            |
| :------------ | :------- | :--------------------------------------------------------------- |
| `radius-xs`   | `4px`    | Micro selectors, focus rings, small inline tooltips.             |
| `radius-sm`   | `8px`    | Small dropdowns, badges, tags, chip indicators.                  |
| `radius-md`   | `12px`   | Standard button layouts, text input fields, notifications.       |
| `radius-lg`   | `16px`   | Small dashboard widgets, small modals, AI dialog bubbles.        |
| `radius-xl`   | `24px`   | Standard cards, main navigation containers, large modal dialogs. |
| `radius-2xl`  | `32px`   | Primary dashboard layouts, profile panels, page-level wrappers.  |
| `radius-full` | `9999px` | User avatar rings, active toggle sliders, pill badges.           |

---

## 10. Shadow System

To achieve depth without looking heavy, shadows are highly diffused and rely on a low-opacity purple/navy ambient tint.

### Light Theme Shadows

- **Subtle (Sm)**: `0 2px 8px rgba(30, 27, 46, 0.03)`
  - _Usage_: Basic inputs, small static cards, tags.
- **Elevated (Md)**: `0 8px 24px rgba(99, 74, 186, 0.05)`
  - _Usage_: Navigation header bar, secondary cards, dropdown listings.
- **Floating (Lg)**: `0 16px 40px rgba(99, 74, 186, 0.07), 0 4px 12px rgba(30, 27, 46, 0.02)`
  - _Usage_: Overlay modals, primary toast alerts, floating menu bars.

### Dark Theme Shadows

- **Subtle (Sm)**: `0 2px 8px rgba(0, 0, 0, 0.2)`
  - _Usage_: Basic inputs, small static cards, tags.
- **Elevated (Md)**: `0 8px 24px rgba(0, 0, 0, 0.35), 0 0 2px rgba(147, 122, 234, 0.05)`
  - _Usage_: Navigation header, secondary cards, dropdown elements.
- **Floating (Lg)**: `0 16px 40px rgba(0, 0, 0, 0.5), 0 0 4px rgba(147, 122, 234, 0.1)`
  - _Usage_: Overlay modals, primary toast alerts, active menus.

---

## 11. Glass Effect Rules

Glassmorphism must be applied with extreme restraint to prevent visual clutter. Glass elements are only used for persistent, overlaying navigation panels (navbar, sidebar) and floating menus.

```css
/* Core Styling Rules for Light Glass Container */
.glass-container-light {
  background-color: rgba(255, 255, 255, 0.45);
  backdrop-filter: blur(16px) saturate(110%);
  -webkit-backdrop-filter: blur(16px) saturate(110%);
  border: 1px solid rgba(238, 235, 245, 0.5);
  box-shadow: 0 8px 32px rgba(99, 74, 186, 0.03);
}

/* Core Styling Rules for Dark Glass Container */
.glass-container-dark {
  background-color: rgba(20, 19, 41, 0.45);
  backdrop-filter: blur(16px) saturate(110%);
  -webkit-backdrop-filter: blur(16px) saturate(110%);
  border: 1px solid rgba(55, 50, 92, 0.3);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
}
```

---

# Global Component State Rule

Every interactive component must define:

- **Default**
- **Hover**
- **Focus**
- **Active**
- **Disabled**
- **Loading**

No component is allowed to skip these states.

---

## 12. Buttons

Buttons utilize standard heights of **44px** (large layout actions) and **36px** (secondary, inline container adjustments). Text within buttons is centered, using `font-weight: 600`.

### Button Styles & State Matrix

```
[ Primary (Warm Dawn Gradient) ]   [ Secondary (Border Outline) ]   [ Ghost / Text Button ]
```

| Type          | Theme | Default                                                                                                    | Hover                                                                                                     | Active / Click                                            | Disabled                                                                                                     |
| :------------ | :---- | :--------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------- |
| **Primary**   | Light | Bg: `Warm Dawn Gradient`<br>Text: `rgba(255, 255, 255, 1)`                                                 | Bg: `Warm Dawn Gradient`<br>Opacity: `0.9`<br>Scale: `1.01`                                               | Bg: `Warm Dawn Gradient`<br>Opacity: `1`<br>Scale: `0.98` | Bg: `rgba(238, 235, 245, 1)`<br>Text: `rgba(145, 138, 173, 1)`                                               |
|               | Dark  | Bg: `Warm Dawn Gradient`<br>Text: `rgba(12, 13, 29, 1)`                                                    | Bg: `Warm Dawn Gradient`<br>Opacity: `0.9`<br>Scale: `1.01`                                               | Bg: `Warm Dawn Gradient`<br>Opacity: `1`<br>Scale: `0.98` | Bg: `rgba(38, 35, 68, 1)`<br>Text: `rgba(132, 126, 158, 1)`                                                  |
| **Secondary** | Light | Bg: `rgba(255, 255, 255, 1)`<br>Border: `1px solid rgba(220, 215, 232, 1)`<br>Text: `rgba(99, 74, 186, 1)` | Bg: `rgba(254, 247, 248, 1)`<br>Border: `1px solid rgba(99, 74, 186, 1)`<br>Text: `rgba(99, 74, 186, 1)`  | Bg: `rgba(238, 235, 245, 1)`<br>Scale: `0.98`             | Bg: `rgba(255, 255, 255, 1)`<br>Border: `1px solid rgba(238, 235, 245, 1)`<br>Text: `rgba(145, 138, 173, 1)` |
|               | Dark  | Bg: `rgba(20, 19, 41, 1)`<br>Border: `1px solid rgba(55, 50, 92, 1)`<br>Text: `rgba(197, 187, 242, 1)`     | Bg: `rgba(28, 24, 51, 1)`<br>Border: `1px solid rgba(147, 122, 234, 1)`<br>Text: `rgba(147, 122, 234, 1)` | Bg: `rgba(38, 35, 68, 1)`<br>Scale: `0.98`                | Bg: `rgba(20, 19, 41, 1)`<br>Border: `1px solid rgba(38, 35, 68, 1)`<br>Text: `rgba(132, 126, 158, 1)`       |
| **Ghost**     | Light | Bg: `transparent`<br>Text: `rgba(90, 84, 115, 1)`                                                          | Bg: `rgba(238, 235, 245, 0.4)`<br>Text: `rgba(99, 74, 186, 1)`                                            | Bg: `rgba(238, 235, 245, 0.8)`                            | Bg: `transparent`<br>Text: `rgba(145, 138, 173, 1)`                                                          |
|               | Dark  | Bg: `transparent`<br>Text: `rgba(182, 177, 204, 1)`                                                        | Bg: `rgba(28, 24, 51, 0.4)`<br>Text: `rgba(197, 187, 242, 1)`                                             | Bg: `rgba(28, 24, 51, 0.8)`                               | Bg: `transparent`<br>Text: `rgba(132, 126, 158, 1)`                                                          |
| **Danger**    | Light | Bg: `rgba(255, 240, 242, 1)`<br>Text: `rgba(214, 69, 87, 1)`<br>Border: `1px solid rgba(255, 217, 221, 1)` | Bg: `rgba(214, 69, 87, 1)`<br>Text: `rgba(255, 255, 255, 1)`                                              | Bg: `rgba(185, 48, 64, 1)`                                | Bg: `rgba(238, 235, 245, 1)`<br>Text: `rgba(145, 138, 173, 1)`                                               |
|               | Dark  | Bg: `rgba(54, 21, 31, 0.4)`<br>Text: `rgba(244, 114, 130, 1)`<br>Border: `1px solid rgba(94, 30, 48, 0.6)` | Bg: `rgba(244, 114, 130, 1)`<br>Text: `rgba(12, 13, 29, 1)`                                               | Bg: `rgba(214, 85, 100, 1)`                               | Bg: `rgba(38, 35, 68, 1)`<br>Text: `rgba(132, 126, 158, 1)`                                                  |

---

## 13. Inputs

Input containers are standard **40px** tall, matching secondary button layouts for visual consistency.

- **Structure**: 12px horizontal padding, 10px (`radius-md`) corner rounding.
- **Typography**: Inter, 14px size, weight 400.

### Input State Specs

| State        | Light Theme Styling                                                                                       | Dark Theme Styling                                                                                     |
| :----------- | :-------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------- |
| **Default**  | Bg: `rgba(255, 255, 255, 1)`<br>Border: `1px solid rgba(238, 235, 245, 1)`<br>Text: `rgba(30, 27, 46, 1)` | Bg: `rgba(20, 19, 41, 1)`<br>Border: `1px solid rgba(38, 35, 68, 1)`<br>Text: `rgba(245, 244, 247, 1)` |
| **Hover**    | Border: `1px solid rgba(220, 215, 232, 1)`                                                                | Border: `1px solid rgba(55, 50, 92, 1)`                                                                |
| **Focus**    | Border: `1px solid rgba(99, 74, 186, 1)`<br>Shadow: `0 0 0 3px rgba(99, 74, 186, 0.12)`                   | Border: `1px solid rgba(147, 122, 234, 1)`<br>Shadow: `0 0 0 3px rgba(147, 122, 234, 0.15)`            |
| **Filled**   | Bg: `rgba(255, 255, 255, 1)`                                                                              | Bg: `rgba(20, 19, 41, 1)`                                                                              |
| **Error**    | Border: `1px solid rgba(214, 69, 87, 1)`<br>Shadow: `0 0 0 3px rgba(214, 69, 87, 0.1)`                    | Border: `1px solid rgba(244, 114, 130, 1)`<br>Shadow: `0 0 0 3px rgba(244, 114, 130, 0.15)`            |
| **Disabled** | Bg: `rgba(253, 251, 247, 1)`<br>Text: `rgba(145, 138, 173, 1)`                                            | Bg: `rgba(12, 13, 29, 1)`<br>Text: `rgba(132, 126, 158, 1)`                                            |

---

## 14. Cards

Cards are the default layout block container for displaying features, assessment details, and modules.

- **Structure**: Padding of `24px` (lg), rounded corners of `24px` (radius-xl).
- **Border**: `1px solid` border using token light border colors.
- **Shadow**: Default Subtle (Sm) shadow.

### Container card layout

```
+------------------------------------------------------+
|  [Icon/Badge]  Header Text (H3)                      |
|  Secondary Description (Body Small)                  |
|  --------------------------------------------------  |
|  Content Workspace Area                              |
|  --------------------------------------------------  |
|                                     [Action Button]  |
+------------------------------------------------------+
```

### Hover Interactions (Cards)

On hover, cards must softly lift to signal interactivity:

- **Transformation**: `translateY(-3px)` transition over 250ms with ease-out curve.
- **Shadow Transition**: Shifts from Subtle (Sm) shadow to Elevated (Md) shadow.
- **Border Change**: Border shifts to strong border token value.

---

## 15. Badges

Badges display minor statuses, system states, or category links. They are non-interactive and compact.

- **Structure**: 4px vertical padding, 10px horizontal padding, `radius-full` (pill shape).
- **Typography**: Inter, 12px (Caption size), weight 600.

### Badge Style Index

| Variant                | Light Theme Styling                                            | Dark Theme Styling                                                |
| :--------------------- | :------------------------------------------------------------- | :---------------------------------------------------------------- |
| **Default/System**     | Bg: `rgba(238, 235, 245, 0.8)`<br>Text: `rgba(90, 84, 115, 1)` | Bg: `rgba(38, 35, 68, 0.8)`<br>Text: `rgba(182, 177, 204, 1)`     |
| **Active/Primary**     | Bg: `rgba(99, 74, 186, 0.1)`<br>Text: `rgba(99, 74, 186, 1)`   | Bg: `rgba(147, 122, 234, 0.15)`<br>Text: `rgba(197, 187, 242, 1)` |
| **AI Assessment**      | Bg: `rgba(255, 240, 243, 1)`<br>Text: `rgba(235, 126, 162, 1)` | Bg: `rgba(54, 21, 31, 0.5)`<br>Text: `rgba(247, 168, 194, 1)`     |
| **Milestone Complete** | Bg: `rgba(254, 237, 222, 1)`<br>Text: `rgba(247, 166, 131, 1)` | Bg: `rgba(50, 36, 14, 0.5)`<br>Text: `rgba(250, 190, 165, 1)`     |

---

## 16. Chips

Chips are small, interactive elements that allow filtering, category selection, or token input removal.

- **Structure**: Height `32px`. Padding 6px vertical, 12px horizontal, `radius-sm` (8px).
- **Typography**: Inter, 13px, weight 500.

### Chip Interactions & States

| State                  | Light Theme UI                                                             | Dark Theme UI                                                             |
| :--------------------- | :------------------------------------------------------------------------- | :------------------------------------------------------------------------ |
| **Default/Unselected** | Bg: `rgba(255, 255, 255, 1)`<br>Border: `1px solid rgba(220, 215, 232, 1)` | Bg: `rgba(20, 19, 41, 1)`<br>Border: `1px solid rgba(55, 50, 92, 1)`      |
| **Hover**              | Bg: `rgba(254, 247, 248, 1)`<br>Border: `1px solid rgba(99, 74, 186, 0.5)` | Bg: `rgba(28, 24, 51, 1)`<br>Border: `1px solid rgba(147, 122, 234, 0.5)` |
| **Selected**           | Bg: `rgba(99, 74, 186, 1)`<br>Text: `rgba(255, 255, 255, 1)`               | Bg: `rgba(147, 122, 234, 1)`<br>Text: `rgba(12, 13, 29, 1)`               |
| **With Close Button**  | 4px right padding to give space to the cross icon.                         | 4px right padding.                                                        |

---

## 17. Navbar

The primary navigation bar anchors the page layout. It is sticky, sits at the top of the viewport, and utilizes the glass effect rules.

- **Structure**: Height `72px`, horizontal padding `32px` (2xl).
- **Aesthetic**: Light/Dark Glass containers. Saturation boost is applied to prevent main page canvas colors from looking dull under the blur.
- **Border**: Bottom border only: `1px solid` (`color-border`).

```
+-------------------------------------------------------------------------+
|  [Logo] LifeGuide AI  |  Dashboard  Explore  My Roadmap     [Avatar]  |
+-------------------------------------------------------------------------+
```

### Layout Alignment

- **Left Section**: Brand logo mark and title.
- **Middle Section**: Navigation tabs, centered spacing, hover-activated lines.
- **Right Section**: Theme switcher, global notifications, user profile menu.

---

## 18. Sidebar

The Sidebar navigation is used exclusively for protected dashboard areas. It provides access to sub-features (roadmaps, skill assessment tests, settings).

- **Structure**: Width `260px` expanded, `80px` collapsed. Inner padding `20px` (xl).
- **Aesthetic**: Semi-opaque backing.
  - Light: `rgba(255, 255, 255, 0.8)` / Dark: `rgba(20, 19, 41, 0.8)`
- **Items Layout**: Vertical list, 12px gap between items.

### Active/Hover Item Rules

- **Hover**: Active background overlay changes to elevated surface color, label changes to text primary.
- **Active Selection**: Background overlay transitions to primary purple color at `0.08` opacity. A vertical indicator bar `3px` wide is displayed on the left edge using the solid primary purple color.

---

## 19. Dashboard Cards

Dashboard Cards display summary widgets, metrics, quick action prompts, and real-time user statistics.

- **Structure**: Padding `20px` (xl), `radius-lg` (16px).

### Metric Card Layout

```
+-----------------------------+
| Active Skill Assessment     | <- Title (Body Small)
| 78%                         | <- Metric (Display / H1)
| [^^ +4% since yesterday]    | <- Trend Indicator (Green Tag)
+-----------------------------+
```

### Style Specifications

- **Header Icon Area**: Placed in top right, contained within a circle `36px` diameter using support lavender color at `0.1` opacity.
- **Trend Indicator**: Semantic badge layout (Success/Green or Info/Blue) sitting below the primary metric value.

---

## 20. AI Components

AI Components have a distinct visual language to signal AI-generated insights, assistance, and custom roadmaps.

```
+------------------------------------------------------------+
| AI SUGGESTION                                              |
| "Based on your assessment, we recommend focusing on..."    |
| [ Add to Roadmap ]                       [ Regenerate ]    |
+------------------------------------------------------------+
```

### AI Co-Pilot Container (Roadmaps)

- **Background**: Dual-gradient border using **Warm Dawn Gradient** overlaid on a solid surface card, creating a subtle outer border glow.
- **Inner Glow**: Soft interior ambient shadow.
  - Light: `box-shadow: inset 0 0 16px rgba(235, 126, 162, 0.04)`
  - Dark: `box-shadow: inset 0 0 16px rgba(247, 168, 194, 0.08)`
- **Header Flag**: "AI Assessment Insights" in uppercase 10px tracking `0.05em` using secondary pink color.

### Roadmap Node Connecting Lines

- Roadmap path points are connected via soft dotted lines.
- **Stroke Width**: `3px` dotted vector path.
- **Completed Nodes**: Highlighted with a primary purple gradient stroke.
- **Locked Nodes**: Grayed out with support lavender at `0.3` opacity.

---

## 21. Forms

Forms organize inputs, selections, checkboxes, and buttons cleanly to guide user entries.

- **Form Group Spacing**: Form elements are separated vertically by `20px` (xl).
- **Labels**: Displayed in `Body Small` text (Medium weight) sitting `8px` above input fields.
- **Helper Texts**: Displayed in `Caption` size, text-muted color.
- **Validation Placement**: Error messages are placed directly below the field, using Danger semantic text. The input border transitions to semantic Danger red.

---

## 22. Modal

Modals act as overlay dialogs for actions like confirming module choices or completing skills tests.

```
+----------------------------------------+
|                                    (X) | <- Close Button
|  Assessment Details (H2)               |
|  Are you sure you want to finish...?    |
|                                        |
|  [ Cancel (Ghost) ]    [ Confirm (Pri) ]|
+----------------------------------------+
```

- **Backdrop Overlay**: Background color is Deep Navy `rgba(12, 13, 29, 0.4)` combined with backdrop-filter blur `8px`.
- **Modal Container Size**: Max-width `540px` (standard dialog), `640px` (onboarding modules).
- **Layout Radius**: `24px` (radius-xl).
- **Padding**: `32px` (3xl) for spacing.

---

## 23. Dropdown

Dropdown lists are used for category selection, settings menus, and user profiles.

- **Structure**: Rendered floating above page elements. Inner padding `8px` (sm), `radius-lg` (16px).
- **Shadow**: Floating (Lg) shadow system token.
- **Separator Lines**: `1px` border using light border color.
- **Items Padding**: `10px` vertical, `14px` horizontal, using `radius-sm` (8px) roundings on item hovers.

---

## 24. Tooltip

Tooltips provide helper descriptions on hover over icon buttons or assessment metrics.

- **Structure**: Padding 6px vertical, 10px horizontal, `radius-sm` (8px).
- **Typography**: Inter, 12px (Caption), weight 500.
- **Color specs**:
  - Light Mode: Background `rgba(30, 27, 46, 0.95)`, Text `rgba(255, 255, 255, 1)`.
  - Dark Mode: Background `rgba(255, 255, 255, 0.95)`, Text `rgba(12, 13, 29, 1)`.
- **Trigger delays**: Delay on hover: `300ms`, fade-in duration: `150ms`.

---

## 25. Toast

Toast messages notify users of actions like roadmap steps completed or saved assessment profiles.

```
+---------------------------------------------------+
| (Checkmark-Icon) Milestone saved!            (X)  |
+---------------------------------------------------+
```

- **Structure**: Bottom-right floating card, height `48px`, width `320px`, padding `16px`, `radius-md` (12px).
- **Shadow**: Floating (Lg) shadow system token.
- **Entrance Animation**: Translates up from bottom-right boundary, duration `250ms` using elastic curve.

---

## 26. Loading States

To maintain a calm user experience, loading states are smooth and prevent sudden page layout shifts.

- **Skeleton Blocks**: Rounded grey blocks utilizing an infinite shimmer gradient sweep.
  - Light Shimmer: `linear-gradient(90deg, rgba(238, 235, 245, 0.8) 0%, rgba(247, 244, 252, 0.8) 50%, rgba(238, 235, 245, 0.8) 100%)`
  - Dark Shimmer: `linear-gradient(90deg, rgba(28, 24, 51, 0.8) 0%, rgba(38, 35, 68, 0.8) 50%, rgba(28, 24, 51, 0.8) 100%)`
- **Pulse Indicators**: Soft, slow pulsation of components (`opacity` shifts from `0.4` to `0.8` using `ease-in-out` curve over `1.8s`).

---

## 27. Empty States

Empty states guide users when a screen has no content (e.g., no active career path selected).

- **Content Alignment**: Perfectly centered vertically and horizontally.
- **Graphic Placeholder**: Soft rounded illustration, max size `180px` height.
- **Title/Text**: H3 header style followed by subtitle text-muted.
- **CTA Placement**: Primary action button sits `24px` directly below helper description.

---

## 28. Animation Rules

Animations must look fluid, intentional, and slow down user interactions to feel peaceful.

- **Pulsations**: Used for active/loading states only. Scale amplitude limited to `1.02` max.
- **Fade-Ins**: Page entry transitions use a combined scale and opacity shift (starts at scale `0.98`, opacity `0`).
- **Roadmap Unlock Celebrations**: Mild particle explosions with soft peach and pink circles (no neon colors).

---

## 29. Transition Timing

Standard transition variables defined to ensure consistent animations.

| Variable Name       | Duration | Cubic Bezier Curve                            | Usage                                                 |
| :------------------ | :------- | :-------------------------------------------- | :---------------------------------------------------- |
| `transition-fast`   | `150ms`  | `cubic-bezier(0.4, 0, 0.2, 1)` (Ease)         | Tooltips, icon transitions, button color changes      |
| `transition-normal` | `250ms`  | `cubic-bezier(0.16, 1, 0.3, 1)` (Out-Expo)    | Dropdown reveal, sidebars, active chip shifts         |
| `transition-slow`   | `400ms`  | `cubic-bezier(0.34, 1.56, 0.64, 1)` (Elastic) | Modal entries, primary roadmap node completion pulses |

---

# Motion Rules

| Property             | Behavior / Value |
| :------------------- | :--------------- |
| **Hover Scale**      | 1.02             |
| **Card Lift**        | -4px             |
| **Button Press**     | 0.98             |
| **Modal**            | Spring Animation |
| **Drawer**           | Slide Animation  |
| **Toast**            | Bottom Right     |
| **Default Duration** | 250ms            |

---

## 30. Icon Style

Icons must align with the "Soft, Friendly, Premium" visual tone.

- **Style Rules**: Duotone or Outline styles.
- **Strokes**: Standard `2px` width, with rounded caps (`stroke-linecap: round`, `stroke-linejoin: round`).
- **Sizing**: Fixed grid sizing of `20px` (standard buttons), `24px` (navbars/sidebar headers).
- **Primary Icon Library**: Lucide Icons or Feather Icons.

---

## 31. Illustration Style

Illustrations are used for empty states, onboarding steps, and hero backgrounds.

- **Visual Direction**: Abstract geometric shapes with heavy gradients, soft blurs, and noise texture overlays.
- **Colors**: Lavender, pink, and peach (Light theme) or navy/plum base with pink accents (Dark theme).
- **Forbidden Styles**: Character cartoons, sharp flat vectors, or saturated corporate memes.

---

## 32. Responsive Breakpoints

Visual containers scale smoothly across the following screen size thresholds:

| Breakpoint Name     | Width Threshold      | Layout Adjustments                                                    |
| :------------------ | :------------------- | :-------------------------------------------------------------------- |
| **Mobile (xs/sm)**  | `< 640px`            | 1-column layouts, hidden sidebar, navigation drawer enabled.          |
| **Tablet (md)**     | `640px` to `1024px`  | Sidebar transitions to icon-only, main margins reduced to 16px.       |
| **Desktop (lg)**    | `1024px` to `1440px` | Standard full sidebar (260px), 3-column dashboard grids.              |
| **Widescreen (xl)** | `> 1440px`           | Maximum container width constraint of `1360px` to prevent stretching. |

---

## 33. Accessibility

LifeGuide AI is committed to AA standards, providing a readable experience for all career paths.

- **Contrast Ratio**: All text styles must pass WCAG AA (4.5:1 ratio for regular text, 3:1 for large text).
- **Focus Rings**: Visible focus rings must display on keyboard focus using primary color.
  - CSS: `outline: 2px solid var(--color-primary-strong); outline-offset: 2px;`
- **Screen Reader Semantics**: All buttons, links, and forms require explicit `aria-label` tags.

---

## 34. Design Tokens

Key design system values, centralized to enforce design system consistency.

```json
{
  "spacing": {
    "xs": "4px",
    "sm": "8px",
    "md": "12px",
    "lg": "16px",
    "xl": "20px",
    "2xl": "24px",
    "3xl": "32px",
    "4xl": "48px"
  },
  "radius": {
    "xs": "4px",
    "sm": "8px",
    "md": "12px",
    "lg": "16px",
    "xl": "24px",
    "full": "9999px"
  },
  "font-weight": {
    "light": "300",
    "regular": "400",
    "medium": "500",
    "semibold": "600",
    "bold": "700"
  }
}
```

---

## 35. CSS Variable Naming

Global variables must follow this syntax to separate theme palettes from fixed semantic values:

```css
:root {
  /* Palette Tokens - Base */
  --color-primary-rgba: 99, 74, 186;
  --color-secondary-rgba: 235, 126, 162;
  --color-accent-rgba: 247, 166, 131;
  --color-support-rgba: 167, 155, 224;

  /* Theme Canvas */
  --color-bg-canvas: rgba(253, 251, 247, 1);
  --color-bg-surface: rgba(255, 255, 255, 1);
  --color-bg-surface-elevated: rgba(254, 247, 248, 1);

  /* Borders & Separation */
  --color-border: rgba(238, 235, 245, 1);
  --color-border-strong: rgba(220, 215, 232, 1);

  /* Typography Colors */
  --color-text-primary: rgba(30, 27, 46, 1);
  --color-text-secondary: rgba(90, 84, 115, 1);
  --color-text-muted: rgba(145, 138, 173, 1);

  /* Layout Radius */
  --radius-xs: 4px;
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 24px;
}
```

---

## 36. Tailwind Token Naming

When configuring `tailwind.config.js`, variables must extend the default system structure.

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        lifeguide: {
          canvas: "rgba(var(--color-bg-canvas-raw), <alpha-value>)",
          surface: "rgba(var(--color-bg-surface-raw), <alpha-value>)",
          primary: "rgba(var(--color-primary-raw), <alpha-value>)",
          secondary: "rgba(var(--color-secondary-raw), <alpha-value>)",
          accent: "rgba(var(--color-accent-raw), <alpha-value>)",
          support: "rgba(var(--color-support-raw), <alpha-value>)",
          border: "rgba(var(--color-border-raw), <alpha-value>)",
        },
      },
      borderRadius: {
        "lg-card": "24px",
        "md-input": "12px",
      },
    },
  },
};
```

---

## 37. Component Naming Rules

For consistent developer hands-off, standard naming rules are defined.

- **File Naming (Components)**: PascalCase (e.g., `AssessmentCard.tsx`, `RoadmapTimeline.tsx`).
- **CSS Class Prefix**: `lg-` prefix on all standard components (e.g., `.lg-button-primary`, `.lg-nav-bar`).
- **Directory Structure**:
  ```
  src/
  └── components/
      ├── ui/          <- Atomic components (buttons, input fields, badges)
      ├── layout/      <- Navigation containers (navbar, side navigation)
      └── dashboard/   <- Feature components (assessment blocks, roadmaps)
  ```

---

## 38. UI Consistency Rules

To prevent code drift and layout inconsistency:

- **Grid Framework**: All content layouts must reside inside a 12-column grid. Column gap must always map to spacing token `32px` (3xl).
- **Vertical Rhythm**: Standard block components must utilize bottom margins matching spacing token `24px` (2xl).
- **No Ad-Hoc Styling**: Custom margin, padding, or colors inside components is forbidden. Developers must reuse the spacing and design token catalog values.

---

## 39. Do & Don't

A set of concrete styling scenarios to keep the interface consistent:

- **DO**:
  - Do use `rgba(253, 251, 247, 1)` (warm white) for light background canvasses.
  - Do use a backdrop blur of `16px` on overlay navigation bars (navbar/sidebar).
  - Do combine rounded borders of `24px` on dashboard modules.
  - Do display user progress paths using dotted connecting lines.
- **DON'T**:
  - Don't use neon green for positive status indicators; use desaturated emerald `rgba(34, 139, 99, 1)`.
  - Don't apply heavy drop shadows with high opacity; keep shadows soft and ambient.
  - Don't insert custom spacing values like `15px` or `23px`; stick to the 4px scale.
  - Don't use flat primary colors for CTA button designs; use the Warm Dawn Gradient.

---

## 40. Final Design Principles

These visual tenets guide all future UI screen developments:

1.  **AI as a Supportive Companion**: The AI must feel like a friendly, calm guide, not a futuristic controller. This is communicated through gentle warm white backdrops and rounded card outlines.
2.  **Generous Space, Focused Work**: Visual complexity is reduced by providing generous margins (24px to 32px gap scales). A clean interface helps the user think clearly about their career options.
3.  **Quiet Premium Detail**: Luxury is defined by the precision of minor elements—subtle glass borders, custom vector lines, and carefully timed micro-interactions.
