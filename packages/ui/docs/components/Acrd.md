[Table of Contents](../../toc.md)

# Accordion

## Overview
This section provides a concise overview of the **Accordion** component.
The Accordion component is a UI element that allows users to expand and collapse sections of content. It is composed of a parent container (`Acrd`) and individual items (`AcrdItm`). The component utilizes Finsweet Attributes for its accordion functionality, managing states like initial open item and single open item.

**Example Content Structure:**
The **Accordion** component is a versatile UI element designed for organizing collapsible content sections. It supports various configurations for managing open states and can include custom content in its header and body.

## Properties
This section details all the configurable properties (props) that the **Accordion** component accepts.

### Acrd Component

| Name | Description | Possible Values | Default Setting |
|---|---|---|---|
| `as` | Specifies the HTML element type for the Accordion container. | `React.ElementType` | `_Builtin.Block` |
| `element` | Corresponds to the `fs-accordion-element` attribute, likely defining the accordion's role. | `Types.Builtin.Text` | `"group"` |
| `initial` | Corresponds to the `fs-accordion-initial` attribute, specifying which item is open by default. | `Types.Builtin.Text` | `"1"` |
| `single` | Corresponds to the `fs-accordion-single` attribute, controlling whether only one item can be open at a time. | `Types.Builtin.Text` | `"true"` |
| `acrdItmMap` | A slot for mapping or rendering Accordion Item components. | `Types.Devlink.Slot` | `""` |

### AcrdItm Component

| Name | Description | Possible Values | Default Setting |
|---|---|---|---|
| `as` | Specifies the HTML element type for the Accordion Item. | `React.ElementType` | `_Builtin.Block` |
| `acrdItm` | Controls the visibility or state of the accordion item. | `Types.Visibility.VisibilityConditions` | `true` |
| `titleTxtSrc` | The content for the accordion item's title/header. | `React.ReactNode` | `"Title for the accordion item"` |
| `bodySrc` | The content for the accordion item's body/content panel. | `React.ReactNode` | `"Body copy here lorem ipsum dolor sit amet, consectetur"` |

---
**Notes on Properties:**
*   **`Name`**: The exact name of the prop as used in the code.
*   **`Description`**: Clearly explain the purpose and effect of the prop.
*   **`Possible Values`**: List all accepted data types, specific string literals, enums, or reference types. Provide examples where helpful.
*   **`Default Setting`**: Indicate the value the prop takes if it's not explicitly provided.
---

## Styling
This section describes how the **Accordion** component is styled and how users can customize its appearance.

*   **Base Styles (`Acrd.module.css`):**
    *   `.hide`: Hides elements (`display: none;`).
    *   `.acrdn_main`: Styles the main accordion container, using flexbox for layout and grid for columns/rows. It defines `display: flex`, `flex-direction: column`, `flex-wrap: nowrap`, and grid properties for layout.

*   **Item Styles (`AcrdItm.module.css`)**:
    *   `.acrdn_itm`: Styles the individual accordion item container with borders, background, shadows, and transitions. Includes styles for default, hover, active, and expanded states.
    *   `.acrdn_header`: Styles the clickable header/trigger of an accordion item, using flexbox for alignment and including focus styles. It has a fixed height and padding.
    *   `.acrdn_arrow-icon`: Styles the arrow icon within the header, including a rotation for the active state and color.
    *   `.acrdn_content`: Styles the content panel of an accordion item, with `overflow: hidden` and `max-height` transition for animation.

## Usage
This section provides practical examples of how to use the **Accordion** component in your application.

```jsx
// Import the components
import { Acrd } from './Acrd';
import { AcrdItm } from './AcrdItm';

// --- Basic Accordion Example ---
// A simple accordion with default settings.
<Acrd>
  <AcrdItm titleTxtSrc="Section 1" bodySrc="Content for section 1." />
  <AcrdItm titleTxtSrc="Section 2" bodySrc="Content for section 2." />
</Acrd>

// --- Accordion with Initial Open Item ---
// Opens the second item by default.
<Acrd initial="2">
  <AcrdItm titleTxtSrc="Section 1" bodySrc="Content for section 1." />
  <AcrdItm titleTxtSrc="Section 2" bodySrc="Content for section 2." />
</Acrd>

// --- Accordion with Single Item Open ---
// Ensures only one item can be open at a time.
<Acrd single="true">
  <AcrdItm titleTxtSrc="Section A" bodySrc="Content for section A." />
  <AcrdItm titleTxtSrc="Section B" bodySrc="Content for section B." />
</Acrd>

// --- Accordion with Custom Content ---
// Using React nodes for titles and bodies.
<Acrd>
  <AcrdItm 
    titleTxtSrc={<strong>Custom Title 1</strong>} 
    bodySrc={
      <div>
        <p>This is custom content for section 1.</p>
        <button>Click Me</button>
      </div>
    } 
  />
  <AcrdItm titleTxtSrc="Section 2" bodySrc="Simple text content." />
</Acrd>

// --- Accordion with mapped items ---
// Example of using acrdItmMap prop (assuming it's an array of item data)
const accordionItemsData = [
  { id: 1, title: "Item One", content: "Content for item one." },
  { id: 2, title: "Item Two", content: "Content for item two." },
];

<Acrd acrdItmMap={accordionItemsData.map(item => (
  <AcrdItm key={item.id} titleTxtSrc={item.title} bodySrc={item.content} />
))} />

```

---
**Notes on Usage:**
*   **Import Statement**: Ensure the import statement correctly points to the component files (`./Acrd` and `./AcrdItm`).
*   **Finsweet Attributes**: The `fs-accordion-*` attributes are crucial for the component's functionality and should be present on the correct elements as shown in the examples.
*   **Examples**: Provide clear, runnable code snippets that cover common use cases and demonstrate the functionality of various props.
*   **Comments**: Use comments within the code to explain what each example demonstrates or what specific props are doing.
---

## Related Components
This section lists other components that are often used in conjunction with or are related to the **Accordion** component.

*   [Label](Label.md)
*   [Paragraph](Paragraph.md)

---
**Notes on Related Components:**
*   `Label` and `Paragraph` are used within `AcrdItm` to render the title and body content, respectively.
