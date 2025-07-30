[Table of Contents](../../toc.md)

# Rate - Control Component

## Overview
This section provides a concise overview of the **Rate** component. The rating control is your go-to for letting users quickly rate something—think stars, hearts, or any custom icon you want. It’s interactive, visually engaging, and perfect for feedback, reviews, or just letting people show some love. It allows users to select a value up to a defined maximum, using a configurable icon.

## Properties
This section details all the configurable properties (props) that the **Rate** component accepts.

| Name     | Description                                                                                             | Possible Values                                    | Default Setting |
| :------- | :------------------------------------------------------------------------------------------------------ | :------------------------------------------------- | :-------------- |
| `value`  | The current rating value selected by the user or set programmatically.                                  | `number` (e.g., 0, 1, 2, 3, 4, 5)                  | `0`             |
| `max`    | The maximum possible rating value that can be selected.                                                 | `number` (e.g., 5, 10)                             | `5`             |
| `icon`   | The icon used to represent each rating unit. This can be a string representing an icon name or a React component. | `React.ReactNode` (e.g., `"star"`, `"heart"`)      | `"star"`        |
| `disabled`| Controls whether the rating control is interactive or read-only. If `true`, users cannot change the rating. | `boolean` (`true`, `false`)                        | `false`         |

---
**Notes on Properties:**
*   **`Name`**: The exact name of the prop as used in the code (e.g., `value`, `icon`).
*   **`Description`**: Clearly explain the purpose and effect of the prop.
*   **`Possible Values`**: List all accepted data types, specific string literals, enums, or reference types. Provide examples where helpful.
*   **`Default Setting`**: Indicate the value the prop takes if it's not explicitly provided.
---

## Styling
This section describes how the **Rate** component is styled and how users can customize its appearance.

*   **Base Styles (`Rating.module.css` or similar):**
    *   Defines the core visual properties and layout for the rating component.
    *   Typically uses CSS to display a series of icons (determined by `max`) in a row.
    *   Styles manage the appearance of individual rating units, including their size, color, and spacing.
    *   Crucially includes styles for interactive states:
        *   **Hover States:** When hovering over rating units, preceding units (and the hovered unit) should show a "filled" or highlighted appearance.
        *   **Active/Selected States:** The currently selected rating value should be visually distinct.
        *   **Disabled States:** When `disabled` is `true`, the rating units should appear inactive (e.g., greyed out) and not respond to user interactions.

*   **Attribute-Based Styling / Modifier Classes:**
    *   Props like `disabled` would likely translate to CSS classes or attributes (e.g., `data-disabled="true"`) that apply specific styles.
    *   The `icon` prop would be used dynamically to render the correct SVG or icon component for each rating unit.

## Usage
This section provides practical examples of how to use the **Rate** component in your application.

```jsx
// Import the component
import { Rate } from './Rate'; // Adjust path as needed

// --- Basic Rating ---
// A standard 5-star rating control, allowing user selection.
<Rating />

// --- Rating with a Specific Value ---
// Initializes the rating control with a pre-selected value of 3.
<Rating value={3} />

// --- Rating with a Different Maximum Value ---
// Allows users to rate up to 10 points.
<Rating max={10} />

// --- Rating with a Different Icon ---
// Uses heart icons instead of stars for the rating.
<Rating icon="heart" />

// --- Disabled Rating ---
// A read-only rating control, displaying a pre-set value and not allowing interaction.
<Rating value={4} disabled={true} />

// --- Combined Example ---
// A 7-point rating using thumbs-up icons, pre-selected at 5, and disabled.
// <Rating value={5} max={7} icon="thumbs-up" disabled={true} />
```

