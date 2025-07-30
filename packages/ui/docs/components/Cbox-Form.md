[Table of Contents](../../toc.md)

# Checkbox - Form Field `CboxForm`

## Overview
The `CboxForm` component provides a structured and complete form field for checkbox selections. It includes essential elements like a main label (`FieldLabel`), the checkbox group (`CboxGrpCtrl`), and optional helper text (`FieldHelper`). This component is designed to manage the presentation and configuration of a checkbox selection within a larger form context.

## Properties
This section details all the configurable properties (props) that the **Checkbox Form** component accepts.
| Name                   | Description                                                                                                                             | Possible Values                                                 | Default Setting          |
| :--------------------- | :-------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------- | :----------------------- |
| `as`                   | The component or HTML element to use as the main wrapper for the entire form field.                                                     | `React.ElementType` (e.g., `'div'`)                             | `_Builtin.Block`        |
| `fld`                  | Controls the overall visibility of the form field group. If `false`, the entire component renders as `null`.                           | `boolean`                                                       | `true`                   |
| `lblTop`               | Controls the visibility of the top label section (`FieldLabel`).                                                                        | `boolean`                                                       | `true`                   |
| `lblTopLblSrc`         | The main text content for the top label.                                                                                                | `React.ReactNode`                                               | `"Label"`                |
| `lblTopLblFor`         | Associates the top label with a specific input element via the `for` attribute, aiding accessibility.                                     | `string`                                                        | `"FldName"`              |
| `fieldItmMap`          | Passes configurations to the nested `CboxGrpCtrl` to render multiple checkbox items dynamically.                                        | `JSX.Element[]` or `React.ReactNode`                            | `undefined`              |
| `fieldExampleCboxItm`  | Determines if an example checkbox item should be shown within the `CboxGrpCtrl` when `fieldItmMap` is not provided.                       | `boolean`                                                       | `true`                   |
| `lblTopLblSz`          | Controls the size styling of the main top label.                                                                                        | `string` (e.g., `"r4"`, `"r3"`)                                 | `"r4"`                   |
| `lblTopLblClr`         | Controls the color of the main top label.                                                                                               | `string`                                                        | `"n900"`                 |
| `lblTopLblShdw`        | Applies shadow styling to the main top label.                                                                                           | `string`                                                        | `undefined`              |
| `lblTopOpt`            | Controls the visibility of optional elements (like helper links or counts) placed alongside the main label.                             | `boolean`                                                       | `false`                  |
| `lblTopOptSrc`         | The content for the optional element next to the main label.                                                                            | `React.ReactNode`                                               | `"label right"`          |
| `lblTopOptSz`          | Controls the size styling of the optional label element.                                                                                | `string`                                                        | `"r4"`                   |
| `lblTopOptClr`         | Controls the color of the optional label element.                                                                                       | `string`                                                        | `"n300"`                 |
| `fldHelp`              | Controls the visibility of the helper text section (`FieldHelper`).                                                                     | `boolean`                                                       | `false`                  |
| `fldHelpHelpL`         | Controls the visibility of the helper text on the left side.                                                                            | `boolean`                                                       | `true`                   |
| `fldHelpHelpR`         | Controls the visibility of the helper text on the right side.                                                                           | `boolean`                                                       | `false`                  |
| `fldHelpHelpLSrc`      | The text content for the left-side helper text.                                                                                         | `React.ReactNode`                                               | `"helper copy"`          |
| `fldHelpHelpRSrc`      | The text content for the right-side helper text (e.g., character count).                                                              | `React.ReactNode`                                               | `"0/200"`                |
| `fldHelpHelpShdw`      | Applies shadow styling to the helper text elements.                                                                                     | `string`                                                        | `undefined`              |
| `fieldItmLblTxtSrc`    | Default label text source passed down to `CboxGrpCtrl` for its checkbox items.                                                          | `React.ReactNode`                                               | `"Label"`                |
| `fieldItmName`         | Default `name` attribute passed down to `CboxGrpCtrl` for its checkbox items.                                                           | `string`                                                        | `undefined`              |
| `fieldItmValue`        | Default `value` attribute passed down to `CboxGrpCtrl` for its checkbox items.                                                          | `string`                                                        | `undefined`              |
| `fieldItmActive`       | Default active state (`checked` status) passed down to `CboxGrpCtrl` for its checkbox items. Use `"True"` or `"False"`.               | `string` (e.g., `"True"`, `"False"`)                            | `"False"`                |
| `fieldAlign`           | Default alignment passed down to `CboxGrpCtrl` for its checkbox items.                                                                  | `string`                                                        | `"l"`                    |
| `fieldItmClick`        | Default click handler props passed down to `CboxGrpCtrl` for its checkbox items.                                                        | `object`                                                        | `{}`                     |
| `fieldLink`            | Default visibility for the link on individual checkbox items, passed down to `CboxGrpCtrl`.                                             | `boolean`                                                       | `false`                  |
| `fieldLinkTxtSrc`      | Default text source for the link on individual checkbox items, passed down to `CboxGrpCtrl`.                                            | `React.ReactNode`                                               | `"Link here"`            |
| `fieldLinkClick`       | Default click handler props for the link on individual checkbox items, passed down to `CboxGrpCtrl`.                                    | `object`                                                        | `{}`                     |
| `fieldFbk`             | Default visibility for feedback on individual checkbox items, passed down to `CboxGrpCtrl`.                                             | `boolean`                                                       | `false`                  |
| `fieldFbkTxtSrc`       | Default feedback text source passed down to `CboxGrpCtrl` for its checkbox items.                                                       | `React.ReactNode`                                               | `"Feedback message"` |
| `fieldFbkIcnSrc`       | Default feedback icon source passed down to `CboxGrpCtrl` for its checkbox items.                                                       | `React.ReactNode`                                               | `"clearcirc"`            |
| `fieldFbkClr`          | Default feedback color passed down to `CboxGrpCtrl` for its checkbox items.                                                             | `string`                                                        | `"fd500"`                |
| `fieldFbkIcnLoc`       | Default feedback icon location passed down to `CboxGrpCtrl` for its checkbox items.                                                     | `string`                                                        | `"r"`                    |

---

**Styling**

The `CboxForm` component uses CSS Modules (`CboxForm.module.css`) for styling.

*   **Outer Wrapper (`.form_itm_wrap`):**
    *   Styles the outermost container.
    *   Sets `position: relative` and aligns items center using flexbox.
    *   `flex: 1` allows it to grow.

*   **Main Field Container (`.form_main`):**
    *   Applies relative positioning and `z-index: 0`.
    *   Uses flex display (`display: flex`) with `flex-direction: column` to stack the label, checkbox group, and helper text vertically.
    *   `align-self: stretch` ensures the container takes the full width.
    *   Sets padding (`padding: 8px var(--_c---padding)`) for internal spacing.
    *   Manages grid gaps (`grid-column-gap`, `grid-row-gap`) between child elements.

---

**Usage**

```jsx
// Import the main component and CboxCtrl for mapping examples
import { CboxForm } from './CboxForm';
import { CboxCtrl } from './CboxCtrl';

// --- Basic Example ---
// A simple checkbox form field with a default label.
<CboxForm />

// --- Example: Customizing the Top Label ---
// Setting label text, size, and optional elements.
<CboxForm
  lblTopLblSrc="I agree to the terms and conditions"
  lblTopLblSz="r5"
  lblTopOpt={true}
  lblTopOptSrc="(Required)"
  lblTopOptClr="danger"
/>

// --- Example: Configuring the Checkbox Group Items ---
// Providing configuration for multiple checkboxes via fieldItmMap.
const agreementCheckboxes = [
  { id: "agree1", itmName: "agreements", itmValue: "terms", itmLblSrc: "Accept Terms" },
  { id: "agree2", itmName: "agreements", itmValue: "privacy", itmLblSrc: "Privacy Policy", fieldItmActive: "True" },
];

<CboxForm
  lblTopLblSrc="Agreements"
  fieldItmMap={agreementCheckboxes.map((item) => (
    <CboxCtrl
      key={item.id}
      id={item.id}
      itmName={item.itmName}
      itmValue={item.itmValue}
      itmLblSrc={item.itmLblSrc}
      fieldItmActive={item.fieldItmActive}
      fieldFbk={true}
      fieldFbkTxtSrc="Must be checked"
      // Pass down common settings
      fieldAlign="l"
    />
  ))}
/>

// --- Example: Adding Helper Text ---
// Including helper text below the checkbox group for guidance.
<CboxForm
  lblTopLblSrc="Newsletter Subscription"
  fieldExampleCboxItm={true} // Show one example if no map provided
  fldHelp={true}
  fldHelpHelpLSrc="Receive updates and promotions."
  fldHelpHelpRSrc="(Optional)"
/>

// --- Example: Controlling Field Visibility ---
// Conditionally rendering the entire form field.
const showSubscriptionField = false;
<CboxForm
  fld={showSubscriptionField}
  lblTopLblSrc="Newsletter"
  fieldExampleCboxItm={true}
/>

// --- Example: Full Configuration with Links and Feedback ---
// Demonstrating various props for labels, group items, links, and helpers.
<CboxForm
  lblTopLblSrc="User Preferences"
  lblTopLblFor="preferences"
  lblTopLblSz="r4"
  lblTopOpt={true}
  lblTopOptSrc="(Manage)"
  lblTopOptSz="r3"
  lblTopOptClr="n500"
  fieldItmName="preferences"
  fieldItmValue="email" // Default value for example
  fieldItmLblTxtSrc="Email Notifications"
  fieldAlign="l"
  fieldLink={true}
  fieldLinkTxtSrc="Manage Settings"
  fieldLinkSrc={{ href: "/preferences/manage" }}
  fldHelp={true}
  fldHelpHelpL={true}
  fldHelpHelpLSrc="Control what updates you receive."
  fldHelpHelpR={true}
  fldHelpHelpRSrc="10/50 chars"
  fldHelpHelpShdw="effect-shadow"
/>
```