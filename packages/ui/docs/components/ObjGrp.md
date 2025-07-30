[Table of Contents](../../toc.md)

# Object Groups Component

## Overview
This section provides a concise overview of the **Object Groups** component. Object groups are a collection of components like Avatars, AdaptIcons, or Images that are displayed together with a slight overlap, creating a visual cluster. They are useful for representing multiple entities (e.g., team members, participants, file icons) in a compact and visually appealing way, indicating a collection rather than individual items.

![Object Group Example](https://github.com/user-attachments/assets/27b96c6f-d43e-493e-979e-c41c5fe4e260)

## Properties
This section details all the configurable properties (props) that the **Object Groups** component accepts.

| Name          | Description                                                                                                                   | Possible Values                                                                                                   | Default Setting |
| :------------ | :---------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------- | :-------------- |
| `GrpSz`       | Controls the overall size of the objects (e.g., Avatars, AdaptIcons) within the group.                                        | `string` (`XS`, `S`, `M`, `L`)                                                                                    | `S`             |
| `GrpShp`      | Defines the shape of the individual objects within the group (e.g., their border-radius).                                     | `string` (`C`: Circle, `S`: Square, `R`: Rectangle, `B`: Rounded Rectangle)                                       | `C`             |
| `Obj1Src`     | Specifies the source URI (image URL or icon identifier) for the first object in the group.                                  | `React.ReactNode` (URI)                                                                                           | `undefined`     |
| `Obj2Src`     | Specifies the source URI for the second object in the group.                                                                  | `React.ReactNode` (URI)                                                                                           | `undefined`     |
| `Obj3Src`     | Specifies the source URI for the third object in the group.                                                                   | `React.ReactNode` (URI)                                                                                           | `undefined`     |
| `Obj4Src`     | Specifies the source URI for the fourth object in the group.                                                                  | `React.ReactNode` (URI)                                                                                           | `undefined`     |
| `Obj5Src`     | Specifies the source URI for the fifth object in the group.                                                                   | `React.ReactNode` (URI)                                                                                           | `undefined`     |
| `Obj6Src`     | Specifies the source URI for the sixth object in the group.                                                                   | `React.ReactNode` (URI)                                                                                           | `undefined`     |
| `Obj7Src`     | Specifies the source URI for the seventh object in the group.                                                                 | `React.ReactNode` (URI)                                                                                           | `undefined`     |
| `Obj8Src`     | Specifies the source URI for the eighth object in the group.                                                                  | `React.ReactNode` (URI)                                                                                           | `undefined`     |
| `Obj9Src`     | Specifies the source URI for the ninth object in the group.                                                                   | `React.ReactNode` (URI)                                                                                           | `undefined`     |
| `Obj10Src`    | Specifies the source URI for the tenth object in the group.                                                                   | `React.ReactNode` (URI)                                                                                                                                                          | `undefined`     |
| `adpt1IcnSrc` | Source for the first AdaptIcon in the group.                                                                                  | `React.ReactNode` (Icon identifier)                                                                               | `undefined`     |
| `img1Src`     | Source for the first Image in the group.                                                                                      | `React.ReactNode` (Image URL)                                                                                     | `undefined`     |
| `avtr1Src`    | Source for the first Avatar in the group.                                                                                     | `React.ReactNode` (Avatar URL)                                                                                    | `undefined`     |
| `as`          | Specifies the HTML element or React component to render the group container as.                                               | `React.ElementType`                                                                                               | `undefined`     |
| `className`   | Allows passing custom CSS classes for additional styling.                                                                       | `string`                                                                                                          | `undefined`     |

---
**Notes on Properties:**
*   **`Name`**: The exact name of the prop as used in the code (e.g., `GrpSz`, `Obj1Src`).
*   **`Description`**: Clearly explain the purpose and effect of the prop.
*   **`Possible Values`**: List all accepted data types, specific string literals, enums, or reference types. Provide examples where helpful.
*   **`Default Setting`**: Indicate the value the prop takes if it's not explicitly provided.
---

## Styling
This section describes how the **Object Groups** component is styled and how users can customize its appearance.

*   **Base Styles (`ObjectGroup.module.css` or similar):**
    *   Defines the core visual properties and layout for the group of objects.
    *   Likely uses CSS Flexbox or Grid to arrange the overlapping objects.
    *   Manages the `z-index` and `margin` of individual objects to create the overlapping effect.
    *   Applies styles for the size (`GrpSz`) and shape (`GrpShp`) of the constituent objects.

*   **Attribute-Based Styling / Modifier Classes:**
    *   Props like `GrpSz` and `GrpShp` are used to apply styles that control the dimensions and border-radius of each object within the group.
    *   The `Obj#Src` props are used to render the actual content (images, icons, avatars) for each object.
    *   The component iterates through the provided sources and applies the group's size and shape styling to each one, managing their positioning to create the overlapping effect.

## Usage
This section provides practical examples of how to use the **Object Groups** component in your application.

```jsx
// Import the component and its constituent parts if needed for examples
import { ObjectGroup } from './ObjectGroup'; // Assuming component name
import { Avatar } from './Avatar';
import { AdaptIcon } from './AdaptIcon';
import { Image } from './Image';

// --- Example Usage with Avatars ---
// Displays a group of avatars, sized small, with a circular shape.
function AvatarGroupExample() {
  return (
    <ObjectGroup
      GrpSz="s"
      GrpShp="c" // Circle shape
      Obj1Src="https://example.com/avatar1.jpg"
      Obj2Src="https://example.com/avatar2.jpg"
      Obj3Src="https://example.com/avatar3.jpg"
    />
  );
}

// --- Example Usage with AdaptIcons ---
// Displays a group of AdaptIcons, sized medium, with square shapes.
function AdaptIconGroupExample() {
  return (
    <ObjectGroup
      GrpSz="m"
      GrpShp="b" // Box/Square shape
      Obj1Src="icon-home" // Assuming icon names are valid sources
      Obj2Src="icon-settings"
      Obj3Src="icon-user"
    />
  );
}

// --- Example Usage with Images ---
// Displays a group of images, sized large, with rounded corners.
function ImageGroupExample() {
  return (
    <ObjectGroup
      GrpSz="l"
      GrpShp="r" // Rounded shape
      Obj1Src="https://example.com/image1.jpg"
      Obj2Src="https://example.com/image2.jpg"
    />
  );
}

// --- Mixed Group Example ---
// A group combining different types of objects.
function MixedGroupExample() {
  return (
    <ObjectGroup
      GrpSz="s"
      GrpShp="c"
      // Assuming direct component rendering within the map or as children if supported
      Obj1Src={<Avatar avtrSz="s" avtrShape="c" avtrSrc="https://example.com/avatar1.jpg" />}
      Obj2Src={<AdaptIcon adptSz="s" adptShape="c" icnSrc="star" />}
      Obj3Src={<Image imgSrc="https://example.com/image1.jpg" imgSz="s" imgShape="c" />}
    />
  );
}

## Related Components

- [Avatar](Avatar.md)
- [AdaptIcon](AdaptIcon.md)
- [Image](Image.md)
