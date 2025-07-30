[Table of Contents](../../toc.md)

# Snackbar Component

## Overview
This section provides a concise overview of the **Snackbar** component. The Snackbar component is a compact, temporary notification that appears at the edge of the screen to inform users of a process, action, or event. It can include an icon, a message, and an optional action button, making it perfect for lightweight feedback or quick actions without interrupting the user's workflow excessively.

![Snackbar Example](https://github.com/user-attachments/assets/58bb6c71-afd1-4325-9b3b-0ce36640261f)

## Properties
This section details all the configurable properties (props) that the **Snackbar** component accepts.

| Name            | Description                                                                                                                   | Possible Values                                                                                              | Default Setting |
| :-------------- | :---------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------- | :-------------- |
| `sb`            | Controls the overall visibility of the snackbar.                                                                              | `boolean` (`Visible`, `Hidden`)                                                                              | `Visible`       |
| `sblcn`         | Controls the visibility of the icon within the snackbar.                                                                      | `boolean` (`Visible`, `Hidden`)                                                                              | `Visible`       |
| `sbBtn`         | Controls the visibility of the action button in the snackbar.                                                                 | `boolean` (`Visible`, `Hidden`)                                                                              | `Visible`       |
| `sbStyle`       | Determines the style variant of the snackbar, affecting its color scheme and potentially icon choice.                         | `string` (`none`, `success`, `error`, `warn`, `info`)                                                        | `none`          |
| `sblcnSrc`      | Specifies the icon to display in the snackbar.                                                                                | `string` (Any valid icon name, e.g., `"info"`, `"check_circle"`)                                             | `"default"`     |
| `sbTxtSrc`      | The text message to display within the snackbar.                                                                              | `string`                                                                                                     | `undefined`     |
| `sbBtnTxtSrc`   | The text to display on the action button.                                                                                     | `string`                                                                                                     | `"Action"`      |
| `sbBtnLink`     | The URL to navigate to when the action button is clicked.                                                                     | `string` (Any valid URL)                                                                                     | `undefined`     |
| `sbBtnClick`    | The event handler function to execute when the action button is clicked.                                                      | `function` (Any valid event handler function)                                                                | `undefined`     |
| `sbLoc`         | The location on the screen where the snackbar appears.                                                                        | `string` (`top`, `btm`, `center`)                                                                            | `top`           |
| `as`            | Specifies the HTML element or React component to render the snackbar container as.                                            | `React.ElementType`                                                                                          | `undefined`     |
| `className`     | Allows passing custom CSS classes for additional styling.                                                                       | `string`                                                                                                     | `undefined`     |
| `autoHideDelay` | The time in milliseconds after which the snackbar automatically disappears if not interacted with.                            | `number`                                                                                                     | `undefined`     |
| `closeable`     | Toggles the visibility of a close button (usually an 'X' icon) allowing users to dismiss the snackbar manually.                | `boolean` (`true` to show, `false` to hide)                                                                  | `true`          |

---
**Notes on Properties:**
*   **`Name`**: The exact name of the prop as used in the code (e.g., `sbTxtSrc`, `sbLoc`).
*   **`Description`**: Clearly explain the purpose and effect of the prop.
*   **`Possible Values`**: List all accepted data types, specific string literals, enums, or reference types. Provide examples where helpful.
*   **`Default Setting`**: Indicate the value the prop takes if it's not explicitly provided.
---

## Styling
This section describes how the **Snackbar** component is styled and how users can customize its appearance.

*   **Base Styles (`Snackbar.module.css` or similar):**
    *   Defines the core visual properties and layout for the snackbar component.
    *   Includes styles for the container, managing its `position` (fixed), `z-index`, `background-color` (based on `sbStyle`), `padding`, `border-radius`, and `box-shadow`.
    *   Handles positioning on the screen based on the `sbLoc` prop (`top`, `btm`, `center`).
    *   Styles the icon (`.snackbar-icon`), message text (`.snackbar-message`), and action button (`.snackbar-action`).
    *   Includes transitions for showing and hiding the snackbar.

*   **Attribute-Based Styling / Modifier Classes:**
    *   The `sb` prop controls the overall rendering and visibility, likely via CSS classes that show/hide the component.
    *   `sbStyle` applies distinct visual themes (colors, icons) based on the variant.
    *   `sblcn` and `sblcnSrc` control the visibility and content of the icon.
    *   `sbTxtSrc` displays the message.
    *   `sbBtn` and related props (`sbBtnTxtSrc`, `sbBtnLink`, `sbBtnClick`) configure the action button.
    *   `sbLoc` dictates the positioning of the snackbar on the screen.

## Usage
This section provides practical examples of how to use the **Snackbar** component in your application.

```jsx
// Import the component
import { Snackbar } from './Snackbar'; // Assuming component name
import React, { useState } from 'react';

// --- Basic Snackbar ---
// Displays a simple snackbar with a message and default icon/location.
function BasicSnackbar() {
  const [showSnackbar, setShowSnackbar] = useState(true); // Manually control visibility

  return (
    <Snackbar
      sb={showSnackbar} // Control visibility
      sblcnSrc="info" // Default icon for general information
      sbTxtSrc="Operation completed successfully."
      closeable={true} // Allow manual closing
      autoHideDelay={5000} // Auto-hide after 5 seconds
    />
  );
}

// --- Snackbar with Action Button ---
// Shows a snackbar with a message, an action button, and specific location.
function SnackbarWithAction() {
  const [showSnackbar, setShowSnackbar] = useState(true);

  return (
    <Snackbar
      sb={showSnackbar}
      sbLoc="btm" // Position at the bottom
      sbStyle="success" // Style for success messages
      sblcnSrc="check_circle" // Success icon
      sbTxtSrc="File uploaded successfully!"
      sbBtnTxtSrc="View File"
      sbBtnLink="/files/uploaded-file" // Link to view the file
      closeable={true}
      autoHideDelay={7000}
      onClose={() => setShowSnackbar(false)} // Handle close event
    />
  );
}

// --- Error Snackbar ---
// Displays an error message, often with a distinct color and icon.
function ErrorSnackbar() {
  const [showSnackbar, setShowSnackbar] = useState(true);

  return (
    <Snackbar
      sb={showSnackbar}
      sbLoc="center" // Position in the center
      sbStyle="error" // Style for error messages
      sblcnSrc="error_outline" // Error icon
      sbTxtSrc="Failed to save changes. Please try again."
      sbBtnTxtSrc="Retry"
      sbBtnClick={() => { /* Retry logic */ console.log("Retrying..."); }}
      closeable={true}
      autoHideDelay={10000} // Longer delay for errors
      onClose={() => setShowSnackbar(false)}
    />
  );
}

// --- Warning Snackbar ---
// Displays a warning message, using a warning style and color.
function WarningSnackbar() {
  const [showSnackbar, setShowSnackbar] = useState(true);

  return (
    <Snackbar
      sb={showSnackbar}
      sbLoc="top"
      sbStyle="warn" // Style for warning messages
      sblcnSrc="warning" // Warning icon
      sbTxtSrc="Your session is about to expire."
      sbBtnTxtSrc="Extend Session"
      sbBtnLink="/session/extend"
      closeable={true}
      autoHideDelay={15000}
      onClose={() => setShowSnackbar(false)}
    />
  );
}
```

## Notes on Usage:
- Import Statement: Ensure the import statement correctly points to the component file.
- Examples: Provide clear, runnable code snippets that cover common use cases and demonstrate the functionality of various props.
- Comments: Use comments within the code to explain what each example demonstrates or what specific props are doing.
- State Management: Snackbars are typically controlled components. Their visibility (sb prop) is managed by parent component state, often toggled by user actions or system events.
- Auto-Hide & Close: autoHideDelay and closeable are useful props for managing the snackbar's lifecycle automatically or via user interaction.

## Accessibility
This section outlines important considerations for making the Snackbar component accessible.
- Screen Reader Announcements: Ensure screen readers announce the snackbar's appearance and its content (message, icon, action button text). Use ARIA live regions (aria-live="polite" or aria-live="assertive") to make announcements non-disruptive but still noticeable.
- Focus Management: If the snackbar contains interactive elements (like an action button), consider focus management. If the snackbar itself requires interaction (e.g., to dismiss), ensure it's focusable.
- Clear Messages: Keep snackbar messages concise and easy to understand.
- Action Button Clarity: If an action button is present, its purpose should be clear from its text (sbBtnTxtSrc) and linked action.
- Dismissibility: Provide a clear way to dismiss the snackbar, either automatically (autoHideDelay) or manually (e.g., a close button if closeable is true), so it doesn't block interaction.