[Table of Contents](../../toc.md)

# Switch - Form Component

## Overview
This section provides a concise overview of the **SwitchForm** component. The `SwitchForm` component is designed to pair a switch control with a label and optional helper text. This makes it easier for users to understand what they are toggling, which is particularly useful in forms and settings panels where clarity is crucial. It provides a clear, accessible way to manage binary on/off states.

![switch-form](https://github.com/user-attachments/assets/9755db2a-8abe-4527-bb44-d1175177f552)

## Properties
This section details all the configurable properties (props) that the **SwitchForm** component accepts.

| Name                 | Description                                                                                                                   | Possible Values                                                                                                                                                           | Default Setting   |
| :------------------- | :---------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :---------------- |
| `as`                 | Specifies the HTML element or React component to render the `SwitchForm` as.                                                 | `React.ElementType`                                                                                                                                                       | `undefined`       |
| `flds`               | Defines the visibility conditions for the fields within the component.                                                        | `boolean` (`true` to show, `false` to hide)                                                                                                                               | `undefined`       |
| `lblTop`             | Determines the visibility conditions for the main top label.                                                                  | `boolean` (`true` to show, `false` to hide)                                                                                                                               | `undefined`       |
| `lblTopLblSrc`       | The primary text content for the top label.                                                                                   | `React.ReactNode` (e.g., "Enable Notifications")                                                                                                                          | `undefined`       |
| `lblTopLblFor`       | The `for` attribute for the top label, associating it with the switch's `id`.                                               | `string` (Should match the `id` of the switch input)                                                                                                                      | `undefined`       |
| `lblTopLblSz`        | Sets the size of the top label text.                                                                                          | `string` (e.g., `"r4"`)                                                                                                                                                   | `undefined`       |
| `lblTopLblClr`       | Sets the color of the top label text.                                                                                         | `string` (e.g., `"n900"`)                                                                                                                                                 | `undefined`       |
| `lblTopLblShdw`      | Applies a shadow effect to the top label text.                                                                                | `string`                                                                                                                                                                  | `undefined`       |
| `lblTopOpt`          | Toggles the display of an optional indicator next to the top label.                                                           | `boolean` (`true`, `false`)                                                                                                                                               | `undefined`       |
| `lblTopOptSrc`       | The text content for the optional indicator (e.g., "optional", "required").                                                 | `React.ReactNode`                                                                                                                                                         | `undefined`       |
| `lblTopOptSz`        | Sets the size of the optional indicator text.                                                                                 | `string`                                                                                                                                                                  | `undefined`       |
| `lblTopOptClr`       | Sets the color of the optional indicator text.                                                                                | `string`                                                                                                                                                                  | `undefined`       |
| `fieldTglMap`        | A slot for defining the structure or behavior of the toggle group (likely used internally or for advanced configurations).    | `Types.Devlink.Slot`                                                                                                                                                      | `undefined`       |
| `fieldExampleToggleGroup`| Visibility conditions for an example toggle group, possibly for preview or template purposes.                           | `boolean` (`true` to show, `false` to hide)                                                                                                                               | `undefined`       |
| `fldHelp`            | Determines whether helper text is displayed for the field.                                                                    | `boolean` (`true` to show, `false` to hide)                                                                                                                               | `undefined`       |
| `fldHelpHelpL`       | Determines if helper text is displayed on the left side.                                                                      | `boolean` (`true`, `false`)                                                                                                                                               | `undefined`       |
| `fldHelpHelpR`       | Determines if helper text is displayed on the right side.                                                                     | `boolean` (`true`, `false`)                                                                                                                                               | `undefined`       |
| `fldHelpHelpLSrc`    | The source text for the left-aligned helper text.                                                                             | `React.ReactNode`                                                                                                                                                         | `undefined`       |
| `fldHelpHelpRSrc`    | The source text for the right-aligned helper text.                                                                            | `React.ReactNode`                                                                                                                                                         | `undefined`       |
| `fldHelpHelpShdw`    | Applies a shadow effect to the helper text.                                                                                   | `string`                                                                                                                                                                  | `undefined`       |
| `fieldTglLableSrc`   | The label text specifically for the switch control itself, often displayed next to it.                                        | `React.ReactNode`                                                                                                                                                         | `undefined`       |
| `fieldTglClick`      | Runtime properties for the field toggle's click event (e.g., event handlers).                                               | `Types.Devlink.RuntimeProps` (e.g., `{ onClick: () => {} }`)                                                                                                              | `undefined`       |
| `Label`              | A shortcut prop for the main label text (`lblTopLblSrc`).                                                                   | `string`                                                                                                                                                                  | `undefined`       |
| `Helper`             | A shortcut prop for the primary helper text, likely mapping to `fldHelpHelpLSrc`.                                             | `string`                                                                                                                                                                  | `undefined`       |
| `checked`            | Determines whether the switch is in the "on" or "off" state.                                                                  | `boolean` (`true` for on, `false` for off)                                                                                                                                | `false`           |
| `disabled`           | Controls whether the switch and its label are interactive or read-only.                                                       | `boolean` (`true`, `false`)                                                                                                                                               | `false`           |
| `id`                 | The unique ID for the switch input or wrapper, crucial for accessibility and label association.                             | `string`                                                                                                                                                                  | `undefined`       |
| `name`               | The `name` attribute for the switch, typically used in form submissions.                                                      | `string`                                                                                                                                                                  | `undefined`       |
| `onChange`           | Callback function triggered when the switch's state changes.                                                                  | `(event: React.ChangeEvent<HTMLInputElement>) => void`                                                                                                                    | `() => {}`        |

---
**Notes on Properties:**
*   **`Name`**: The exact name of the prop as used in the code (e.g., `lblTopLblSrc`, `fieldTglLableSrc`).
*   **`Description`**: Clearly explain the purpose and effect of the prop.
*   **`Possible Values`**: List all accepted data types, specific string literals, enums, or reference types. Provide examples where helpful.
*   **`Default Setting`**: Indicate the value the prop takes if it's not explicitly provided.
---

## Styling
This section describes how the **SwitchForm** is styled and how users can customize its appearance.

*   **Base Styles (`SwitchCtrl.module.css` or similar):**
    *   The component likely leverages the base styling for switch controls defined in `SwitchCtrl.module.css`.
    *   This includes styles for the container (`.toggle-ctrl`), track (`.toggletrack`), and toggle (`.toggledrag`).
    *   These styles define the visual appearance of the switch itself (shape, colors, states).

*   **Attribute-Based Styling / Modifier Classes:**
    *   The `SwitchForm` component wraps this base switch with label and helper text functionality.
    *   Props related to the label (`lblTopLblSrc`, `lblTopLblFor`, `lblTopOpt`, etc.) configure the label element, likely positioned above or alongside the switch.
    *   Props related to helper text (`fldHelp`, `fldHelpHelpLSrc`, etc.) configure the helper text display.
    *   The `fieldTglLableSrc` prop is likely the label displayed directly next to the switch.
    *   The `checked` and `disabled` props (if passed down to the underlying switch) would control its interactive and visual states.
    *   `fieldTglClick` would handle event binding for state changes.

## Usage
This section provides practical examples of how to use the **SwitchForm** component in your application.

```jsx
// Import the component and necessary React hooks
import { SwitchForm } from './SwitchForm';
import React, { useState } from 'react';

// --- Basic SwitchForm ---
// A switch with a label and helper text.
function BasicSwitchForm() {
  const [isEnabled, setIsEnabled] = useState(false);

  return (
    <SwitchForm
      id="enable-feature-switch"
      name="featureEnabled"
      label="Enable Feature" // Main label for the field
      helperText="Toggles the feature on or off." // Helper text
      checked={isEnabled}
      onChange={(e) => setIsEnabled(e.target.checked)}
    />
  );
}

// --- SwitchForm with Optional Label ---
// A switch with a required indicator next to the label.
function SwitchFormWithOptionalLabel() {
  const [isSubscribed, setIsSubscribed] = useState(true);

  return (
    <SwitchForm
      id="subscribe-switch"
      name="isSubscribed"
      lblTopLblSrc="Newsletter"
      lblTopOpt={true}
      lblTopOptSrc="required"
      fieldTglLableSrc="Sign up for updates" // Label directly next to the switch
      checked={isSubscribed}
      onChange={(e) => setIsSubscribed(e.target.checked)}
    />
  );
}

// --- Disabled SwitchForm ---
// A switch that is visually disabled and cannot be interacted with.
function DisabledSwitchForm() {
  return (
    <SwitchForm
      id="dark-mode-switch"
      name="darkMode"
      label="Dark Mode"
      helperText="Applies dark theme to the interface."
      checked={true} // Could be pre-checked
      disabled={true}
    />
  );
}
```