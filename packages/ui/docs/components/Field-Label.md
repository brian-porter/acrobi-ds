[Table of Contents](../../toc.md)

# FieldLabel Component

## Overview
This section provides a concise overview of the **FieldLabel** component. The `FieldLabel` component is used to provide a label for a form field. It serves as a crucial element for accessibility and user understanding, acting as a narrator for the associated field. It supports customization of text, size, color, and can optionally display an "optional" or "required" indicator.

![field-label](https://github.com/user-attachments/assets/1c533054-8714-4254-bf59-2f4d239236a4)

## Properties
This section details all the configurable properties (props) that the **FieldLabel** component accepts.

| Name        | Description                                                                                                        | Possible Values                                                              | Default Setting |
| :---------- | :----------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------- | :-------------- |
| `as`        | Specifies the HTML element or React component to render the label as.                                              | `React.ElementType` (e.g., `_Builtin.Block`, `label`, `span`)                | `_Builtin.Block`|
| `fldLblTop` | Determines whether the label is displayed at the top of its container. (May influence layout)                      | `boolean` (`true`, `false`)                                                  | `true`          |
| `lblSrc`    | The main text content for the label.                                                                               | `string` (e.g., "My Label", "Email Address")                                 | `"Label"`       |
| `lblFor`    | The `for` attribute for the label, associating it programmatically with a specific form element's `id`.          | `string` (Should match the `id` of the associated input)                     | `""`            |
| `lblSz`     | Sets the size of the main label text.                                                                              | `string` (e.g., `"r4"`, `"r3"`)                                              | `"r4"`          |
| `lblClr`    | Sets the color of the main label text.                                                                             | `string` (e.g., `"n900"`, `"p500"`)                                          | `"n900"`        |
| `lblShdw`   | Applies a shadow effect to the main label text.                                                                    | `string` (Specific values might depend on predefined shadow classes)         | `""`            |
| `opt`       | Toggles the display of an optional indicator (e.g., "optional" or "required").                                     | `boolean` (`true`, `false`)                                                  | `false`         |
| `optSrc`    | The text content for the optional indicator (e.g., "optional", "required").                                        | `string` (e.g., `"optional"`, `"required"`)                                  | `"required"`    |
| `optSz`     | Sets the size of the optional indicator text.                                                                      | `string` (e.g., `"r4"`, `"r3"`)                                              | `"r4"`          |
| `optClr`    | Sets the color of the optional indicator text.                                                                     | `string` (e.g., `"n300"`, `"d500"`)                                          | `"n300"`        |

---
**Notes on Properties:**
*   **`Name`**: The exact name of the prop as used in the code (e.g., `lblSrc`, `optSrc`).
*   **`Description`**: Clearly explain the purpose and effect of the prop.
*   **`Possible Values`**: List all accepted data types, specific string literals, enums, or reference types. Provide examples where helpful.
*   **`Default Setting`**: Indicate the value the prop takes if it's not explicitly provided.
---

## Styling
This section describes how the **FieldLabel** component is styled and how users can customize its appearance.

*   **Base Styles (`FieldLabel.module.css` or similar):**
    *   Defines the core visual properties and layout for the label element.
    *   The `.fieldlabel` class styles the main container for the label, often using flexbox properties:
        *   `display: flex`
        *   `flex-direction: row`
        *   `justify-content: space-between` (to align label and optional text)
        *   `align-items: center`
        *   `grid-column-gap: 4px`
        *   `grid-row-gap: 4px`
    *   Applies a base `font-size` (e.g., `var(--_typography---size--r4)`) and general typography for the label.

*   **Attribute-Based Styling / Modifier Classes:**
    *   The `lblSrc` and `lblFor` props are used to render the actual label text and associate it with an input element.
    *   The `lblSz` and `lblClr` props would apply specific font sizes and colors to the main label text.
    *   When `opt` is `true`, styles are applied for the optional indicator (`optSrc`, `optSz`, `optClr`), likely positioned using `justify-content: space-between` on the container.
    *   `fldLblTop` might influence the placement or wrapping behavior of the label if it's part of a larger form structure.

## Usage
This section provides practical examples of how to use the **FieldLabel** component in your application.

```jsx
// Import the component
import { FieldLabel } from './FieldLabel'; // Adjust path as needed

// --- Basic Field Label ---
// A simple label associated with a form field.
<FieldLabel lblSrc="Username" lblFor="username" />

// --- Field Label with Optional Indicator ---
// Displays a label and an "optional" text indicator.
<FieldLabel
  lblSrc="Email Address"
  lblFor="email"
  opt={true}
  optSrc="optional"
  optClr="n300" // Example: Grey color for optional text
/>

// --- Field Label with Required Indicator ---
// Displays a label and a "required" indicator.
<FieldLabel
  lblSrc="Password"
  lblFor="password"
  opt={true} // Typically 'true' means required by default if optSrc is 'required'
  optSrc="required" // Explicitly set to 'required'
  optSz="r3" // Example: Smaller size for required text
/>

// --- Field Label with Custom Size and Color ---
// Demonstrates applying custom styles to the label text.
<FieldLabel
  lblSrc="Custom Label"
  lblFor="customField"
  lblSz="r5"
  lblClr="p500"
/>
```
