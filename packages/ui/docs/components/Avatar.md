[Table of Contents](../../toc.md)

# Avatar Component

## Overview
This section provides a concise overview of the **Avatar** component. Avatars bring a touch of personality to an image or icon. They're the cool kids on the design block, adding a dash of flair to represent a person or an object. The Avatar component can display an image or an icon, supports various sizes, shapes, and states, and can optionally include a badge for additional context or notifications.

![avatar](https://github.com/user-attachments/assets/3f427a0c-0ec3-4c5d-92d9-b681c7dc9504)

## Properties
This section details all the configurable properties (props) that the **Avatar** component accepts.

| Name        | Description                                                                                               | Possible Values                                                                                                                                                                                               | Default Setting                                                                            |
| :---------- | :-------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :----------------------------------------------------------------------------------------- |
| `avtr`      | Controls the visibility of the avatar component. If `false`, the component will not render.             | `boolean` (`true`, `false`)                                                                                                                                                                                 | `true`                                                                                     |
| `avtrSrc`   | Specifies the source URL for the avatar image.                                                            | `string` (URL), Any valid image URL.                                                                                                                                                                          | `https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6679be8b25e9a8e10958d98e_avatar-default.avif` |
| `avtrAlt`   | Provides alternative text for the avatar image, important for accessibility.                            | `string`, Any descriptive string.                                                                                                                                                                             | `__wf_reserved_inherit`                                                                    |
| `avtrSz`    | Sets the size of the avatar.                                                                              | `string` (`xs`, `s`, `sm`, `m`, `l`, `xl`, `2xl`, `3xl`, `auto`)                                                                                                                                              | `s`                                                                                        |
| `avtrShape` | Defines the shape of the avatar.                                                                          | `string` (`c` (Circle), `s` (Soft rounded corners), `r` (Rounded corners), `b` (Box/Square), `in` (Inherit from parent))                                                                                        | `c`                                                                                        |
| `avtrDrpShdw`| Applies a drop shadow to the avatar.                                                                      | `string` (Likely accepts predefined shadow classes or boolean-like strings, e.g., `""` for no shadow)                                                                                                        | `""`                                                                                       |
| `avtrGroup` | Indicates if the avatar is part of an overlapping group, adjusting its margin.                            | `string` (`true` for overlap, `""` for no overlap)                                                                                                                                                           | `""`                                                                                       |
| `avtrLink`  | Specifies a URL for the avatar to link to when clicked.                                                   | `string` (URL), Any valid URL.                                                                                                                                                                                | `""`                                                                                       |
| `avtrClick` | An object containing event handlers for avatar clicks.                                                    | `object` (Standard React event handlers, e.g., `{ onClick: () => {} }`)                                                                                                                                       | `{}`                                                                                       |
| `avtrOn`    | Applies a specific "on" state styling to the avatar, typically a border.                                  | `string` (`true` (applies border), `""` (no special styling))                                                                                                                                                | `""`                                                                                       |
| `bdg`       | Toggles the visibility of the badge on the avatar.                                                        | `boolean` (`true`, `false`)                                                                                                                                                                                 | `false`                                                                                    |
| `bdgTxt`    | Toggles the visibility of text within the badge.                                                          | `boolean` (`true`, `false`)                                                                                                                                                                                 | `true`                                                                                     |
| `bdgIcn`    | Toggles the visibility of an icon within the badge.                                                       | `boolean` (`true`, `false`)                                                                                                                                                                                 | `false`                                                                                    |
| `bdgTxtSrc` | Specifies the text content for the badge.                                                                 | `React.ReactNode` (string or number), Any string or number.                                                                                                                                                   | `"3"`                                                                                      |
| `bdgIcnSrc` | Specifies the icon to display in the badge.                                                               | `React.ReactNode` (string, likely an icon name), Any valid icon name.                                                                                                                                         | `"Default"`                                                                                |
| `bdgClr`    | Sets the background color of the badge.                                                                   | `string` (`d` (danger/red), `w` (warning/yellow), `s` (success/green), `p` (primary/blue), `n` (neutral/gray))                                                                                                | `fd500` (maps to `d`)                                                                      |
| `bdgSz`     | Sets the size of the badge.                                                                               | `string` (`s`, `m`, `l`)                                                                                                                                                                                      | `m`                                                                                        |
| `bdgIcnSz`  | Sets the size of the icon within the badge.                                                               | `string` (Likely predefined sizes like `r4`)                                                                                                                                                                | `r4`                                                                                       |
| `bdgLoc`    | Specifies the position of the badge relative to the avatar.                                               | `string` (`br` (bottom-right), `tl` (top-left), `tr` (top-right), `bl` (bottom-left))                                                                                                                        | `br`                                                                                       |

---
**Notes on Properties:**
*   **`Name`**: The exact name of the prop as used in the code (e.g., `avtrSz`, `bdgLoc`).
*   **`Description`**: Clearly explain the purpose and effect of the prop.
*   **`Possible Values`**: List all accepted data types, specific string literals, enums, or reference types. Provide examples where helpful. Note any type hints like `string` or `boolean`.
*   **`Default Setting`**: Indicate the value the prop takes if it's not explicitly provided.
---

## Styling
This section describes how the **Avatar** component is styled and how users can customize its appearance.

*   **Base Styles (`Avatar.module.css` or similar):**
    *   Defines the core visual properties and layout for the avatar element (e.g., an `<img>` tag or a `<div>` with a background and potentially an `::before` or `::after` pseudo-element for the image/icon).
    *   Includes properties like `display`, `position`, `overflow`, `object-fit` (for images), and ensures a block-level or inline-block behavior.
    *   Handles base sizing, borders, and potential `box-shadow` for default states.
    *   Manages the internal badge element (`.avatar-badge`) or tag element, controlling its absolute positioning, size, and alignment relative to the avatar container.

*   **Attribute-Based Styling / Modifier Classes:**
    *   **Size (`data-avtr-size`):** Controls `width`, `height`, and potentially `font-size` for any text or icons within the avatar based on the `avtrSz` prop.
    *   **Shape (`data-avtr-shape`):** Dictates `border-radius` to achieve different container shapes (Circle, Soft, Rounded, Box) based on the `avtrShape` prop.
    *   **Shadow (`data-avtr-shadow`):** Applies a `box-shadow` effect using the `avtrDrpShdw` prop.
    *   **Group Overlap (`data-avtr-group`):** Adjusts `margin-left` or `z-index` for avatars within a group to create an overlapping visual effect, controlled by the `avtrGroup` prop.
    *   **"On" State (`data-avtr-on`):** Adds a distinct visual indicator, typically a border, to signify an active or selected state using the `avtrOn` prop.
    *   **Badge Styling (`data-bdg-location`, `data-bdg-color`, `data-bdg-size`, etc.):** Styles the badge element based on `bdgLoc`, `bdgClr`, `bdgSz`, `bdgTxtSrc`, `bdgIcnSrc`, `bdgSz`, and `bdgIcnSz` props, managing its visibility, content, and position relative to the avatar.

## Usage
This section provides practical examples of how to use the **Avatar** component in your application.

```jsx
// Import the component
import { Avatar } from './Avatar'; // Adjust path as needed

// --- Basic Avatar ---
// A simple instance of the component with its default image and size.
<Avatar />

// --- Avatar with Custom Image and Size ---
// Displays a specific image, set to a large size, and a circle shape.
<Avatar
  avtrSrc="https://example.com/my-avatar.jpg"
  avtrSz="l"
  avtrShape="c"
/>

// --- Avatar with a Text Badge ---
// Shows a small, square avatar with a badge displaying "99+" in red.
<Avatar
  avtrSrc="https://example.com/another-avatar.png"
  avtrSz="s"
  avtrShape="b" // Box shape
  bdg={true}
  bdgTxtSrc="99+"
  bdgClr="d" // Danger color (red)
/>

// --- Avatar with an Icon Badge ---
// Demonstrates an avatar with an icon badge positioned at the top-right.
<Avatar
  avtrSrc="https://example.com/user-icon.jpg"
  avtrSz="m"
  bdg={true}
  bdgIcn={true}
  bdgIcnSrc="star" // Icon name for the badge
  bdgLoc="tr"      // Badge location: top-right
/>

// --- Avatar in "On" State with Group Overlap ---
// An extra-large avatar with a border to indicate an "on" state, part of an overlapping group.
<Avatar
  avtrSrc="https://example.com/active-user.jpg"
  avtrSz="xl"
  avtrOn="true"
  avtrGroup="true"
/>

// --- Avatar as a Link ---
// Configures the avatar to navigate to a specified URL when clicked.
<Avatar
  avtrSrc="https://example.com/profile-pic.jpg"
  avtrLink="/user/profile" // Link to a profile page
  avtrClick={{ onClick: () => console.log("Avatar link clicked!") }} // Optional click handler
/>
```
## Related Components
* [AdaptIcon](AdaptIcon.md)
* [Badge](Badge.md)
* [Chip](Chip.md)

### You may also be interested in:
* [Icon](Icon.md)
* [Button](Button.md)
* [Label](Label.md)
* [Snackbar](Snackbar.md)
# AvatarGroup Component

## Overview
This section provides a concise overview of the **AvatarGroup** component.
It is used to display multiple avatars in a group, often with overlap, providing a visual representation of a group of users or items. Key features include handling multiple avatars, controlling the size and shape of the group, and allowing individual avatar customization (source, alt text, badge).

**Example Content Structure:**
The **AvatarGroup** component is a versatile and customizable UI element designed for displaying collections of user avatars or item representations. It supports various sizes and shapes for the group and individual avatars, and allows for individual avatar customization, including badges.

## Properties
This section details all the configurable properties (props) that the **AvatarGroup** component accepts.

| Name | Description | Possible Values | Default Setting |
|---|---|---|---|
| `as` | The HTML element to render the group as. | React.ElementType (e.g., 'div', 'span') | _Builtin.Block (likely 'div') |
| `avtrGrp` | Controls the visibility of the AvatarGroup component. If false, the component will not render. | Types.Visibility.VisibilityConditions (boolean) | `true` |
| `avtr2` | Controls the visibility of the second avatar in the group. | Types.Visibility.VisibilityConditions (boolean) | `false` |
| `avtr3` | Controls the visibility of the third avatar in the group. | Types.Visibility.VisibilityConditions (boolean) | `false` |
| `avtr4` | Controls the visibility of the fourth avatar in the group. | Types.Visibility.VisibilityConditions (boolean) | `false` |
| `avtr5` | Controls the visibility of the fifth avatar in the group. | Types.Visibility.VisibilityConditions (boolean) | `false` |
| `avtrSz` | Sets the size of the avatars within the group. | Types.Builtin.Text (e.g., 'xs', 's', 'm', 'l') | `'xs'` |
| `avtr1Src` | Specifies the source URL for the first avatar image. | Types.Asset.Image (URL) | `'https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/663923c8ca66f55bef4ce1bb_avatar-empty.avif'` |
| `avtr1Alt` | Provides alternative text for the first avatar image. | Types.Basic.AltText (string) | `'__wf_reserved_inherit'` |
| `avtr1Shape` | Defines the shape of the first avatar. | Types.Builtin.Text (e.g., 'c' for Circle) | `'c'` |
| `grpShp` | Defines the shape of the AvatarGroup container. | Types.Builtin.Text (e.g., 'c' for Circle) | `'c'` |
| `avtr1Bdg` | Toggles the visibility of the badge on the first avatar. | Types.Visibility.VisibilityConditions (boolean) | `false` |
| `avtr1BdgClr` | Sets the background color of the badge on the first avatar. | Types.Builtin.Text (e.g., 'off', 'd', 'w', 's', 'p', 'n') | `'off'` |
| `avtr1BdgSz` | Sets the size of the badge on the first avatar. | Types.Builtin.Text (e.g., 'm') | `'m'` |
| `avtr2Src` | Specifies the source URL for the second avatar image. | Types.Asset.Image (URL) | `'https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/663923c8ca66f55bef4ce1bb_avatar-empty.avif'` |
| `avtr2Alt` | Provides alternative text for the second avatar image. | Types.Basic.AltText (string) | `'__wf_reserved_inherit'` |
| `avtr2Bdg` | Toggles the visibility of the badge on the second avatar. | Types.Visibility.VisibilityConditions (boolean) | `false` |
| `avtr2BdgClr` | Sets the background color of the badge on the second avatar. | Types.Builtin.Text (e.g., 'off') | `'off'` |
| `avtr3Src` | Specifies the source URL for the third avatar image. | Types.Asset.Image (URL) | `'https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/663923c8ca66f55bef4ce1bb_avatar-empty.avif'` |
| `avtr3Alt` | Provides alternative text for the third avatar image. | Types.Basic.AltText (string) | `'__wf_reserved_inherit'` |
| `avtr3Bdg` | Toggles the visibility of the badge on the third avatar. | Types.Visibility.VisibilityConditions (boolean) | `false` |
| `avtr3BdgClr` | Sets the background color of the badge on the third avatar. | Types.Builtin.Text (e.g., 'off') | `'off'` |
| `avtr4Src` | Specifies the source URL for the fourth avatar image. | Types.Asset.Image (URL) | `'https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/663923c8ca66f55bef4ce1bb_avatar-empty.avif'` |
| `avtr4Alt` | Provides alternative text for the fourth avatar image. | Types.Basic.AltText (string) | `'__wf_reserved_inherit'` |
| `avtr4Bdg` | Toggles the visibility of the badge on the fourth avatar. | Types.Visibility.VisibilityConditions (boolean) | `false` |
| `avtr4BdgClr` | Sets the background color of the badge on the fourth avatar. | Types.Builtin.Text (e.g., 'off') | `'off'` |
| `avtr5Src` | Specifies the source URL for the fifth avatar image. | Types.Asset.Image (URL) | `'https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/663923c8ca66f55bef4ce1bb_avatar-empty.avif'` |
| `avtr5Alt` | Provides alternative text for the fifth avatar image. | Types.Basic.AltText (string) | `'__wf_reserved_inherit'` |
| `avtr5Bdg` | Toggles the visibility of the badge on the fifth avatar. | Types.Visibility.VisibilityConditions (boolean) | `false` |
| `avtr5BdgClr` | Sets the background color of the badge on the fifth avatar. | Types.Builtin.Text (e.g., 'off') | `'off'` |

---
**Notes on Properties:**
*   **`Name`**: The exact name of the prop as used in the code (e.g., `avtrSz`, `grpShp`).
*   **`Description`**: Clearly explain the purpose and effect of the prop.
*   **`Possible Values`**: List all accepted data types, specific string literals, enums, or reference types (like `Types.Builtin.Text`, `Types.Visibility.VisibilityConditions`). Provide examples where helpful.
*   **`Default Setting`**: Indicate the value the prop takes if it's not explicitly provided.
---

## Styling
This section describes how the **AvatarGroup** component is styled and how users can customize its appearance.

*   **Base Styles (`AvatarGroup.module.css`):**
    *   Defines the core visual properties and layout for the component.
    *   Includes `display: flex`, `flex-direction: row-reverse`, `align-items: center`, `grid-column-gap: 0px`, `grid-row-gap: 0px`.
    *   Handles base sizing, borders, and potential `box-shadow` for default states.

*   **Attribute-Based Styling / Modifier Classes:**
    *   **Size (`data-group-size`):** Controls avatar size based on the `avtrSz` prop.
    *   **Shape (`data-group-shape`):** Dictates the shape of the group container based on the `grpShp` prop.
    *   **Individual Avatar Overlap:** Avatars within the group are rendered with `avtrGroup="true"`, which likely adjusts their `margin-left` or `z-index` to create an overlapping visual effect.

## Usage
This section provides practical examples of how to use the **AvatarGroup** component in your application.

```jsx
// Import the component
import { AvatarGroup } from './AvatarGroup';

// --- Basic Example ---
// A basic AvatarGroup displaying a single avatar with default settings.
<AvatarGroup />

// --- Example: Setting Core Properties ---
// An AvatarGroup with two avatars, specified size, and custom shapes for each.
<AvatarGroup
  avtrSz="s"
  avtr1Shape="c"
  avtr2Src="https://example.com/avatar2.jpg"
  avtr2Shape="r"
/>

// --- Example: With Icon and Specific Layout ---
// An AvatarGroup with three avatars, where the first avatar has a badge.
<AvatarGroup
  avtrSz="m"
  avtr1Src="https://example.com/avatar1.jpg"
  avtr2Src="https://example.com/avatar2.jpg"
  avtr3Src="https://example.com/avatar3.jpg"
  avtr1Bdg={true}
  avtr1BdgClr="s"
/>

// --- Example: Advanced Configuration ---
// An AvatarGroup with five avatars, demonstrating the maximum capacity and different badge colors.
<AvatarGroup
  avtrSz="l"
  avtr1Src="https://example.com/avatar1.jpg"
  avtr2Src="https://example.com/avatar2.jpg"
  avtr3Src="https://example.com/avatar3.jpg"
  avtr4Src="https://example.com/avatar4.jpg"
  avtr5Src="https://example.com/avatar5.jpg"
  avtr1Bdg={true}
  avtr1BdgClr="p"
  avtr2Bdg={true}
  avtr2BdgClr="w"
  avtr3Bdg={true}
  avtr3BdgClr="s"
  avtr4Bdg={true}
  avtr4BdgClr="n"
  avtr5Bdg={true}
  avtr5BdgClr="d"
/>
```

---
**Notes on Usage:**
*   **Import Statement**: Ensure the import statement correctly points to the component file.
*   **Examples**: Provide clear, runnable code snippets that cover common use cases and demonstrate the functionality of various props.
*   **Comments**: Use comments within the code to explain what each example demonstrates or what specific props are doing.
*   **Prop Names**: Use the actual prop names defined for the `AvatarGroup` component (e.g., `avtrSz`, `avtr1Src`, `grpShp`).
---

## Related Components
This section lists other components that are often used in conjunction with or are related to the **AvatarGroup** component.

* [Avatar](Avatar.md)

---
**Notes on Related Components:**
* The `AvatarGroup` component utilizes the `Avatar` component for each individual avatar displayed within the group.