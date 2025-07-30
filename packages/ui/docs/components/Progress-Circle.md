[Table of Contents](../../toc.md)

# Progress - Circle Component

## Overview
This section provides a concise overview of the **Progress - Circle** component. The progress circle is the round, stylish cousin of the classic progress bar. It’s perfect for dashboards, stats, or anywhere you want to show progress in a compact, eye-catching way. It visually represents the completion status of a task or process using a circular graphic.

## Properties
This section details all the configurable properties (props) that the **Progress - Circle** component accepts.

| Name      | Description                                                                                                   | Possible Values                                                                              | Default Setting |
| :-------- | :------------------------------------------------------------------------------------------------------------ | :------------------------------------------------------------------------------------------- | :-------------- |
| `value`   | The current progress value. This determines how much of the circle is filled.                                 | `number` (e.g., 0, 50, 100)                                                                  | `0`             |
| `max`     | The maximum possible value for the progress. This defines the 100% point of the circle.                       | `number` (e.g., 100, 200)                                                                    | `100`           |
| `color`   | Sets the color of the filled portion of the progress circle.                                                  | `string` (Any valid CSS color variable, e.g., `var(--color--p500)`)                         | `var`           |
| `size`    | Sets the overall size of the progress circle (diameter).                                                      | `string` (`S`, `M`, `L`, `XL`)                                                               | `L`             |
| `as`      | Specifies the HTML element or React component to render the progress circle as.                               | `React.ElementType`                                                                          | `undefined`     |
| `className`| Allows passing custom CSS classes for additional styling.                                                     | `string`                                                                                     | `undefined`     |

---
**Notes on Properties:**
*   **`Name`**: The exact name of the prop as used in the code (e.g., `value`, `color`).
*   **`Description`**: Clearly explain the purpose and effect of the prop.
*   **`Possible Values`**: List all accepted data types, specific string literals, enums, or reference types. Provide examples where helpful.
*   **`Default Setting`**: Indicate the value the prop takes if it's not explicitly provided.
---

## Styling
This section describes how the **Progress - Circle** component is styled and how users can customize its appearance.

*   **Base Styles (`ProgressCircle.module.css` or similar):**
    *   Defines the core visual properties and layout for the progress circle.
    *   Likely uses SVG elements (`<svg>`, `<circle>`) to render the progress graphic.
    *   Styles manage the appearance of the track (background circle) and the progress fill (foreground circle).
    *   Includes CSS properties for `stroke-dasharray` and `stroke-dashoffset` to create the animated progress effect.
    *   Handles the size of the SVG container and the stroke width of the circles.

*   **Attribute-Based Styling / Modifier Classes:**
    *   **Value & Max:** These props are used internally to calculate the `stroke-dashoffset` and `stroke-dasharray` values for the SVG progress circle path, determining the fill percentage.
    *   **Color:** The `color` prop sets the `stroke` property of the progress circle's foreground path.
    *   **Size:** The `size` prop likely influences the `width`, `height`, and `viewBox` of the SVG container, and possibly the `stroke-width` of the circles.

## Usage
This section provides practical examples of how to use the **Progress - Circle** component in your application.

```jsx
// Import the component
import { ProgressCircle } from './ProgressCircle'; // Assuming component name

// --- Basic Progress Circle ---
// Displays a progress circle with default values (0 progress, max 100, default color/size).
<ProgressCircle />

// --- Progress Circle with Value ---
// Sets the current progress to 75%.
<ProgressCircle value={75} />

// --- Progress Circle with Custom Max and Color ---
// Allows progress up to 200 and displays in a specific color (e.g., warning).
<ProgressCircle
  value={150}
  max={200}
  color="w500" // Example: Warning color, level 500
/>

// --- Progress Circle with Specific Size ---
// Renders a large progress circle.
<ProgressCircle
  value={50}
  size="L" // Explicitly set size to Large
/>

// --- Progress Circle with Custom Color and Size ---
// Combines custom color and size settings.
<ProgressCircle
  value={90}
  max={100}
  color="p500" // Example: Primary color
  size="XL"
/>
```
