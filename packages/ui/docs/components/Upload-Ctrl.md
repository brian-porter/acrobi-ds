[Table of Contents](../../toc.md)

# Upload - Control Component

## Overview
This section provides a concise overview of the **UploadCtrl** component. The **UploadCtrl** component is a versatile and customizable UI element designed for handling file uploads. It supports a drag-and-drop file zone, displays a list of uploaded files, and provides several upload options, such as from the Camera, a file Library, or from a URL. It's built to be flexible, allowing it to be configured for various content upload scenarios.

## Properties
This section details all the configurable properties (props) that the **UploadCtrl** component accepts.

| Name | Description | Possible Values | Default Setting |
|---|---|---|---|
| `as` | The root element type for the component. | `React.ElementType` | `_Builtin.Block` |
| `upldDzIcn` | Controls the visibility of the icon in the drop zone. | `Types.Visibility.VisibilityConditions` (boolean) | `true` |
| `upldDzAvtr` | Controls the visibility of the avatar in the drop zone. | `Types.Visibility.VisibilityConditions` (boolean) | `false` |
| `upldDzImg` | Controls the visibility of the image in the drop zone. | `Types.Visibility.VisibilityConditions` (boolean) | `false` |
| `upldDzIcnSrc` | The source for the drop zone icon. | `React.ReactNode` | `"Pic_upload"` |
| `upldDzIcnSz` | The size of the drop zone icon. | `Types.Builtin.Text` | `"2xl"` |
| `upldDzImgSrc` | The source for the drop zone image. | `Types.Asset.Image` | `https://...image.svg` |
| `upldDzImgAlt` | The alt text for the drop zone image. | `Types.Basic.AltText` | `"__wf_reserved_inherit"` |
| `upldDzAvtrSrc` | The source for the drop zone avatar. | `Types.Asset.Image` | `https://...avatar-default.avif` |
| `upldDzAvtrAlt` | The alt text for the drop zone avatar. | `Types.Basic.AltText` | `"__wf_reserved_inherit"` |
| `upldDzTxtSrc` | The text displayed within the drop zone. | `React.ReactNode` | `"Tap to add or drop a file here"` |
| `upldDzChange` | Handles the `onChange` event for the file input. | `Types.Builtin.Text` (function) | `undefined` |
| `upldDzClick` | Runtime properties for the drop zone click event. | `Types.Devlink.RuntimeProps` | `{}` |
| `upldFileMap` | A slot to map and render uploaded files. | `Types.Devlink.Slot` | `undefined` |
| `upldExampleFile` | Controls visibility of the example file display. | `Types.Visibility.VisibilityConditions` (boolean) | `true` |
| `upldFileImgSrc` | The image source for a displayed file. | `Types.Asset.Image` | `https://...image.svg` |
| `upldFileImgAlt` | The alt text for a displayed file's image. | `Types.Basic.AltText` | `"__wf_reserved_inherit"` |
| `upldFileCapt` | Controls visibility of the file caption. | `Types.Visibility.VisibilityConditions` (boolean) | `false` |
| `upldFileTitleSrc` | The title/name of the displayed file. | `React.ReactNode` | `"DocName"` |
| `upldFileClick` | Runtime properties for a click on a displayed file. | `Types.Devlink.RuntimeProps` | `{}` |
| `optOptCamera` | Controls visibility of the "Camera" upload option. | `Types.Visibility.VisibilityConditions` (boolean) | `true` |
| `optOptLib` | Controls visibility of the "Library" upload option. | `Types.Visibility.VisibilityConditions` (boolean) | `true` |
| `optOptUnsplash` | Controls visibility of the "Unsplash" upload option. | `Types.Visibility.VisibilityConditions` (boolean) | `false` |
| `optOptUrl` | Controls visibility of the "URL" upload option. | `Types.Visibility.VisibilityConditions` (boolean) | `false` |
| `optUrlModal` | Controls visibility of the modal for entering a URL. | `Types.Visibility.VisibilityConditions` (boolean) | `false` |
| `optOptCameraClick` | Runtime properties for a click on the "Camera" option. | `Types.Devlink.RuntimeProps` | `{}` |
| `optOptLibClick` | Runtime properties for a click on the "Library" option. | `Types.Devlink.RuntimeProps` | `{}` |
| `optOptUnsplashClick`| Runtime properties for a click on the "Unsplash" option. | `Types.Devlink.RuntimeProps` | `{}` |
| `optOptUrlClick` | Runtime properties for a click on the "URL" option. | `Types.Devlink.RuntimeProps` | `{}` |
| `optUrlFldChange` | Handles the `onChange` event for the URL input field. | `Types.Builtin.Text` (function) | `undefined` |
| `optUrlFldClick` | Runtime properties for a click on the URL input field. | `Types.Devlink.RuntimeProps` | `{}` |
| `optUrlGetClick` | Runtime properties for a click on the "Get It" button in the URL modal. | `Types.Devlink.RuntimeProps` | `{}` |
| `optUrlCloseClick` | Runtime properties for a click on the close button in the URL modal. | `Types.Devlink.RuntimeProps` | `{}` |
| `fileBar` | Controls visibility of the file bar for uploaded files. | `Types.Visibility.VisibilityConditions` (boolean) | `false` |
| `upldOpt` | Controls visibility of the entire block of upload options. | `Types.Visibility.VisibilityConditions` (boolean) | `false` |

---
**Notes on Properties:**
*   **`Name`**: The exact name of the prop as used in the code.
*   **`Description`**: Clearly explain the purpose and effect of the prop.
*   **`Possible Values`**: List all accepted data types, specific string literals, enums, or reference types.
*   **`Default Setting`**: Indicate the value the prop takes if it's not explicitly provided.
---

## Styling
This section describes how the **UploadCtrl** component is styled and how users can customize its appearance.

*   **Base Styles (`UploadCtrl.module.css`):**
    *   **`.upload_wrap`**: The main container for the entire component. It uses `position: relative` to act as a positioning context for its children, like the URL modal.
    *   **`.upload_main`**: A flex container that holds the file drop zone and the list of uploaded files, arranged in a row.
    *   **`.upload_opt`**: A flex container that centers the row of upload option buttons (Camera, Library, URL, etc.) below the main upload area.
    *   **`.upld_opt-url`**: A full-overlay container for the URL input modal. It uses `position: absolute` and a `backdrop-filter` to create a modal overlay effect.
    *   **`.upld_url-modal`**: The modal dialog itself, which is centered horizontally and vertically using absolute positioning and `transform: translate(-50%, -50%)`. It contains the URL input field and action buttons.
    *   **`.upld_url-close`**: A container for the modal's close button, positioned at the top-right corner of the modal.
    *   **`.upld_url-btn-shift`**: A container used to position the "Get It" button within the URL modal, aligned to the right side of the input field.

## Usage
This section provides practical examples of how to use the **UploadCtrl** component in your application.

```jsx
// Import the component
import { UploadCtrl } from './UploadCtrl';

// --- Basic Example ---
// A simple instance of the component with default settings.
<UploadCtrl />

// --- Example: With Upload Options Visible ---
// Show the upload options like Camera and Library.
<UploadCtrl
  upldOpt={true}
  optOptCamera={true}
  optOptLib={true}
/>

// --- Example: Displaying an Uploaded File ---
// Shows how the component might look with a file already uploaded and displayed.
<UploadCtrl
  upldExampleFile={true}
  upldFileTitleSrc="MyDocument.pdf"
  fileBar={true}
  upldFileCapt={true}
/>

// --- Example: With URL Upload Modal Active ---
// Renders the component with the URL input modal open, which requires the URL option to be enabled.
<UploadCtrl
  upldOpt={true}
  optOptUrl={true}
  optUrlModal={true}
/>

// --- Example: Custom Drop Zone Text ---
// Sets custom text for the file drop zone.
<UploadCtrl
  upldDzTxtSrc="Drop your images here or click to browse"
/>

// --- Example: Using an Avatar Dropzone ---
// Configures the dropzone to display an avatar.
<UploadCtrl
  upldDzIcn={false}
  upldDzAvtr={true}
/>
```

---
**Notes on Usage:**
*   **Import Statement**: Ensure the import statement correctly points to the component file.
*   **Examples**: Provide clear, runnable code snippets that cover common use cases and demonstrate the functionality of various props.
*   **Comments**: Use comments within the code to explain what each example demonstrates or what specific props are doing.
*   **Prop Names**: The examples use the actual prop names defined for the `UploadCtrl` component.
---