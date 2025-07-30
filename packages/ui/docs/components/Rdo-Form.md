[Table of Contents](../../toc.md)

# Radio Button - Form Field `RadioForm`

## Overview
The `RadioForm` component provides a structured and complete form field for radio button groups. It includes essential elements like a main label (`FieldLabel`), the radio group itself (`RdoGrpCtrl`), and optional helper text (`FieldHelper`). This component is designed to manage the presentation and configuration of a radio button selection within a larger form context.

## Properties

| Name                 | Description                                                                                                            | Possible Values                                 | Default Setting        |
| :------------------- | :--------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------- | :--------------------- |
| `as`                 | The component or HTML element to use as the main wrapper for the entire form field.                                    | `React.ElementType` (e.g., `'div'`)             | `_Builtin.Block`      |
| `fld`                | Controls the overall visibility of the form field group. If `false`, the entire component renders as `null`.          | `boolean`                                       | `true`                 |
| `lblTop`             | Controls the visibility of the top label section (`FieldLabel`).                                                       | `boolean`                                       | `true`                 |
| `lblTopLblSrc`       | The main text content for the top label.                                                                               | `React.ReactNode`                               | `"Label"`              |
| `lblTopLblFor`       | Associates the top label with a specific input element via the `for` attribute, aiding accessibility.                  | `string`                                        | `"FldName"`            |
| `lblTopLblSz`        | Controls the size styling of the main top label.                                                                       | `string` (e.g., `"r4"`, `"r3"`)                 | `"r4"`                 |
| `lblTopLblClr`       | Controls the color of the main top label.                                                                              | `string`                                        | `"n900"`               |
| `lblTopLblShdw`      | Applies shadow styling to the main top label.                                                                          | `string`                                        | `undefined`            |
| `lblTopOpt`          | Controls the visibility of optional elements (like helper links or counts) placed alongside the main label.            | `boolean`                                       | `false`                |
| `lblTopOptSrc`       | The content for the optional element next to the main label.                                                           | `React.ReactNode`                               | `"label right"`        |
| `lblTopOptSz`        | Controls the size styling of the optional label element.                                                               | `string`                                        | `"r4"`                 |
| `lblTopOptClr`       | Controls the color of the optional label element.                                                                      | `string`                                        | `"n300"`               |
| `fldHelp`            | Controls the visibility of the helper text section (`FieldHelper`).                                                    | `boolean`                                       | `false`                |
| `fieldItmMap`        | Passes configurations to the nested `RdoGrpCtrl` to render multiple radio items dynamically.                           | `Types.Devlink.Slot` (array of props objects)   | `undefined`            |
| `fieldExampleRdoItm` | Determines if an example radio item should be shown within the `RdoGrpCtrl` when `fieldItmMap` is not provided.        | `boolean`                                       | `true`                 |
| `fldHelpHelpL`       | Controls the visibility of the helper text on the left side.                                                           | `boolean`                                       | `true`                 |
| `fldHelpHelpR`       | Controls the visibility of the helper text on the right side.                                                          | `boolean`                                       | `false`                |
| `fldHelpHelpLSrc`    | The text content for the left-side helper text.                                                                        | `React.ReactNode`                               | `"helper copy"`        |
| `fldHelpHelpRSrc`    | The text content for the right-side helper text (e.g., character count).                                             | `React.ReactNode`                               | `"0/200"`              |
| `fldHelpHelpShdw`    | Applies shadow styling to the helper text elements.                                                                    | `string`                                        | `undefined`            |
| `fieldItmName`       | Default `name` attribute passed to `RdoGrpCtrl` for its radio items.                                                   | `string`                                        | `undefined`            |
| `fieldItmValue`      | Default `value` attribute passed to `RdoGrpCtrl` for its radio items.                                                  | `string`                                        | `undefined`            |
| `fieldItmLblTxtSrc`  | Default label text source passed to `RdoGrpCtrl` for its radio items.                                                  | `React.ReactNode`                               | `"Label"`              |
| `fieldAlign`         | Default alignment passed to `RdoGrpCtrl` for its radio items.                                                          | `string`                                        | `"l"`                  |
| `fieldItmClick`      | Default click handler props passed to `RdoGrpCtrl` for its radio items.                                                | `Types.Devlink.RuntimeProps` (object)           | `{}`                   |
| `fieldFbk`           | Default visibility for feedback on individual radio items, passed to `RdoGrpCtrl`.                                   | `boolean`                                       | `false`                |
| `fieldFbkTxtSrc`     | Default feedback text source passed to `RdoGrpCtrl` for its radio items.                                               | `React.ReactNode`                               | `"Feedback message"` |
| `fieldFbkIcnSrc`     | Default feedback icon source passed to `RdoGrpCtrl` for its radio items.                                               | `React.ReactNode`                               | `"clearcirc"`          |
| `fieldFbkClr`        | Default feedback color passed to `RdoGrpCtrl` for its radio items.                                                     | `string`                                        | `"fd500"`              |
| `fieldFbkIcnLoc`     | Default feedback icon location passed to `RdoGrpCtrl` for its radio items.                                             | `string`                                        | `"r"`                  |

---

## Styling

The `RadioForm` component leverages CSS Modules as defined in `RadioForm.module.css`.

*   **Outer Wrapper (`.form_itm_wrap`):**
    *   Sets `position: relative` for potential child absolute positioning.
    *   Uses flexbox (`display: flex`, `align-items: center`) for layout management.
    *   `flex: 1` allows the form item to grow and fill available space.
*   **Main Field Container (`.form_main`):**
    *   Applies relative positioning and `z-index: 0`.
    *   Uses flex display (`display: flex`) with `flex-direction: column` to stack the label, radio group, and helper text vertically.
    *   `align-self: stretch` ensures the container takes the full width.
    *   Sets padding (`padding: 8px var(--_c---padding)`) for internal spacing.
    *   Manages margins and gaps (`grid-column-gap`, `grid-row-gap`) between child elements.

---

## Usage

```jsx
// Import the main component and potentially sub-components for mapping examples
import { RadioForm } from './RadioForm';
import { RdoCtrl } from './RdoCtrl'; // For fieldItmMap example

// --- Basic Example ---
// A simple radio group with a default label.
<RadioForm />

// --- Example: Customizing the Top Label ---
// Setting label text, size, and optional elements.
<RadioForm
  lblTopLblSrc="Select Your Preferred Size"
  lblTopLblSz="r5"
  lblTopOpt={true}
  lblTopOptSrc="Required"
  lblTopOptClr="danger"
/>

// --- Example: Configuring the Radio Group Items ---
// Providing configuration for multiple radio items via fieldItmMap.
const myRadioItems = [
  { id: "size1", itmName: "shirtSize", itmValue: "S", itmLblSrc: "Small" },
  { id: "size2", itmName: "shirtSize", itmValue: "M", itmLblSrc: "Medium" },
  { id: "size3", itmName: "shirtSize", itmValue: "L", itmLblSrc: "Large" },
];

<RadioForm
  lblTopLblSrc="Shirt Size"
  fieldItmMap={myRadioItems.map((item) => (
    <RdoCtrl
      key={item.id}
      id={item.id}
      itmName={item.itmName}
      itmValue={item.itmValue}
      itmLblSrc={item.itmLblSrc}
      // Pass down common settings
      fieldAlign="l"
      fieldFbk={true}
      fieldFbkClr="info"
      fieldFbkTxtSrc="Please select."
    />
  ))}
/>

// --- Example: Adding Helper Text ---
// Including helper text below the radio group for guidance.
<RadioForm
  lblTopLblSrc="Choose Payment Method"
  fieldExampleRdoItm={true} // Show one example if no map provided
  fldHelp={true}
  fldHelpHelpLSrc="Select one option below."
  fldHelpHelpRSrc="Choose wisely!"
/>

// --- Example: Controlling Field Visibility ---
// Conditionally rendering the entire form field.
const isVisible = false;
<RadioForm
  fld={isVisible}
  lblTopLblSrc="Conditional Field"
  fieldExampleRdoItm={true}
/>

// --- Example: Full Configuration ---
// Demonstrating various props for labels, group items, and helpers.
<RadioForm
  lblTopLblSrc="User Role"
  lblTopLblFor="roleInput"
  lblTopLblSz="r4"
  lblTopOpt={true}
  lblTopOptSrc="(Select one)"
  lblTopOptSz="r3"
  lblTopOptClr="n500"
  fieldItmName="userRole"
  fieldItmValue="editor" // Default value if applicable or for example
  fieldItmLblTxtSrc="Editor Role" // Label for the example item
  fieldAlign="l"
  fldHelp={true}
  fldHelpHelpL={true}
  fldHelpHelpLSrc="Roles determine permissions."
  fldHelpHelpR={true}
  fldHelpHelpRSrc="Info icon"
  fldHelpHelpShdw="effect-shadow"
/>
```