[Table of Contents](../../toc.md)

# Progress Component

## Overview
This section provides a concise overview of the **Progress** component. The progress bar is a visual indicator that shows users how far along they are in a process, such as uploading, loading, or completing a task. It provides a clear and animated representation of progress, keeping users informed and engaged. Use progress bars for processes that take a noticeable amount of time to complete, ensuring colors are consistent with the design system and accessible.

## Properties
This section details all the configurable properties (props) that the **Progress** component accepts.

| Name      | Description                                                                                                   | Possible Values                                                                              | Default Setting |
| :-------- | :------------------------------------------------------------------------------------------------------------ | :------------------------------------------------------------------------------------------- | :-------------- |
| `value`   | The current progress value, indicating completion percentage.                                                 | `number` (e.g., 0, 50, 100)                                                                  | `0`             |
| `max`     | The maximum possible value for the progress, defining the 100% completion point.                              | `number` (e.g., 100)                                                                         | `100`           |
| `color`   | Sets the color of the filled portion of the progress bar.                                                     | `string` (Any valid CSS color variable, e.g., `primary`, `var(--color-primary)`)           | `var`           |
| `striped` | Whether to display a striped pattern on the progress bar.                                                     | `boolean` (`true`, `false`)                                                                  | `false`         |
| `animated`| Whether to animate the striped pattern, creating a visual indication of ongoing activity.                     | `boolean` (`true`, `false`)                                                                  | `false`         |
| `as`      | Specifies the HTML element type for the progress bar container (e.g., `div`).                                 | `React.ElementType`                                                                          | `undefined`     |
| `className`| Allows passing custom CSS classes for additional styling.                                                     | `string`                                                                                     | `undefined`     |

---
**Notes on Properties:**
*   **`Name`**: The exact name of the prop as used in the code (e.g., `value`, `color`).
*   **`Description`**: Clearly explain the purpose and effect of the prop.
*   **`Possible Values`**: List all accepted data types, specific string literals, enums, or reference types. Provide examples where helpful.
*   **`Default Setting`**: Indicate the value the prop takes if it's not explicitly provided.
---

## Styling
This section describes how the **Progress** component is styled and how users can customize its appearance.

*   **Base Styles (`Progress.module.css` or similar):**
    *   Defines the core visual properties and layout for the progress bar.
    *   Likely includes a container element (`.progress-bar-container`) for layout.
    *   Styles the track (`.progress-bar-track`) which forms the background of the bar.
    *   Styles the fill element (`.progress-bar-fill`) which represents the completed progress, controlling its width, color, and height.
    *   Includes styles for striped patterns and animations that are applied conditionally based on the `striped` and `animated` props.

*   **Attribute-Based Styling / Modifier Classes:**
    *   Props like `value`, `max`, and `color` are used to dynamically set the width of the fill element and its color.
    *   The `value` and `max` props determine the `width` percentage of the `.progress-bar-fill` element.
    *   The `color` prop sets the `background-color` of the fill.
    *   `striped` and `animated` props would add specific CSS classes or modify attributes to enable and style the animated stripes.

## Usage
This section provides practical examples of how to use the **Progress** component in your application.

```jsx
// Import the component
import { Progress } from './Progress'; // Assuming component name

// --- Basic Progress Bar ---
// Displays a progress bar showing 50% completion.
<Progress value={50} />

// --- Progress Bar with Custom Max and Color ---
// Shows progress out of 200, colored with a primary hue.
<Progress
  value={150}
  max={200}
  color="primary"
/>

// --- Striped and Animated Progress Bar ---
// Displays a progress bar with animated stripes for a loading effect.
<Progress
  value={75}
  max={100}
  color="success"
  striped={true}
  animated={true}
/>

// --- Full Progress Bar ---
// Represents a completed task, colored with a danger hue.
<Progress
  value={100}
  max={100}
  color="danger"
/>
```
