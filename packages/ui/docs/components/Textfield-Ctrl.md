[Table of Contents](../../toc.md)

# Textfield - Control

## Overview
This section provides a concise overview of the **Textfield Control** component. The Textfield Control component is an enhanced version of the standard HTML input element, offering custom styling and additional functionality. It provides a consistent and polished user experience across different devices and platforms, suitable for various input types like text, password, and more. It can optionally include icons and feedback states for better usability.

## Properties
This section details all the configurable properties (props) that the **Textfield Control** component accepts.

| Name               | Description                                                                                                                  | Possible Values                                                          | Default Setting            |
| :----------------- | :--------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------- | :------------------------- |
| `as`               | The component or HTML element to use as the wrapper for the text field.                                                      | `React.ElementType` (e.g., `'div'`)                                      | `_Builtin.Block`          |
| `fldTxt`           | Controls the overall rendering of the text field component. If `false`, the component renders as `null`.                     | `boolean`                                                                | `true`                     |
| `fldIcn`           | Controls the visibility of the leading icon.                                                                                 | `boolean`                                                                | `false`                    |
| `fldBtn`           | Controls the visibility of the trailing button (e.g., clear, microphone).                                                    | `boolean`                                                                | `false`                    |
| `fbk`              | Controls the visibility of the feedback section (message and/or icon).                                                       | `boolean`                                                                | `false`                    |
| `fldIcnSrc`        | The source or name of the icon to display at the leading edge of the input.                                                  | `React.ReactNode` (string, JSX, etc.)                                    | `"Search"`                 |
| `fldIcnDisp`       | A data attribute likely used for internal styling or logic related to the icon's display or state.                           | `string`                                                                 | `"n"`                      |
| `fldBrdClr`        | A data attribute likely used for internal styling or logic related to the border color of the input.                         | `string`                                                                 | `undefined`                |
| `fbkFbkTxt`        | Controls the visibility of the feedback text message.                                                                        | `boolean`                                                                | `true`                     |
| `fbkFbkIcn`        | Controls the visibility of the feedback icon.                                                                                | `boolean`                                                                | `false`                    |
| `fbkFbkTxtSrc`     | The text content to display in the feedback message.                                                                         | `React.ReactNode` (string, JSX, etc.)                                    | `"Feedback here"`      |
| `fbkFbkIcnSrc`     | The source or identifier for the feedback icon (e.g., name of an icon from a library).                                       | `React.ReactNode` (string, JSX, etc.)                                    | `"check_circle"`           |
| `fbkFbkClr`        | The color theme applied to the feedback message (text and/or icon).                                                          | `string` (e.g., `"fd500"`, `"success100"`)                               | `"fd500"`                  |
| `fldPholdSrc`      | The placeholder text for the input field.                                                                                    | `string`                                                                 | `"Placeholder"`            |
| `fldPholdSrcX`     | An alternative or extended placeholder text, possibly for specific states or types.                                          | `string`                                                                 | `"PlaceholderX"`           |
| `fldBtnIcnSrc`     | The source or name of the icon for the trailing button.                                                                      | `React.ReactNode` (string, JSX, etc.)                                    | `"mic"`                    |
| `fldBtnIcnAlt`     | Alt text for the trailing button's icon, useful for accessibility.                                                           | `React.ReactNode` (string, JSX, etc.)                                    | `"Microphone"`             |
| `autoComp`         | Controls the browser's autocomplete behavior for the input field.                                                            | `string` (e.g., `"on"`, `"off"`, `"email"`, `"new-password"`)            | `"off"`                    |
| `tabOrder`         | Defines the navigation order for the input field when using the Tab key.                                                   | `string` (numeric value)                                                 | `undefined`                |
| `autoFocus`        | If set, the input field will automatically receive focus when the component mounts.                                          | `boolean`                                                                | `undefined`                |
| `readOnly`         | If set to `true`, the input field will be read-only and cannot be edited by the user.                                      | `boolean`                                                                | `undefined`                |
| `fldId`            | A unique identifier for the input element, useful for associating labels or programmatic access.                             | `string`                                                                 | `undefined`                |
| `onChange`         | A callback function executed when the value of the input field changes.                                                      | `Function` or `React.ChangeEventHandler<HTMLInputElement>`               | `undefined`                |
| `fldBtnClick`      | An object containing additional runtime props to be spread onto the trailing button element for custom interactions.           | `object` (e.g., `{ onClick: () => ... }`)                                | `{}`                       |
| `fldClick`         | An object containing additional runtime props to be spread onto the input field's wrapper for custom interactions.           | `object` (e.g., `{ onClick: () => ... }`)                                | `{}`                       |
| `inpName`          | The `name` attribute for the input element, used for form submission.                                                        | `string`                                                                 | `undefined`                |
| `inpType`          | The `type` attribute for the input element (e.g., `"text"`, `"password"`, `"email"`, `"number"`).                          | `string`                                                                 | `undefined`                |
| `required`         | If set to `true`, indicates that the input field must be filled out before submitting the form.                            | `boolean`                                                                | `undefined`                |

---

## Styling

The `TextfieldCtrl` component uses CSS Modules (`TextfieldCtrl.module.css`) for styling.

*   **Wrapper (`.textfield_wrap`):**
    *   Styles the main container.
    *   Sets `position: relative` and `z-index: 0`.
    *   Uses flex alignment (`align-items: center`).

*   **Main Field Container (`.textfield_main`):**
    *   Styles the container holding the input, icon, and button.
    *   Uses `position: relative` and `z-index: 2`.
    *   Applies flex display (`display: flex`) with a fixed `height` and `min-height` of `36px`, aligning items to the center.

*   **Field Icon (`.field-icon`):**
    *   Styles the container for the leading icon.
    *   Uses `position: absolute` for placement on the left side (`left: 8px`) with `z-index: 1`.

*   **Text Input (`.text-input`):**
    *   Styles the actual `<input>` element.
    *   Sets `z-index: 0`.
    *   Defines `height` and `min-height` to `36px`.
    *   Applies specific padding: `0rem 6px 0rem 0.5rem`.
    *   Includes a 1px border with `4px` border-radius.
    *   Sets default `background-color` and text `color`.
    *   Applies a `transition` for `border-color` changes (300ms).
    *   Includes styles for `:hover` and `:focus` states, changing the `border-color`.
    *   Styles the `::placeholder` text.
    *   Uses `data-field-icn` and `data-field-brd` attributes, likely for conditional styling managed by the component's logic.

*   **Feedback Text (`.feedback-txt`):**
    *   Styles the container for feedback messages and icons.
    *   Uses `position: absolute` for placement on the right side.
    *   Applies flex display to align content within the feedback area.

---

## Usage

```jsx
// Import the component
import { TextfieldCtrl } from './TextfieldCtrl';

// --- Basic Example ---
// A simple text input field.
<TextfieldCtrl />

// --- Example: With Placeholder Text ---
// Demonstrating the use of placeholder text.
<TextfieldCtrl
  fldPholdSrc="Enter your name"
/>

// --- Example: With Leading Icon ---
// Showing a text input with a search icon on the left.
<TextfieldCtrl
  fldIcn={true}
  fldIcnSrc="magnifying-glass" // Example icon name
  fldPholdSrc="Search items..."
/>

// --- Example: With Trailing Button ---
// Displaying a text input with a microphone icon button on the right.
<TextfieldCtrl
  fldBtn={true}
  fldBtnIcnSrc="microphone"
  fldBtnIcnAlt="Start voice input"
  fldPholdSrc="Type or speak..."
/>

// --- Example: With Feedback Message ---
// Showing input validation feedback (e.g., error message).
<TextfieldCtrl
  fbk={true}
  fbkFbkTxtSrc="Password must be at least 8 characters."
  fbkFbkClr="danger" // Uses 'danger' color theme
  fldPholdSrc="Enter password"
/>

// --- Example: With Feedback Icon ---
// Displaying a success icon next to the feedback text.
<TextfieldCtrl
  fbk={true}
  fbkFbkTxt={true}
  fbkFbkIcn={true}
  fbkFbkTxtSrc="Valid input"
  fbkFbkIcnSrc="check-circle"
  fbkFbkClr="success" // Uses 'success' color theme
  fldPholdSrc="Enter email"
/>

// --- Example: Handling Input Change ---
// Controlling the input value via state and an onChange handler.
const [inputValue, setInputValue] = React.useState('');

const handleInputChange = (event) => {
  setInputValue(event.target.value);
};

<TextfieldCtrl
  fldPholdSrc="Type here..."
  onChange={handleInputChange}
  // To make it controlled, you'd typically pass value prop,
  // assuming TextfieldCtrl handles value internally or passes it up.
  // Assuming 'value' prop maps to internal state or similar pattern.
  // value={inputValue} // If TextfieldCtrl accepted a 'value' prop
/>

// --- Example: Different Input Types and Attributes ---
// Using specific input types and accessibility attributes.
<TextfieldCtrl
  inpType="password"
  inpName="userPassword"
  fldPholdSrc="Enter your password"
  fldId="passwordInput"
  required={true}
  autoFocus={true}
  autoComp="current-password"
/>

// --- Example: Read-Only Input ---
// Displaying an input field that cannot be edited.
<TextfieldCtrl
  readOnly={true}
  fldPholdSrc="Info displayed here"
  fldTxtSrc="Information Field" // Assuming TextfieldCtrl supports label props or it's handled by context
  value="Static Information" // Assuming value prop is handled
/>

// --- Example: Input with Button Click Handler ---
// Attaching a specific handler to the trailing button.
<TextfieldCtrl
  fldBtn={true}
  fldBtnIcnSrc="close-circle"
  fldPholdSrc="Enter search query"
  fldBtnClick={{ onClick: () => console.log('Clear input clicked!') }}
/>
```