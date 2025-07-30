[Table of Contents](../../toc.md)

# Textarea - Control Component

## Overview
This section provides a concise overview of the **Textarea - Control** component. The `TextareaCtrl` component is designed to provide a multi-line text input field, allowing users to write, edit, and express themselves with ease. It combines the simplicity of a native textarea element with enhanced user experience and interactivity, often including features like labels, helper text, and validation feedback.

![textarea-control](https://github.com/user-attachments/assets/84928fd4-1fe1-4ebf-960a-50ea53586607)

## Properties
This section details all the configurable properties (props) that the **Textarea - Control** component accepts.

| Name                  | Description                                                                                                                                      | Possible Values                                                                                                                                                                                                                                        | Default Setting   |
| :------------------ | :----------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------- |
| `as`                  | Specifies the HTML element or React component to render the `TextareaCtrl` as.                                                                | `React.ElementType`                                                                                                                                                                                                                    | `undefined`       |
| `fld`                 | Defines the visibility conditions for the entire field component.                                                                                | `boolean` (`true` to show, `false` to hide)                                                                                                                                                                                            | `undefined`       |
| `lblTop`              | Determines the visibility conditions for the top label.                                                                                          | `boolean` (`true` to show, `false` to hide)                                                                                                                                                                                            | `undefined`       |
| `lblTopLblSrc`        | The primary text content for the top label.                                                                                                      | `React.ReactNode` (e.g., "Your Message")                                                                                                                                                                                               | `undefined`       |
| `lblTopLblFor`        | The `for` attribute for the top label, associating it with the textarea's `id`.                                                                | `string` (Should match the `id` of the textarea field)                                                                                                                                                                                 | `undefined`       |
| `lblTopLblSz`         | Sets the size of the top label text.                                                                                                             | `string` (e.g., `"r4"`)                                                                                                                                                                                                                  | `undefined`       |
| `lblTopLblClr`        | Sets the color of the top label text.                                                                                                            | `string` (e.g., `"n900"`)                                                                                                                                                                                                              | `undefined`       |
| `lblTopLblShdw`       | Applies a shadow effect to the top label text.                                                                                                   | `string`                                                                                                                                                                                                                               | `undefined`       |
| `lblTopOpt`           | Toggles the display of an optional indicator (e.g., "optional", "required") next to the top label.                                               | `boolean` (`true`, `false`)                                                                                                                                                                                                            | `undefined`       |
| `lblTopOptSrc`        | The text content for the optional indicator.                                                                                                     | `React.ReactNode`                                                                                                                                                                                                                        | `undefined`       |
| `lblTopOptSz`         | Sets the size of the optional indicator text.                                                                                                    | `string`                                                                                                                                                                                                                               | `undefined`       |
| `lblTopOptClr`        | Sets the color of the optional indicator text.                                                                                                   | `string`                                                                                                                                                                                                                               | `undefined`       |
| `fldHelp`             | Determines the visibility conditions for the field's helper text.                                                                                | `boolean` (`true` to show, `false` to hide)                                                                                                                                                                                            | `undefined`       |
| `fieldFldId`          | The unique ID for the textarea input element, essential for accessibility and label association.                                               | `string`                                                                                                                                                                                                                               | `undefined`       |
| `fieldFldName`        | The `name` attribute for the textarea input, used when submitting form data.                                                                     | `string`                                                                                                                                                                                                                               | `undefined`       |
| `fieldFldPholdSrc`    | The placeholder text displayed inside the textarea when it's empty.                                                                              | `string` (e.g., "Enter your message here")                                                                                                                                                                                             | `undefined`       |
| `fieldFldBrdClr`      | Sets the border color of the textarea, often used for feedback states.                                                                           | `string` (e.g., `"fd500"`)                                                                                                                                                                                                             | `undefined`       |
| `fieldFldHeight`      | Specifies the visual height of the textarea element (e.g., number of rows or a CSS height value).                                                | `string` (e.g., `"4"`, `"200px"`)                                                                                                                                                                                                      | `undefined`       |
| `fieldTabOrder`       | Specifies the tab order for the textarea field, controlling keyboard navigation.                                                                 | `string` (numeric value)                                                                                                                                                                                                               | `undefined`       |
| `fieldOnChange`       | Callback function triggered when the textarea's value changes.                                                                                   | `function` (e.g., `(event) => {}`)                                                                                                                                                                                                     | `undefined`       |
| `fieldFldClick`       | Runtime properties for click events on the textarea field.                                                                                       | `object` (e.g., `{ onClick: () => {} }`)                                                                                                                                                                                               | `undefined`       |
| `fldHelpHelpL`        | Determines if helper text is displayed on the left side.                                                                                         | `boolean` (`true`, `false`)                                                                                                                                                                                                            | `undefined`       |
| `fldHelpHelpR`        | Determines if helper text is displayed on the right side.                                                                                        | `boolean` (`true`, `false`)                                                                                                                                                                                                            | `undefined`       |
| `fldHelpHelpLSrc`     | The source text for the left-aligned helper text.                                                                                                | `React.ReactNode`                                                                                                                                                                                                                        | `undefined`       |
| `fldHelpHelpRSrc`     | The source text for the right-aligned helper text.                                                                                               | `React.ReactNode`                                                                                                                                                                                                                        | `undefined`       |
| `fldHelpHelpShdw`     | Applies a shadow effect to the helper text.                                                                                                      | `string`                                                                                                                                                                                                                               | `undefined`       |
| `fbk`                 | Determines the visibility conditions for the feedback message area.                                                                                | `boolean` (`true` to show, `false` to hide)                                                                                                                                                                                            | `undefined`       |
| `fbkFbkTxt`           | Determines the visibility conditions for the feedback text itself.                                                                                 | `boolean` (`true` to show, `false` to hide)                                                                                                                                                                                            | `undefined`       |
| `fbkFbkIcn`           | Determines the visibility conditions for the feedback icon.                                                                                        | `boolean` (`true` to show, `false` to hide)                                                                                                                                                                                            | `undefined`       |
| `fbkFbkTxtSrc`        | The source text for the feedback message (e.g., validation error message).                                                                         | `React.ReactNode`                                                                                                                                                                                                                        | `undefined`       |
| `fbkFbkIcnSrc`        | The source for the feedback icon (e.g., error icon, success icon).                                                                                 | `React.ReactNode`                                                                                                                                                                                                                        | `undefined`       |
| `fbkFbkClr`           | Sets the color of the feedback message and its icon.                                                                                             | `string` (e.g., `"fd500"` for danger)                                                                                                                                                                                                  | `undefined`       |
| `Label`               | A shortcut prop for the primary label text, likely mapping to `lblTopLblSrc`.                                                                  | `string`                                                                                                                                                                                                                               | `undefined`       |
| `placeholder`         | A shortcut prop for the placeholder text, likely mapping to `fieldFldPholdSrc`.                                                                  | `string`                                                                                                                                                                                                                               | `undefined`       |
| `value`               | The current value of the textarea.                                                                                                               | `string`                                                                                                                                                                                                                               | `undefined`       |
| `required`            | Indicates whether the field is mandatory. May display a visual indicator.                                                                        | `boolean` (`true`, `false`)                                                                                                                                                                                                            | `false`           |
| `disabled`            | If `true`, the textarea is read-only and cannot be edited.                                                                                       | `boolean` (`true`, `false`)                                                                                                                                                                                                            | `false`           |
| `readOnly`            | If `true`, the textarea is read-only, but the user can still interact with it (e.g., copy text).                                                  | `boolean` (`true`, `false`)                                                                                                                                                                                                            | `false`           |

---
**Notes on Properties:**
*   **`Name`**: The exact name of the prop as used in the code (e.g., `fieldFldPholdSrc`, `lblTopLblSrc`).
*   **`Description`**: Clearly explain the purpose and effect of the prop.
*   **`Possible Values`**: List all accepted data types, specific string literals, enums, or reference types. Provide examples where helpful.
*   **`Default Setting`**: Indicate the value the prop takes if it's not explicitly provided.
---

## Styling
This section describes how the **Textarea - Control** component is styled and how users can customize its appearance.

*   **Base Styles (`field.css` or similar):**
    *   Defines the core visual properties and layout for the textarea element and its associated components.
    *   Includes styles for the main textarea (`textarea` element or a styled div), labels, helper text, icons, and buttons.
    *   Manages layout, spacing, borders, typography, and interactive states (focus, hover, disabled).

*   **Attribute-Based Styling / Modifier Classes:**
    *   The `TextareaCtrl` component uses various props to conditionally apply styles and render elements.
    *   **Labeling:** `lblTop`, `lblTopLblSrc`, `lblTopLblFor`, `lblTopOpt`, `lblTopOptSrc`, etc., configure the label and its optional indicator.
    *   **Textarea Field:** `fieldFldId`, `fieldFldName`, `fieldFldPholdSrc`, `fieldFldBrdClr`, `fieldFldHeight`, `required`, `disabled`, `readOnly` configure the main textarea element.
    *   **Helper Text:** `fldHelp`, `fldHelpHelpL`, `fldHelpHelpR`, `fldHelpHelpLSrc`, `fldHelpHelpRSrc`, `fldHelpHelpShdw` manage the display and content of helper text.
    *   **Feedback:** `fbk`, `fbkFbkTxt`, `fbkFbkIcn`, `fbkFbkTxtSrc`, `fbkFbkIcnSrc`, `fbkFbkClr` control the display and styling of validation or status feedback.
    *   `fieldFldHeight` specifically controls the visual height of the textarea.

## Usage
This section provides practical examples of how to use the **Textarea - Control** component in your application.

```jsx
// Import the component
import { TextareaCtrl } from './TextareaCtrl'; // Assuming component name
import React, { useState } from 'react';

// --- Basic Textarea Field ---
// A simple multi-line text input with a label and placeholder.
function BasicTextareaCtrl() {
  const [message, setMessage] = useState('');

  return (
    <TextareaCtrl
      label="Your Message"
      fieldFldId="message-textarea"
      fieldFldName="message"
      fieldFldPholdSrc="Enter your message here..."
      fieldFldHeight="120px" // Example: Set a specific height
      value={message}
      fieldOnChange={(e) => setMessage(e.target.value)}
    />
  );
}

// --- Textarea with Helper Text and Feedback ---
// Includes helper text and a success feedback message.
function TextareaWithFeedback() {
  const [comment, setComment] = useState('');

  return (
    <TextareaCtrl
      label="Comments"
      fieldFldId="comment-textarea"
      fieldFldName="comment"
      fieldFldPholdSrc="Share your thoughts..."
      fieldFldHeight="100px"
      fieldRequired="true"
      helperText="Your feedback is valuable."
      fbk={true}
      fbkFbkTxtSrc="Comment submitted!"
      fbkFbkIcnSrc="act_check_circle"
      fbkFbkClr="s" // Success color
      value={comment}
      fieldOnChange={(e) => setComment(e.target.value)}
    />
  );
}

// --- Disabled Textarea Field ---
// A textarea that is visually disabled and cannot be interacted with.
function DisabledTextareaCtrl() {
  return (
    <TextareaCtrl
      label="Notes"
      fieldFldId="notes-display"
      fieldFldName="notes"
      value="These are predefined notes."
      disabled={true}
      helperText="Notes cannot be edited."
    />
  );
}

// --- ReadOnly Textarea Field ---
// A textarea that is read-only, allowing text selection but not editing.
function ReadOnlyTextareaCtrl() {
  return (
    <TextareaCtrl
      label="Description"
      fieldFldId="description-display"
      fieldFldName="description"
      value="This is a read-only description."
      readOnly={true}
    />
  );
}
```
