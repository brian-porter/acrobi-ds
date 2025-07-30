[Table of Contents](../../toc.md)

# Paragraph Component

## Overview
This section provides a concise overview of the **Paragraph** component. A paragraph is a fundamental text component used to display longer blocks of text. It provides flexibility in styling and alignment, making it a versatile element in your content for presenting information clearly and readably.

![Paragraph Example](https://github.com/user-attachments/assets/4169e792-29ca-444f-9d83-5aed858ac5e6)

## Properties
This section details all the configurable properties (props) that the **Paragraph** component accepts.

| Name      | Description                                                                               | Possible Values                                                              | Default Setting |
| :-------- | :---------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------- | :-------------- |
| `children`| The text content to be displayed within the paragraph.                                    | `React.ReactNode` (string, JSX element)                                      | `null`          |
| `fontSz`  | Controls the size of the text in the paragraph.                                           | `string` (`R1` (Largest), `R2`, `R3`, `R4`, `H5`, `H4`, `H3`, `H2`, `H1`)    | `R4`            |
| `fontClr` | Sets the color of the paragraph text.                                                     | `string` (Any valid CSS color variable, e.g., `textPrimary`, `var(--color--n700)`) | `undefined`     |
| `align`   | Determines the alignment of the paragraph text.                                           | `string` (`L`: Left, `C`: Center, `R`: Right, `J`: Justified)                | `L`             |
| `as`      | Specifies the HTML element type to render the paragraph as (e.g., `p`, `div`).           | `React.ElementType`                                                          | `undefined`     |

---
**Notes on Properties:**
*   **`Name`**: The exact name of the prop as used in the code (e.g., `fontSz`, `align`).
*   **`Description`**: Clearly explain the purpose and effect of the prop.
*   **`Possible Values`**: List all accepted data types, specific string literals, enums, or reference types. Provide examples where helpful.
*   **`Default Setting`**: Indicate the value the prop takes if it's not explicitly provided.
---

## Styling
This section describes how the **Paragraph** component is styled and how users can customize its appearance.

*   **Base Styles (`Paragraph.module.css` or similar):**
    *   Defines the core visual properties and layout for the paragraph element.
    *   Includes styles for `font-size`, `color`, `text-align`, `margin`, and `padding`.
    *   Ensures proper line height for readability.

*   **Attribute-Based Styling / Modifier Classes:**
    *   Props like `fontSz`, `fontClr`, and `align` are translated into CSS classes or inline styles to control the appearance of the text.
    *   `fontSz` likely maps to CSS classes that set `font-size` and related typographic properties.
    *   `fontClr` applies text color, potentially using CSS variables.
    *   `align` controls `text-align`.

## Usage
This section provides practical examples of how to use the **Paragraph** component in your application.

```jsx
// Import the component
import { Paragraph } from './Paragraph'; // Adjust path as needed

// --- Basic Paragraph ---
// Displays a paragraph with default size, color, and left alignment.
<Paragraph>
  This is a sample paragraph with default settings. It demonstrates the basic usage of the Paragraph component.
</Paragraph>

// --- Paragraph with Custom Size, Color, and Alignment ---
// Shows a paragraph with larger text, a different color, and centered alignment.
<Paragraph fontSz="R3" fontClr="textSecondary" align="C">
  This is another paragraph with different settings, showcasing customization options for size, color, and alignment.
</Paragraph>

// --- Paragraph with Justified Alignment ---
// Displays a paragraph with text justified to both margins.
<Paragraph fontSz="R4" fontClr="textPrimary" align="J">
  This paragraph uses justified alignment to create clean lines on both the left and right edges, commonly used in longer textual content for a formal appearance.
</Paragraph>
```

## Related Components
- [Headline](Headline.md)

