[Table of Contents](../../toc.md)

# Badge Component

## Overview
This section provides a concise overview of the **Badge** component. Badges are small indicators that display supplemental information for a UI element. A badge can contain a number, icon, or short string of text. They are used to draw attention to status, counts, or notifications, often placed relative to another component.

## Properties
This section details all the configurable properties (props) that the **Badge** component accepts.

| Name        | Description                                                                                                          | Possible Values                                                                                             | Default Setting |
| :---------- | :------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------- | :-------------- |
| `as`        | Defines the HTML element type for the badge container.                                                               | `string` (Any valid React HTML element type, e.g., `div`, `span`)                                           | `div`           |
| `bdg`       | Controls the overall visibility of the badge. If `false`, the component will not render.                           | `boolean` (`true`, `false`)                                                                                 | `true`          |
| `bdgClr`    | Sets the background color of the badge.                                                                              | `string` (`d` (fd500), `w` (fw500), `s` (fs500), `p` (p500), `n` (n500), Any valid CSS color variable)       | `fd500`         |
| `bdgSz`     | Controls the size of the badge.                                                                                      | `string` (`S`, `M`, `L`)                                                                                    | `M`             |
| `bdgCont`   | Controls the visibility of the badge's content (icon and text).                                                    | `boolean` (`true`, `false`)                                                                                 | `true`          |
| `bdgTxt`    | Controls the visibility of the badge text.                                                                           | `boolean` (`true`, `false`)                                                                                 | `true`          |
| `bdgTxtSrc` | The content to display as the badge text.                                                                            | `React.ReactNode` (Any valid ReactNode, e.g., string, number, JSX element)                                  | `3`             |
| `bdgIcn`    | Controls the visibility of the badge icon.                                                                           | `boolean` (`true`, `false`)                                                                                 | `false`         |
| `bdgIcnSrc` | The source for the badge icon. This can be an icon component or a string representing an icon.                       | `React.ReactNode` (Any valid ReactNode, e.g., icon component, string)                                       | `Default`       |
| `bdgId`     | Sets a unique ID for the badge element.                                                                              | `string` (Any valid string)                                                                                 | `""`            |
| `bdgIcnSz`  | Controls the size of the badge icon.                                                                                 | `string` (`auto`, `3xl`, `2xl`, `xl`, `l`, `m`, `sm`, `s`, `xs` (r4))                                        | `xs` (`r4`)     |
| `bdgLoc`    | Sets the location of the badge relative to its parent container. This typically requires the parent to have `position: relative`. | `string` (`tr` (top-right), `tl` (top-left), `br` (bottom-right), `bl` (bottom-left))                       | `br`            |

---
**Notes on Properties:**
*   **`Name`**: The exact name of the prop as used in the code (e.g., `bdgTxtSrc`, `bdgClr`).
*   **`Description`**: Clearly explain the purpose and effect of the prop.
*   **`Possible Values`**: List all accepted data types, specific string literals, enums, or reference types. Provide examples where helpful.
*   **`Default Setting`**: Indicate the value the prop takes if it's not explicitly provided.
---

## Styling
This section describes how the **Badge** component is styled and how users can customize its appearance.

*   **Base Styles (`Badge.module.css` or similar):**
    *   Defines the core visual properties and layout for the badge element.
    *   Includes properties like `display`, `position` (typically `absolute` for placement relative to a parent), `padding`, `border-radius`, `font-size`, `background-color`, and `color`.
    *   Handles the default styling for `.badge-icon` and `.badge-text` elements within the badge.

*   **Attribute-Based Styling / Modifier Classes:**
    *   **Color (`data-badge-color`):** Sets the `background-color` and potentially the `color` based on the `bdgClr` prop (e.g., `d`, `w`, `s`, `p`, `n`).
    *   **Size (`data-badge-size`):** Adjusts `padding`, `min-width`, `min-height`, and `font-size` according to the `bdgSz` prop (`S`, `M`, `L`).
    *   **Content Visibility (`data-badge-content-visible`, `data-badge-text-visible`, `data-badge-icon-visible`):** Controls the display of the badge's overall content, text, or icon based on `bdgCont`, `bdgTxt`, and `bdgIcn` props.
    *   **Icon Size (`data-badge-icon-size`):** Sets the size of the icon within the badge, controlled by `bdgIcnSz`.
    *   **Location (`data-badge-location`):** Applies `top`, `right`, `bottom`, and `left` CSS properties to position the badge according to the `bdgLoc` prop (`tr`, `tl`, `br`, `bl`). This relies on the parent container having `position: relative`.

## Usage
This section provides practical examples of how to use the **Badge** component in your application.

```jsx
// Import the component
import { Badge } from './Badge';
import { Icon } from './Icon'; // Assuming an Icon component exists

// --- Basic Usage ---
// A simple badge with default text and color, placed within a relative container.
<div style={{ position: 'relative', width: '100px', height: '100px', border: '1px solid #ccc', margin: '10px' }}>
  <Badge bdgTxtSrc="New" />
</div>

// --- Badge with Icon ---
// Displays a badge with an icon (e.g., a star) and no text.
<div style={{ position: 'relative', width: '100px', height: '100px', border: '1px solid #ccc', margin: '10px' }}>
  <Badge bdgIcn={true} bdgIcnSrc={<Icon name="star" />} bdgTxt={false} />
</div>

// --- Customizing Badge Properties ---
// Shows a large badge with custom text, primary color, and located at the top-left.
<div style={{ position: 'relative', width: '100px', height: '100px', border: '1px solid #ccc', margin: '10px' }}>
  <Badge bdgTxtSrc="99+" bdgSz="L" bdgClr="p500" bdgLoc="tl" />
</div>

// --- Badge with Icon and Specific Location ---
// A small success badge with a checkmark icon at the bottom-left.
<div style={{ position: 'relative', width: '100px', height: '100px', border: '1px solid #ccc', margin: '10px' }}>
  <Badge
    bdgIcn={true}
    bdgIcnSrc="check" // Or <Icon name="check" /> if using Icon component
    bdgTxt={false}
    bdgSz="S"
    bdgClr="s"
    bdgLoc="bl"
  />
</div>

// --- Badge with Text and Icon Combined ---
// A medium badge with text and an icon, using the default location.
<div style={{ position: 'relative', width: '100px', height: '100px', border: '1px solid #ccc', margin: '10px' }}>
  <Badge bdgTxtSrc="Update v1.2" bdgIcn={true} bdgIcnSrc="arrow-up" bdgSz="M" bdgClr="w" />
</div>
```

## Related Components
* [AdaptIcon](AdaptIcon.md)
* [Avatar](Avatar.md)
* [Chip](Chip.md)

### You may also be interested in:
* [Icon](Icon.md)
* [Button](Button.md)
* [Label](Label.md)
* [Snackbar](Snackbar.md)
