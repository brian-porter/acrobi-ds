[Table of Contents](../../toc.md)

# Checkbox Group - Control `CboxGrpCtrl`

## Overview
The `CboxGrpCtrl` component serves as a container and manager for a group of related `CboxCtrl` components. It facilitates rendering multiple checkbox items, either dynamically through a mapping function (`cboxCtrlMap`) or by displaying a single example item (`exampleCboxCtrl`). It also allows for the propagation of common configuration props down to each individual checkbox item.

## Properties

| Name                   | Description                                                                                                                                 | Possible Values                                          | Default Setting |
| :--------------------- | :------------------------------------------------------------------------------------------------------------------------------------------ | :------------------------------------------------------- | :-------------- |
| `as`                   | The component or HTML element to use as the main wrapper for the checkbox group container.                                                  | `React.ElementType` (e.g., `'div'`)                      | `_Builtin.Block` |
| `cboxCtrlMap`          | A slot or prop that accepts an array of JSX elements (typically `CboxCtrl` instances) to render multiple checkboxes dynamically.            | `JSX.Element[]` or `React.ReactNode`                     | `undefined`     |
| `exampleCboxCtrl`      | If `true` and `cboxCtrlMap` is not provided, this renders a single example `CboxCtrl` component for preview or basic usage.                    | `boolean`                                                | `true`          |
| `align`                | Default alignment setting passed to individual `CboxCtrl` components.                                                                       | `string` (e.g., `"l"`)                                   | `"l"`           |
| `fieldItmTxtSrc`      | Default label source for individual checkbox items if not specified per item in `cboxCtrlMap`.                                              | `React.ReactNode`                                        | `"Label"`       |
| `fieldItmName`         | Default `name` attribute for checkbox items.                                                                                                | `string`                                                 | `"cbox"`        |
| `fieldItmValue`        | Default `value` attribute for checkbox items.                                                                                               | `string`                                                 | `undefined`     |
| `fieldItmActive`       | Default active state (`checked` status) for checkbox items. Use `"True"` or `"False"`.                                                    | `string` (e.g., `"True"`, `"False"`)                     | `"False"`       |
| `fieldItmClick`        | Default click handler props spread onto individual `CboxCtrl` components for custom interactions.                                           | `object`                                                 | `{}`            |
| `fieldLink`            | Default visibility setting for the link on individual `CboxCtrl` components.                                                                | `boolean`                                                | `false`         |
| `fieldLinkTxtSrc`      | Default text source for the link on individual `CboxCtrl` components.                                                                       | `React.ReactNode`                                        | `"Link here"`   |
| `fieldLinkClick`       | Default click handler props spread onto the link element of individual `CboxCtrl` components.                                               | `object`                                                 | `{}`            |
| `fieldFbk`             | Default visibility setting for the feedback section in individual `CboxCtrl` components.                                                    | `boolean`                                                | `false`         |
| `fieldFbkTxtSrc`       | Default feedback text source for individual `CboxCtrl` components.                                                                          | `React.ReactNode`                                        | `"Feedback message"` |
| `fieldFbkIcnSrc`       | Default feedback icon source for individual `CboxCtrl` components.                                                                          | `React.ReactNode`                                        | `"clearcirc"`   |
| `fieldFbkClr`          | Default feedback color for individual `CboxCtrl` components.                                                                                | `string`                                                 | `"fd500"`       |
| `fieldFbkIcnLoc`       | Default feedback icon location for individual `CboxCtrl` components.                                                                        | `string`                                                 | `"r"`           |

---

**Styling**

The `CboxGrpCtrl` component uses CSS Modules (`CboxGrpCtrl.module.css`) for styling.

*   **Wrapper (`.grp_wrap`):**
    *   Provides basic container styling.
*   **Main Group Container (`.grp_main`):**
    *   Establishes `position: relative` and `z-index: 0`.
    *   Uses flex display (`display: flex`) with `flex-direction: column` to stack the checkbox items vertically.
    *   `align-items: stretch` and `align-self: stretch` ensure items fill the container width.
    *   Includes responsive adjustments for `min-height` on smaller screens.
    *   Applies `data-input-align` for alignment control passed down from the `align` prop.

---

**Usage**

```jsx
// Import necessary components
import { CboxGrpCtrl } from './CboxGrpCtrl';
import { CboxCtrl } from './CboxCtrl';

// --- Example 1: Rendering a single example checkbox item ---
// Useful for placeholders or simple cases where dynamic data isn't needed.
<CboxGrpCtrl exampleCboxCtrl={true} />

// --- Example 2: Dynamic rendering using cboxCtrlMap ---
// Creating a list of checkboxes from an array of configurations.
const checkboxOptions = [
  { id: "opt1", itmName: "features", itmValue: "email", itmLblSrc: "Email Updates" },
  { id: "opt2", itmName: "features", itmValue: "sms", itmLblSrc: "SMS Alerts", fieldFbk: true, fieldFbkTxtSrc: "Optional" },
  { id: "opt3", itmName: "features", itmValue: "push", itmLblSrc: "Push Notifications", fieldItmActive: "True" },
];

<CboxGrpCtrl
  cboxCtrlMap={checkboxOptions.map((option) => (
    <CboxCtrl
      key={option.id}
      id={option.id}
      itmName={option.itmName}
      itmValue={option.itmValue}
      itmLblSrc={option.itmLblSrc}
      fieldItmActive={option.fieldItmActive}
      fieldFbk={option.fieldFbk}
      fieldFbkTxtSrc={option.fieldFbkTxtSrc}
      // Pass down common props or overrides
      align="l" // Specific alignment for this group
    />
  ))}
/>

// --- Example 3: Passing common props to all items ---
// Applying default link and feedback settings to all checkboxes.
const settingsCheckboxes = [
  { id: "set1", itmName: "settings", itmValue: "darkMode", itmLblSrc: "Dark Mode" },
  { id: "set2", itmName: "settings", itmValue: "notifications", itmLblSrc: "Notifications" },
];

<CboxGrpCtrl
  cboxCtrlMap={settingsCheckboxes.map((option) => (
    <CboxCtrl
      key={option.id}
      id={option.id}
      itmName={option.itmName}
      itmValue={option.itmValue}
      itmLblSrc={option.itmLblSrc}
      // Common props passed down
      fieldLink={true}
      fieldLinkTxtSrc="Settings"
      fieldLinkSrc={{ href: "/settings" }}
      fieldFbk={true}
      fieldFbkClr="success"
      fieldFbkTxtSrc="Enabled"
    />
  ))}
/>

// Note: The example above manually maps JSX elements. In a more integrated system,
// cboxCtrlMap might accept an array of configuration objects directly, and
// CboxGrpCtrl would internally map them to CboxCtrl components.
```