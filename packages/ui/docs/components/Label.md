[Table of Contents](../../toc.md)

# Label Component

## Overview
This section provides a concise overview of the **Label** component. The `Label` component is a versatile element that can be used to enhance text with various styles and icons. It supports multiple configurations for size, color, and icon placement, making it useful for displaying descriptive text in various contexts, from form fields to status indicators.

![label](https://github.com/user-attachments/assets/18c47292-a60a-4ceb-bcbc-344f53b55a73)

## Properties
This section details all the configurable properties (props) that the **Label** component accepts.

| Name      | Description                                                                                                   | Possible Values                                                                                                                            | Default Setting |
| :-------- | :------------------------------------------------------------------------------------------------------------ | :----------------------------------------------------------------------------------------------------------------------------------------- | :-------------- |
| `as`      | Specifies the HTML element or React component to render the label as (e.g., `span`, `div`, `label`).          | `React.ElementType`                                                                                                                        | `undefined`     |
| `LblSz`   | Sets the size of the label text.                                                                              | `string` (`2xl`, `xl`, `l`, `m`, `s`, `xs`, `H5`, `H4`, `H3`, `H2`, `H1`, `R4`, `R3`, `R2`, `R1`)                                              | `R2`            |
| `LblClr`  | Sets the color of the label text.                                                                             | `string` (Any valid CSS color variable, e.g., `var(--color--n700)`, `primary`)                                                             | `var`           |
| `IcnLoc`  | Determines the placement of the icon relative to the text.                                                    | `string` (`L`: Left, `R`: Right, `T`: Top)                                                                                                 | `L`             |
| `Icn`     | Toggles the visibility of an icon next to the label text.                                                     | `boolean` (`On`, `Off`)                                                                                                                    | `Off`           |
| `Txt`     | Toggles the visibility of the text content itself.                                                            | `boolean` (`On`, `Off`)                                                                                                                    | `On`            |
| `IcnSrc`  | The source for the icon (e.g., icon name, SVG component).                                                     | `string` (Any valid icon name or ReactNode)                                                                                                | `string`        |
| `TxtSrc`  | The main text content for the label.                                                                          | `string` (Any valid string)                                                                                                                                                                                                | `string`        |
| `LblGap`  | Sets the spacing between the icon and the text content.                                                       | `number` (e.g., `4`)                                                                                                                                                                                                       | `num`           |

---
**Notes on Properties:**
*   **`Name`**: The exact name of the prop as used in the code (e.g., `LblSz`, `TxtSrc`).
*   **`Description`**: Clearly explain the purpose and effect of the prop.
*   **`Possible Values`**: List all accepted data types, specific string literals, enums, or reference types. Provide examples where helpful.
*   **`Default Setting`**: Indicate the value the prop takes if it's not explicitly provided.
---

## Styling
This section describes how the **Label** component is styled and how users can customize its appearance.

*   **Base Styles (`Label.module.css` or similar):**
    *   Defines the core visual properties and layout for the label component.
    *   Includes styles to manage the display, alignment, and spacing of the text and icon.
    *   Likely uses flexbox for arranging elements horizontally or vertically based on `IcnLoc`.
    *   Styles apply `font-size`, `color`, `gap` (for `LblGap`), and potentially `box-shadow` based on the provided props.

*   **Attribute-Based Styling / Modifier Classes:**
    *   Props like `LblSz`, `LblClr`, `IcnLoc`, `Icn`, `Txt`, `IcnSrc`, `TxtSrc`, and `LblGap` are used to configure the label's appearance and content.
    *   The `LblSz` prop likely maps to CSS classes that set `font-size` and other typography properties.
    *   `LblClr` would apply colors using CSS variables or inline styles.
    *   `IcnLoc` and `Icn` would control the placement and visibility of the icon, adjusting layout using flexbox properties (`flex-direction`, `gap`).

## Usage
This section provides practical examples of how to use the **Label** component in your application.

```jsx
// Import the component
import Label from './Label'; // Assuming default export or specific import path

// --- Basic Label ---
// Displays a simple label with default size and color.
<Label TxtSrc="Basic Label" />

// --- Label with Icon ---
// Displays text with a leading icon.
<Label
  TxtSrc="Label with Icon"
  Icn={true} // Ensure icon is visible
  IcnSrc="info" // Specify the icon to use
/>

// --- Customized Label ---
// Demonstrates applying custom size and color to the label.
<Label
  LblSz="H1" // Use a heading size
  LblClr="p500" // Example: Primary color, level 500
  TxtSrc="Customized Label"
/>

// --- Label with Icon on the Right and Gap ---
// Shows a label with text and an icon on the right, with custom spacing.
<Label
  TxtSrc="Action Item"
  Icn={true}
  IcnSrc="arrow-right"
  IcnLoc="R" // Icon location: Right
  LblGap={8} // Set gap between text and icon
/>
```
