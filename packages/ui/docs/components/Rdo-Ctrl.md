[Table of Contents](../../toc.md)

# Radio Button - Control `RdoCtrl`

## Overview
The `RdoCtrl` component represents a single, customizable radio button input element. It includes an associated label and supports optional feedback messages (text and/or icon) to provide status or validation information. This component is designed to be a fundamental building block for radio button groups.

## Properties
This section details all the configurable properties (props) that the **Radio Button Control** component accepts.

| Name              | Description                                                                                                         | Possible Values                                                                    | Default Setting      |
| :---------------- | :------------------------------------------------------------------------------------------------------------------ | :--------------------------------------------------------------------------------- | :------------------- |
| `as`              | The component or HTML element to use as the wrapper for the radio button.                                         | `React.ElementType` (e.g., `'div'`, `React.Fragment`)                              | `_Builtin.FormRadioWrapper` |
| `fbk`             | Controls the visibility of the feedback section (message and icon).                                               | `boolean`                                                                          | `false`              |
| `id`              | A unique identifier for the radio input element.                                                                    | `string`                                                                           | `undefined`          |
| `itmName`         | The `name` attribute for the radio input, used to group related radio buttons.                                      | `string`                                                                           | `undefined`          |
| `itmValue`        | The `value` attribute for the radio input, representing the value submitted when selected.                          | `string`                                                                           | `undefined`          |
| `itmLblSrc`       | The content displayed as the label for the radio button.                                                            | `React.ReactNode` (string, JSX, etc.)                                              | `"Label"`            |
| `itmLblSz`        | Controls the size styling of the label text.                                                                        | `string` (e.g., `"r3"`, `"r4"`)                                                    | `"r3"`               |
| `align`           | Specifies the alignment of the radio input within its container (e.g., left, center, right).                      | `string`                                                                           | `undefined`          |
| `tabOrder`        | Defines the navigation order for the radio input when using the Tab key.                                          | `string` (numeric value)                                                           | `undefined`          |
| `fbkFbkTxt`       | Controls the visibility of the feedback text message.                                                               | `boolean`                                                                          | `true`               |
| `fbkFbkIcn`       | Controls the visibility of the feedback icon.                                                                       | `boolean`                                                                          | `true`               |
| `fbkFbkTxtSrc`    | The text content to display in the feedback message.                                                                | `React.ReactNode` (string, JSX, etc.)                                              | `"Feedback message"` |
| `fbkFbkIcnSrc`    | The source or identifier for the feedback icon (e.g., name of an icon from a library).                                | `React.ReactNode` (string, JSX, etc.)                                              | `"clearcirc"`        |
| `fbkFbkClr`       | The color theme applied to the feedback message (text and/or icon).                                                 | `string` (e.g., `"fd500"`, `"success100"`)                                         | `"fd500"`            |
| `fbkFbkIcnLoc`    | Determines the position of the feedback icon relative to the text (e.g., 'l' for left, 'r' for right).              | `string`                                                                           | `"r"`                |
| `onChange`        | A callback function executed when the state of the radio input changes (e.g., checked status).                    | `Function` / `React.ChangeEventHandler<HTMLInputElement>`                          | `undefined`          |
| `itmClick`        | An object containing additional runtime props to be spread onto the radio input or its wrapper, for custom interactions. | `Types.Devlink.RuntimeProps` (object)                                              | `{}`                 |

---

## Styling

The `RdoCtrl` component utilizes CSS Modules for styling, defined in `RdoCtrl.module.css`.

*   **Base Container (`.rdo_ctrl`):**
    *   Sets up relative positioning.
    *   Applies flex display (`display: flex`) for layout management.
    *   Defines `width: 100%` and `flex: 1` to allow it to grow and take available space.
    *   Establishes a minimum height (`min-height: 32px` potentially increasing on smaller screens via media queries).
    *   Manages spacing (`grid-column-gap`, `grid-row-gap`) between elements within the control.
    *   Aligns items vertically (`align-items: center`).
*   **Radio Input (`.rdo`):**
    *   Styles the visual appearance of the radio button itself (size, border, border-radius).
    *   Includes styles for different states:
        *   `:hover`: Changes border color on mouse hover.
        *   `:focus`: Applies border color and box-shadow for focus indication.
        *   `:global(.w--redirected-checked)`: Styles the radio button when checked, including border color, background color, and outline styles.
        *   `:global(.w--redirected-focus)`: Styles the radio button when it receives focus through keyboard navigation, applying border and box-shadow.
*   **Label (`.label`):**
    *   Configures the label element, typically using flex display for alignment.
*   **Feedback Container (`.itm_fbk`):**
    *   Styles the container for the feedback message and icon.
    *   Uses `position: absolute` to place it relative to the `.rdo_ctrl` container, typically anchored to the right (`right: 0%`).
    *   Manages flex properties for content alignment within the feedback area.

---

## Usage
This section provides practical examples of how to use the **Radio Button Control** component in your application.

```jsx
// Import the component
import { RdoCtrl } from './RdoCtrl';

// --- Basic Example ---
// A single radio button with default settings.
<RdoCtrl
  id="radio1"
  name="myRadioGroup"
  value="option1"
  label="Option 1"
/>

// --- Example: With Label and Value ---
// Setting the label text and the value associated with the radio button.
<RdoCtrl
  id="radio2"
  itmName="colors"
  itmValue="blue"
  itmLblSrc="Blue"
/>

// --- Example: With Feedback Message ---
// Displaying a feedback message (e.g., validation error) below the label.
<RdoCtrl
  id="radio3"
  itmName="options"
  itmValue="option3"
  itmLblSrc="Option Three"
  fbk={true} // Enable feedback section
  fbkFbkTxtSrc="Please select this option."
  fbkFbkClr="danger" // Example color
/>

// --- Example: With Feedback Icon and Text ---
// Showing both an icon and text for feedback, with icon on the right.
<RdoCtrl
  id="radio4"
  itmName="settings"
  itmValue="enable"
  itmLblSrc="Enable Feature"
  fbk={true}
  fbkFbkTxt={true}
  fbkFbkIcn={true}
  fbkFbkTxtSrc="Feature is enabled."
  fbkFbkIcnSrc="check-circle" // Example icon name
  fbkFbkClr="success"
  fbkFbkIcnLoc="r" // Icon on the right
/>

// --- Example: Handling Change Event ---
// Attaching an onChange handler to detect when the radio button is selected.
const handleRadioChange = (event) => {
  console.log(`Radio button changed: ${event.target.value}`);
};

<RdoCtrl
  id="radio5"
  itmName="choices"
  itmValue="choiceA"
  itmLblSrc="Choice A"
  onChange={handleRadioChange}
/>

// --- Example: Custom Wrapper and Click Props ---
// Using a custom wrapper element and passing down click handlers.
const handleItemClick = () => {
  console.log("Radio item clicked!");
};

<RdoCtrl
  as="li" // Use list item as wrapper
  id="radio6"
  itmName="listItems"
  itmValue="item6"
  itmLblSrc="List Item 6"
  itmClick={{ onClick: handleItemClick }}
/>
```