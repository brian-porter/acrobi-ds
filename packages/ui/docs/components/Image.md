[Table of Contents](../../toc.md)

# Image Component

## Overview
This section provides a concise overview of the **Image** component. The `Image` component is designed to handle lazy loading of images, improving performance when dealing with multiple images. It supports various configurations for size, shape, and additional features like tags, banners, and icon bars, making it a versatile asset for visual content.

![image](https://github.com/user-attachments/assets/64b23a60-b75b-494a-96f3-2c8ed0e63e0d)

## Properties
This section details all the configurable properties (props) that the **Image** component accepts.

| Name                       | Description                                                                                                                                  | Possible Values                                                                                                                                                                                                                                                                                                      | Default Setting   |
| :------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------- |
| `imgSrc`                   | The source URL for the image file.                                                                                                           | `React.ReactNode` (string URL)                                                                                                                                                                                                                                                                         | `undefined`       |
| `imgAlt`                   | Alternative text for the image, crucial for accessibility and SEO.                                                                           | `React.ReactNode` (string)                                                                                                                                                                                                                                                                           | `undefined`       |
| `imgSz`                    | Sets the overall size of the image.                                                                                                          | `string` (`XS`, `S`, `M`, `L`, `XL`, `auto`)                                                                                                                                                                                                                                                         | `auto`            |
| `imgShape`                 | Defines the shape of the image container.                                                                                                    | `string` (`B` (Box), `R` (Rounded), `S` (Soft), `C` (Circle))                                                                                                                                                                                                                                         | `B`               |
| `imgAsp`                   | Sets the aspect ratio of the image, ensuring it maintains its proportions.                                                                   | `string` (e.g., `"16/9"`)                                                                                                                                                                                                                                                                            | `undefined`       |
| `img`                      | Toggles the overall visibility of the image component.                                                                                       | `boolean` (`true` to show, `false` to hide)                                                                                                                                                                                                                                                          | `false`           |
| `icnBar`                   | Toggles the visibility of an icon bar, typically overlaid on the image.                                                                      | `boolean` (`true` to show, `false` to hide)                                                                                                                                                                                                                                                          | `false`           |
| `tag`                      | Toggles the visibility of a tag element, usually in a corner of the image.                                                                   | `boolean` (`true` to show, `false` to hide)                                                                                                                                                                                                                                                          | `false`           |
| `act`                      | Toggles the visibility of an action element, which might include icons, badges, or quantity controls.                                        | `boolean` (`true` to show, `false` to hide)                                                                                                                                                                                                                                                          | `false`           |
| `bnr`                      | Toggles the visibility of a standard banner element overlaid on the image.                                                                   | `boolean` (`true` to show, `false` to hide)                                                                                                                                                                                                                                                          | `false`           |
| `bnrFull`                  | Toggles the visibility of a more comprehensive "full banner" element, potentially including labels, avatar groups, and different layouts.      | `boolean` (`true` to show, `false` to hide)                                                                                                                                                                                                                                                          | `false`           |
| `icnBarIcnBarL1Src`        | Source for the first icon in the icon bar (left side).                                                                                       | `React.ReactNode`                                                                                                                                                                                                                                                                                      | `undefined`       |
| `icnBarIcnBarL2Src`        | Source for the second icon in the icon bar (left side).                                                                                      | `React.ReactNode`                                                                                                                                                                                                                                                                                      | `undefined`       |
| `icnBarIcnBarL3Src`        | Source for the third icon in the icon bar (left side).                                                                                       | `React.ReactNode`                                                                                                                                                                                                                                                                                      | `undefined`       |
| `icnBarIcnBarR1Src`        | Source for the first icon in the icon bar (right side).                                                                                      | `React.ReactNode`                                                                                                                                                                                                                                                                                      | `undefined`       |
| `icnBarIcnBarR2Src`        | Source for the second icon in the icon bar (right side).                                                                                     | `React.ReactNode`                                                                                                                                                                                                                                                                                      | `undefined`       |
| `icnBarIcnBarR3Src`        | Source for the third icon in the icon bar (right side).                                                                                      | `React.ReactNode`                                                                                                                                                                                                                                                                                      | `undefined`       |
| `icnBarIcnBarL1`           | Toggles the visibility of the first icon on the left side of the icon bar.                                                                   | `boolean`                                                                                                                                                                                                                                                                                              | `false`           |
| `icnBarIcnBarL2`           | Toggles the visibility of the second icon on the left side of the icon bar.                                                                  | `boolean`                                                                                                                                                                                                                                                                                              | `false`           |
| `icnBarIcnBarL3`           | Toggles the visibility of the third icon on the left side of the icon bar.                                                                   | `boolean`                                                                                                                                                                                                                                                                                              | `false`           |
| `icnBarIcnBarR1`           | Toggles the visibility of the first icon on the right side of the icon bar.                                                                  | `boolean`                                                                                                                                                                                                                                                                                              | `false`           |
| `icnBarIcnBarR2`           | Toggles the visibility of the second icon on the right side of the icon bar.                                                                 | `boolean`                                                                                                                                                                                                                                                                                              | `false`           |
| `icnBarIcnBarR3`           | Toggles the visibility of the third icon on the right side of the icon bar.                                                                  | `boolean`                                                                                                                                                                                                                                                                                              | `false`           |
| `tagTagLoc`                | Sets the location of the tag relative to the image.                                                                                          | `string` (`tr`: top-right, `tl`: top-left, `br`: bottom-right, `bl`: bottom-left)                                                                                                                                                                                                                        | `undefined`       |
| `tagTagTxtSrc`           | The text content to display within the tag.                                                                                                  | `React.ReactNode`                                                                                                                                                                                                                                                                                      | `undefined`       |
| `actInptStep`              | Input step for an associated action control (e.g., quantity adjuster).                                                                       | `string`                                                                                                                                                                                                                                                                                               | `undefined`       |
| `actActBdg`                | Toggles the visibility of a badge on an action element.                                                                                        | `boolean` (`true` to show, `false` to hide)                                                                                                                                                                                                                                                          | `false`           |
| `actActIcnSrc`             | The source for an icon associated with an action.                                                                                            | `React.ReactNode`                                                                                                                                                                                                                                                                                      | `undefined`       |
| `actActBdgTxtSrc`         | The text content to display within a badge on an action element.                                                                               | `React.ReactNode`                                                                                                                                                                                                                                                                                      | `undefined`       |
| `actQty`                   | The quantity associated with an action (e.g., number of items).                                                                                | `string`                                                                                                                                                                                                                                                                                               | `undefined`       |
| `bnrBnrSz`                 | Sets the size of the standard banner.                                                                                                        | `string` (`s`, `m`, `l`)                                                                                                                                                                                                                                                                               | `undefined`       |
| `bnrBnrLoc`                | Sets the location of the standard banner.                                                                                                    | `string` (`tl`: top-left, `tr`: top-right, `bl`: bottom-left, `br`: bottom-right)                                                                                                                                                                                                                       | `undefined`       |
| `bnrBnrClr`                | Sets the color of the standard banner.                                                                                                       | `string`                                                                                                                                                                                                                                                                                               | `undefined`       |
| `bnrBnrIcnSrc`             | The source for an icon displayed within the standard banner.                                                                                 | `React.ReactNode`                                                                                                                                                                                                                                                                                      | `undefined`       |
| `bnrBnrTxtSrc`             | The text content to display within the standard banner.                                                                                      | `React.ReactNode`                                                                                                                                                                                                                                                                                      | `undefined`       |
| `bnrFullBnrFullLbl`        | Toggles the visibility of a label within the "full banner".                                                                                    | `boolean` (`true` to show, `false` to hide)                                                                                                                                                                                                                                                          | `false`           |
| `bnrFullBnrFullAvtrGrp`    | Toggles the visibility of an avatar group within the "full banner".                                                                            | `boolean` (`true` to show, `false` to hide)                                                                                                                                                                                                                                                          | `false`           |
| `bnrFullBnrFullLoc`        | Sets the location (top or bottom) of the "full banner".                                                                                      | `string` (`top`, `btm`)                                                                                                                                                                                                                                                                              | `undefined`       |
| `bnrFullBnrFullContAlign`  | Sets the content alignment within the "full banner".                                                                                         | `string` (`sb` (space-between), `start`, `end`)                                                                                                                                                                                                                                                     | `undefined`       |
| `bnrFullBnrFullLblTxtSrc` | The text content for the label within the "full banner".                                                                                     | `React.ReactNode`                                                                                                                                                                                                                                                                                      | `undefined`       |
| `bnrFullBnrFullLblIcnSrc`  | The source for an icon displayed next to the label within the "full banner".                                                                 | `React.ReactNode`                                                                                                                                                                                                                                                                                      | `undefined`       |
| `bnrFullBnrFullAvtrSrc1`   | Source URL for the first avatar in a potential avatar group within the "full banner".                                                          | `React.ReactNode`                                                                                                                                                                                                                                                                                      | `undefined`       |
| `bnrFullBnrFullAvtrSrc2`   | Source URL for the second avatar.                                                                                                            | `React.ReactNode`                                                                                                                                                                                                                                                                                      | `undefined`       |
| `bnrFullBnrFullAvtrSrc3`   | Source URL for the third avatar.                                                                                                             | `React.ReactNode`                                                                                                                                                                                                                                                                                      | `undefined`       |
| `bnrFullBnrFullAvtrSrc4`   | Source URL for the fourth avatar.                                                                                                            | `React.ReactNode`                                                                                                                                                                                                                                                                                      | `undefined`       |
| `bnrFullBnrFullAvtrSrc5`   | Source URL for the fifth avatar.                                                                                                             | `React.ReactNode`                                                                                                                                                                                                                                                                                      | `undefined`       |
| `bnrFullBnrFullAvtrSz`     | Sets the size for the avatars displayed within the "full banner" avatar group.                                                               | `string` (`s`, `m`, `l`)                                                                                                                                                                                                                                                                             | `undefined`       |

---
**Notes on Properties:**
*   **`Name`**: The exact name of the prop as used in the code (e.g., `imgSrc`, `icnBarIcnBarL1Src`).
*   **`Description`**: Clearly explain the purpose and effect of the prop.
*   **`Possible Values`**: List all accepted data types, specific string literals, enums, or reference types. Provide examples where helpful.
*   **`Default Setting`**: Indicate the value the prop takes if it's not explicitly provided.
---

## Styling
This section describes how the **Image** component is styled and how users can customize its appearance.

*   **Base Styles (`Image.module.css` or similar):**
    *   Defines the core visual properties and layout for the image and its overlays.
    *   Manages the image element itself (`img` tag), ensuring it fits within its container and respects dimensions.
    *   Styles container elements for overlays like icon bars, tags, banners, and actions, controlling their positioning (e.g., absolute positioning for corners).
    *   Handles responsive behavior for sizing and aspect ratios.

*   **Attribute-Based Styling / Modifier Classes:**
    *   **Image Size & Shape:** Props like `imgSz` and `imgShape` are translated into CSS attributes or classes to control the image's dimensions (`width`, `height`) and `border-radius`.
    *   **Aspect Ratio:** `imgAsp` would be used to set `aspect-ratio` or padding-top/bottom hacks for consistent sizing.
    *   **Overlays:** Visibility props (`icnBar`, `tag`, `act`, `bnr`, `bnrFull`) control the rendering and styling of the respective overlay elements.
    *   **Icon Bar:** `icnBarIcnBarL*Src`, `icnBarIcnBarR*Src`, and their toggle counterparts would configure the icons within the icon bar.
    *   **Tag:** `tagTagLoc` and `tagTagTxtSrc` style and position the tag.
    *   **Action:** `actActIcnSrc`, `actActBdg`, `actActBdgTxtSrc` configure action elements.
    *   **Banner:** `bnrBnrSz`, `bnrBnrLoc`, `bnrBnrClr`, `bnrBnrIcnSrc`, `bnrBnrTxtSrc` style the standard banner.
    *   **Full Banner:** `bnrFullBnrFullLoc`, `bnrFullBnrFullContAlign`, `bnrFullBnrFullLbl`, `bnrFullBnrFullLblTxtSrc`, `bnrFullBnrFullAvtrGrp`, etc., configure the more complex full banner.

## Usage
This section provides practical examples of how to use the **Image** component in your application.

```jsx
// Import the component
import { Image } from './Image'; // Assuming component name is 'Image' or 'Img'

// --- Basic Image ---
// Displays an image with its source and alternative text.
<Image
  imgSrc="https://example.com/image.jpg"
  imgAlt="A descriptive alt text for the image"
/>

// --- Image with Size and Shape ---
// Renders a medium-sized, rounded image.
<Image
  imgSrc="https://example.com/image.jpg"
  imgAlt="A descriptive alt text for the image"
  imgSz="M"
  imgShape="R"
/>

// --- Image with Icon Bar ---
// Displays an image with a heart icon in the icon bar.
<Image
  imgSrc="https://example.com/image.jpg"
  imgAlt="A descriptive alt text for the image"
  icnBar={true}
  icnBarIcnBarL1Src="heart" // Example: 'heart' icon on the left
/>

// --- Image with Tag ---
// Shows an image with a "New" tag positioned in the top-right corner.
<Image
  imgSrc="https://example.com/image.jpg"
  imgAlt="A descriptive alt text for the image"
  tag={true}
  tagTagLoc="tr" // Tag location: top-right
  tagTagTxtSrc="New"
/>

// --- Image with Banner ---
// Displays an image with a "Sale" banner.
<Image
  imgSrc="https://example.com/image.jpg"
  imgAlt="A descriptive alt text for the image"
  bnr={true}
  bnrBnrTxtSrc="Sale"
  bnrBnrSz="m"
  bnrBnrLoc="br" // Banner location: bottom-right
/>

// --- Image with Full Banner ---
// Demonstrates a more complex full banner with a label and avatar group.
<Image
  imgSrc="https://example.com/image.jpg"
  imgAlt="A descriptive alt text for the image"
  bnrFull={true}
  bnrFullBnrFullLbl={true}
  bnrFullBnrFullLblTxtSrc="Team Members"
  bnrFullBnrFullAvtrGrp={true}
  bnrFullBnrFullAvtrSrc1="https://example.com/avatar1.jpg"
  bnrFullBnrFullAvtrSrc2="https://example.com/avatar2.jpg"
  bnrFullBnrFullAvtrSz="s"
  bnrFullBnrFullLoc="btm"
  bnrFullBnrFullContAlign="sb"
/>
```

# ImageGroup Component

## Overview
This section provides a concise overview of the **ImageGroup** component.
Describe its primary purpose, its role in the UI, and its main functionalities.
Mention key features like flexibility, customizability, and integration capabilities.

**Example Content Structure:**
The **ImageGroup** component is designed to display a collection of images in a structured layout. It utilizes a flexbox arrangement with images displayed in reverse row order, allowing for flexible display of multiple images. It supports controlling the visibility and size of the group, as well as individual images within the group.

## Properties
This section details all the configurable properties (props) that the **ImageGroup** component accepts.

| Name | Description | Possible Values | Default Setting |
|---|---|---|---|
| `as` | Specifies the HTML element to render the component as. | `React.ElementType` | `_Builtin.Block` (likely `div`) |
| `imgGrp` | Controls the overall visibility of the image group. | `Types.Visibility.VisibilityConditions` (`true` to show, `false` to hide) | `true` |
| `imgGrpSz` | Sets the size of the image group. | `Types.Builtin.Text` (e.g., `"xs"`, `"S"`, `"M"`, `"L"`) | `"xs"` |
| `img2` | Toggles the visibility of the second image in the group. | `Types.Visibility.VisibilityConditions` (`true` to show, `false` to hide) | `false` |
| `img3` | Toggles the visibility of the third image in the group. | `Types.Visibility.VisibilityConditions` (`true` to show, `false` to hide) | `false` |
| `img4` | Toggles the visibility of the fourth image in the group. | `Types.Visibility.VisibilityConditions` (`true` to show, `false` to hide) | `false` |
| `img5` | Toggles the visibility of the fifth image in the group. | `Types.Visibility.VisibilityConditions` (`true` to show, `false` to hide) | `false` |
| `img1Src` | Source URL for the first image. | `Types.Asset.Image` | `"https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg"` |
| `img1Alt` | Alternative text for the first image. | `Types.Basic.AltText` | `"__wf_reserved_inherit"` |
| `img2Src` | Source URL for the second image. | `Types.Asset.Image` | `"https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg"` |
| `img2Alt` | Alternative text for the second image. | `Types.Basic.AltText` | `"__wf_reserved_inherit"` |
| `img3Src` | Source URL for the third image. | `Types.Asset.Image` | `"https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg"` |
| `img3Alt` | Alternative text for the third image. | `Types.Basic.AltText` | `"__wf_reserved_inherit"` |
| `img4Src` | Source URL for the fourth image. | `Types.Asset.Image` | `"https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg"` |
| `img4Alt` | Alternative text for the fourth image. | `Types.Basic.AltText` | `"__wf_reserved_inherit"` |
| `img5Src` | Source URL for the fifth image. | `Types.Asset.Image` | `"https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg"` |
| `img5Alt` | Alternative text for the fifth image. | `Types.Basic.AltText` | `"__wf_reserved_inherit"` |

---
**Notes on Properties:**
*   **`Name`**: The exact name of the prop as used in the code (e.g., `imgGrpSz`, `img2Src`).
*   **`Description`**: Clearly explain the purpose and effect of the prop.
*   **`Possible Values`**: List all accepted data types, specific string literals, enums, or reference types. Provide examples where helpful.
*   **`Default Setting`**: Indicate the value the prop takes if it's not explicitly provided.
---

## Styling
This section describes how the **ImageGroup** component is styled and how users can customize its appearance.

*   **Base Styles (`ImageGroup.module.css`):**
    *   The `.img_group` class applies `display: flex`, `padding-right: 8px`, `flex-direction: row-reverse`, and `align-items: center`. This creates a horizontal row of images, with the last image appearing first visually, and aligns them vertically.
*   **Attribute-Based Styling:**
    *   The `data-group-size` attribute is used to control the size of the image group, corresponding to the `imgGrpSz` prop.

## Usage
This section provides practical examples of how to use the **ImageGroup** component in your application.

```jsx
// Import the component
import { ImageGroup } from './ImageGroup'; // Assuming component name is 'ImageGroup'

// --- Basic Example ---
// Displays a default image group with one image.
<ImageGroup />

// --- Example: Displaying Multiple Images ---
// Shows multiple images with their respective sources and alt texts.
<ImageGroup
  imgGrp={true}
  img1Src="https://example.com/image1.jpg"
  img1Alt="Description for image 1"
  img2={true}
  img2Src="https://example.com/image2.jpg"
  img2Alt="Description for image 2"
  img3={true}
  img3Src="https://example.com/image3.jpg"
  img3Alt="Description for image 3"
/>

// --- Example: Controlling Group Visibility ---
// Hides the entire image group.
<ImageGroup imgGrp={false} />

// --- Example: Setting Group Size ---
// Renders the image group with a medium size.
<ImageGroup imgGrpSz="M" />

// --- Example: Showing Specific Images ---
// Displays only the first and third images in the group.
<ImageGroup
  img1Src="https://example.com/image1.jpg"
  img1Alt="Description for image 1"
  img3={true}
  img3Src="https://example.com/image3.jpg"
  img3Alt="Description for image 3"
/>

// --- Example: Customizing with Different Sources ---
// Using custom image sources for all available slots.
<ImageGroup
  img1Src="https://example.com/custom1.jpg"
  img1Alt="Custom image 1"
  img2={true}
  img2Src="https://example.com/custom2.jpg"
  img2Alt="Custom image 2"
  img3={true}
  img3Src="https://example.com/custom3.jpg"
  img3Alt="Custom image 3"
  img4={true}
  img4Src="https://example.com/custom4.jpg"
  img4Alt="Custom image 4"
  img5={true}
  img5Src="https://example.com/custom5.jpg"
  img5Alt="Custom image 5"
/>
```

---
