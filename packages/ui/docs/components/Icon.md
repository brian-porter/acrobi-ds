[Table of Contents](../../toc.md)

# Icon Component

## Overview
This section provides a concise overview of the **Icon** component. The `Icon` component is designed to display icons, typically from a font set or as SVG elements. It offers versatility and styling options to match your design needs, allowing for various sizes, colors, and effects, making it a flexible element in your UI for visual cues, actions, or decorative purposes.

![icon](https://github.com/user-attachments/assets/e669386c-e4cf-4edb-bc6b-18e0cd036933)

## Properties
This section details all the configurable properties (props) that the **Icon** component accepts.

| Name        | Description                                                                                                                                  | Possible Values                                                                                                          | Default Setting   |
| :---------- | :------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------- | :---------------- |
| `as`        | Specifies the HTML element or React component to render the icon as (e.g., `span`, `i`, or a custom SVG component).                           | `React.ElementType`                                                                                                      | `undefined`       |
| `icn`       | Defines the visibility conditions for the icon. If `false`, the icon will not render.                                                      | `boolean` (`true` to show, `false` to hide)                                                                              | `undefined`       |
| `icnSrc`    | The source for the icon. This can be a string representing an icon name (e.g., from an icon library) or a React component (like an SVG).        | `React.ReactNode` (e.g., `"home"`, `"settings_icon"`, `<svg>...</svg>`)                                                  | `undefined`       |
| `icnSz`     | Sets the size of the icon. This likely affects font-size for icon fonts or dimensions for SVGs.                                              | `string` (e.g., `"xs"`, `"m"`, `"2xl"`)                                                                                  | `undefined`       |
| `icnClr`    | Sets the color of the icon. This can be a named color, a hex code, or a CSS variable.                                                        | `string` (e.g., `"n900"`, `"p500"`, `"#FF0000"`)                                                                          | `undefined`       |
| `icnDrpShdw`| Applies a drop shadow effect to the icon, potentially enhancing its visual depth.                                                            | `string` (Specific values might depend on predefined shadow classes or CSS values)                                       | `undefined`       |

---
**Notes on Properties:**
*   **`Name`**: The exact name of the prop as used in the code (e.g., `icnSrc`, `icnSz`).
*   **`Description`**: Clearly explain the purpose and effect of the prop.
*   **`Possible Values`**: List all accepted data types, specific string literals, enums, or reference types. Provide examples where helpful.
*   **`Default Setting`**: Indicate the value the prop takes if it's not explicitly provided.
---

## Styling
This section describes how the **Icon** component is styled and how users can customize its appearance.

*   **Base Styles (`Icon.module.css` or similar):**
    *   Defines the core visual properties and layout for the icon element.
    *   Includes styles to ensure the icon behaves correctly (e.g., `display: inline-block`, `vertical-align: middle`).
    *   Manages default size and color if not explicitly set by props.

*   **Attribute-Based Styling / Modifier Classes:**
    *   **Size (`data-icon-size`):** The `icnSz` prop likely translates to a CSS attribute or class (e.g., `data-icon-size="2xl"`) that sets `font-size` or dimensions for the icon.
    *   **Color (`data-icon-color`):** The `icnClr` prop sets the `color` CSS property, either directly or via a CSS variable.
    *   **Drop Shadow (`data-icon-shadow`):** The `icnDrpShdw` prop applies a `box-shadow` effect.
    *   **Source Handling:** The `icnSrc` prop is critical for rendering the actual icon content (SVG, font glyph, etc.).

## Usage
This section provides practical examples of how to use the **Icon** component in your application.

```jsx
// Import the component
import { Icon } from './Icon'; // Adjust path as needed

// --- Basic Icon ---
// Displays a default icon (e.g., a star).
<Icon />

// --- Icon with Specific Source ---
// Displays a 'home' icon.
<Icon icnSrc="home" />

// --- Icon with Custom Size and Color ---
// Renders a large, blue 'settings' icon.
<Icon
  icnSrc="settings"
  icnSz="2xl"
  icnClr="p500" // Example: Primary color, level 500
/>

// --- Icon with Drop Shadow ---
// Displays an icon with a subtle drop shadow effect.
<Icon
  icnSrc="info"
  icnDrpShdw="true" // Apply shadow
/>

// --- Icon as a Specific HTML Element ---
// Renders the icon using a span element.
<Icon as="span" icnSrc="user" />
```

## Related Components
* [AdaptIcon](AdaptIcon.md)

### You may also be interested in:
* [Avatar](Avatar.md)
* [Badge](Badge.md)