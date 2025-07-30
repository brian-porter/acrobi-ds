[Table of Contents](../../toc.md)

# Chip Component

## Overview
This section provides a concise overview of the **Chip** component. The Chip component is a versatile UI element used to represent small, interactive pieces of information. It can display text, icons, and avatars, making it suitable for various applications such as tags, filters, input fields, or contact representations. Chips are designed to be compact and provide a quick overview or interaction point for a larger entity.

![chip](https://github.com/user-attachments/assets/582a3c95-0ec8-48f5-bc42-93026cb95af5)

## Properties
This section details all the configurable properties (props) that the **Chip** component accepts.

| Name           | Description                                                                                                                                                                                                                         | Possible Values                                                                                                                                                                     | Default Setting                                                                                                     |
| :------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------ |
| `as`           | Specifies the HTML element or React component to render the Chip as.                                                                                                                                                                | `React.ElementType` (e.g., `_Builtin.Block`, `div`, `span`)                                                                                                                           | `_Builtin.Block`                                                                                                    |
| `chip`         | Controls the overall visibility of the Chip component. If `false`, the component will not render.                                                                                                                                   | `boolean` (`true`, `false`)                                                                                                                                                         | `true`                                                                                                              |
| `base`         | If `true`, renders a basic chip with text and an optional leading icon.                                                                                                                                                           | `boolean` (`true`, `false`)                                                                                                                                                         | `true`                                                                                                              |
| `avtr`         | If `true`, renders a chip with an avatar, text, and an optional trailing icon. This prop implies `base` is `false`.                                                                                                               | `boolean` (`true`, `false`)                                                                                                                                                         | `false`                                                                                                             |
| `chipActive`   | Controls the active state styling of the chip.                                                                                                                                                                                      | `string` (`"true"`, `"false"`)                                                                                                                                                      | `"false"`                                                                                                           |
| `chipIcn`      | Toggles the visibility of the leading icon in the `base` chip type.                                                                                                                                                                 | `boolean` (`true`, `false`)                                                                                                                                                         | `true`                                                                                                              |
| `chipTxt`      | Toggles the visibility of the text content in the `base` chip type.                                                                                                                                                                 | `boolean` (`true`, `false`)                                                                                                                                                         | `true`                                                                                                              |
| `chipIcnSrc`   | Specifies the source for the leading icon in the `base` chip. This can be a string (e.g., icon name) or a React component.                                                                                                         | `React.ReactNode` (e.g., `"default"`, `"settings_icon"`, `<Icon name="settings" />`)                                                                                             | `"default"`                                                                                                         |
| `chipTxtSrc`   | Specifies the source for the text content in the `base` chip. This can be a string or a React component.                                                                                                                          | `React.ReactNode` (e.g., `"Chip"`, `"My Tag"`, `<span>Tag</span>`)                                                                                                                 | `"Chip"`                                                                                                            |
| `chipStyle`    | Defines the visual style of the chip.                                                                                                                                                                                               | `string` (Specific values inferred from usage, e.g., `"nl"` for normal)                                                                                                           | `"nl"`                                                                                                              |
| `chipTxtSz`    | Sets the size of the text within the chip.                                                                                                                                                                                          | `string` (Specific values inferred from usage, e.g., `"r3"`, `"r4"`)                                                                                                               | `"r3"`                                                                                                              |
| `chipTrail`    | Toggles the visibility of the trailing icon for both `base` and `avtr` chip types.                                                                                                                                                  | `boolean` (`true`, `false`)                                                                                                                                                         | `false`                                                                                                             |
| `chipTrailSrc` | Specifies the source for the trailing icon.                                                                                                                                                                                         | `React.ReactNode` (e.g., `"select_arrrow"`, `"clearcirc"`)                                                                                                                          | `"select_arrrow"`                                                                                                   |
| `chipDisabled` | Controls the disabled state styling of the chip. When set to `"true"`, the chip appears greyed out and non-interactive.                                                                                                           | `string` (`""` for enabled, `"true"` for disabled)                                                                                                                                | `""`                                                                                                                |
| `avtrSrc`      | Specifies the source URL for the avatar image when using the `avtr` chip type.                                                                                                                                                      | `string` (URL)                                                                                                                                                                      | `https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6679be8b25e9a8e10958d98e_avatar-default.avif` |
| `avtrBdg`      | Toggles the visibility of a badge on the avatar when using the `avtr` chip type.                                                                                                                                                    | `boolean` (`true`, `false`)                                                                                                                                                         | `false`                                                                                                             |
| `avtrBdgIcnSrc`| Specifies the source for the icon within the avatar badge (used when `avtrBdg` is `true`).                                                                                                                                          | `React.ReactNode` (e.g., `"Admin"`, `<Icon name="admin" />`)                                                                                                                        | `"Admin"`                                                                                                           |
| `avtrBdgClr`   | Sets the color of the avatar badge.                                                                                                                                                                                                 | `string` (e.g., `"yellow-700"`, `"blue-500"`)                                                                                                                                        | `"yellow-700"`                                                                                                      |
| `avtrTxtSrc`   | Specifies the source for the text content next to the avatar in the `avtr` chip type.                                                                                                                                               | `React.ReactNode` (e.g., `"FName LI"`, `"John Doe"`)                                                                                                                                | `"FName LI"`                                                                                                        |
| `avtrTrailSrc` | Specifies the source for the trailing icon when using the `avtr` chip type.                                                                                                                                                         | `React.ReactNode` (e.g., `"clearcirc"`)                                                                                                                                             | `"clearcirc"`                                                                                                       |
| `chipId`       | Sets a unique ID for the chip component, useful for accessibility or direct DOM manipulation.                                                                                                                                     | `string`                                                                                                                                                                            | `"chip"`                                                                                                            |
| `chipClick`    | An object containing event handlers for click interactions on the chip.                                                                                                                                                             | `object` (Standard React event handlers, e.g., `{ onClick: () => {} }`)                                                                                                              | `{}`                                                                                                                |

---
**Notes on Properties:**
*   **`Name`**: The exact name of the prop as used in the code (e.g., `chipTxtSrc`, `avtr`).
*   **`Description`**: Clearly explain the purpose and effect of the prop.
*   **`Possible Values`**: List all accepted data types, specific string literals, enums, or reference types. Provide examples where helpful.
*   **`Default Setting`**: Indicate the value the prop takes if it's not explicitly provided.
---

## Styling
This section describes how the **Chip** component is styled and how users can customize its appearance.

*   **Base Styles (`Chip.module.css` or similar):**
    *   Defines the core visual properties and layout for the chip elements.
    *   Includes styling for container (`.chip-container`), text (`.chip-text`), leading icon (`.chip-icon`), trailing icon (`.chip-trail`), avatar (`.chip-avatar`), avatar badge (`.avatar-badge`), and avatar text (`.avatar-text`).
    *   Applies `display: flex` for arranging elements within the chip.
    *   Handles properties like `padding`, `border-radius`, `font-size`, `background-color`, `color`, `border`, `box-shadow`, and transitions for interactive states.

*   **Attribute-Based Styling / Modifier Classes:**
    *   **Type (`data-chip-type`):** Differentiates between `base` and `avatar` chip rendering using the `base` and `avtr` props.
    *   **State (`data-chip-active`, `data-chip-disabled`):** Applies distinct visual styles for active (`chipActive="true"`) and disabled (`chipDisabled="true"`) states.
    *   **Visibility (`data-icon-leading-visible`, `data-text-visible`, `data-icon-trailing-visible`, `data-avatar-badge-visible`):** Controls the display of internal elements based on props like `chipIcn`, `chipTxt`, `chipTrail`, and `avtrBdg`.
    *   **Content & Appearance (`data-chip-style`, `data-text-size`, `data-icon-source`, `data-avatar-source`, `data-avatar-badge-color`, `data-avatar-text-source`):** Styles are applied based on `chipStyle`, `chipTxtSz`, `chipIcnSrc`, `avtrSrc`, `avtrBdgClr`, `avtrTxtSrc`, and `chipTrailSrc` to customize the chip's look and content.

## Usage
This section provides practical examples of how to use the **Chip** component in your application.

```jsx
// Import the component
import { Chip } from './Chip';
// import { Icon } from './Icon'; // Potentially needed if using Icon component for sources

// --- Basic Chip (Base Type) ---
// A simple chip with default text and a leading icon.
<Chip base={true} chipTxtSrc="My Tag" />

// --- Chip with Avatar (Avatar Type) ---
// Renders a chip with an avatar, the avatar's text, and a trailing icon.
<Chip
  avtr={true}
  avtrSrc="https://example.com/my-avatar.jpg"
  avtrTxtSrc="John Doe"
  avtrTrailSrc="clearcirc" // Example trailing icon for avatar chip
/>

// --- Customizing Chip Properties ---
// Demonstrates various customizations for base chips.
<>
  {/* Active Chip */}
  <Chip base={true} chipTxtSrc="Active Filter" chipActive="true" />

  {/* Chip with custom leading icon and text size */}
  <Chip base={true} chipTxtSrc="Settings" chipIcnSrc="settings_icon" chipTxtSz="r4" />

  {/* Chip with trailing icon */}
  <Chip base={true} chipTxtSrc="Select Option" chipTrail={true} chipTrailSrc="arrow_down" />

  {/* Disabled Chip */}
  <Chip base={true} chipTxtSrc="Unavailable" chipDisabled="true" />

  {/* Avatar Chip with Avatar Badge */}
  {/* Displays user avatar, name, and an 'Admin' badge on the avatar */}
  <Chip
    avtr={true}
    avtrSrc="https://example.com/user.jpg"
    avtrTxtSrc="Jane Smith"
    avtrBdg={true}
    avtrBdgIcnSrc="Admin" // Icon or text for the badge
    avtrBdgClr="blue-500"
  />

  {/* Chip with a click handler */}
  <Chip base={true} chipTxtSrc="Click Me" chipClick={{ onClick: () => alert('Chip clicked!') }} />
</>
```

## Related Components
* [AdaptIcon](AdaptIcon.md)
* [Avatar](Avatar.md)
* [Badge](Badge.md)

### You may also be interested in:
* [Button](Button.md)
* [Icon](Icon.md)
* [Label](Label.md)
* [Tag](Tag.md)