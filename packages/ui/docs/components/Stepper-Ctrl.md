[Table of Contents](../../toc.md)

# Stepper - Control Component

## Overview
This section provides a concise overview of the **Stepper Control** component. The Stepper control allows users to increment or decrement a value by a specified step. It's commonly used for quantity selection or numerical adjustments, providing a simple, interactive way to modify numerical inputs.

## Properties
This section details all the configurable properties (props) that the **Stepper Control** component accepts.

| Name       | Description                                                                                                   | Possible Values                                                               | Default Setting |
| :--------- | :------------------------------------------------------------------------------------------------------------ | :---------------------------------------------------------------------------- | :-------------- |
| `value`    | The current numerical value of the stepper.                                                                   | `number` (e.g., 0, 5, 10)                                                     | `0`             |
| `min`      | The minimum allowable value for the stepper.                                                                  | `number` (e.g., 0, -5)                                                        | `0`             |
| `max`      | The maximum allowable value for the stepper.                                                                  | `number` (e.g., 100, 50)                                                      | `100`           |
| `step`     | The amount by which the value is incremented or decremented with each button click.                           | `number` (e.g., 1, 2, 0.5)                                                    | `1`             |
| `disabled` | Controls whether the stepper is interactive or read-only. If `true`, users cannot adjust the value.           | `boolean` (`true`, `false`)                                                   | `false`         |
| `label`    | The text or content displayed alongside the stepper, explaining its purpose.                                  | `React.ReactNode` (e.g., `"Quantity"`, `"Items"`)                             | `""`            |
| `labelSize`| Sets the size of the stepper's label text.                                                                    | `string` (e.g., `"sm"`, `"m"`, `"lg"`)                                        | `""`            |
| `labelAlign`| Controls the alignment of the stepper label relative to the stepper component.                                | `string` (e.g., `"left"`, `"right"`, `"center"`)                              | `""`            |
| `onValueChange`| Callback function triggered when the stepper's value is changed by user interaction or programmatically. | `(newValue: number) => void`                                                  | `() => {}`      |

---
**Notes on Properties:**
*   **`Name`**: The exact name of the prop as used in the code (e.g., `value`, `step`).
*   **`Description`**: Clearly explain the purpose and effect of the prop.
*   **`Possible Values`**: List all accepted data types, specific string literals, enums, or reference types. Provide examples where helpful.
*   **`Default Setting`**: Indicate the value the prop takes if it's not explicitly provided.
---

## Styling
This section describes how the **Stepper Control** is styled and how users can customize its appearance.

*   **Base Styles (`InputStepper.module.css` or similar):**
    *   Defines the core visual properties and layout for the stepper component.
    *   Uses a flex container (`.inpstep_wrap`) for arranging the decrement button, value display, and increment button.
    *   `inpstep_wrap` aligns items vertically and specifies minimum heights for desktop (36px) and mobile (40px).
    *   The increment/decrement buttons (`.inpstep-btn`) are styled as circular elements (36px width/height) with pointer cursors and focus-visible states.
    *   The value display (`.inpstep-value`) is styled for text presentation and alignment.

*   **Attribute-Based Styling / Modifier Classes:**
    *   The `disabled` prop translates to CSS attributes (e.g., `data-disabled="true"`) or classes applied to the buttons and potentially the container, visually disabling the component.
    *   The `value`, `min`, `max`, and `step` props are managed by the component's internal logic to update the value display and enable/disable buttons based on boundaries.
    *   Props like `label`, `labelSize`, and `labelAlign` would control the appearance and positioning of an associated label element.

## Usage
This section provides practical examples of how to use the **Stepper Control** component in your application.

```jsx
// Import the component
import { StepperCtrl } from './StepperCtrl'; // Assuming the component name
import { useState } from 'react';

// --- Basic Stepper ---
// A simple stepper for quantity selection, defaulting to 0.
function BasicStepper() {
  const [quantity, setQuantity] = useState(0);

  return (
    <StepperCtrl
      value={quantity}
      min={0}
      max={10}
      step={1}
      label="Quantity"
      onValueChange={setQuantity}
    />
  );
}

// --- Stepper with Custom Range and Label ---
// Allows adjustment from 1 to 5, with a label and custom step.
function CustomStepper() {
  const [items, setItems] = useState(1);

  return (
    <StepperCtrl
      value={items}
      min={1}
      max={5}
      step={1}
      label="Items"
      labelAlign="right"
      onValueChange={setItems}
    />
  );
}

// --- Disabled Stepper ---
// A read-only stepper displaying a set value.
function DisabledStepper() {
  return (
    <StepperCtrl
      value={3}
      min={0}
      max={5}
      step={1}
      label="Rating Count"
      disabled={true}
    />
  );
}
```

