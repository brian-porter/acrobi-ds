[Table of Contents](../../toc.md)

# AdaptIcon Component

## Overview
This section provides a concise overview of the **AdaptIcon** component. The **AdaptIcon** component is a versatile UI element designed to display an icon within an adaptive container. It supports various sizes, shapes, and background colors, and can optionally include a badge and a tag for additional context or notifications. This component is ideal for representing entities, statuses, or actions in a visually consistent manner across the application.

## Properties
This section details all the configurable properties (props) that the **AdaptIcon** component accepts.

| Name        | Description                                                                                                                                       | Possible Values                                                                                            | Default Setting |
| :---------- | :------------------------------------------------------------------------------------------------------------------------------------------------ | :--------------------------------------------------------------------------------------------------------- | :-------------- |
| `adpt`      | Controls the visibility and adaptive behavior of the component. If `false`, the component will not render.                                       | `true`, `false`                                                                                            | `true`          |
| `bdg`       | Controls the visibility of the badge. If `true`, a badge will be displayed on the icon.                                                         | `true`, `false`                                                                                            | `false`         |
| `tag`       | Controls the visibility of the tag. If `true`, a tag will be displayed on the icon.                                                              | `true`, `false`                                                                                            | `false`         |
| `adptSz`    | Defines the overall size of the adaptive container and its contents.                                                                              | `xs`, `s`, `sm`, `m`, `l`, `xl`, `2xl`, `3xl`, `auto`                                                      | `m`             |
| `adptShape` | Determines the border-radius of the adaptive container.                                                                                           | `b` (Box), `r` (Rounded), `s` (Soft), `c` (Circle), `in` (Inherit)                                       | `r`             |
| `adptBgClr` | Sets the background color of the adaptive container.                                                                                              | Any valid color variable (e.g., `n500`, `p500`, `fd500`)                                                    | `n500`          |
| `icnClr`    | Sets the color of the icon within the container.                                                                                                  | Any valid color variable (e.g., `n000`, `p500`, `fd500`)                                                    | `n000`          |
| `icnSrc`    | Specifies which icon to display.                                                                                                                  | `React.ReactNode` (e.g., `"Default"`, `"Home"`, `"Settings"`)                                              | `"Default"`     |
| `bdgTxtSrc` | The text or number to display inside the badge.                                                                                                   | `React.ReactNode` (e.g., `3`, `"5"`)                                                                       | `3`             |
| `bdgLoc`    | Positions the badge relative to the icon.                                                                                                         | `br` (bottom-right), `bl` (bottom-left), `tr` (top-right), `tl` (top-left)                                | `br`            |
| `tagTxtSrc` | The text or number to display inside the tag.                                                                                                     | `React.ReactNode` (e.g., `3`, `"New"`)                                                                     | `3`             |
| `adptGroup` | Applies styling for overlapping icons in a group.                                                                                                 | `""` (no overlap), `"true"` (overlap)                                                                      | `""`            |

---
**Notes on Properties:**
*   **`Name`**: The exact name of the prop as used in the code (e.g., `adptSz`, `icnClr`).
*   **`Description`**: Clearly explain the purpose and effect of the prop.
*   **`Possible Values`**: List all accepted data types, specific string literals, enums, or reference types (like `React.ReactNode`). Provide examples where helpful.
*   **`Default Setting`**: Indicate the value the prop takes if it's not explicitly provided.
---

## Styling
This section describes how the **AdaptIcon** component is styled and how users can customize its appearance.

*   **Base Styles (`AdaptIcon.module.css` or similar):**
    *   Defines the core visual properties and layout for the component. This includes selectors like `.adapt-icon-base`, `.adapt-icon-container`, `.adapt-icon-badge`, `.adapt-icon-tag`.
    *   Covers aspects such as `display`, `flex` properties, dimensions, spacing (`padding`, `margin`), borders (`border`, `border-radius`), backgrounds (`background-color`), shadows (`box-shadow`), and transitions.
    *   Includes base `:hover` and `:focus-visible` states for interactive feedback, if applicable.
    *   May contain responsive adjustments for different screen sizes.

*   **Attribute-Based Styling / Modifier Classes (`AdaptIcon.css` or similar):**
    *   Explains how specific properties are controlled via CSS attributes (e.g., `data-adpt-size="large"`, `data-adpt-shape="circle"`) or dedicated modifier classes.
    *   **Size (`data-adpt-size`):** Controls dimensions, padding, and font-size based on the `adptSz` prop.
    *   **Shape (`data-adpt-shape`):** Dictates `border-radius` to achieve different container shapes (Box, Rounded, Soft, Circle) based on the `adptShape` prop.
    *   **Color (`data-adpt-bg-color`, `data-icn-color`):** Sets the background color of the container and the color of the icon, respectively, based on `adptBgClr` and `icnClr` props.
    *   **Badge (`data-bdg-location`, `data-bdg-visible`):** Manages the visibility and positioning of the badge using `bdg` and `bdgLoc` props.
    *   **Tag (`data-tag-visible`):** Manages the visibility of the tag using the `tag` prop.
    *   **Group Overlap (`data-adpt-group`):** Applies specific CSS to handle overlapping behavior for groups of icons, controlled by the `adptGroup` prop.

## Usage
This section provides practical examples of how to use the **AdaptIcon** component in your application.

```jsx
// Import the component
import { AdaptIcon } from './AdaptIcon';

// --- Basic Usage ---
// A simple instance of the component with default properties.
<AdaptIcon />

// --- With Icon and Default Properties ---
// Displaying a specific icon with default size, shape, and colors.
<AdaptIcon icnSrc="Home" />

// --- Custom Size and Colors ---
// Demonstrates setting the size, background color, and icon color.
<AdaptIcon
  icnSrc="Settings"
  adptSz="l"
  adptBgClr="p500" // Primary color, level 500
  icnClr="n000"    // Neutral color, level 000 (white)
/>

// --- With a Badge ---
// Shows how to enable and configure a badge for notifications.
<AdaptIcon
  icnSrc="Mail"
  bdg={true}
  bdgTxtSrc="5"
  bdgLoc="tr" // Badge positioned at top-right
/>

// --- With a Tag ---
// Demonstrates displaying a tag for additional status information.
<AdaptIcon
  icnSrc="User"
  tag={true}
  tagTxtSrc="New" // Tag text "New"
/>

// --- Custom Shape and Group Overlap ---
// Illustrates using a circular shape and enabling group overlap styling.
<AdaptIcon
  icnSrc="Group"
  adptShape="c"    // Circle shape
  adptGroup="true" // Enables group overlap styling
/>

// --- All Properties Example ---
// A comprehensive example combining multiple properties.
<AdaptIcon
  icnSrc="Alert"
  adptSz="2xl"
  adptShape="s"
  adptBgClr="fd500" // Danger color, level 500
  icnClr="n000"
  bdg={true}
  bdgTxtSrc={10}
  bdgLoc="bl" // Badge positioned at bottom-left
  tag={true}
  tagTxtSrc="Urgent"
/>
```

# AdaptIconGroup Component

## Overview
This section provides a concise overview of the **AdaptIconGroup** component.
It is used to display multiple icons in a group, often with overlap, providing a visual representation of a group of items or statuses. Key features include handling multiple icons, controlling the size and shape of the group, and allowing individual icon customization (source, background color, badge, tag).

**Example Content Structure:**
The **AdaptIconGroup** component is a versatile UI element designed for displaying collections of icons or statuses. It supports various sizes and shapes for the group and individual icons, and allows for individual icon customization, including badges and tags.

## Properties
This section details all the configurable properties (props) that the **AdaptIconGroup** component accepts.

| Name | Description | Possible Values | Default Setting |
|---|---|---|---|
| `as` | The HTML element to render the group as. | React.ElementType (e.g., 'div', 'span') | _Builtin.Block (likely 'div') |
| `adpt1` | Controls the visibility of the first icon in the group. | Types.Visibility.VisibilityConditions (boolean) | `true` |
| `adpt2` | Controls the visibility of the second icon in the group. | Types.Visibility.VisibilityConditions (boolean) | `true` |
| `adpt3` | Controls the visibility of the third icon in the group. | Types.Visibility.VisibilityConditions (boolean) | `false` |
| `adpt4` | Controls the visibility of the fourth icon in the group. | Types.Visibility.VisibilityConditions (boolean) | `false` |
| `adpt5` | Controls the visibility of the fifth icon in the group. | Types.Visibility.VisibilityConditions (boolean) | `false` |
| `adpt1IcnSrc` | Specifies the icon source for the first icon. | React.ReactNode (e.g., 'Default', 'Home') | `'Default'` |
| `adpt1BgClr` | Sets the background color of the first icon's container. | Types.Builtin.Text (e.g., 'n300', 'p500') | `'n300'` |
| `adpt2BgClr` | Sets the background color of the second icon's container. | Types.Builtin.Text (e.g., 'n300') | `'n300'` |
| `adpt2CnSrc` | Specifies the icon source for the second icon. (Note: 'CnSrc' might be a typo for 'IcnSrc') | React.ReactNode (e.g., 'Default') | `'Default'` |
| `adpt3BgClr` | Sets the background color of the third icon's container. | Types.Builtin.Text (e.g., 'n300') | `'n300'` |
| `adpt3IcnSrc` | Specifies the icon source for the third icon. | React.ReactNode (e.g., 'Default') | `'Default'` |
| `adpt4BgClr` | Sets the background color of the fourth icon's container. | Types.Builtin.Text (e.g., 'n300') | `'n300'` |
| `adpt4IcnSrc` | Specifies the icon source for the fourth icon. | React.ReactNode (e.g., 'Default') | `'Default'` |
| `adpt5BgClr` | Sets the background color of the fifth icon's container. | Types.Builtin.Text (e.g., 'n500') | `'n500'` |
| `adpt5IcnSrc` | Specifies the icon source for the fifth icon. | React.ReactNode (e.g., 'Default') | `'Default'` |
| `grpSz` | Sets the size of the icons within the group. | Types.Builtin.Text (e.g., 'xs', 's', 'm') | `'xs'` |
| `grpShp` | Defines the shape of the AdaptIconGroup container. | Types.Builtin.Text (e.g., 'r' for Rounded) | `'r'` |

---
**Notes on Properties:**
*   **`Name`**: The exact name of the prop as used in the code (e.g., `grpSz`, `adpt1IcnSrc`, `grpShp`).
*   **`Description`**: Clearly explain the purpose and effect of the prop.
*   **`Possible Values`**: List all accepted data types, specific string literals, enums, or reference types (like `React.ReactNode`, `Types.Builtin.Text`). Provide examples where helpful.
*   **`Default Setting`**: Indicate the value the prop takes if it's not explicitly provided.
---

## Styling
This section describes how the **AdaptIconGroup** component is styled and how users can customize its appearance.

*   **Base Styles (`AdaptIconGroup.module.css`):**
    *   Defines the core visual properties and layout for the component.
    *   Includes `display: flex`, `flex-direction: row-reverse`, `align-items: center`, `grid-column-gap: 0px`, `grid-row-gap: 0px`.
    *   Handles base sizing, borders, and potential `box-shadow` for default states.

*   **Attribute-Based Styling / Modifier Classes:**
    *   **Size (`data-group-size`):** Controls icon size based on the `grpSz` prop.
    *   **Shape (`data-group-shape`):** Controls group shape based on the `grpShp` prop.
    *   **Individual Icon Overlap:** Icons within the group are rendered with `adptGroup="true"`, which likely adjusts their `margin-left` or `z-index` to create an overlapping visual effect.

## Usage
This section provides practical examples of how to use the **AdaptIconGroup** component in your application.

```jsx
// Import the component
import { AdaptIconGroup } from './AdaptIconGroup';

// --- Basic Usage ---
// A basic AdaptIconGroup displaying icons with default settings.
<AdaptIconGroup />

// --- With Icon and Default Properties ---
// Displaying a specific icon with default size, shape, and colors.
<AdaptIconGroup icnSrc="Home" />

// --- Custom Size and Colors ---
// Demonstrates setting the size, background color, and icon color.
<AdaptIconGroup
  grpSz="m"
  grpShp="c"
  adpt1BgClr="p500" // Primary color, level 500
  adpt2BgClr="s500" // Success color, level 500
  adpt1IcnSrc="User"
  adpt2CnSrc="Settings" // Note: Assuming 'CnSrc' is a typo for 'IcnSrc'
/>

// --- With a Badge ---
// Shows how to enable and configure a badge for notifications.
<AdaptIconGroup
  icnSrc="Mail" // This prop seems to be for individual AdaptIcon, not AdaptIconGroup
  bdg={true} // This prop seems to be for individual AdaptIcon, not AdaptIconGroup
  bdgTxtSrc="5" // This prop seems to be for individual AdaptIcon, not AdaptIconGroup
  bdgLoc="tr" // Badge positioned at top-right
/>

// --- With a Tag ---
// Demonstrates displaying a tag for additional status information.
<AdaptIconGroup
  icnSrc="User" // This prop seems to be for individual AdaptIcon, not AdaptIconGroup
  tag={true} // This prop seems to be for individual AdaptIcon, not AdaptIconGroup
  tagTxtSrc="New" // Tag text "New"
/>

// --- Custom Shape and Group Overlap ---
// Illustrates using a circular shape and enabling group overlap styling.
<AdaptIconGroup
  grpShp="c"    // Circle shape
  adptGroup="true" // Enables group overlap styling
/>

// --- All Properties Example ---
// A comprehensive example combining multiple properties.
<AdaptIconGroup
  grpSz="l"
  grpShp="r"
  adpt1IcnSrc="Home"
  adpt1BgClr="n300"
  adpt2CnSrc="Settings" // Note: Assuming 'CnSrc' is a typo for 'IcnSrc'
  adpt2BgClr="n300"
  adpt3IcnSrc="Mail"
  adpt3BgClr="n300"
  adpt4IcnSrc="Alert"
  adpt4BgClr="n300"
  adpt5IcnSrc="User"
  adpt5BgClr="n500"
/>
```

---
**Notes on Usage:**
*   **Import Statement**: Ensure the import statement correctly points to the component file.
*   **Examples**: Provide clear, runnable code snippets that cover common use cases and demonstrate the functionality of various props.
*   **Comments**: Use comments within the code to explain what each example demonstrates or what specific props are doing.
*   **Prop Names**: Use the actual prop names defined for the `AdaptIconGroup` component (e.g., `grpSz`, `adpt1IcnSrc`, `grpShp`). Note potential typos in prop names like `adpt2CnSrc`.
---
