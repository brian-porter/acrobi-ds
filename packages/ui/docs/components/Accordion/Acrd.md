[Table of Contents](toc.md)

# Accordion (Acrd)
*   [Overview](#overview)
*   [Properties](#properties)
*   [Styling](#styling)
*   [Usage](#usage)

## Overview

The `Acrd` component serves as the primary container for an accordion interface. It orchestrates the overall accordion functionality, allowing for the management of multiple collapsible sections (`AcrdSec`). This component implements the "Progressive Reveal" UX pattern, a strategy where users are presented with information or choices incrementally, revealing more options or details with each completed step. This approach simplifies complex workflows by focusing the user on one task at a time, building towards a final screen or result, as described in the `Accordion.md` documentation.

The `Acrd` component relies on the Finsweet Attributes library (via an embedded script) to manage the interactive behavior of the accordion, such as expanding/collapsing sections and controlling whether multiple sections can be open simultaneously. It provides attributes like `fs-accordion-element`, `fs-accordion-initial`, and `fs-accordion-single` to configure this behavior.

## Properties

This section details all the configurable properties (props) that the `Acrd` component accepts.

| Name | Description | Possible Values | Default Setting |
|---|---|---|---|
| `as` | The HTML element tag to render the main accordion container as. | `React.ElementType` (e.g., `"div"`, `"section"`, `"ul"`) | `_Builtin.Block` (typically a `div`) |
| `element` | Specifies the attribute value for `fs-accordion-element`. This attribute is used by the Finsweet Attributes library to identify and control accordion instances on the page. | `string` | `"group"` |
| `initial` | Sets the `fs-accordion-initial` attribute. This determines which accordion section (identified by its `fs-accordion-element` value and an index) is expanded by default when the component first loads. | `string` (e.g., `"1"`, `"2"`, etc.) | `"1"` |
| `single` | Sets the `fs-accordion-single` attribute. Controls whether only one section can be open at a time (`"true"`) or if multiple sections can be expanded simultaneously (`"false"`). | `string` (`"true"` or `"false"`) | `"true"` |
| `acrdItmMap` | Allows developers to programmatically pass in an array of accordion items (likely `AcrdSec` components or similar structures) to be rendered within the accordion. If not provided, default placeholder items will be rendered. | `React.ReactNode` (or `null`) | `null` (renders default items) |

---
**Notes on Properties:**
*   **`Name`**: The exact name of the prop as used in the code (e.g., `as`, `element`, `initial`, `single`, `acrdItmMap`).
*   **`Description`**: Clearly explain the purpose and effect of the prop.
*   **`Possible Values`**: List all accepted data types, specific string literals, enums, or reference types. Provide examples where helpful.
*   **`Default Setting`**: Indicate the value the prop takes if it's not explicitly provided.

## Styling

This section describes how the `Acrd` component is styled and how users can customize its appearance.

*   **Base Styles (`Acrd.module.css`):**
    *   `.acrdn_wrap`: This class is applied to the outermost wrapper element (`<_Component>`) and likely provides basic layout containment for the accordion component.
    *   `.acrdn_main`: This class is applied to the primary container element that holds the accordion sections. It's configured with Flexbox properties (`display: flex`, `flex-direction: column`, etc.) and grid properties, suggesting it manages the layout of the accordion items. It also includes the necessary `fs-accordion-*` attributes for Finsweet's JavaScript to target.
    *   `.hide`: A utility class used to hide the embedded script tag that loads the Finsweet Attributes library, ensuring it doesn't visibly affect the layout.

*   **Attribute-Based Styling / Modifier Classes:**
    *   The `Acrd` component primarily relies on HTML attributes (`fs-accordion-element`, `fs-accordion-initial`, `fs-accordion-single`) to configure its behavior, which are then interpreted by the external Finsweet script. Direct CSS modifier classes for styling the `Acrd` container itself are less common, with styling likely managed by the `AcrdSec` and its child components.

## Usage

This section provides practical examples of how to use the `Acrd` component in your application.

```jsx
// Import the component
import { Acrd } from './Acrd';
import { AcrdSec } from './AcrdSec'; // Assuming AcrdSec is imported for custom item mapping

// --- Basic Example ---
// A simple instance of the accordion, defaulting to one section open initially.
<Acrd />

// --- Example: Configuring Initial State and Single Open ---
// This accordion will have the second section open by default, and only one section can be open at a time.
<Acrd
  initial="2"       // Sets fs-accordion-initial="2"
  single="true"     // Sets fs-accordion-single="true" (default, but shown for clarity)
/>

// --- Example: Allowing Multiple Open Sections ---
// This accordion will have all sections closed initially, and multiple sections can be expanded.
<Acrd
  initial="none"    // Or another value indicating no initial open section if supported by Finsweet
  single="false"    // Sets fs-accordion-single="false"
/>

// --- Example: Using Custom Accordion Sections ---
// Demonstrates how to map custom AcrdSec components into the accordion.
// This is useful when you need more control over the content of each section.
const myAccordionSections = [
  <AcrdSec key="1" secName="Section 1" secSubMap={<p>Content for section 1</p>} />,
  <AcrdSec key="2" secName="Section 2" secSubMap={<p>Content for section 2</p>} />,
];

<Acrd
  acrdItmMap={myAccordionSections}
  initial="1"
/>

// --- Example: Customizing the Accordion Element Tag ---
// Renders the accordion container as a <section> tag instead of a <div>.
<Acrd
  as="section"
  element="my-custom-group" // Custom identifier for Finsweet
/>

```

---
**Notes on Usage:**
*   **Import Statement**: Ensure the import statement correctly points to the component file (`./Acrd`).
*   **Examples**: Provide clear, runnable code snippets that cover common use cases and demonstrate the functionality of various props.
*   **Comments**: Use comments within the code to explain what each example demonstrates or what specific props are doing.
*   **Finsweet Attributes**: Remember that the core accordion behavior (open/close, single/multi-open) is handled by the Finsweet Attributes library, which is loaded via the script tag within the `Acrd` component. Ensure the `element` prop value is unique if you have multiple accordions on a page.
*   **`Accordion.md` Context**: When using `Acrd`, consider the "Progressive Reveal" concept described in `Accordion.md`. This component sets up the structure for that pattern, and the child `AcrdSec` components will manage the individual steps.