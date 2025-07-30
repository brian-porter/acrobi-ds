[Table of Contents](toc.md)
# Accordion Section (AcrdSec)

*   [Overview](#overview)
*   [Properties](#properties)
*   [Styling](#styling)
*   [Usage](#usage)

## Overview

The `AcrdSec` component represents a single, collapsible section within a larger accordion structure managed by the `Acrd` component. It functions as a "CategoryName" or a primary grouping level in the user interface, as described in the `Accordion.md` documentation's "Step 1 - Find" phase. Users interact with the `AcrdSec`'s header (trigger area) to expand or collapse its content area, revealing or hiding sub-items or related information.

This component plays a key role in the "Progressive Reveal" pattern. When the `AcrdSec` is expanded, it exposes its child content, which can include a list of selectable sub-items (`AcrdSecSub`) or custom content provided via the `secSubMap` slot. The `AcrdSec` component itself maintains its accordion state (expanded/collapsed) independently, managed by the parent `Acrd` and the underlying Finsweet Attributes library.

## Properties

This section details all the configurable properties (props) that the `AcrdSec` component accepts.

| Name | Description | Possible Values | Default Setting |
|---|---|---|---|
| `as` | The HTML element tag to render the accordion section container as. | `React.ElementType` (e.g., `"div"`, `"section"`) | `_Builtin.Block` (typically a `div`) |
| `acrdSec` | Controls the visibility and rendering of the entire `AcrdSec` component. If `false`, the section will not be rendered. | `Types.Visibility.VisibilityConditions` (e.g., `true`, `false`, conditional logic) | `true` |
| `secIcn` | An optional icon to display alongside the section's name in the header. | `React.ReactNode` (e.g., an SVG component, an icon font class, a string) | `"default"` (may render a default icon or no icon if not handled) |
| `secName` | The text content to display in the header of the accordion section. This represents the "CategoryName". | `React.ReactNode` (e.g., `string`, JSX element) | `"Section"` |
| `secClick` | A callback function or runtime props to be executed when the accordion section header is clicked. This prop is passed down to the `MenuItem` component used internally for the header. | `Types.Devlink.RuntimeProps` (e.g., `{ fn: () => console.log('Section clicked') }`) | `{}` |
| `secSubMap` | A slot prop that allows custom content, typically an array of `AcrdSecSub` components or other React nodes, to be rendered within the expanded content area of the accordion section. | `Types.Devlink.Slot` (e.g., `React.ReactNode` array) | `null` |
| `secSub` | Controls the visibility of the default sub-section content if `secSubMap` is not provided. If `true`, default sub-sections might be rendered; if `false`, they won't. | `Types.Visibility.VisibilityConditions` (e.g., `true`, `false`) | `true` |

---
**Notes on Properties:**
*   **`Name`**: The exact name of the prop as used in the code (e.g., `secName`, `secIcn`, `secSubMap`).
*   **`Description`**: Clearly explain the purpose and effect of the prop.
*   **`Possible Values`**: List all accepted data types, specific string literals, enums, or reference types. Provide examples where helpful.
*   **`Default Setting`**: Indicate the value the prop takes if it's not explicitly provided.
*   **Internal `MenuItem`**: The `AcrdSec` uses a `MenuItem` component for its header. Props like `secName`, `secIcn`, and `secClick` are likely passed down to this `MenuItem`. The `tAcrdArrw={true}` prop passed to `MenuItem` likely controls the display of the accordion expand/collapse arrow.

## Styling

This section describes how the `AcrdSec` component is styled and how users can customize its appearance.

*   **Base Styles (`AcrdSec.module.css`):**
    *   `.acrd_itm`: This class provides basic styling for the container of a single accordion item, including its header and collapsible content. It uses `display: flex` and `flex-direction: column`.
    *   `.acrd_itm-trig`: Styles the clickable header or trigger area of the accordion item. It's set up with `display: flex`, `flex-direction: row`, alignment properties, and a `cursor: pointer` to indicate interactivity. It also includes `focus-visible` styles for accessibility. This is the element that the Finsweet script targets for click events.
    *   `.acrd_itm-cont`: Styles the collapsible content panel. It uses `display: flex`, `flex-direction: column`, `overflow: hidden`, and `padding-left` to visually indent the content. The `Accordion - Open` and `Accordion - Close` interaction logic (defined in `AcrdSec.js` via `_interactionsData`) manipulates the `height` and `display` properties of this element to create the animation.

*   **Attribute-Based Styling / Modifier Classes:**
    *   The `AcrdSec` component itself does not appear to use specific attribute-based styling for its primary function. Its behavior and appearance are mainly controlled by the CSS classes defined in `AcrdSec.module.css`. The internal `MenuItem` component might utilize attribute-based styling for its internal elements (like the arrow or selection indicator).

## Usage

This section provides practical examples of how to use the `AcrdSec` component in your application.

```jsx
// Import the component
import { AcrdSec } from './AcrdSec';
import { AcrdSecSub } from './AcrdSecSub'; // For mapping sub-items

// --- Basic Example ---
// A simple accordion section with default text.
<AcrdSec secName="Categories" />

// --- Example: With Icon and Custom Content ---
// An accordion section displaying a category name with an icon and custom sub-sections.
// This relates to "Step 1 - Find" from Accordion.md where selecting the category reveals these options.
<AcrdSec
  secName="Community"
  secIcn={<i className="icon-community"></i>} // Example: Using an icon font class
  secSubMap={
    <>
      <AcrdSecSub secSubName="Posts" secSubIcn={<i className="icon-post"></i>} />
      <AcrdSecSub secSubName="Groups" secSubIcn={<i className="icon-group"></i>} />
    </>
  }
/>

// --- Example: Section without Sub-Sections (e.g., for adding new items) ---
// As noted in Accordion.md, if a category has no child level, the arrow is hidden.
// This example assumes such a scenario, potentially rendering only the MenuItem without the arrow.
// The 'secSub' prop might control rendering of default children. Setting it to false
// or providing an empty secSubMap would achieve this.
<AcrdSec
  secName="People"
  secSub={false} // Ensures no default sub-sections are shown
/>

// --- Example: Handling Section Click ---
// Attaching a function to the section header click event.
const handleSectionClick = () => {
  console.log("Category section clicked!");
  // This could potentially trigger a navigation or data fetch.
};

<AcrdSec
  secName="Settings"
  secClick={{ fn: handleSectionClick }}
/>

// --- Example: Accordion Section Rendering as a <section> tag ---
<AcrdSec
  as="section"
  secName="More Options"
/>

```

---
**Notes on Usage:**
*   **Import Statement**: Ensure the import statement correctly points to the component file (`./AcrdSec`).
*   **Examples**: Provide clear, runnable code snippets that cover common use cases and demonstrate the functionality of various props.
*   **Comments**: Use comments within the code to explain what each example demonstrates or what specific props are doing.
*   **`Accordion.md` Context**: This component embodies the "Step 1 - Find" part of the accordion workflow. The `secName` is the selectable "CategoryName". The `secSubMap` prop is where the "child-level options" are provided, setting the stage for "Step 2 - Select".

