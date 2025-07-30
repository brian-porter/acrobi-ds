[Table of Contents](../../toc.md)

# Textarea - Form Component

## Overview
This section provides a concise overview of the **Textarea - Form** component. The `Textarea-Form` component is designed to collect short-form text content from the user by combining a field label, the input field itself, and optional helper text into a dynamic group. It provides inline validation and other features to offer instant feedback, making it a valuable tool for guiding users through the form process.

![Textarea-form]()

## Properties
This section details all the configurable properties (props) that the **Textarea - Form** component accepts.

| Name                | Description                                                                                                                                      | Possible Values                                                                                                                            | Default Setting   |
| :------------------ | :----------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------- | :---------------- |
| `as`                | Specifies the HTML element or React component to render the `Textarea` component as.                                                          | `React.ElementType`                                                                                                                        | `undefined`       |
| `fld`               | Defines the visibility conditions for the entire field component.                                                                                | `boolean` (`true` to show, `false` to hide)                                                                                                | `undefined`       |
| `lblTop`            | Determines the visibility conditions for the top label.                                                                                          | `boolean` (`true` to show, `false` to hide)                                                                                                | `undefined`       |
| `lblTopLblSrc`      | The primary text content for the top label.                                                                                                      | `React.ReactNode` (e.g., "Username")                                                                                                       | `undefined`       |
| `lblTopLblFor`      | The `for` attribute for the top label, associating it with the text input's `id`.                                                              | `string` (Should match the `id` of the input field)                                                                                        | `undefined`       |
| `fldHelp`           | Determines the visibility conditions for the field's helper text.                                                                                | `boolean` (`true` to show, `false` to hide)                                                                                                | `undefined`       |
| `fieldFldBrdClr`    | Sets the border color of the input field, often used for feedback states (e.g., error, success).                                               | `string` (e.g., `"fd500"`)                                                                                                                 | `undefined`       |
| `fieldFldPholderSrc`| The placeholder text displayed inside the input field when it's empty.                                                                       | `string` (e.g., "Enter your email")                                                                                                        | `undefined`       |
| `fieldFldId`        | The unique ID for the input field, essential for accessibility and label association.                                                            | `string`                                                                                                                                   | `undefined`       |
| `fieldFldName`      | The `name` attribute for the input field, used when submitting form data.                                                                        | `string`                                                                                                                                   | `undefined`       |
| `fieldRequired`     | Indicates whether the field is mandatory. May display a visual indicator.                                                                        | `string` (e.g., `"true"`)                                                                                                                  | `undefined`       |
| `fieldTabOrder`     | Specifies the tab order for the input field, controlling keyboard navigation.                                                                    | `string` (numeric value)                                                                                                                                   | `undefined`       |
| `fieldOnChange`     | Callback function triggered when the input field's value changes.                                                                                | `function` (e.g., `(event) => {}`)                                                                                                                       | `undefined`       |
| `fieldFldClick`     | Runtime properties for click events on the main field wrapper or input.                                                                          | `object` (e.g., `{ onClick: () => {} }`)                                                                                                                   | `undefined`       |
| `fieldFldHeight`  | The height to give the textarea                                                                            |                                                                                           | `undefined`       |
| `fldHelpHelpL`      | Determines if helper text is displayed on the left side.                                                                                         | `boolean` (`true`, `false`)                                                                                                                                | `undefined`       |
| `fldHelpHelpR`      | Determines if helper text is displayed on the right side.                                                                                        | `boolean` (`true`, `false`)                                                                                                                                | `undefined`       |
| `fldHelpHelpLSrc`   | The source text for the left-aligned helper text.                                                                                                | `React.ReactNode`                                                                                                                                          | `undefined`       |
| `fldHelpHelpRSrc`   | The source text for the right-aligned helper text.                                                                                               | `React.ReactNode`                                                                                                                                          | `undefined`       |
| `fldHelpHelpShdw`   | Applies a shadow effect to the helper text.                                                                                                      | `string`                                                                                                                                                   | `undefined`       |
| `fbk`               | Determines the visibility conditions for the feedback message area.                                                                                | `boolean` (`true` to show, `false` to hide)                                                                                                                | `undefined`       |
| `fbkFbkTxt`         | Determines the visibility conditions for the feedback text itself.                                                                                 | `boolean` (`true` to show, `false` to hide)                                                                                                                | `undefined`       |
| `fbkFbkIcn`         | Determines the visibility conditions for the feedback icon.                                                                                        | `boolean` (`true` to show, `false` to hide)                                                                                                                | `undefined`       |
| `fbkFbkTxtSrc`      | The source text for the feedback message (e.g., validation error message).                                                                         | `React.ReactNode`                                                                                                                                          | `undefined`       |
| `fbkFbkIcnSrc`      | The source for the feedback icon (e.g., error icon, success icon).                                                                                 | `React.ReactNode`                                                                                                                                          | `undefined`       |
| `fbkFbkClr`         | Sets the color of the feedback message and its icon.                                                                                             | `string` (e.g., `"fd500"` for danger)                                                                                                                      | `undefined`       |
| `lblTopLblSz`       | Sets the size of the top label text.                                                                                                             | `string` (e.g., `"r4"`)                                                                                                                                    | `undefined`       |
| `lblTopLblClr`      | Sets the color of the top label text.                                                                                                            | `string` (e.g., `"n900"`)                                                                                                                                  | `undefined`       |
| `lblTopLblShdw`     | Applies a shadow effect to the top label text.                                                                                                   | `string`                                                                                                                                                   | `undefined`       |
| `lblTopOpt`         | Toggles the display of an optional indicator (e.g., "optional", "required") next to the top label.                                               | `boolean` (`true`, `false`)                                                                                                                                | `undefined`       |
| `lblTopOptSrc`      | The text content for the optional indicator.                                                                                                     | `React.ReactNode`                                                                                                                                          | `undefined`       |
| `lblTopOptSz`       | Sets the size of the optional indicator text.                                                                                                    | `string`                                                                                                                                                   | `undefined`       |
| `lblTopOptClr`      | Sets the color of the optional indicator text.                                                                                                   | `string`                                                                                                                                                   | `undefined`       |
| `Label`             | A shortcut prop for the primary label text, likely mapping to `lblTopLblSrc`.                                                                  | `string`                                                                                                                                                   | `undefined`       |

---
**Notes on Properties:**
*   **`Name`**: The exact name of the prop as used in the code (e.g., `fieldFldId`, `lblTopLblSrc`).
*   **`Description`**: Clearly explain the purpose and effect of the prop.
*   **`Possible Values`**: List all accepted data types, specific string literals, enums, or reference types. Provide examples where helpful.
*   **`Default Setting`**: Indicate the value the prop takes if it's not explicitly provided.
---

## Styling
This section describes how the **Textarea - Form** component is styled and how users can customize its appearance.

*   **Base Styles (`field.css` or similar):**
    *   Defines the core visual properties and layout for the text field components.
    *   Includes styles for the main input element (`.input-field`), labels, helper text, icons, and buttons.
    *   Manages layout, spacing, borders, typography, and interactive states (focus, hover, disabled).

*   **Attribute-Based Styling / Modifier Classes:**
    *   The `Textarea` component uses various props to conditionally apply styles and render elements.
    *   **Labeling:** `lblTop`, `lblTopLblSrc`, `lblTopLblFor`, `lblTopOpt`, `lblTopOptSrc`, etc., configure the label and its optional indicator.
    *   **Input Field:** `fieldFldId`, `fieldFldName`, `fieldFldType`, `fieldFldPlaceholderSrc`, `fieldFldBrdClr`, `fieldRequired`, `fieldReadOnly`, and `fieldAutoComp` configure the main input element.
    *   **Icons & Buttons:** `fieldFldIcn`, `fieldFldIcnSrc`, `fieldFldIcnDisp`, `fieldFldBtn`, `fieldFldBtnIcnSrc`, `fieldFldBtnIcnAlt`, `fieldFldBtnLink`, `fieldFldBtnClick` control the display and behavior of associated icons and buttons.
    *   **Helper Text:** `fldHelp`, `fldHelpHelpL`, `fldHelpHelpR`, `fldHelpHelpLSrc`, `fldHelpHelpRSrc`, `fldHelpHelpShdw` manage the display and content of helper text.
    *   **Feedback:** `fbk`, `fbkFbkTxt`, `fbkFbkIcn`, `fbkFbkTxtSrc`, `fbkFbkIcnSrc`, `fbkFbkClr` control the display and styling of validation or status feedback.
    *   **Layout:** `fieldAlign` likely influences the overall arrangement of elements.

## Usage
This section provides practical examples of how to use the **Textarea - Form** component in your application.

```jsx
// Import the component
import { TextareaForm } from './TextareaForm'; // Assuming component name
import React, { useState } from 'react';

// --- Basic Text Field ---
// A simple text input with a label and placeholder.
function BasicTextarea() {
  const [name, setName] = useState('');

  return (
    <TextareaForm
      label="Name"
      fieldFldId="name-input"
      fieldFldName="name"
      fieldFldPlaceholderSrc="Enter your full name"
      value={name}
      fieldOnChange={(e) => setName(e.target.value)}
    />
  );
}

// --- Text Field with Helper Text and Feedback ---
// Includes helper text and a success feedback message.
function TextareaWithFeedback() {
  const [email, setEmail] = useState('');

  return (
    <TextareaForm
      label="Email Address"
      fieldFldId="email-input"
      fieldFldName="email"
      fieldFldType="email"
      fieldFldPlaceholderSrc="your.email@example.com"
      fieldRequired="true"
      helperText="We'll never share your email."
      fbk={true}
      fbkFbkTxtSrc="Email looks valid!"
      fbkFbkIcnSrc="act_check_circle"
      fbkFbkClr="s" // Success color
      fieldOnChange={(e) => setEmail(e.target.value)}
    />
  );
}

// --- Text Field with Icon and Button ---
// A password field with a toggleable visibility icon and a clear button.
function PasswordFieldWithControls() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <TextareaForm
      label="Password"
      fieldFldId="password-input"
      fieldFldName="password"
      fieldFldType={showPassword ? "text" : "password"}
      fieldFldPlaceholderSrc="Enter your password"
      fieldFldIcon={true}
      fieldFldIcnSrc={showPassword ? "visibility_off" : "visibility"} // Example icon names
      fieldFldIcnDisp="Toggle password visibility"
      fieldFldIconClick={() => setShowPassword(!showPassword)} // Handler for icon click
      fieldFldBtn={true}
      fieldFldBtnIcnSrc="clear" // Example clear icon
      fieldFldBtnIcnAlt="Clear input"
      fieldFldBtnClick={() => setPassword('')} // Handler for button click
      value={password}
      fieldOnChange={(e) => setPassword(e.target.value)}
    />
  );
}

// --- Disabled Text Field ---
// A text field that is visually disabled and cannot be interacted with.
function DisabledTextarea() {
  return (
    <TextareaForm
      label="Username"
      fieldFldId="username-display"
      fieldFldName="username"
      value="admin"
      disabled={true}
      helperText="Username cannot be changed."
    />
  );
}
```
