[Table of Contents](../../toc.md)
# Slider - Form Component

## Overview
This section provides a concise overview of the **SliderForm** component. The `SliderForm` component is used to create a slider form field. It bundles a label, a slider control, and optional helper text into a single, reusable component, providing a user-friendly way to adjust numerical values within a defined range.

![field-slider](https://github.com/user-attachments/assets/c09a8077-0023-464c-952a-76c2b620d339)

## Properties
This section details all the configurable properties (props) that the **SliderForm** component accepts.

| Name                | Description                                                                                                                                             | Possible Values                                                                                                                                          | Default Setting   |
| :------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------- |
| `as`                | Specifies the HTML element or React component to render the form field as.                                                                              | `React.ElementType`                                                                                                                                      | `_Builtin.Block`  |
| `fld`               | Determines whether the entire field component is displayed.                                                                                             | `boolean` (`true` to show, `false` to hide)                                                                                                              | `true`            |
| `lblTop`            | Controls if the main label is displayed at the top of the field.                                                                                        | `boolean` (`true`, `false`)                                                                                                                              | `true`            |
| `lblTopLblSrc`      | The primary text content for the label displayed at the top of the form.                                                                                | `string` (e.g., "Volume")                                                                                                                                | `"Label"`         |
| `lblTopLblFor`      | The `for` attribute for the top label, associating it with the slider input's `id`.                                                                     | `string` (Should match the `id` of the slider input)                                                                                                     | `""`              |
| `fldHelp`           | Determines whether helper text is displayed for the field.                                                                                              | `boolean` (`true` to show, `false` to hide)                                                                                                              | `false`           |
| `fieldSingleSlide`  | Internal flag to indicate if a single slider is being used.                                                                                             | `boolean`                                                                                                                                                | `true`            |
| `fieldDualSlide`    | Internal flag to indicate if a dual-handle (range) slider is being used.                                                                                | `boolean`                                                                                                                                                | `false`           |
| `fieldSliderMin`    | The minimum value for the slider control.                                                                                                               | `string` (numeric value, e.g., `"0"`)                                                                                                                    | `"0"`             |
| `fieldSliderMax`    | The maximum value for the slider control.                                                                                                               | `string` (numeric value, e.g., `"100"`)                                                                                                                  | `"100"`           |
| `fieldSliderStep`   | The step increment for the slider control.                                                                                                              | `string` (numeric value, e.g., `"1"`)                                                                                                                    | `"1"`             |
| `fieldSliderValue`  | The initial or current value of the slider control.                                                                                                     | `string` (numeric value, e.g., `"50"`)                                                                                                                   | `"0"`             |
| `fieldFillId`       | ID for the slider's fill element.                                                                                                                       | `string`                                                                                                                                                 | `undefined`       |
| `fieldHandleId`     | ID for the slider's handle element.                                                                                                                     | `string`                                                                                                                                                 | `undefined`       |
| `fieldTrackId`      | ID for the slider's track element.                                                                                                                      | `string`                                                                                                                                                 | `undefined`       |
| `fieldWrapperId`    | ID for the slider's wrapper element.                                                                                                                    | `string`                                                                                                                                                 | `undefined`       |
| `fieldStart`        | The start value, likely for a single slider or the first handle of a dual slider.                                                                       | `string`                                                                                                                                                 | `undefined`       |
| `fieldStart2`       | The second start value, specifically for a dual-handle slider.                                                                                          | `string`                                                                                                                                                 | `undefined`       |
| `fldHelpHelpL`      | Determines if helper text is displayed on the left side.                                                                                              | `boolean` (`true`, `false`)                                                                                                                              | `true`            |
| `fldHelpHelpR`      | Determines if helper text is displayed on the right side.                                                                                             | `boolean` (`true`, `false`)                                                                                                                              | `false`           |
| `fldHelpHelpLSrc`   | The source text for the left-aligned helper text.                                                                                                     | `React.ReactNode`                                                                                                                                        | `"helper copy"`   |
| `fldHelpHelpRSrc`   | The source text for the right-aligned helper text.                                                                                                    | `React.ReactNode`                                                                                                                                        | `"0/200"`         |
| `lblTopLblSz`       | Sets the size of the top label text.                                                                                                                    | `string` (e.g., `"r4"`)                                                                                                                                  | `"r4"`            |
| `lblTopLblClr`      | Sets the color of the top label text.                                                                                                                   | `string` (e.g., `"n900"`)                                                                                                                                | `"n900"`          |
| `lblTopLblShdw`     | Applies a shadow effect to the top label text.                                                                                                          | `string`                                                                                                                                                 | `""`              |
| `lblTopOpt`         | Toggles the display of an optional indicator next to the top label.                                                                                     | `boolean` (`true`, `false`)                                                                                                                              | `false`           |
| `lblTopOptSrc`      | The text content for the optional indicator (e.g., "required").                                                                                         | `string` (e.g., `"required"`)                                                                                                                            | `"required"`      |
| `lblTopOptSz`       | Sets the size of the optional indicator text.                                                                                                           | `string` (e.g., `"r4"`)                                                                                                                                  | `"r4"`            |
| `lblTopOptClr`      | Sets the color of the optional indicator text.                                                                                                          | `string` (e.g., `"n300"`)                                                                                                                                | `"n300"`          |
| `fieldValue`        | The display value shown for the slider (may be the same as `fieldSliderValue` or a formatted version).                                                | `string`                                                                                                                                                 | `undefined`       |
| `fieldOnChange`     | Callback function triggered when the slider's value changes.                                                                                           | `(newValue: string) => void`                                                                                                                             | `() => {}`        |
| `disabled`          | Controls whether the entire slider field (including the slider control) is interactive or read-only.                                                  | `boolean` (`true`, `false`)                                                                                                                              | `false`           |
| `label`             | A shortcut for the main label text (`lblTopLblSrc`).                                                                                                  | `string`                                                                                                                                                 | `undefined`       |
| `helperText`        | A shortcut for the primary helper text, potentially mapping to `fldHelpHelpLSrc` or a combination.                                                      | `string`                                                                                                                                                 | `undefined`       |
| `showValue`         | Toggles the visibility of the value label displayed near the slider handle.                                                                             | `boolean` (`true`, `false`)                                                                                                                              | `true`            |
| `valueLabelSize`    | Sets the size of the text for the value label.                                                                                                          | `string` (e.g., `"xs"`, `"sm"`)                                                                                                                            | `undefined`       |

---
**Notes on Properties:**
*   **`Name`**: The exact name of the prop as used in the code (e.g., `fieldSliderMax`, `lblTopLblSrc`).
*   **`Description`**: Clearly explain the purpose and effect of the prop.
*   **`Possible Values`**: List all accepted data types, specific string literals, enums, or reference types. Provide examples where helpful.
*   **`Default Setting`**: Indicate the value the prop takes if it's not explicitly provided.
---

## Styling
This section describes how the **SliderForm** component is styled and how users can customize its appearance.

*   **Base Styles (`SliderForm.module.css` or similar):**
    *   Defines the core visual properties and layout for the slider form field.
    *   `form_itm_wrap`: Styles the main container, using flexbox for alignment (`position: relative`, `align-items: center`, `flex: 1`).
    *   `form_main`: Styles the primary content area, setting `position: relative`, `display: flex`, `height: 100%`, `min-height: auto`, `margin-bottom: 0px`, `padding`, `flex-direction: column`, `align-self: stretch`, and `flex: 0 0 auto`. It also includes gap properties for internal spacing.
    *   These styles manage the overall layout, alignment of the label, slider control, and helper text, as well as spacing between elements.

*   **Attribute-Based Styling / Modifier Classes:**
    *   Props related to the label (`lblTop`, `lblTopLblSrc`, `lblTopOpt`, etc.) configure the label element.
    *   Props related to helper text (`fldHelp`, `fldHelpHelpLSrc`, etc.) configure the helper text display.
    *   The core slider functionality is driven by props like `fieldSliderMin`, `fieldSliderMax`, `fieldSliderStep`, `fieldSliderValue`, and `fieldValue`, which are passed to an underlying slider component.
    *   The `fieldSingleSlide` and `fieldDualSlide` props likely dictate whether a single-handle or dual-handle slider is rendered.
    *   The `disabled` prop would apply styles to visually indicate and functionally disable the slider.
    *   Specific IDs (`fieldFillId`, etc.) might be used for targeted styling or JavaScript manipulation.

## Usage
This section provides practical examples of how to use the **SliderForm** component in your application.

```jsx
// Import the component and necessary React hooks/components
import { SliderForm } from './SliderForm';
// import { SliderControl } from './SliderControl'; // The underlying slider component
import React, { useState } from 'react';

// --- Basic SliderForm ---
// A simple slider with a label, min/max values, and a step.
function BasicSliderForm() {
  const [sliderValue, setSliderValue] = useState(50); // Initial value

  return (
    <SliderForm
      lblTopLblSrc="Volume"
      lblTopLblFor="volume-slider"
      fieldSliderMin="0"
      fieldSliderMax="100"
      fieldSliderStep="1"
      fieldSliderValue={sliderValue} // Pass state value
      fieldOnChange={setSliderValue} // Update state on change
    />
  );
}

// --- SliderForm with Helper Text and Optional Label ---
// Includes helper text and an "optional" indicator for the label.
function SliderFormWithHelper() {
  const [brightness, setBrightness] = useState(75);

  return (
    <SliderForm
      lblTopLblSrc="Brightness"
      lblTopLblFor="brightness-slider"
      fldHelp={true}
      fldHelpHelpLSrc="Adjust screen brightness"
      lblTopOpt={true}
      lblTopOptSrc="optional"
      fieldSliderMin="0"
      fieldSliderMax="100"
      fieldSliderValue={brightness}
      fieldOnChange={setBrightness}
    />
  );
}

// --- Disabled SliderForm ---
// A slider field that is visually disabled and cannot be interacted with.
function DisabledSliderForm() {
  return (
    <SliderForm
      lblTopLblSrc="Temperature"
      lblTopLblFor="temp-slider"
      fieldSliderMin="-10"
      fieldSliderMax="50"
      fieldSliderValue="15"
      disabled={true} // Assuming a 'disabled' prop might be passed down
      fldHelp={true}
      fldHelpHelpLSrc="Current setting."
    />
  );
}

// --- Dual Handle SliderForm (Conceptual) ---
// If the component supports dual sliders, this is how it might be configured.
// The exact props for dual sliders might differ, e.g., fieldStart, fieldStart2.
function DualHandleSliderForm() {
  const [range, setRange] = useState([20, 80]);

  return (
    <SliderForm
      lblTopLblSrc="Price Range"
      lblTopLblFor="price-range-slider"
      fieldDualSlide={true} // Indicate dual slider
      fieldSliderMin="0"
      fieldSliderMax="200"
      fieldStart={range[0]} // Pass start value for first handle
      fieldStart2={range[1]} // Pass start value for second handle
      // fieldSliderValue might not be used directly for dual, or might be an array
      // fieldOnChange might receive an array [newValue1, newValue2]
      // Assuming a simplified example for prop demonstration
      fieldSliderValue={range[0]} // Placeholder, actual prop might be different for dual
      fieldOnChange={(val) => console.log(val)} // Placeholder
    />
  );
}
```

