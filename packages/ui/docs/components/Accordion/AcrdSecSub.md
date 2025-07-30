[Table of Contents](toc.md)
# Accordion Section Sub-Section (AcrdSecSub)

*   [Overview](#overview)
*   [Properties](#properties)
*   [Styling](#styling)
*   [Usage](#usage)

## Overview

The `AcrdSecSub` component represents an individual selectable item within the content area of an `AcrdSec` (accordion section). It corresponds to a "SubCatName" or a specific selectable option within a broader category, as detailed in the `Accordion.md` documentation's "Step 2 - Select" phase.

When a user interacts with this component, it typically indicates a selection state (e.g., by displaying a checkmark), which is managed by the `secSubOn` prop. This selection action, as described in `Accordion.md`, might be followed by a brief pause before revealing the next step in a workflow, such as showing the keyboard and associated UI elements on mobile. This component utilizes the `MenuItem` component internally to render its content and handle interaction.

## Properties

This section details all the configurable properties (props) that the `AcrdSecSub` component accepts.

| Name | Description | Possible Values | Default Setting |
|---|---|---|---|
| `as` | The HTML element tag to render the sub-section item container as. | `React.ElementType` (e.g., `"div"`, `"li"`) | `_Builtin.Block` (typically a `div`) |
| `secSub` | Controls the visibility and rendering of the `AcrdSecSub` component. If `false`, the item will not be rendered. | `Types.Visibility.VisibilityConditions` (e.g., `true`, `false`) | `true` |
| `secSubIcn` | An optional icon to display alongside the sub-section item's name. | `React.ReactNode` (e.g., an SVG component, an icon font class, a string) | `"default"` (may render a default icon or no icon if not handled) |
| `secSubName` | The text content to display for the sub-section item. This represents the "SubCatName". | `React.ReactNode` (e.g., `string`, JSX element) | `"Sub-Section"` |
| `secSubClick` | A callback function or runtime props to be executed when the sub-section item is clicked. This prop is passed down to the `MenuItem` component used internally. | `Types.Devlink.RuntimeProps` (e.g., `{ fn: () => console.log('Sub-section clicked') }`) | `{}` |
| `secSubOn` | Indicates whether this sub-section item is currently selected. This prop directly controls the visual indication of selection (e.g., a checkmark) on the `MenuItem`. | `boolean` | `false` |

---
**Notes on Properties:**
*   **`Name`**: The exact name of the prop as used in the code (e.g., `secSubName`, `secSubOn`).
*   **`Description`**: Clearly explain the purpose and effect of the prop.
*   **`Possible Values`**: List all accepted data types, specific string literals, enums, or reference types. Provide examples where helpful.
*   **`Default Setting`**: Indicate the value the prop takes if it's not explicitly provided.
*   **Internal `MenuItem`**: This component uses `MenuItem` for rendering. The `tSelected={secSubOn}` prop is passed to `MenuItem`, which is how the checkmark or selection state is visually represented.

## Styling

This section describes how the `AcrdSecSub` component is styled and how users can customize its appearance.

*   **Base Styles (`AcrdSecSub.module.css`):**
    *   `.acrd_sec-sub`: This class is applied to the root container of the `AcrdSecSub` component. It's likely used to provide basic block-level styling or spacing for the item.

*   **Attribute-Based Styling / Modifier Classes:**
    *   The `AcrdSecSub` component primarily relies on its props to dictate behavior and appearance. The visual selection state (check mark) is handled internally by the `MenuItem` component based on the `secSubOn` prop. Specific modifier classes for `AcrdSecSub` itself are not explicitly defined in the provided CSS, suggesting styling is managed either by `MenuItem` or by the parent `AcrdSec`'s structure.

## Usage

This section provides practical examples of how to use the `AcrdSecSub` component in your application.

```jsx
// Import the component
import { AcrdSecSub } from './AcrdSecSub';

// --- Basic Example ---
// A single selectable item within an accordion section.
<AcrdSecSub secSubName="Option A" />

// --- Example: With Icon and Selected State ---
// Demonstrates an item that is currently selected, showing a checkmark.
// This relates to "Step 2 - Select" from Accordion.md, where selecting an item applies a checkmark.
<AcrdSecSub
  secSubName="Selected Option"
  secSubIcn={<i className="icon-check"></i>} // Example: Icon for the item itself
  secSubOn={true} // This prop triggers the checkmark visualization
/>

// --- Example: Handling Sub-Section Click ---
// Attaching a function to the item's click event. This might trigger the next step
// in a workflow as described in Accordion.md (e.g., after a 250ms pause).
const handleSubClick = () => {
  console.log("Sub-option clicked!");
  // Potentially trigger next step in a multi-step form or selection process.
};

<AcrdSecSub
  secSubName="Another Option"
  secSubClick={{ fn: handleSubClick }}
/>

// --- Example: Using AcrdSecSub within AcrdSec ---
// This shows how AcrdSecSub is typically used as a child of AcrdSec.
// Assume AcrdSec is imported and used like this:
/*
<AcrdSec
  secName="Data Types"
  secSubMap={
    <>
      <AcrdSecSub secSubName="Image" secSubOn={true} />
      <AcrdSecSub secSubName="Text Document" />
      <AcrdSecSub secSubName="Video" secSubIcn={<i className="icon-video"></i>} />
    </>
  }
/>
*/

// --- Example: Hiding a Sub-Section ---
<AcrdSecSub
  secSubName="Hidden Option"
  secSub={false} // This item will not be rendered
/>
```

---
**Notes on Usage:**
*   **Import Statement**: Ensure the import statement correctly points to the component file (`./AcrdSecSub`).
*   **Examples**: Provide clear, runnable code snippets that cover common use cases and demonstrate the functionality of various props.
*   **Comments**: Use comments within the code to explain what each example demonstrates or what specific props are doing.
*   **`Accordion.md` Context**: This component directly implements the "Step 2 - Select" interaction. The `secSubName` is the selectable "SubCatName". The `secSubOn` prop is crucial for indicating the selection state (the checkmark), and `secSubClick` handles the interaction that progresses the workflow.

---