[Table of Contents](../../toc.md)

# SelectList - Form Component

## Overview
This section provides a concise overview of the **SelectListForm** component. The `SelectListForm` component is used to create a select list form field. It includes a label, the select list (dropdown), and optional helper text, providing a standard and accessible way to capture user selection from a predefined set of options.

## Properties
This section details all the configurable properties (props) that the **SelectListForm** component accepts.

| Name               | Description                                                                                                                               | Possible Values                                                                                                                                | Default Setting   |
| :----------------- | :---------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------- | :---------------- |
| `as`               | Specifies the HTML element or React component to render the form field as.                                                                | `React.ElementType`                                                                                                                            | `_Builtin.Block`  |
| `fld`              | Determines whether the entire field component is displayed.                                                                               | `boolean` (`true` to show, `false` to hide)                                                                                                    | `true`            |
| `lblTop`           | Controls if the main label is displayed at the top of the field.                                                                          | `boolean` (`true`, `false`)                                                                                                                    | `true`            |
| `fldHelp`          | Determines whether helper text is displayed for the field.                                                                                | `boolean` (`true` to show, `false` to hide)                                                                                                    | `false`           |
| `fbk`              | Determines whether feedback (e.g., validation messages) is displayed for the field.                                                       | `boolean` (`true` to show, `false` to hide)                                                                                                    | `false`           |
| `lblTopLblSrc`     | The primary text content for the label displayed at the top of the form.                                                                  | `string` (e.g., "Select an option")                                                                                                            | `"Label"`         |
| `lblTopLblFor`     | The `for` attribute for the top label, associating it with the select element's `id`.                                                   | `string` (Should match the `id` of the select input)                                                                                           | `""`              |
| `lblTopLblSz`      | Sets the size of the top label text.                                                                                                      | `string` (e.g., `"r4"`)                                                                                                                        | `"r4"`            |
| `lblTopLblClr`     | Sets the color of the top label text.                                                                                                     | `string` (e.g., `"n900"`)                                                                                                                      | `"n900"`          |
| `lblTopLblShdw`    | Applies a shadow effect to the top label text.                                                                                            | `string`                                                                                                                                       | `""`              |
| `lblTopOpt`        | Toggles the display of an optional indicator next to the top label.                                                                       | `boolean` (`true`, `false`)                                                                                                                    | `false`           |
| `lblTopOptSrc`     | The text content for the optional indicator (e.g., "required").                                                                           | `string` (e.g., `"required"`)                                                                                                                  | `"required"`      |
| `lblTopOptSz`      | Sets the size of the optional indicator text.                                                                                             | `string` (e.g., `"r4"`)                                                                                                                        | `"r4"`            |
| `lblTopOptClr`     | Sets the color of the optional indicator text.                                                                                            | `string` (e.g., `"n300"`)                                                                                                                      | `"n300"`          |
| `fieldFldId`       | The unique ID for the select input element. Crucial for accessibility and label association.                                            | `string`                                                                                                                                       | `undefined`       |
| `fieldFldValue`    | The currently selected value for the select list.                                                                                         | `string` or `number`                                                                                                                           | `undefined`       |
| `fieldPHoldSrc`    | The placeholder text displayed when no option is selected or when the default placeholder is shown.                                     | `string` (e.g., "Select an option")                                                                                                            | `"Placeholder"`   |
| `fieldPHoldClr`    | The color of the placeholder text.                                                                                                        | `string` (e.g., `"n500"`)                                                                                                                      | `"n500"`          |
| `fieldFldBrdClr`   | The color of the border around the select input, potentially used for feedback states.                                                  | `string` (e.g., `"fd500"`)                                                                                                                     | `undefined`       |
| `fieldSelectDrpHide`| Controls whether the default dropdown arrow indicator is hidden.                                                                          | `boolean` (`true` to hide, `false` to show)                                                                                                    | `false`           |
| `fieldSelectMap`   | Defines the available options for the select list. Typically an array of objects, each with `value` and `label` properties.              | `Array<{ value: string | number, label: string }>` (e.g., `[{ value: '1', label: 'Option 1' }]`)                                                | `undefined`       |
| `fldHelpHelpL`     | Determines if helper text is displayed on the left side.                                                                                | `boolean` (`true`, `false`)                                                                                                                    | `true`            |
| `fldHelpHelpR`     | Determines if helper text is displayed on the right side.                                                                               | `boolean` (`true`, `false`)                                                                                                                    | `false`           |
| `fldHelpHelpLSrc`  | The source text for the left-aligned helper text.                                                                                         | `React.ReactNode`                                                                                                                              | `"helper copy"`   |
| `fldHelpHelpRSrc`  | The source text for the right-aligned helper text.                                                                                        | `React.ReactNode`                                                                                                                              | `"0/200"`         |
| `fbkFbkTxt`        | Toggles the visibility of the feedback text message.                                                                                      | `boolean` (`true`, `false`)                                                                                                                    | `true`            |
| `fbkFbkIcn`        | Toggles the visibility of the feedback icon.                                                                                              | `boolean` (`true`, `false`)                                                                                                                    | `false`           |
| `fbkFbkTxtSrc`     | The text content for the feedback message.                                                                                                | `string`                                                                                                                                       | `"Feedback text"` |
| `fbkFbkIcnSrc`     | The source for the icon to be displayed with the feedback message.                                                                        | `React.ReactNode` (e.g., `"act_check_circle"`)                                                                                                 | `"act_check_circle"`|
| `fbkFbkClr`        | Sets the color of the feedback message and its icon.                                                                                      | `string` (e.g., `"fd500"`)                                                                                                                     | `"fd500"`         |
| `fldHelpHelpShdw`  | Applies a shadow effect to the helper text.                                                                                               | `string`                                                                                                                                       | `""`              |
| `fieldOnChange`    | Callback function triggered when the selected value in the select list changes.                                                         | `(event: React.ChangeEvent<HTMLSelectElement>) => void`                                                                                        | `() => {}`        |

---
**Notes on Properties:**
*   **`Name`**: The exact name of the prop as used in the code (e.g., `lblTopLblSrc`, `fieldSelectMap`).
*   **`Description`**: Clearly explain the purpose and effect of the prop.
*   **`Possible Values`**: List all accepted data types, specific string literals, enums, or reference types. Provide examples where helpful.
*   **`Default Setting`**: Indicate the value the prop takes if it's not explicitly provided.
---

## Styling
This section describes how the **SelectListForm** component is styled and how users can customize its appearance.

*   **Base Styles (`SelectListForm.module.css` or similar):**
    *   Defines the core visual properties and layout for the select list form field.
    *   `form_itm_wrap`: Styles the main container, likely using flexbox for alignment (`position: relative`, `align-items: center`, `flex: 1`).
    *   `form_main`: Styles the primary content area, setting `position: relative`, `display: flex`, `height: 100%`, `min-height: auto`, `margin-bottom: 0px`, `padding`, `flex-direction: column`, `align-self: stretch`, and `flex: 0 0 auto`. It also includes gap properties for internal spacing.
    *   These styles manage the overall layout, alignment of the label, select element, and helper text, as well as spacing.

*   **Attribute-Based Styling / Modifier Classes:**
    *   Props such as `lblTop`, `lblTopLblSrc`, `fldHelp`, `fieldFldId`, `fieldFldValue`, `fieldPHoldSrc`, `fieldFldBrdClr`, `fieldSelectMap`, `fldHelpHelpL`, `fldHelpHelpR`, `fldHelpHelpLSrc`, `fldHelpHelpRSrc`, `fieldAlign`, `fieldFbk`, and `fieldOnChange` are used to configure the component's structure and the appearance of its sub-elements.
    *   The `fieldSelectMap` prop is crucial for rendering the `<select>` element's `<option>` tags dynamically.
    *   Styling for feedback states (`fbk`, `fbkFbkTxtSrc`, etc.) would be applied based on these props, potentially altering border colors (`fieldFldBrdClr`) or adding feedback elements.
    *   `fieldSelectDrpHide` would control CSS properties to hide the default dropdown arrow if desired.

## Usage
This section provides practical examples of how to use the **SelectListForm** component in your application.

```jsx
// Import the component
import { SelectListForm } from './SelectListForm'; // Assuming component name
import React, { useState } from 'react';

// --- Basic SelectListForm ---
// A simple select list with a label and placeholder.
function BasicSelectList() {
  const [selectedValue, setSelectedValue] = useState('');

  const selectOptions = [
    { value: '', label: 'Select an option' }, // Default placeholder option
    { value: '1', label: 'Option One' },
    { value: '2', label: 'Option Two' },
    { value: '3', label: 'Option Three' },
  ];

  return (
    <SelectListForm
      fieldFldId="my-select-field"
      lblTopLblSrc="Choose a value:"
      fieldPHoldSrc="Select an option" // Often redundant if first option is placeholder
      fieldSelectMap={selectOptions}
      fieldFldValue={selectedValue}
      fieldOnChange={(e) => setSelectedValue(e.target.value)}
    />
  );
}

// --- SelectListForm with Helper Text and Feedback ---
// Includes helper text and a success feedback message.
function SelectListWithFeedback() {
  const [selectedValue, setSelectedValue] = useState('yes');

  const selectOptions = [
    { value: 'yes', label: 'Yes' },
    { value: 'no', label: 'No' },
    { value: 'maybe', label: 'Maybe' },
  ];

  return (
    <SelectListForm
      fieldFldId="feedback-select"
      lblTopLblSrc="Confirmation:"
      fieldSelectMap={selectOptions}
      fieldFldValue={selectedValue}
      fieldOnChange={(e) => setSelectedValue(e.target.value)}
      fldHelp={true}
      fldHelpHelpLSrc="Your selection matters."
      fbk={true}
      fbkFbkTxtSrc="Selection recorded!"
      fbkFbkIcnSrc="act_check_circle"
      fbkFbkClr="s" // Success color
    />
  );
}

// --- Disabled SelectListForm ---
// A select list that is visually disabled and cannot be interacted with.
function DisabledSelectList() {
  const selectOptions = [
    { value: 'optA', label: 'Option A' },
    { value: 'optB', label: 'Option B' },
  ];

  return (
    <SelectListForm
      fieldFldId="disabled-select"
      lblTopLblSrc="Status:"
      fieldSelectMap={selectOptions}
      fieldFldValue="optA" // Pre-selected value
      disabled={true} // Assuming a 'disabled' prop might be passed down
    />
  );
}
```
