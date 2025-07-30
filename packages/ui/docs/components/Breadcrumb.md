[Table of Contents](../../toc.md)

# Breadcrumb Component

## Overview
This section provides a concise overview of the **Breadcrumb** component.
The Breadcrumb component provides a hierarchical navigation trail, allowing users to easily track their location within a website's hierarchy and navigate back to previous levels. It consists of a `Breadcrumb` container and individual `BreadcrumbItem` components. The `Breadcrumb` component uses a `nav` tag and an unordered list (`ul`) for semantic structure, with Finsweet Attributes (`data-clr`, `data-fs`) for styling and functionality. The `BreadcrumbItem` represents each step in the path, typically displaying text and potentially an icon, with a visual separator between items.

**Example Content Structure:**
The **Breadcrumb** component provides a clear path of navigation for users, showing their current location within the site's structure. It typically includes a link to the homepage and subsequent levels of the hierarchy, separated by visual indicators.

## Properties
This section details all the configurable properties (props) that the **Breadcrumb** component accepts.

### Breadcrumb Component

| Name | Description | Possible Values | Default Setting |
|---|---|---|---|
| `as` | Specifies the HTML element type for the Breadcrumb container. | `React.ElementType` | `_Builtin.Block` |
| `homeClick` | An object containing props for the home link's click handler or other attributes. | `Types.Devlink.RuntimeProps` | `{}` |
| `itmMap` | A slot for mapping or rendering Breadcrumb Item components. If not provided, default items are rendered. | `Types.Devlink.Slot` | `""` |
| `itmClr` | Controls the color of the breadcrumb items. | `Types.Builtin.Text` (e.g., `"n700"`) | `"n700"` |
| `itmSz` | Controls the size of the breadcrumb items. | `Types.Builtin.Text` (e.g., `"xs"`) | `"xs"` |

### BreadcrumbItem Component

| Name | Description | Possible Values | Default Setting |
|---|---|---|---|
| `as` | Specifies the HTML element type for the Breadcrumb Item. | `React.ElementType` | `_Builtin.ListItem` |
| `itmClick` | An object containing props for the item's click handler or other attributes. | `Types.Devlink.RuntimeProps` | `{}` |
| `itmTxtSrc` | The text content for the breadcrumb item. | `React.ReactNode` | `"NodeName"` |

---
**Notes on Properties:**
*   **`Name`**: The exact name of the prop as used in the code.
*   **`Description`**: Clearly explain the purpose and effect of the prop.
*   **`Possible Values`**: List all accepted data types, specific string literals, enums, or reference types. Provide examples where helpful.
*   **`Default Setting`**: Indicate the value the prop takes if it's not explicitly provided.
---

## Styling
This section describes how the **Breadcrumb** component is styled and how users can customize its appearance.

*   **Base Styles (`Breadcrumb.module.css`):**
    *   `.brdcrm_list`: Styles the list of breadcrumb items using flexbox for horizontal layout and alignment.
    *   `.brdcrm_itm1`: Styles the first breadcrumb item (likely the "Home" link), applying padding and hover effects.

*   **Item Styles (`BreadcrumbItem.module.css`)**:
    *   `.brdcrm_itm`: Styles individual breadcrumb items, including padding and hover effects.
    *   `.brdcrm_line`: Styles the separator line between breadcrumb items, typically a vertical line with a border.

## Usage
This section provides practical examples of how to use the **Breadcrumb** component in your application.

```jsx
// Import the components
import { Breadcrumb } from './Breadcrumb';
import { BreadcrumbItem } from './BreadcrumbItem';

// --- Basic Breadcrumb Example ---
// A simple breadcrumb with default settings.
<Breadcrumb>
  <BreadcrumbItem itmTxtSrc="Home" />
  <BreadcrumbItem itmTxtSrc="Products" />
  <BreadcrumbItem itmTxtSrc="Electronics" />
</Breadcrumb>

// --- Breadcrumb with Custom Home Click Handler ---
// Example of passing a click handler to the home item.
<Breadcrumb homeClick={{ onClick: () => alert('Home clicked!') }}>
  <BreadcrumbItem itmTxtSrc="Home" />
  <BreadcrumbItem itmTxtSrc="Products" />
</Breadcrumb>

// --- Breadcrumb with Custom Item Text and Color ---
// Demonstrates setting custom text and color for items.
<Breadcrumb itmClr="primary" itmSz="r4">
  <BreadcrumbItem itmTxtSrc="Start" />
  <BreadcrumbItem itmTxtSrc="Middle" />
  <BreadcrumbItem itmTxtSrc="End" />
</Breadcrumb>

// --- Breadcrumb with Mapped Items ---
// Example of using the itmMap prop to dynamically render items.
const breadcrumbItems = [
  { id: 1, text: "Dashboard" },
  { id: 2, text: "Settings" },
  { id: 3, text: "Profile" },
];

<Breadcrumb itmMap={breadcrumbItems.map(item => (
  <BreadcrumbItem key={item.id} itmTxtSrc={item.text} />
))} />

```
---
**Notes on Usage:**
*   **Import Statement**: Ensure the import statements correctly point to the component files (`./Breadcrumb` and `./BreadcrumbItem`).
*   **Structure**: The `Breadcrumb` component expects `BreadcrumbItem` components as children or within the `itmMap` prop.
*   **Examples**: Provide clear, runnable code snippets that cover common use cases and demonstrate the functionality of various props.
*   **Comments**: Use comments within the code to explain what each example demonstrates or what specific props are doing.
---

## Related Components
This section lists other components that are often used in conjunction with or are related to the **Breadcrumb** component.

*   [Label](Label.md)

---
**Notes on Related Components:**
*   The `Label` component is used within `BreadcrumbItem` to display the text for each breadcrumb link.
