[Table of Contents](../../toc.md)

# Segmented Button Component

## Overview
This section provides a concise overview of the **Segmented Button** component. The segmented button is a UI component that allows users to select one or more options from a group of related choices. It is commonly used for filtering content, navigating between different views, or toggling between related options, providing a compact and intuitive way to manage selections.

<!-- Segmented Button Example image would go here -->

## Properties
This section details all the configurable properties (props) that the **Segmented Button** component accepts.

| Name               | Description                                                                                                                             | Possible Values                                                                                             | Default Setting |
| :------------------| :-------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------- | :-------------- |
| `segBtn`           | Controls the overall visibility of the segmented button bar. If `false`, the entire component will not render.                            | `boolean` (`On`, `Off`)                                                                                     | `Off`           |
| `btn1`             | Toggles the visibility of the first button within the segmented bar.                                                                    | `boolean` (`On`, `Off`)                                                                                     | `Off`           |
| `btn2`             | Toggles the visibility of the second button within the segmented bar.                                                                     | `boolean` (`On`, `Off`)                                                                                     | `Off`           |
| `btn3`             | Toggles the visibility of the third button within the segmented bar.                                                                      | `boolean` (`On`, `Off`)                                                                                     | `Off`           |
| `btn4`             | Toggles the visibility of the fourth button within the segmented bar.                                                                     | `boolean` (`On`, `Off`)                                                                                     | `Off`           |
| `btn5`             | Toggles the visibility of the fifth button within the segmented bar.                                                                      | `boolean` (`On`, `Off`)                                                                                     | `Off`           |
| `segBtnClr`        | Sets the primary color theme for the segmented button bar.                                                                              | `string` (`Neutral` or `n`, `Primary` or `p`)                                                               | `undefined`     |
| `btn1Txt`          | Toggles the visibility of text on the first button.                                                                                     | `boolean` (`On`, `Off`)                                                                                     | `Off`           |
| `btn2Txt`          | Toggles the visibility of text on the second button.                                                                                    | `boolean` (`On`, `Off`)                                                                                     | `Off`           |
| `btn3Txt`          | Toggles the visibility of text on the third button.                                                                                     | `boolean` (`On`, `Off`)                                                                                     | `Off`           |
| `btn4Txt`          | Toggles the visibility of text on the fourth button.                                                                                    | `boolean` (`On`, `Off`)                                                                                     | `Off`           |
| `btn5Txt`          | Toggles the visibility of text on the fifth button.                                                                                     | `boolean` (`On`, `Off`)                                                                                     | `Off`           |
| `btn1Icn`          | Toggles the visibility of an icon on the first button.                                                                                  | `boolean` (`On`, `Off`)                                                                                     | `Off`           |
| `btn2Icn`          | Toggles the visibility of an icon on the second button.                                                                                 | `boolean` (`On`, `Off`)                                                                                     | `Off`           |
| `btn3Icn`          | Toggles the visibility of an icon on the third button.                                                                                  | `boolean` (`On`, `Off`)                                                                                     | `Off`           |
| `btn4Icn`          | Toggles the visibility of an icon on the fourth button.                                                                                 | `boolean` (`On`, `Off`)                                                                                     | `Off`           |
| `btn5Icn`          | Toggles the visibility of an icon on the fifth button.                                                                                  | `boolean` (`On`, `Off`)                                                                                     | `Off`           |
| `btn1TxtSrc`       | Specifies the text to display on the first button.                                                                                      | `string`                                                                                                    | `undefined`     |
| `btn2TxtSrc`       | Specifies the text to display on the second button.                                                                                     | `string`                                                                                                    | `undefined`     |
| `btn3TxtSrc`       | Specifies the text to display on the third button.                                                                                      | `string`                                                                                                    | `undefined`     |
| `btn4TxtSrc`       | Specifies the text to display on the fourth button.                                                                                     | `string`                                                                                                    | `undefined`     |
| `btn5TxtSrc`       | Specifies the text to display on the fifth button.                                                                                      | `string`                                                                                                    | `undefined`     |
| `btn1IcnSrc`       | Specifies the icon to display on the first button. Icon names are typically lowercase for inactive state, capitalized for active state. | `string` (Icon name)                                                                                        | `undefined`     |
| `btn2IcnSrc`       | Specifies the icon to display on the second button.                                                                                     | `string` (Icon name)                                                                                        | `undefined`     |
| `btn3IcnSrc`       | Specifies the icon to display on the third button.                                                                                      | `string` (Icon name)                                                                                        | `undefined`     |
| `btn4IcnSrc`       | Specifies the icon to display on the fourth button.                                                                                     | `string` (Icon name)                                                                                        | `undefined`     |
| `btn5IcnSrc`       | Specifies the icon to display on the fifth button.                                                                                      | `string` (Icon name)                                                                                        | `undefined`     |
| `btn1Actv`         | Determines how the first button is displayed when active (single or multi-select behavior).                                             | `string` (`Single select`, `Multi-select`)                                                                | `undefined`     |
| `btn2Actv`         | Determines how the second button is displayed when active.                                                                              | `string` (`Single select`, `Multi-select`)                                                                | `undefined`     |
| `btn3Actv`         | Determines how the third button is displayed when active.                                                                               | `string` (`Single select`, `Multi-select`)                                                                | `undefined`     |
| `btn4Actv`         | Determines how the fourth button is displayed when active.                                                                              | `string` (`Single select`, `Multi-select`)                                                                | `undefined`     |
| `btn5Actv`         | Determines how the fifth button is displayed when active.                                                                               | `string` (`Single select`, `Multi-select`)                                                                | `undefined`     |
| `data-seg-btn-size`| Controls the overall size of the segmented buttons and their container.                                                                 | `string` (`s`, `m`, `l`)                                                                                    | `m`             |
| `data-seg-btn-shape`| Controls the shape of the segmented buttons (e.g., border-radius).                                                                      | `string` (`r`: rounded, `s`: square)                                                                        | `r`             |
| `as`               | Specifies the HTML element type for the segmented button container (e.g., `div`).                                                       | `React.ElementType`                                                                                                       | `undefined`     |
| `className`        | Allows passing custom CSS classes for additional styling.                                                                                 | `string`                                                                                                    | `undefined`     |

---
**Notes on Properties:**
*   **`Name`**: The exact name of the prop as used in the code (e.g., `btn1TxtSrc`, `segBtnClr`).
*   **`Description`**: Clearly explain the purpose and effect of the prop.
*   **`Possible Values`**: List all accepted data types, specific string literals, enums, or reference types. Provide examples where helpful.
*   **`Default Setting`**: Indicate the value the prop takes if it's not explicitly provided.
---

## Styling
This section describes how the **Segmented Button** component is styled and how users can customize its appearance.

*   **Base Styles (`SegmentedButton.module.css` or similar):**
    *   Defines the core visual properties and layout for the segmented button group.
    *   Uses CSS Flexbox to arrange the buttons horizontally in a row.
    *   Includes styles for the container and individual buttons, managing borders, padding, background colors, typography, and interactive states (hover, focus, active).
    *   Styles for `segBtnClr` would apply a theme color to the active/selected buttons.

*   **Attribute-Based Styling / Modifier Classes:**
    *   **Size (`data-seg-btn-size`):** The `data-seg-btn-size` attribute controls the overall scale of the segmented buttons, affecting padding, font size, and potentially button dimensions.
    *   **Shape (`data-seg-btn-shape`):** The `data-seg-btn-shape` attribute applies `border-radius` to create rounded or square button segments.
    *   **Button Content:** Props like `btn#Txt`, `btn#Icn`, `btn#TxtSrc`, `btn#IcnSrc` control the visibility and content of text and icons on each button segment.
    *   **Active State (`btn#Actv`):** This prop determines the visual styling when a button is active, differentiating between single and multi-select behaviors. Active buttons typically have a distinct background color, border, and text color.

## Usage
This section provides practical examples of how to use the **Segmented Button** component in your application.

```jsx
// Import the component
import { SegmentedButton } from './SegmentedButton'; // Adjust path as needed

// --- Basic Segmented Button (Two Options) ---
// Creates a segmented button with two options, colored with primary theme.
function BasicSegmentedButton() {
  return (
    <SegmentedButton
      segBtn={true} // Ensure the component is visible
      btn1={true}
      btn2={true}
      segBtnClr="p" // Primary color theme
      btn1TxtSrc="Option 1"
      btn2TxtSrc="Option 2"
      data-seg-btn-size="m" // Medium size
      data-seg-btn-shape="r" // Rounded shape
    />
  );
}

// --- Segmented Button with Icons and Multi-Select ---
// Demonstrates a segmented button with icons, text, and multi-select behavior.
function SegmentedButtonWithOptions() {
  return (
    <SegmentedButton
      segBtn={true}
      btn1={true}
      btn2={true}
      btn3={true}
      segBtnClr="n" // Neutral color theme
      btn1TxtSrc="Filter A"
      btn1Icn={true}
      btn1IcnSrc="filter-icon-a" // Example icon name
      btn1Actv="Multi-select" // Allows multiple selections
      btn2TxtSrc="Filter B"
      btn2Icn={true}
      btn2IcnSrc="filter-icon-b"
      btn2Actv="Multi-select"
      btn3TxtSrc="Filter C"
      btn3Icn={true}
      btn3IcnSrc="filter-icon-c"
      btn3Actv="Single select" // Default behavior if not specified
      data-seg-btn-size="l" // Large size
      data-seg-btn-shape="s" // Square shape
    />
  );
}

// --- Segmented Button with Disabled Buttons ---
// Shows a segmented button where some options are disabled.
function DisabledSegmentedButton() {
  return (
    <SegmentedButton
      segBtn={true}
      btn1={true}
      btn2={true}
      btn3={true}
      segBtnClr="p"
      btn1TxtSrc="Active"
      btn2TxtSrc="Disabled Option"
      btn2Actv="Disabled" // Assuming 'Disabled' is a valid state for btn#Actv
      btn3TxtSrc="Another Active"
      data-seg-btn-size="m"
    />
  );
}
```
## Notes on Usage:
Import Statement: Ensure the import statement correctly points to the component file.
**'Examples:'** Provide clear, runnable code snippets that cover common use cases and demonstrate the functionality of various props.
**'Comments:'** Use comments within the code to explain what each example demonstrates or what specific props are doing.
**'Button Configuration:'** Each button segment (btn1 through btn5) can be configured independently for visibility, text, icon, and active state.
segBtnClr: This prop applies a color theme to the active state of the buttons.

## Accessibility
This section outlines important considerations for making the Segmented Button component accessible.
**'Keyboard Navigation:'** Ensure users can navigate through the segmented buttons using the Tab key and select/deselect options using the Spacebar or Enter key.
**'ARIA Attributes:'** Use appropriate ARIA attributes such as role="group" for the container, role="button" or role="checkbox"/"radio" for individual segments, aria-pressed (for toggle/state) or aria-checked (for selected state), and aria-label where necessary to describe the button's action or state.
**'Clear State Indication:'** Visually distinguish the selected state from the unselected state clearly, not relying solely on color.
**'Touch Targets:'** Ensure sufficient spacing and touch target size for usability on touch devices.

## Related Components
* [Button](Button.md)
* [BtnPanel](BtnPanel.md)
