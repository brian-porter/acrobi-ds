[Table of Contents](../../toc.md)

# Button Panel Component

## Overview
This section provides a concise overview of the **Button Panel** component. The **Button Panel** component is a container designed to hold and arrange multiple buttons in a visually appealing and organized manner. It provides options for horizontal and vertical alignment, as well as different styling options to suit various design needs, making it ideal for grouping related actions or controls.

## Properties
This section details all the configurable properties (props) that the **Button Panel** component accepts.

| Name          | Description                                                                                                  | Possible Values                                                                     | Default Setting |
| :------------ | :----------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------- | :-------------- |
| `as`          | Specifies the HTML element or React component to render as the root of the `BtnPanel`.                        | `React.ElementType` (e.g., `div`, `span`). Internally rendered as `_Builtin.Block`. | `_Builtin.Block`|
| `btnPanel`    | Controls the visibility of the button panel. If `false`, the component will not render.                    | `boolean` (`true`, `false`)                                                         | `true`          |
| `btnPanelDir` | Determines the layout direction of the buttons within the panel.                                             | `string` (`"h"` for horizontal, `"v"` for vertical)                                 | `"h"`           |
| `btnPanelStyle`| Applies a predefined visual style to the button panel.                                                       | `string` (`"d"` for default)                                                        | `"d"`           |
| `children`    | Represents the child elements (e.g., `Button` components) that will be rendered inside the button panel. | `React.ReactNode`                                                                   | `null`          |

---
**Notes on Properties:**
*   **`Name`**: The exact name of the prop as used in the code (e.g., `btnPanelDir`, `btnPanel`).
*   **`Description`**: Clearly explain the purpose and effect of the prop.
*   **`Possible Values`**: List all accepted data types, specific string literals, enums, or reference types. Provide examples where helpful.
*   **`Default Setting`**: Indicate the value the prop takes if it's not explicitly provided.
---

## Styling
This section describes how the **Button Panel** component is styled and how users can customize its appearance.

*   **Base Styles (`BtnPanel.module.css` or similar):**
    *   Defines the core visual properties and layout for the panel container.
    *   Uses CSS Flexbox properties to manage the arrangement of child buttons.
    *   Includes styles for general spacing and potentially borders or backgrounds for the panel itself.

*   **Attribute-Based Styling / Modifier Classes:**
    *   **Direction (`data-panel-dir`):** Controls the `flex-direction` CSS property based on the `btnPanelDir` prop.
        *   `"h"`: Sets `flex-direction: row;` (horizontal layout).
        *   `"v"`: Sets `flex-direction: column;` (vertical layout).
    *   **Style (`data-panel-style`):** Applies predefined visual themes or spacing adjustments based on the `btnPanelStyle` prop. The default `d` likely corresponds to standard spacing and no specific color theming beyond the child buttons.

## Usage
This section provides practical examples of how to use the **Button Panel** component in your application.

```jsx
// Import the component
import { BtnPanel } from './BtnPanel'; // Adjust path as needed
import { Button } from './Button';   // Assuming a Button component exists

// --- Basic Horizontal Panel ---
// Arranges child buttons in a row by default.
<BtnPanel>
  <Button text="Button 1" />
  <Button text="Button 2" />
  <Button text="Button 3" />
</BtnPanel>

// --- Vertical Panel ---
// Arranges child buttons in a column using the btnPanelDir="v" prop.
<BtnPanel btnPanelDir="v">
  <Button text="Action A" />
  <Button text="Action B" />
  <Button text="Action C" />
</BtnPanel>

// --- Conditional Rendering ---
// Demonstrates controlling the visibility of the entire panel.
import { useState } from 'react';
const [showPanel, setShowPanel] = useState(true);

<button onClick={() => setShowPanel(!showPanel)}>Toggle Panel</button>
<BtnPanel btnPanel={showPanel}>
  <Button text="Visible Button" />
</BtnPanel>

// --- Panel with Specific Styling (if available) ---
// Example if btnPanelStyle had more options, e.g., "grouped" or "spaced".
// <BtnPanel btnPanelStyle="grouped">
//   <Button text="Grouped 1" />
//   <Button text="Grouped 2" />
// </BtnPanel>
