[Table of Contents](../../toc.md)

# Button Component

## Overview
The Button component is a versatile and customizable UI element designed for user interaction. It supports various sizes, styles, and states, and can include both text and icons. It's built to be flexible, allowing it to function as a standard button or a link, and integrates with a labeling system for rich content display.

## Properties
The Button component accepts the following properties:

| Name | Description | Possible Values | Default Setting |
|---|---|---|---|
| `as` | Specifies the component to render the button as. | `React.ElementType` (e.g., `_Builtin.Link`, `button`, `a`) | `_Builtin.Link` |
| `btn` | Controls the overall visibility of the button component. | `true`, `false` | `true` |
| `btnIcn` | Determines if an icon should be displayed within the button. | `true`, `false` | `true` |
| `btnTxt` | Determines if text should be displayed within the button. | `true`, `false` | `true` |
| `btnTxtSrc` | The source string or component for the button's text content. | `React.ReactNode` (e.g., `"Submit"`, `"Click Me"`) | `"Button"` |
| `btnIconSrc` | The source string or component for the button's icon. | `React.ReactNode` (e.g., `"default"`, `"arrow-right"`) | `"default"` |
| `btnSz` | Defines the size of the button. | `"in"` (inherit), `"xs"` (extra small), `"s"` (small), `"m"` (medium), `"l"` (large), `"d"` (dynamic) | `""` |
| `btnStyl` | Sets the visual style of the button, combining color and type. | **Color:** `p` (Primary), `n` (Neutral), `l` (Light), `f` (Focus), `d` (Danger), `w` (Warn), `in` (Inherit) <br> **Type:** `f` (Fill), `l` (Line), `t` (Text) <br> **Combinations:** `pf`, `pl`, `pt`, `nf`, `nl`, `nt`, `lf`, `ll`, `lt`, `ff`, `fl`, `ft`, `df`, `dl`, `dt`, `wf`, `wl`, `wt`, `in` | `"nt"` (Neutral Text) |
| `btnIcnLoc` | Specifies the position of the icon relative to the text. | `"l"` (left), `"top"`, `"bottom"` | `"l"` |
| `lblSz` | Controls the size of the internal label component. | `Types.Builtin.Text` | `"in"` |
| `lblClr` | Controls the color of the internal label component. | `Types.Builtin.Text` | `"in"` |
| `lblGap` | Sets the spacing between the icon and text within the label. | `Types.Builtin.Text` (e.g., `"8"`, `"4"`) | `"8"` |
| `lblLc` | Applies line clamping to the label text. | `Types.Builtin.Text` | `""` |
| `lblShad` | Applies a shadow to the label. | `Types.Builtin.Text` (e.g., `"n"`) | `"n"` |
| `btnHug` | Adjusts the button's alignment, typically for form buttons. | `"r"` (right) | `""` |
| `btnShdw` | Applies a shadow effect to the button. | `Types.Builtin.Text` (e.g., `"n"`) | `"n"` |
| `target` | Specifies the `popovertarget` attribute for popover functionality. | `Types.Builtin.Text` (e.g., `"my-popover-id"`) | `""` |
| `btnId` | Sets a unique ID for the button element. | `Types.Builtin.Text` | `""` |
| `disabled` | Renders the button in a disabled state, preventing interaction. | `"true"`, `"false"` | `"false"` |
| `btnActive` | Renders the button in an active (selected) state. | `"true"`, `"false"` | `"false"` |
| `btnClick` | Event handler for the button's click event. | `Types.Devlink.RuntimeProps` | `{}` |
| `btnLink` | Configuration for the button when it acts as a link. | `Types.Basic.Link` (e.g., `{ href: "/path", target: "_blank" }`) | `{ href: "#" }` |

## Styling
The Button component is customized using CSS, through `Button.module.css` and `button.css`.

*   **Base Styles (`Button.module.css`):**
    *   Defines core visual properties for `.btn-link` and `.btn` classes, including layout (`position`, `display`, `flex` properties), dimensions (`min-height`, `min-width`), spacing (`padding`), borders (`border`, `border-radius`), background (`background-color`), shadows (`box-shadow`), and transitions.
    *   Includes `:hover` and `:focus-visible` states for interactive feedback.
    *   Responsive adjustments for smaller screens (`@media screen and (max-width: 767px)`).

*   **Attribute-Based Styling (`button.css`):**
    *   **Size (`data-btn-size`):** Controls `height`, `padding`, `font-size`, and `border-radius` based on the `btnSz` property.
    *   **Style (`data-btn-style`):** Dictates `background`, `border-width`, `border-color`, and `color` to achieve various visual themes (Primary, Neutral, Light, Focus, Danger, Warn) and types (Fill, Line, Text). Disabled states are also handled here.
    *   **Hug (`data-btn-hug`):** Influences alignment, specifically for right-aligned form buttons.
    *   **Icon Location (`data-icn-loc`):** Adjusts `flex-direction`, `grid-row-gap`, and `padding` to position the icon relative to the text (left, top, bottom).
    *   **Active State (`data-btn-active`):** Modifies `background`, `border`, `color`, and font weight for the active/selected appearance. It also handles icon capitalization for active states.

## Usage

```jsx
import { Button } from './Button';

// Basic Button
<Button btnTxtSrc="Click Me" />

// Primary Filled Button
<Button btnTxtSrc="Submit" btnStyl="pf" />

// Large Neutral Line Button with Icon on Right
<Button btnTxtSrc="Download" btnIconSrc="download" btnSz="l" btnStyl="nl" btnIcnLoc="r" />

// Disabled Button
<Button btnTxtSrc="Disabled Action" disabled="true" btnStyl="nf" />

// Button acting as a link
<Button btnTxtSrc="Visit Google" btnLink={{ href: "https://www.google.com", target: "_blank" }} />

// Button with custom click handler
<Button btnTxtSrc="Log Event" btnClick={{ onClick: () => console.log("Button clicked!") }} />

// Button with a specific ID and target for a popover
<Button btnTxtSrc="Open Popover" btnId="myPopoverBtn" target="myPopover" />
```

## Related Components
* [BtnPanel](BtnPanel.md)
* [Segmented-Button](Segmented-Button.md)
