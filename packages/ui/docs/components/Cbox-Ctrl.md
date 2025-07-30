[Table of Contents](../../toc.md)

# Checkbox - Control `CboxCtrl`

## Overview
The `CboxCtrl` component represents a single, customizable checkbox input element. It includes an associated label, optional link, and feedback messages (text and/or icon) for status or validation. It's designed for individual checkbox selections within forms.

## Properties
This section details all the configurable properties (props) that the **Checkbox** component accepts.
| Name              | Description                                                                                                               | Possible Values                                                          | Default Setting          |
| :---------------- | :------------------------------------------------------------------------------------------------------------------------ | :----------------------------------------------------------------------- | :----------------------- |
| `as`              | The component or HTML element to use as the wrapper for the checkbox input.                                               | `React.ElementType` (e.g., `'div'`, `_Builtin.FormCheckboxWrapper`)   | `_Builtin.FormCheckboxWrapper` |
| `comp`            | Controls the overall rendering of the component. If `false`, the component renders as `null`.                             | `boolean`                                                                | `true`                   |
| `txt`             | Controls the visibility of the checkbox label.                                                                            | `boolean`                                                                | `true`                   |
| `link`            | Controls the visibility of an optional link associated with the checkbox.                                                 | `boolean`                                                                | `false`                  |
| `fbk`             | Controls the visibility of the feedback section (message and icon).                                                       | `boolean`                                                                | `false`                  |
| `id`              | A unique identifier for the checkbox input element.                                                                       | `string`                                                                 | `"cbox"`                 |
| `itmName`         | The `name` attribute for the checkbox input, used for form submission.                                                    | `string`                                                                 | `undefined`              |
| `itmValue`        | The `value` attribute for the checkbox input, representing the value submitted when checked.                              | `string`                                                                 | `undefined`              |
| `itmActive`       | Determines if the checkbox is checked. Use `"True"` or `"False"`.                                                       | `string` (e.g., `"True"`, `"False"`)                                     | `"False"`                |
| `itmLblSrc`       | The content displayed as the label for the checkbox.                                                                      | `React.ReactNode` (string, JSX, etc.)                                    | `"Label"`                |
| `itmLblSz`        | Controls the size styling of the label text.                                                                              | `string` (e.g., `"r3"`, `"r4"`)                                          | `"r3"`                   |
| `lblFor`          | Associates the label with a specific input element via the `for` attribute, aiding accessibility.                         | `string`                                                                 | `"cbox"`                 |
| `itmClick`        | An object containing additional runtime props to be spread onto the checkbox wrapper, for custom interactions.              | `object` (e.g., `{ onClick: () => ... }`)                                | `{}`                     |
| `align`           | Specifies the alignment of the checkbox input and label within its container (e.g., 'l' for left).                        | `string`                                                                 | `"l"`                    |
| `tabOrder`        | Defines the navigation order for the checkbox when using the Tab key.                                                     | `string` (e.g., `"0"`, `"1"`)                                            | `"0"`                    |
| `linkTxtSrc`      | The text content for the optional link.                                                                                   | `React.ReactNode` (string, JSX, etc.)                                    | `"Link here"`            |
| `fbkFbkTxt`       | Controls the visibility of the feedback text message.                                                                     | `boolean`                                                                | `true`                   |
| `fbkFbkIcn`       | Controls the visibility of the feedback icon.                                                                             | `boolean`                                                                | `true`                   |
| `fbkFbkTxtSrc`    | The text content to display in the feedback message.                                                                      | `React.ReactNode` (string, JSX, etc.)                                    | `"Feedback message"` |
| `fbkFbkIcnSrc`    | The source or identifier for the feedback icon (e.g., name of an icon from a library).                                    | `React.ReactNode` (string, JSX, etc.)                                    | `"clearcirc"`            |
| `fbkFbkClr`       | The color theme applied to the feedback message (text and/or icon).                                                       | `string` (e.g., `"fd500"`, `"success100"`)                               | `"fd500"`                |
| `onChange`        | A callback function executed when the state of the checkbox changes (e.g., checked status).                             | `string` or `Function` (typically `React.ChangeEventHandler`)            | `""`                     |
| `linkSrc`         | An object containing properties for the link, primarily the `href`.                                                       | `object` (e.g., `{ href: "/path" }`)                                     | `{ href: "#" }`          |
| `linkClick`       | An object containing additional runtime props to be spread onto the link element for custom interactions.                 | `object`                                                                 | `{}`                     |
| `lblShdw`         | Applies shadow styling to the main label.                                                                                 | `string`                                                                 | `undefined`              |
| `linkShdw`        | Applies shadow styling to the optional link.                                                                             | `string`                                                                 | `undefined`              |
| `fbkFbkIcnLoc`    | Determines the position of the feedback icon relative to the text (e.g., 'l' for left, 'r' for right).                    | `string`                                                                 | `"r"`                    |

---

## Styling

The `CboxCtrl` component uses CSS Modules (`CboxCtrl.module.css`) for styling.

*   **Item Container (`.itm_ctrl`):**
    *   Styles the main container for the checkbox, label, link, and feedback.
    *   Uses `position: relative` for feedback positioning.
    *   Applies flex display (`display: flex`, `align-items: center`) for horizontal arrangement.
    *   `flex: 1` allows the item to grow.
    *   Includes responsive adjustments for `min-height`.
    *   Uses `data-input-align` attribute for alignment control.

*   **Checkbox Input (`.cbox`):**
    *   Defines the visual appearance of the checkbox itself (size, border, background, border-radius).
    *   Includes styles for interaction states:
        *   `:hover`: Changes border color.
        *   `:active`: Changes border color.
        *   `:global(.w--redirected-checked)`: Styles the checkbox when checked (border color, background color).
        *   `:global(.w--redirected-focus)`: Styles the checkbox when focused via keyboard navigation (box-shadow).

*   **Label (`.cbox-label`):**
    *   Styles the label element, managing padding and display.
    *   Uses `data-lbl-size` for label sizing.

*   **Link (`.cbox-link`):**
    *   Styles the optional link, managing display, margin, and color.

*   **Feedback Container (`.itm_fbk`):**
    *   Styles the container for feedback messages and icons.
    *   Uses `position: absolute` for placement, typically anchored to the right (`right: 0%`).
    *   Applies flex properties for alignment within the feedback area.

---

## Usage

```jsx
// Import the component
import { CboxCtrl } from './CboxCtrl';

// --- Basic Example ---
// A simple checkbox with default label.
<CboxCtrl />

// --- Example: Setting Core Properties ---
// Demonstrating setting label text, name, value, and active state.
<CboxCtrl
  id="myCbox1"
  itmName="featureEnabled"
  itmValue="notifications"
  itmLblSrc="Enable Notifications"
  itmActive="True" // Or "False"
/>

// --- Example: With Link and Feedback ---
// Showing a checkbox with an associated link and a success feedback message.
<CboxCtrl
  id="myCbox2"
  itmLblSrc="Agree to Terms"
  link={true}
  linkTxtSrc="View Terms"
  linkSrc={{ href: "/terms" }}
  fbk={true}
  fbkFbkTxtSrc="You must agree to proceed."
  fbkFbkIcnSrc="warning-sign"
  fbkFbkClr="warning"
  fbkFbkIcnLoc="l" // Icon on the left
/>

// --- Example: Handling Change Event ---
// Attaching an onChange handler to detect state changes.
const handleCheckboxChange = (event) => {
  console.log(`Checkbox status: ${event.target.checked}`);
};

<CboxCtrl
  id="myCbox3"
  itmLblSrc="Remember Me"
  onChange={handleCheckboxChange}
/>

// --- Example: Custom Alignment and Click Handler ---
// Using custom alignment and a click handler via itmClick.
const handleCustomClick = () => {
  console.log("Custom click action!");
};

<CboxCtrl
  id="myCbox4"
  itmLblSrc="Custom Style"
  align="right" // Uses data-input-align="right" internally
  itmClick={{ onClick: handleCustomClick }}
/>

// --- Example: Inactive State (via itmActive) and Feedback ---
// Rendering a checkbox in an inactive state with error feedback.
<CboxCtrl
  id="myCbox5"
  itmLblSrc="Input Disabled"
  itmActive="False" // Simulates inactive/disabled appearance
  fbk={true}
  fbkFbkTxtSrc="This field is disabled."
  fbkFbkClr="danger"
/>
```