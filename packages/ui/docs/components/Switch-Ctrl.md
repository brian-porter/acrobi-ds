[Table of Contents](../../toc.md)

# Switch Control Component

## Overview
This section provides a concise overview of the **Switch Control** component. The Switch control allows users to toggle between two states, typically on and off. It's commonly used for settings, preferences, or binary choices, providing a clear visual indicator of the current state.

## Properties
This section details all the configurable properties (props) that the **Switch Control** component accepts.

| Name      | Description                                                                                                       | Possible Values                                | Default Setting |
| :-------- | :---------------------------------------------------------------------------------------------------------------- | :--------------------------------------------- | :-------------- |
| `checked` | Determines whether the switch is in the "on" or "off" state.                                                    | `boolean` (`true` for on, `false` for off)     | `false`         |
| `disabled`| Controls whether the switch is interactive or read-only. If `true`, users cannot change the state.                | `boolean` (`true`, `false`)                    | `false`         |
| `label`   | The text or content displayed alongside the switch, describing its function.                                      | `React.ReactNode` (e.g., `"Enable Notifications"`) | `""`            |
| `id`      | The unique ID for the switch input or wrapper, essential for accessibility and label association.               | `string`                                       | `""`            |
| `name`    | The name attribute for the switch, typically used in form submissions.                                            | `string`                                       | `""`            |
| `labelAlign`| Controls the alignment of the label relative to the switch component.                                           | `string` (e.g., `"left"`, `"right"`, `"center"`) | `""`            |

---
**Notes on Properties:**
*   **`Name`**: The exact name of the prop as used in the code (e.g., `checked`, `label`).
*   **`Description`**: Clearly explain the purpose and effect of the prop.
*   **`Possible Values`**: List all accepted data types, specific string literals, enums, or reference types. Provide examples where helpful.
*   **`Default Setting`**: Indicate the value the prop takes if it's not explicitly provided.
---

## Styling
This section describes how the **Switch Control** is styled and how users can customize its appearance.

*   **Base Styles (`SwitchCtrl.module.css` or similar):**
    *   Defines the core visual properties and layout for the switch component.
    *   The `.toggle-ctrl` class serves as the main container, likely a flex container for alignment.
    *   The `.toggletrack` represents the background track, styled as a rectangle with a `border-radius` of 50px, giving it a pill-like shape. Its background color is `var(--n300-03baa38b)`.
    *   The `.toggledrag` is the movable toggle handle, a circular element with a `var(--color--n000)` background, positioned absolutely within the track.

*   **Attribute-Based Styling / Modifier Classes:**
    *   **State (`data-checked`, `aria-checked`):** The `checked` prop is used to apply styles that change the appearance of the track and toggle (e.g., changing colors) to indicate the "on" state.
    *   **Disabled (`data-disabled`, `aria-disabled`):** The `disabled` prop visually deactivates the switch, typically by muting colors and preventing interaction.
    *   **Label Alignment (`data-label-align`):** The `labelAlign` prop influences the layout of the label relative to the switch.

## Usage
This section provides practical examples of how to use the **Switch Control** component in your application.

```jsx
// Import the component
import { SwitchCtrl } from './SwitchCtrl'; // Assuming component name
import { useState } from 'react';

// --- Basic Switch ---
// A simple switch with a label, defaulting to 'off'.
function BasicSwitch() {
  const [isOn, setIsOn] = useState(false);

  return (
    <SwitchCtrl
      id="notifications-switch"
      name="notifications"
      checked={isOn}
      label="Enable Notifications"
      onChange={(e) => setIsOn(e.target.checked)}
    />
  );
}

// --- Checked Switch ---
// A switch that is initially set to the 'on' state.
function CheckedSwitch() {
  const [isFeatureEnabled, setIsFeatureEnabled] = useState(true);

  return (
    <SwitchCtrl
      id="feature-switch"
      name="feature"
      checked={isFeatureEnabled}
      label="Enable Feature"
      onChange={(e) => setIsFeatureEnabled(e.target.checked)}
    />
  );
}

// --- Disabled Switch ---
// A switch that is visually disabled and cannot be interacted with.
function DisabledSwitch() {
  return (
    <SwitchCtrl
      id="setting-switch"
      name="setting"
      checked={false}
      label="Option Disabled"
      disabled={true}
    />
  );
}
```

