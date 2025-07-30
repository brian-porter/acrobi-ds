[Table of Contents](../../toc.md)
# Banner Component

## Overview
This section provides a concise overview of the **Banner** component. Banners are eye-catching, full-width blocks designed to grab attention and communicate important messages. They are typically used for announcements, alerts, or promotional content. This component supports custom text, optional icons on both sides, a clickable link, and different visual styles to convey specific types of information.

## Properties
This section details all the configurable properties (props) that the **Banner** component accepts.

| Name        | Description                                                                                                                             | Possible Values                                                                                                                                 | Default Setting                                                                                                           |
| :---------- | :-------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------ |
| `as`        | Specifies the HTML element or React component to render the banner as.                                                                  | `React.ElementType` (e.g., `div`, `span`). Internally rendered as `_Builtin.Block`.                                                              | `div`                                                                                                                     |
| `bnnr`      | Controls the overall visibility of the banner. If `false`, the component will not be rendered.                                         | `boolean` (`true`, `false`)                                                                                                                     | `true`                                                                                                                    |
| `bnnrTxtSrc`| The main text content displayed within the banner.                                                                                      | `React.ReactNode` (string, number, React element, etc.)                                                                                         | `"Default Text"`                                                                                                          |
| `bnnrIcnLnk`| The source URL for the icon displayed on the left side of the banner.                                                                   | `string` (URL). Can also be `""` or `null` if no icon is desired.                                                                               | `"Default"` (Placeholder; consider `""` or `null` for no icon)                                                            |
| `bnnrIcnRght`| The source URL for the icon displayed on the right side of the banner.                                                                  | `string` (URL). Can also be `""` or `null` if no icon is desired.                                                                               | `"Default"` (Placeholder; consider `""` or `null` for no icon)                                                            |
| `bnnrLink`  | The URL the banner navigates to when clicked.                                                                                           | `string` (URL). Can also be `""`.                                                                                                               | `"#"`                                                                                                                     |
| `bnnrClick` | Additional options or event handlers for the banner's click behavior, typically used for Devlink runtime properties.                    | `object` (e.g., `{ onClick: () => {} }`, `{ href: "/path" }`)                                                                                   | `{}`                                                                                                                      |
| `bnnrStyle` | Defines the visual style/theme of the banner, affecting its background and text color.                                                | `string` (`d` (Default), `i` (Info), `w` (Warning))                                                                                            | `d`                                                                                                                       |
| `bnnrClr`   | Used to override the default text color with a custom CSS variable, typically for specific branding or contrast needs.                  | `string` (Any valid CSS color variable, e.g., `var(--color--p500)`, `var(--color--n900)`)                                                       | `"n000"` (Passed as attribute; actual effect depends on CSS rules for `data-banner-color`)                              |

---
**Notes on Properties:**
*   **`Name`**: The exact name of the prop as used in the code (e.g., `bnnrTxtSrc`, `bnnrStyle`).
*   **`Description`**: Clearly explain the purpose and effect of the prop.
*   **`Possible Values`**: List all accepted data types, specific string literals, enums, or reference types. Provide examples where helpful.
*   **`Default Setting`**: Indicate the value the prop takes if it's not explicitly provided.
---

## Styling
This section describes how the **Banner** component is styled and how users can customize its appearance.

*   **Base Styles (`Banner.module.css` or similar):**
    *   Defines the core visual properties and layout for the banner element.
    *   Includes styles for full-width display, `display: flex` for content alignment, `padding`, `align-items: center` for vertical centering of content, and `border-radius`.
    *   Handles the default styling for text (`.banner-text`) and icons. It uses CSS pseudo-elements (`::before`, `::after`) or dedicated elements for `bnnrIcnLnk` and `bnnrIcnRght` respectively.
    *   Implements hover effects and transitions for interactive feedback when the banner is a link.

*   **Attribute-Based Styling / Modifier Classes:**
    *   **Style (`data-banner-style`):** Controls the primary appearance based on `bnnrStyle`.
        *   `d` (Default): Applies `--color--n100` background and `--color--n700` text.
        *   `i` (Info): Applies `--color--p100` background and `--color--p700` text.
        *   `w` (Warning): Applies `--color--fd100` background and `--color--fd700` text.
    *   **Color (`data-banner-color`):** Allows overriding the text color with a custom CSS variable specified by `bnnrClr`.
    *   **Icons (`data-icon-left`, `data-icon-right`):** Attributes are likely used to conditionally apply styles or background images/content for the left and right icons, controlled by `bnnrIcnLnk` and `bnnrIcnRght`.
    *   **Link Behavior:** The `href` and click handler from `bnnrLink` and `bnnrClick` are managed by the component's logic to make the entire banner clickable.

## Usage
This section provides practical examples of how to use the **Banner** component in your application.

```jsx
// Import the component
import { Banner } from './Banner';

// --- Basic Usage ---
// A simple banner with default text and styling.
<Banner bnnrTxtSrc="Welcome to our new feature!" />

// --- With Icons and Link ---
// Displays a banner with descriptive text, left and right icons, and a link to details.
<Banner
  bnnrTxtSrc="Click here for more details!"
  bnnrIcnLnk="https://example.com/icons/info-icon.png" // Replace with actual icon URL
  bnnrIcnRght="https://example.com/icons/arrow-right.png" // Replace with actual icon URL
  bnnrLink="/details"
/>

// --- Different Styles ---
// Demonstrates the use of different visual styles for announcements.
<>
  <Banner bnnrTxtSrc="This is a default banner." bnnrStyle="d" />
  <Banner bnnrTxtSrc="Information: Your session is about to expire." bnnrStyle="i" />
  <Banner bnnrTxtSrc="Warning: Please update your payment information." bnnrStyle="w" />
</>

// --- Conditional Display ---
// Shows how to control the banner's visibility using a state variable.
import { useState } from 'react';
const [showBanner, setShowBanner] = useState(true);

<button onClick={() => setShowBanner(!showBanner)}>Toggle Banner</button>
<Banner bnnr={showBanner} bnnrTxtSrc="This banner can be toggled." />

// --- Custom Color Override ---
// Example of overriding default text color for specific branding.
<Banner
  bnnrTxtSrc="Important Announcement!"
  bnnrStyle="d" // Default style
  bnnrClr="var(--color--p500)" // Override text color to primary blue
/>
```

## Related Components

* [AdaptIcon](AdaptIcon.md)
* [Avatar](Avatar.md)
* [Badge](Badge.md)

