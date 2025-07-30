[Table of Contents](../../toc.md)

# Upload - Form Component

## Overview
This section provides a concise overview of the **UploadForm** component. The **UploadForm** component is a form element that wraps the [`UploadCtrl`](Modules/Capture/Work/UploadCtrl.md:1) component to include a [`FieldLabel`](./FieldLabel.md:1) and [`FieldHelper`](./FieldHelper.md:1) text. It's designed to provide a complete and accessible file upload interface, handling the label, the upload input, and any helper or validation messages in a single package.

## Properties
This section details the primary configurable properties (props) that the **UploadForm** component accepts. Many other props are passed down to the child `UploadCtrl` component.

| Name | Description | Possible Values | Default Setting |
|---|---|---|---|
| `as` | The root element to render for the form item wrapper. | `React.ElementType` | A standard `Block` component |
| `fld` | Controls the visibility of the entire form field. | `boolean` | `true` |
| `lblTop` | Controls the visibility of the top label. | `boolean` | `true` |
| `lblTopLblSrc`| The text content displayed within the `FieldLabel` component. | `React.ReactNode` | `"Label"` |
| `lblTopLblFor`| The `for` attribute of the label, used to associate it with an input element. | `string` | `undefined` |
| `lblTopOpt` | Controls the visibility of the optional text (e.g., "required") in the label. | `boolean` | `false` |
| `lblTopOptSrc`| The text content for the optional indicator in the label. | `React.ReactNode` | `"required"` |
| `fldHelp` | Controls the visibility of the helper text section below the upload field. | `boolean` | `false` |
| `fldHelpHelpLSrc`| The text content for the left-aligned helper text. | `React.ReactNode` | `"helper copy"` |
| `fldHelpHelpRSrc`| The text content for the right-aligned helper text (e.g., a character counter). | `React.ReactNode` | `"0/200"` |
| `upld...` | The `UploadForm` accepts many props prefixed with `upld` which are passed directly to the underlying `UploadCtrl` component. These control the appearance and behavior of the upload zone, file previews, and upload options. | `various` | `various` |

---
**Notes on Properties:**
*   The `UploadForm` component acts as a wrapper. For detailed properties related to the upload functionality itself (like `upldDzIcn`, `upldFileMap`, `upldOptCameraClick`, etc.), please refer to the documentation for the `UploadCtrl` component.
---

## Styling
The component's styling is primarily managed through a dedicated CSS module file, [`UploadForm.module.css`](Modules/Capture/Work/UploadForm.module.css:1).

*   **[`UploadForm.module.css`](Modules/Capture/Work/UploadForm.module.css:1):**
    *   **`.form_itm_wrap`**: This is the main container for the entire component. It is a relative-positioned flex container that fills the available width (`flex: 1`).
    *   **`.form_main`**: This class styles the inner container that holds the label, upload field, and helper text. It uses a vertical flexbox layout (`flex-direction: column`) to stack the children and defines padding and spacing between them.

## Usage
This section provides practical examples of how to use the **UploadForm** component.

```jsx
// Import the component
import { UploadForm } from "./UploadForm";

// --- Basic Example ---
// A simple instance of the component with default configuration.
<UploadForm />

// --- Example: With Label and Helper Text ---
// An example showing how to configure the label and helper text.
<UploadForm
  lblTop={true}
  lblTopLblSrc="Profile Picture"
  fldHelp={true}
  fldHelpHelpLSrc="Upload a PNG or JPG file. Max size: 5MB."
  fldHelpHelpRSrc="optional"
/>

// --- Example: Custom Dropzone Text ---
// This example changes the text inside the upload dropzone by passing down the `upldDzTxtSrc` prop.
<UploadForm
  lblTopLblSrc="Document Upload"
  upldDzTxtSrc="Click to select a document or drag it here"
/>

// --- Example: Hidden Label ---
// An example where the top label is not rendered.
<UploadForm lblTop={false} />
```

---
**Notes on Usage:**
*   **Import Statement**: Ensure the import statement correctly points to the component file.
*   **Props**: The examples demonstrate how to use props belonging to the `UploadForm` wrapper. For more advanced control over the upload functionality, you will need to use props that are passed down to the `UploadCtrl` component.
---