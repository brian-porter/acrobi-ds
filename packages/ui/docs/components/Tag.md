[Table of Contents](../../toc.md)

# Tag Component

## Overview
This section provides a concise overview of the **Tag** component. Tags are UI components that display icons and text related to the content they are associated with. They can be positioned in various locations and customized in size and color, serving as useful indicators for categories, status, or additional metadata.

![Tag Example](https://github.com/user-attachments/assets/a64ab779-58c6-4172-8bbe-4665-d12fc482)

## Properties
This section details all the configurable properties (props) that the **Tag** component accepts.

| Name          | Description                                                                                                     | Possible Values                                                                                                        | Default Setting |
| :------------ | :-------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------- | :-------------- |
| `tagSz`       | Sets the size of the tag.                                                                                       | `string` (`S`: Small, `M`: Medium, `L`: Large)                                                                         | `M`             |
| `tagLoc`      | Determines the location of the tag relative to its associated content.                                          | `string` (`TL`: Top Left, `TR`: Top Right, `BL`: Bottom Left, `BR`: Bottom Right)                                    | `TR`            |
| `tagClr`      | Sets the color theme for the tag.                                                                               | `string` (Any valid CSS color variable, e.g., `primary`, `var(--color--p500)`)                                        | `undefined`     |
| `tagIcnSrc`   | Specifies the source for the icon displayed on the tag.                                                         | `React.ReactNode` (Any string representing the icon source or an icon component)                                       | `undefined`     |
| `tagTxtSrc`   | The text content to display on the tag.                                                                         | `React.ReactNode` (Any string representing the text)                                                                   | `undefined`     |
| `tagIcn`      | Toggles the visibility of the icon on the tag.                                                                  | `boolean` (`On`, `Off`)                                                                                                | `Off`           |
| `tagTxt`      | Toggles the visibility of the text content on the tag.                                                          | `boolean` (`On`, `Off`)                                                                                                | `On`            |
| `as`          | Specifies the HTML element type for the tag container (e.g., `span`, `div`).                                  | `React.ElementType`                                                                                                    | `undefined`     |
| `className`   | Allows passing custom CSS classes for additional styling.                                                       | `string`                                                                                                               | `undefined`     |
| `label`       | A shortcut for the main text source (`tagTxtSrc`), possibly for simpler usage.                                | `string`                                                                                                               | `undefined`     |
| `icon`        | A shortcut for the icon source (`tagIcnSrc`) and visibility (`tagIcn: true`).                                 | `string` (Icon name)                                                                                                   | `undefined`     |
| `iconPosition`| A shortcut for the icon location (`tagLoc`), commonly "left" or "right".                                      | `string` (`left`, `right`)                                                                                             | `undefined`     |

---
**Notes on Properties:**
*   **`Name`**: The exact name of the prop as used in the code (e.g., `tagSz`, `tagTxtSrc`).
*   **`Description`**: Clearly explain the purpose and effect of the prop.
*   **`Possible Values`**: List all accepted data types, specific string literals, enums, or reference types. Provide examples where helpful.
*   **`Default Setting`**: Indicate the value the prop takes if it's not explicitly provided.
---

## Styling
This section describes how the **Tag** component is styled and how users can customize its appearance.

*   **Base Styles (`Tag.module.css` or similar):**
    *   Defines the core visual properties and layout for the tag element.
    *   Includes styles for the tag container, managing `padding`, `border-radius`, `font-size` (based on `tagSz`), `background-color` (based on `tagClr`), and `color` (for text and icon).
    *   Uses flexbox for arranging text and icons, respecting `IcnLoc` and `LblGap` (assuming this prop is used internally for spacing).

*   **Attribute-Based Styling / Modifier Classes:**
    *   Props like `tagSz`, `tagLoc`, `tagClr`, `tagIcnSrc`, `tagTxtSrc`, `tagIcn`, and `tagTxt` are used to configure the tag's appearance and content.
    *   `tagSz` maps to CSS classes that set font size and padding.
    *   `tagLoc` determines the positioning of the tag relative to its parent context, likely through absolute positioning and CSS offset properties.
    *   `tagClr` applies the color theme.
    *   `tagIcn` and `tagTxt` control the visibility of respective elements.

## Usage
This section provides practical examples of how to use the **Tag** component in your application.

```jsx
// Import the component
import { Tag } from './Tag'; // Assuming component name

// --- Basic Tag ---
// Displays a tag with text and default size/color.
<Tag tagTxtSrc="New" />

// --- Tag with Icon and Custom Position ---
// Shows a tag with text and a leading icon, positioned in the top-left corner.
<Tag
  tagTxtSrc="Featured"
  tagIcn={true}
  tagIcnSrc="star" // Example: star icon
  tagLoc="tl" // Location: Top Left
/>

// --- Customized Tag ---
// Demonstrates applying custom size, color, and visibility for text/icon.
<Tag
  tagSz="L" // Large size
  tagClr="primary" // Primary color theme
  tagIcn={true}
  tagIcnSrc="info" // Example: info icon
  tagTxt={true}
  tagTxtSrc="Important"
  tagLoc="br" // Location: Bottom Right
/>

// --- Tag with Only Icon ---
// Displays a tag with only an icon, no text.
<Tag
  tagIcn={true}
  tagIcnSrc="alert"
  tagTxt={false} // Hide text
  tagSz="s"
  tagClr="warn"
/>
```

## Notes on Usage:
- Import Statement: Ensure the import statement correctly points to the component file.
- Examples: Provide clear, runnable code snippets that cover common use cases and demonstrate the functionality of various props.
- Comments: Use comments within the code to explain what each example demonstrates or what specific props are doing.
- Content: The core content is provided via tagTxtSrc and tagIcnSrc. Ensure these are valid and accessible.

## Accessibility
This section outlines important considerations for making the Tag component accessible.
- Informative Content: Ensure the tagTxtSrc and tagIcnSrc provide clear and understandable information about the content the tag relates to.
- Screen Reader Compatibility: If the tag conveys status or important information, ensure it's accessible to screen readers. This might involve using ARIA attributes if the tag contains interactive elements or conveys status information not inherent in its text/icon.
- Color Contrast: Ensure sufficient color contrast between the tagClr, the text/icon color, and the background for users with visual impairments.

## Related Components
[Image](Image.md) (Images can have tags)
[Avatar](Avatar.md) (Avatars can have tags)