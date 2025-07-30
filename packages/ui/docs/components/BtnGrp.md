[Table of Contents](../../toc.md)

# Button Group

## Overview
This section provides a concise overview of the **Button Group** component. The **Button Group** component is a versatile UI element designed for displaying groups of related buttons, commonly used for navigation or action sets. It supports customizable button labels, icons, and placement, and can be configured to render with or without example buttons. It's built to be flexible, allowing it to function as a standard block element and integrate with other components.

## Properties
This section details all the configurable properties (props) that the **Button Group** component accepts.

| Name | Description | Possible Values | Default Setting |
|---|---|---|---|
| `as` | Allows specifying the underlying HTML element for the component. | `React.ElementType` | `_Builtin.Block` |
| `btnGrp` | Controls the visibility of the button group. | `Types.Visibility.VisibilityConditions` | `true` |
| `btnLblSz` | Sets the size of the button labels within the group. | `Types.Builtin.Text` | `"r3"` |
| `btnLblClr` | Sets the color of the button labels within the group. | `Types.Builtin.Text` | `"n9997"` |
| `itmMap` | Likely used for mapping items or children to render within the group. | `Types.Devlink.Slot` | `""` |
| `example` | Controls whether to display a set of example buttons. | `Types.Visibility.VisibilityConditions` | `true` |

---
**Notes on Properties:**
*   **`Name`**: The exact name of the prop as used in the code (e.g., `btnLblSz`, `btnLblClr`).
*   **`Description`**: Clearly explain the purpose and effect of the prop.
*   **`Possible Values`**: List all accepted data types, specific string literals, enums, or reference types (like `React.ElementType`, `Types.Builtin.Text`). Provide examples where helpful.
*   **`Default Setting`**: Indicate the value the prop takes if it's not explicitly provided.
---

## Styling
This section describes how the **Button Group** component is styled and how users can customize its appearance.

*   **Base Styles (`BtnGrp.module.css`):**
    *   Defines the core visual properties and layout for the component.
    *   `.btn-grp_main`: Uses flexbox for layout (`display: flex`, `flex-direction: row`, `flex-wrap: nowrap`), sets a fixed height (`height: var(--size--36px)`), and applies a border-radius (`border-radius: var(--radius--br3)`).
    *   `.example-btngrp`: Also uses flexbox for layout (`display: flex`).
    *   The component utilizes `_utils.cx` for class name generation, which likely combines base styles with specific modifiers or states.

*   **Item Styles (`BtnGrpItm.module.css`):**
    *   `.btn-grp_itm`: Styles individual button items within the group. It's a flex container (`display: flex`) with relative positioning. It includes padding (`padding-right: 0.75rem`, `padding-left: 0.75rem`), centered content (`justify-content: center`, `align-items: center`), and borders on the top, bottom, and left sides (`border-top-style: solid`, `border-top-width: 1px`, `border-top-color: var(--color--n9992)`, etc.). It has a default background color (`background-color: var(--color--n000)`) and includes transitions for `background-color` and `color`. It also defines hover, active, and focus states, as well as a global style for the `.w--current` class.
    *   `.btn-grp_itm-link`: Styles the internal link element, making it absolute positioned to cover the entire item.

## Usage
This section provides practical examples of how to use the **Button Group** component in your application.

```jsx
// Import the component
import { BtnGrp } from './BtnGrp';
import { BtnGrpItm } from './BtnGrpItm'; // Assuming BtnGrpItm is also imported for examples

// --- Basic Example ---
// A simple instance of the component with minimal configuration.
<BtnGrp />

// --- Example: Displaying Custom Buttons ---
// Demonstrates passing custom text and icon configurations to individual items.
<BtnGrp>
  <BtnGrpItm btnTxtSrc="Prev" btnIcnSrc="nav_left" btnIcnLoc="l" />
  <BtnGrpItm btnTxtSrc="1" />
  <BtnGrpItm btnTxtSrc="2" />
  <BtnGrpItm btnTxtSrc="More" btnIcnSrc="Moreh" btnIcn={true} btnTxt={false} />
  <BtnGrpItm btnTxtSrc="Next" btnIcnSrc="nav_right" btnIcnLoc="r" />
</BtnGrp>

// --- Example: Controlling Label Size and Color ---
// Shows how to set the size and color for button labels.
<BtnGrp btnLblSz="r4" btnLblClr="primary">
  <BtnGrpItm btnTxtSrc="Action 1" />
  <BtnGrpItm btnTxtSrc="Action 2" />
</BtnGrp>

// --- Example: Using the 'example' prop ---
// Renders the default example button group.
<BtnGrp example={true} />

// --- Example: Hiding the example buttons ---
// Hides the default example buttons.
<BtnGrp example={false} />

// --- Example: Using 'itmMap' for dynamic rendering ---
// (Assuming itmMap is an array of button configurations)
// const buttonItems = [
//   { btnTxtSrc: "Item 1", btnIcnSrc: "icon1" },
//   { btnTxtSrc: "Item 2", btnIcnSrc: "icon2" },
// ];
// <BtnGrp itmMap={buttonItems.map((item, index) => (
//   <BtnGrpItm key={index} btnTxtSrc={item.btnTxtSrc} btnIcnSrc={item.btnIcnSrc} />
// ))} />

// --- Example: BtnGrpItm Properties ---
// Demonstrates various properties of the BtnGrpItm component.
<BtnGrpItm
  btnTxtSrc="Click Me"
  btnIcnSrc="star"
  btnIcnLoc="r"
  btnLoc="left"
  btnLink={{ href: "/some-page" }}
  btnClick={{ onClick: () => console.log("Item clicked!") }}
/>
<BtnGrpItm
  btnTxt={false} // Only icon
  btnIcnSrc="info"
  btnIcnLoc="center"
/>
<BtnGrpItm
  btnIcn={false} // Only text
  btnTxtSrc="Submit"
/>

```

---
**Notes on Usage:**
*   **Import Statement**: Ensure the import statement correctly points to the component file (`./BtnGrp` and `./BtnGrpItm`).
*   **Examples**: Provide clear, runnable code snippets that cover common use cases and demonstrate the functionality of various props.
*   **Comments**: Use comments within the code to explain what each example demonstrates or what specific props are doing.
*   **Prop Names**: Use the actual prop names defined for the component (`btnGrp`, `btnLblSz`, `btnLblClr`, `itmMap`, `example` for `BtnGrp`, and `btnTxtSrc`, `btnIcnSrc`, `btnIcnLoc`, `btnLoc`, `btnLink`, `btnClick` for `BtnGrpItm`). The examples above use these props and also demonstrate how `BtnGrpItm` props are passed down or used within the `BtnGrp` context.
---