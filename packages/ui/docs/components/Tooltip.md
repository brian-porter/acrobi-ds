[Table of Contents](../../toc.md)

# Tooltip Component

## Overview
This section provides a concise overview of the **Tooltip** component. The Tooltip component provides contextual information or guidance when users hover over, focus on, or tap an element. It’s perfect for adding helpful hints, explanations, or labels without cluttering the interface. It offers controlled visibility, customizable content, styling, arrow positioning, and handles interaction for desktop and mobile.

![Tooltip Example](https://github.com/user-attachments/assets/c081db6f-105d-4f9b-aee9-b388ef285d97)

## Properties
This section details all the configurable properties (props) that the **Tooltip** component accepts.

| Name          | Description                                                                                                                                     | Possible Values                                                                                                                                                                                                                                                                               | Default Setting |
| :------------ | :---------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------- |
| `children`    | The element that the tooltip is attached to (the trigger element).                                                                              | `React.ReactNode`                                                                                                                                                                                                                                                                             | `null`          |
| `arrow`       | The position of the arrow relative to the tooltip's content box, indicating the direction of the tooltip from its trigger.                        | `string` (`None`, `Top Left`, `Top Center`, `Top Right`, `Left`, `Right`, `Bottom Left`, `Bottom Center`, `Bottom Right`)                                                                                                                                                                        | `undefined`     |
| `txtSrc`      | The text content to display within the tooltip. Content will wrap to the next line upon reaching the tooltip's max-width.                         | `string`                                                                                                                                                                                                                                                                                      | `undefined`     |
| `visible`     | Controls the visibility of the tooltip.                                                                                                         | `boolean` (`true` for visible, `false` for hidden)                                                                                                                                                                                                                                            | `true`          |
| `style`       | The style variant of the tooltip, affecting its color scheme and potentially icon choice.                                                       | `string` (`none`, `success`, `error`, `warn`, `info`)                                                                                                                                                                                                                                         | `none`          |
| `maxWidth`    | The maximum width for the tooltip content. If content exceeds this, it will wrap to the next line.                                                | `string` (e.g., `"200px"`, `"12rem"`)                                                                                                                                                                                                                                                         | `undefined`     |
| `as`          | Specifies the HTML element or React component to render the tooltip container as.                                                               | `React.ElementType`                                                                                                                                                                                                                                                                           | `undefined`     |
| `className`   | Allows passing custom CSS classes for additional styling.                                                                                         | `string`                                                                                                                                                                                                                                                                                      | `undefined`     |
| `delay`       | The delay in milliseconds before the tooltip appears on hover/focus.                                                                            | `number`                                                                                                                                                                                                                                                                                      | `undefined`     |
| `openOnClick` | If `true`, the tooltip will open on click rather than hover/focus.                                                                              | `boolean`                                                                                                                                                                                                                                                                                     | `false`         |
| `offset`      | Adjusts the distance between the trigger element and the tooltip.                                                                               | `number`                                                                                                                                                                                                                                                                                      | `undefined`     |

---
**Notes on Properties:**
*   **`Name`**: The exact name of the prop as used in the code (e.g., `txtSrc`, `arrow`).
*   **`Description`**: Clearly explain the purpose and effect of the prop.
*   **`Possible Values`**: List all accepted data types, specific string literals, enums, or reference types. Provide examples where helpful.
*   **`Default Setting`**: Indicate the value the prop takes if it's not explicitly provided.
---

## Styling
This section describes how the **Tooltip** component is styled and how users can customize its appearance.

*   **Base Styles (`Tooltip.module.css` or similar):**
    *   Defines the core visual properties and layout for the tooltip.
    *   Includes styles for the tooltip container, managing its `position` (often `absolute`), `z-index`, `background-color` (based on `style`), `padding`, `border-radius`, `box-shadow`, and `max-width`.
    *   Crucially includes styles for positioning the tooltip and its arrow relative to the trigger element, based on the `arrow` prop.
    *   Handles transitions for opening and closing animations (e.g., grow/shrink fade).

*   **Attribute-Based Styling / Modifier Classes:**
    *   The `visible` prop controls the tooltip's display, likely via CSS classes that manage `opacity` and `visibility`.
    *   `style` applies distinct visual themes.
    *   `arrow` prop dictates the positioning and rendering of the tooltip's arrow pseudo-element or component.
    *   `maxWidth` influences the `max-width` property of the tooltip's content area, enabling text wrapping.

## Usage
This section provides practical examples of how to use the **Tooltip** component in your application.

```jsx
// Import the component
import { Tooltip } from './Tooltip'; // Adjust path as needed

// --- Basic Tooltip ---
// A simple tooltip that appears on hover/focus with a default message.
function BasicTooltip() {
  return (
    <Tooltip txtSrc="This is a basic tooltip message.">
      <span>Hover over me</span>
    </Tooltip>
  );
}

// --- Tooltip with Style and Arrow ---
// Displays an info-styled tooltip with an arrow pointing to the top center.
function StyledTooltip() {
  return (
    <Tooltip
      txtSrc="This is an informational tooltip."
      style="info"
      arrow="Top Center"
    >
      <button>Hover for Info</button>
    </Tooltip>
  );
}

// --- Tooltip with Max Width ---
// Shows a tooltip where the text wraps due to max-width.
function MaxWidthTooltip() {
  return (
    <Tooltip
      txtSrc="This is a longer tooltip message that demonstrates how text will wrap when it exceeds the maximum defined width, ensuring readability."
      maxWidth="250px" // Set a maximum width
      arrow="Bottom Center"
    >
      <span>Hover for wrapped text</span>
    </Tooltip>
  );
}

// --- Tooltip with Action Button (Conceptual) ---
// Note: The provided props do not explicitly support an action button *within* the tooltip itself.
// If this functionality is needed, it might be implemented differently or via children.
// For example, if children could include interactive elements that trigger side effects.

// --- Tooltip Triggered by Click (Conceptual) ---
// If 'openOnClick' prop exists and is true.
function ClickTooltip() {
  return (
    <Tooltip
      txtSrc="Tooltip opened by click"
      openOnClick={true}
      arrow="Left"
    >
      <button>Click Me</button>
    </Tooltip>
  );
}
```

## Usage
This section provides practical examples of how to use the **Tooltip** component in your application.

---
**Notes on Usage:**
*   **Import Statement**: Ensure the import statement correctly points to the component file.
*   **Examples**: Provide clear, runnable code snippets that cover common use cases and demonstrate the functionality of various props.
*   **Comments**: Use comments within the code to explain what each example demonstrates or what specific props are doing.
*   **Trigger Element**: The tooltip is usually a wrapper component; its `children` prop defines the element that triggers the tooltip's appearance.
*   **Behavior**: Be aware of the default behavior (hover/focus on desktop, tap-and-hold on mobile) and how props like `openOnClick` might alter it.

---
