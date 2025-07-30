[Table of Contents](../../toc.md)
# Radio Button Group - Control `RdoGrpCtrl`

## Overview
The `RdoGrpCtrl` component serves as a container and manager for a group of related `RdoCtrl` components. It facilitates rendering multiple radio items, either dynamically through a mapping function (`fieldRdoCtrlMap`) or by displaying a single example item (`fieldExampleRdoItm`). It also allows for the propagation of common configuration props down to each individual radio item.

## Properties

| Name                     | Description                                                                                                                                   | Possible Values                                         | Default Setting |
| :----------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------ | :-------------- |
| `as`                     | The component or HTML element to use as the main wrapper for the radio group container.                                                         | `React.ElementType` (e.g., `'div'`)                       | `_Builtin.Block` |
| `fieldRdoCtrlMap`        | A slot or prop that accepts an array of configurations to dynamically render multiple `RdoCtrl` instances. Each item in the map configures one `RdoCtrl`. | `Types.Devlink.Slot` (typically an array of props objects) | `undefined`     |
| `fieldExampleRdoItm`     | If `true` and `fieldRdoCtrlMap` is not provided, this renders a single example `RdoCtrl` component for preview or basic usage.                    | `boolean`                                               | `false`         |
| `fieldItmTxtSrc`         | Default label source for individual radio items if not specified per item in `fieldRdoCtrlMap`.                                               | `React.ReactNode`                                       | `"Label"`       |
| `fieldItmName`           | Default `name` attribute for radio items.                                                                                                     | `string`                                                | `undefined`     |
| `fieldItmValue`          | Default `value` attribute for radio items.                                                                                                    | `string`                                                | `undefined`     |
| `fieldAlign`             | Default alignment setting passed to individual `RdoCtrl` components.                                                                            | `string`                                                | `"l"`           |
| `fieldItmClick`          | Default runtime props object spread onto individual `RdoCtrl` components for click handling.                                                    | `Types.Devlink.RuntimeProps` (object)                   | `{}`            |
| `fieldFbk`               | Default visibility setting for the feedback section in individual `RdoCtrl` components.                                                         | `boolean`                                               | `false`         |
| `fieldFbkTxtSrc`         | Default feedback text source for individual `RdoCtrl` components.                                                                               | `React.ReactNode`                                       | `"Feedback message"` |
| `fieldFbkIcnSrc`         | Default feedback icon source for individual `RdoCtrl` components.                                                                               | `React.ReactNode`                                       | `"clearcirc"`   |
| `fieldFbkClr`            | Default feedback color for individual `RdoCtrl` components.                                                                                     | `string`                                                | `"fd500"`       |
| `fieldFbkIcnLoc`         | Default feedback icon location for individual `RdoCtrl` components.                                                                             | `string`                                                | `"r"`           |

---

## Styling

The `RdoGrpCtrl` component uses CSS Modules defined in `RdoGrpCtrl.module.css`.

*   **Wrapper (`.rdogrp_wrap`):**
    *   Provides basic container styling for the group.
*   **Main Group Container (`.grp_main`):**
    *   Establishes `position: relative` and `z-index: 0`.
    *   Uses flex display (`display: flex`) to arrange the radio items.
    *   Sets `flex-direction: column` to stack items vertically.
    *   `align-items: stretch` and `align-self: stretch` ensure items fill the container width.
    *   Includes responsive adjustments for minimum height on smaller screens (`@media screen and (max-width: 991px)`).

---

## Usage

```jsx
// Import necessary components
import { RdoGrpCtrl } from './RdoGrpCtrl';
import { RdoCtrl } from './RdoCtrl'; // Often needed for dynamic mapping examples

// --- Example 1: Rendering a single example radio item ---
// Useful for placeholders or simple cases where dynamic data isn't needed.
<RdoGrpCtrl fieldExampleRdoItm={true} />

// --- Example 2: Dynamic rendering using fieldRdoCtrlMap ---
// Creating a list of radio buttons from an array of configurations.
const radioOptions = [
  { id: "rdo1", itmName: "groupA", itmValue: "val1", itmLblSrc: "Option Alpha" },
  { id: "rdo2", itmName: "groupA", itmValue: "val2", itmLblSrc: "Option Beta" },
  { id: "rdo3", itmName: "groupA", itmValue: "val3", itmLblSrc: "Option Gamma", fbk: true, fbkFbkTxtSrc: "Selected value" },
];

<RdoGrpCtrl fieldRdoCtrlMap={radioOptions.map((option) => (
  <RdoCtrl
    key={option.id}
    id={option.id}
    itmName={option.itmName}
    itmValue={option.itmValue}
    itmLblSrc={option.itmLblSrc}
    fbk={option.fbk}
    fbkFbkTxtSrc={option.fbkFbkTxtSrc}
    // Spread other common props if needed
    fieldAlign="left" // Example of overriding default or passing prop
  />
))} />


// --- Example 3: Passing common props to all items ---
// Applying default feedback settings and alignment to all radio items.
const radioOptionsWithDefaults = [
  { id: "rdo4", itmName: "groupB", itmValue: "val4", itmLblSrc: "Choice Four" },
  { id: "rdo5", itmName: "groupB", itmValue: "val5", itmLblSrc: "Choice Five" },
];

<RdoGrpCtrl
  fieldRdoCtrlMap={radioOptionsWithDefaults.map((option) => (
    <RdoCtrl
      key={option.id}
      id={option.id}
      itmName={option.itmName}
      itmValue={option.itmValue}
      itmLblSrc={option.itmLblSrc}
      // Common props passed down
      fieldAlign="center" // Specific alignment for this group
      fieldFbk={true}
      fieldFbkClr="info"
      fieldFbkTxtSrc="Select this choice"
    />
  ))}
/>

// Note: The example above manually maps. In a real implementation,
// fieldRdoCtrlMap might accept an array of objects directly, and RdoGrpCtrl
// would internally map them to RdoCtrl components, passing the props.
// The current implementation seems to expect JSX elements within the map.
```