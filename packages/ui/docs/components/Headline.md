[Table of Contents](../../toc.md)

# Headline Component

## Overview
This section provides a concise overview of the **Headline** component. The `Headline` component is used to display a primary message or title for a page or section, often accompanied by subtext that provides additional context or detail. It is a crucial element in setting the tone and focus of the content, supporting various sizes, alignments, and color customizations.

![Headline Example](https://github.com/user-attachments/assets/684840c6-2c37-435e-875f-6f91da66ff88)

## Properties
This section details all the configurable properties (props) that the **Headline** component accepts.

| Name        | Description                                                                                                       | Possible Values                                                                                                     | Default Setting |
| :---------- | :---------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------ | :-------------- |
| `titleSrc`  | The main text content for the headline title.                                                                     | `React.ReactNode` (e.g., `"Main Title"`)                                                                            | `undefined`     |
| `subtxtSrc` | The text content providing additional context or detail for the headline.                                         | `React.ReactNode` (e.g., `"This is the subtext"`)                                                                   | `undefined`     |
| `size`      | Sets the overall size for both the headline title and subtext. This likely maps to `data-hl-size` attribute.     | `string` (`2xl`, `xl`, `l`, `m`, `s`, `xs`)                                                                         | `undefined`     |
| `align`     | Controls the text alignment for the headline title and subtext (e.g., left, center, right).                       | `string` (e.g., `"center"`)                                                                                         | `undefined`     |
| `titleClr`  | Sets the color for the main headline title.                                                                       | `string` (e.g., `"primary"`, `"var(--color--p500)"`)                                                                | `undefined`     |
| `subtxtClr` | Sets the color for the subtext accompanying the headline.                                                         | `string` (e.g., `"secondary"`, `"var(--color--n700)"`)                                                              | `undefined`     |
| `as`        | Specifies the HTML element or React component to render the headline as.                                          | `React.ElementType`                                                                                                 | `undefined`     |

---
**Notes on Properties:**
*   **`Name`**: The exact name of the prop as used in the code (e.g., `titleSrc`, `size`).
*   **`Description`**: Clearly explain the purpose and effect of the prop.
*   **`Possible Values`**: List all accepted data types, specific string literals, enums, or reference types. Provide examples where helpful.
*   **`Default Setting`**: Indicate the value the prop takes if it's not explicitly provided. Note: Some properties are inferred from example usage.
---

## Styling
This section describes how the **Headline** component is styled and how users can customize its appearance.

*   **Base Styles (`Headline.module.css` or similar):**
    *   Defines the core visual properties and layout for the headline and subtext elements.
    *   Includes styles for managing typography, spacing, and potentially container layout.

*   **Attribute-Based Styling / Modifier Classes:**
    *   **Size (`data-hl-size`):** The `size` prop likely translates to a `data-hl-size` attribute on the main headline container, which then applies CSS rules to adjust `font-size`, `line-height`, and `margin` for both the title and subtext.
    *   **Alignment (`style` or class):** The `align` prop would control text alignment, potentially via inline styles or specific CSS classes.
    *   **Color (`titleClr`, `subtxtClr`):** These props likely apply specific CSS variables or classes to set the text colors for the title and subtext elements, respectively.

## Usage
This section provides practical examples of how to use the **Headline** component in your application.

```jsx
// Import the component
import { Headline } from './Headline'; // Adjust path as needed

// --- Basic Headline ---
// Displays a main title and subtext with default styling.
<Headline titleSrc="Page Title" subtxtSrc="A brief description." />

// --- Headline with Size and Alignment ---
// Centers a large headline with secondary subtext.
<Headline
  titleSrc="Welcome Back!"
  subtxtSrc="Your dashboard is ready."
  size="xl" // Sets size to extra large
  align="center" // Centers the text
/>

// --- Headline with Custom Colors ---
// Uses primary color for the title and a neutral color for the subtext.
<Headline
  titleSrc="Section Header"
  subtxtSrc="Details about this section."
  size="l"
  titleClr="p500" // Example: Primary color, level 500
  subtxtClr="n700" // Example: Neutral color, level 700
/>

// --- Headline with Specific Size and Alignment ---
// A smaller, left-aligned headline.
<Headline
  titleSrc="Important Update"
  subtxtSrc="Please read the following information."
  size="m"
  align="left"
/>
```

## Related Components
- [Paragraph](Paragraph.md)

### You may also be interested in:
* [Label](Label.md)
* [List](List.md)
* [ListItm](ListItm.md)
