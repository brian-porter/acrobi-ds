[Table of Contents](../../toc.md)

# Slider - Control Component

## Overview
This section provides a concise overview of the **Slider Control** component. The Slider control allows users to select a value or range of values by dragging a handle along a track. It's useful for settings, filters, and other interactive elements where users need to adjust a value within a continuous range, providing visual feedback as they interact.

## Properties
This section details all the configurable properties (props) that the **Slider Control** component accepts.

| Name      | Description                                                                                                   | Possible Values                                         | Default Setting |
| :-------- | :------------------------------------------------------------------------------------------------------------ | :------------------------------------------------------ | :-------------- |
| `value`   | The current value of the slider, which can be set programmatically or updated by user interaction.            | `number` (e.g., 0, 50, 100)                             | `0`             |
| `min`     | The minimum possible value the slider can represent.                                                          | `number` (e.g., 0, -10)                                 | `0`             |
| `max`     | The maximum possible value the slider can represent.                                                          | `number` (e.g., 100, 200)                               | `100`           |
| `step`    | The increment or decrement value when the slider handle is moved or when using keyboard controls.             | `number` (e.g., 1, 0.5, 10)                             | `1`             |
| `disabled`| Controls whether the slider is interactive or read-only. If `true`, users cannot adjust the slider value. | `boolean` (`true`, `false`)                             | `false`         |
| `label`   | The text or content displayed alongside the slider, explaining its purpose.                                   | `React.ReactNode` (e.g., `"Volume"`, `"Brightness"`)    | `""`            |
| `labelSize`| Sets the size of the slider's label text.                                                                   | `string` (e.g., `"sm"`, `"m"`, `"lg"`)                  | `""`            |
| `labelAlign`| Controls the alignment of the slider label relative to the slider itself.                                     | `string` (e.g., `"left"`, `"right"`, `"center"`)        | `""`            |
| `showValue`| Toggles the visibility of the value label displayed near the handle.                                          | `boolean` (`true`, `false`)                             | `true`          |
| `valueLabelSize`| Sets the size of the text for the value label.                                                          | `string` (e.g., `"xs"`, `"sm"`, `"m"`)                  | `""`            |

---
**Notes on Properties:**
*   **`Name`**: The exact name of the prop as used in the code (e.g., `value`, `min`).
*   **`Description`**: Clearly explain the purpose and effect of the prop.
*   **`Possible Values`**: List all accepted data types, specific string literals, enums, or reference types. Provide examples where helpful.
*   **`Default Setting`**: Indicate the value the prop takes if it's not explicitly provided.
---

## Styling
This section describes how the **Slider Control** is styled and how users can customize its appearance.

*   **Base Styles (`SliderCtrl.module.css` or similar):**
    *   Defines the core visual properties and layout for the slider component.
    *   The `.slider_wrapper` typically acts as a container for all slider elements.
    *   Styles are applied to manage the track (`.slider_track`), the draggable handle (`.slider_handle`), the fill area (`.slider_fill`), and the value label (`.slider_handle-value`).
    *   Uses CSS Flexbox for alignment of the label, track, and value.
    *   Crucially handles interactive states:
        *   **Hover**: Styling for the handle on hover.
        *   **Focus**: Styling for the handle when it has keyboard focus, often with a visible outline or shadow.
        *   **Checked/Active**: The handle and fill color change to indicate the selected value.
        *   **Disabled**: The entire slider becomes visually inert, with muted colors for the track, handle, and fill.

*   **Attribute-Based Styling / Modifier Classes:**
    *   Props like `value`, `min`, `max`, and `step` are used internally to calculate and apply styles dynamically (e.g., setting the `width` of `.slider_fill` and the `left` position of `.slider_handle`).
    *   The `disabled` prop would translate to CSS attributes (e.g., `data-disabled="true"`) or classes to alter the appearance of the track and handle.
    *   `label`, `labelSize`, `labelAlign`, `showValue`, and `valueLabelSize` props control the visibility and styling of the associated text elements.

## Usage
This section provides practical examples of how to use the **Slider Control** component in your application.

```jsx
// Import the component
import { SliderCtrl } from './SliderCtrl'; // Assuming this is the component name

// --- Basic Slider ---
// A standard slider allowing selection from 0 to 100, defaulting to 50.
<SliderCtrl
  value={50}
  min={0}
  max={100}
  step={1}
  label="Volume"
/>

// --- Slider with Custom Range and Step ---
// Allows adjustment from 1 to 10, with increments of 0.5.
<SliderCtrl
  value={5.5}
  min={1}
  max={10}
  step={0.5}
  label="Brightness"
  showValue={true} // Explicitly show value label
/>

// --- Disabled Slider ---
// A read-only slider displaying a set value.
<SliderCtrl
  value={75}
  min={0}
  max={100}
  label="Volume"
  disabled={true}
/>

// --- Slider with Label Alignment and Size ---
// Demonstrates styling options for the label.
<SliderCtrl
  value={25}
  min={0}
  max={100}
  label="Contrast"
  labelAlign="right"
  labelSize="lg"
  valueLabelSize="sm"
/>
```