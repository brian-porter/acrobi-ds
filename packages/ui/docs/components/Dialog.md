[Table of Contents](../../toc.md)

# Dialog

## Overview
The **Dialog** component is a modal window designed to overlay the main content, providing a focused interface for critical information, user input, or action confirmation. It serves to interrupt the user's current workflow temporarily, ensuring they acknowledge important messages or complete necessary tasks without distraction. The dialog can be configured for various appearances, including background scrim effects, blur, shadows, and custom positioning, making it a versatile UI element for alerts, forms, or confirmation prompts.

## Properties

| Name             | Description                                                                                                         | Possible Values                                                                                                                             | Default Setting   |
| :--------------- | :------------------------------------------------------------------------------------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------ | :---------------- |
| `as`             | The HTML element type to render the main wrapper (`dialog_wrap`) as.                                               | `React.ElementType`                                                                                                                         | `_Builtin.Block`  |
| `dialog`         | Controls the overall visibility and rendering of the dialog component.                                              | `Types.Visibility.VisibilityConditions` (Effectively a boolean, `true` to show, `false` to hide)                                            | `false`           |
| `prevBtn`        | Determines if the built-in "Previous" navigation button is displayed.                                               | `Types.Visibility.VisibilityConditions` (Effectively a boolean)                                                                             | `false`           |
| `closeBtn`       | Determines if the built-in "Close" button is displayed.                                                             | `Types.Visibility.VisibilityConditions` (Effectively a boolean)                                                                             | `false`           |
| `bgClick`        | Props applied to the background overlay (`dialog_bg`), typically used to attach an event handler (e.g., `onClick`). | `Types.Devlink.RuntimeProps` (e.g., `{ onClick: () => void }`)                                                                              | `{}`              |
| `prevClick`      | Props applied to the "Previous" button, used to attach event handlers (e.g., `onClick`).                          | `Types.Devlink.RuntimeProps` (e.g., `{ onClick: () => void }`)                                                                              | `{}`              |
| `closeClick`     | Props applied to the "Close" button, used to attach event handlers (e.g., `onClick`).                             | `Types.Devlink.RuntimeProps` (e.g., `{ onClick: () => void }`)                                                                              | `{}`              |
| `type`           | Specifies the visual type or style variant of the dialog (e.g., modal, sheet, menu).                                    | `Types.Builtin.Text` (e.g., `"modal"`, `"modal2full"`, `"sheet"`, `"menu"`)                                                                                         | `"modal"`         |
| `scrim`          | Controls the opacity of the background overlay (scrim).                                                             | `Types.Builtin.Text` (A string representing a number, e.g., `"70"` for 70% opacity)                                                       | `"0, 10, 20, 30, 40, 50, 60, 70, 80, 90"`            |
| `blur`           | Controls the intensity of the background blur effect.                                                               | `Types.Builtin.Text` (A string representing a blur value, e.g., `"3"`)                                                                    | `"0, 3, 5"`             |
| `shdw`           | Defines the size or intensity of the shadow applied to the dialog box container.                                    | `Types.Builtin.Text` (e.g., `"xl"`, `"m"`, `"s"`)                                                                                         | `"xl"`            |
| `dialogMap`      | A React slot where the custom content (title, body, action buttons) of the dialog is rendered.                    | `React.ReactNode`                                                                                                                           | `undefined`       |
| `anchor`         | The ability to anchor the dialog to a specific location on the screen.  Especially important for menus when we want to anchor the menu to the “more” button                                                    | `Types.Builtin.Text` (e.g., `"more-menu"`, `"add-list"`, `"tooltip"`)                                                                   | `undefined`       |

---
**Notes on Properties:**
*   **Visibility Control**: The `dialog` prop is the primary mechanism to show or hide the entire dialog component.
*   **Content Structure**: The `dialogMap` prop is essential for defining the actual content displayed within the dialog. This includes titles, descriptive text, input fields, and custom action buttons.
*   **Built-in Actions**: `prevBtn` and `closeBtn` allow the inclusion of standard navigation and dismissal buttons, which can be configured with click handlers via `prevClick` and `closeClick`.
*   **Styling & Behavior**: Props like `type`, `scrim`, `blur`, `shdw`, and `anchor` provide granular control over the dialog's visual appearance and positioning.
*   **Overlay Interaction**: The `bgClick` prop allows developers to specify behavior (typically closing the dialog) when the user clicks on the background overlay.

---

## Styling
The `Dialog` component utilizes CSS Modules (`Dialog.module.css`) for styling, ensuring modularity and maintainability.

*   **`dialog_wrap`**:
    *   The outermost container, responsible for establishing the stacking context (`z-index: 1100`).
    *   It covers the entire viewport (`width: 100%`, `height: 100vh`) and manages overflow.
    *   The `display: contents` property might be used in specific layout contexts to allow child elements to be positioned directly within the parent's layout flow.
    *   It primarily controls the overall visibility state using `display` properties managed by JavaScript interactions.

*   **`dialog_bg`**:
    *   Represents the modal background overlay (scrim).
    *   Positioned absolutely to cover the entire viewport (`left: 0px`, `top: 0px`, `right: 0px`, `bottom: 0px`).
    *   Uses flexbox (`justify-content: center`, `align-items: center`) to center its content (the `dialog_box`).
    *   Sets a base background color (`var(--color--t000)`) and `z-index`.
    *   Custom attributes like `data-scrim` and `data-blur` likely influence its opacity and potential blur effects via CSS variables or specific styling rules.

*   **`dialog_box`**:
    *   The container for the dialog's main content.
    *   Typically positioned `fixed` and centered using `transform: translate(-50%, -50%)` relative to the viewport center.
    *   Manages `max-width` and uses grid layout for its internal structure.
    *   Custom attributes like `data-type`, `data-bs` (likely for shadow), and `position-anchor` control its appearance and placement.
    *   Includes responsive adjustments via media queries (`@media screen and (max-width: 991px)`, `@media screen and (max-width: 767px)`) to adapt positioning and sizing for different screen sizes, sometimes changing from `fixed` to `absolute` positioning and removing borders/radius on smaller screens.

*   **`dialog_prev-btn` / `dialog_close-btn`**:
    *   These classes style the optional built-in navigation and close buttons.
    *   They are positioned absolutely within the dialog container (`top: 0%`, `left`/`right` properties).
    *   They include padding and apply a `cursor: pointer` for interactivity.
    *   Internally, they render a `Label` component, configured with specific icons (`Nav_left`, `Close`) and text.

*   **`dialog_content`**:
    *   A container specifically for the custom content provided via the `dialogMap` prop.
    *   It has a distinct background color (`var(--color--n000)`) and uses `position: relative`.

## Usage

```jsx
// Import necessary components and hooks
import { Dialog } from './Dialog';
import { Label } from './Label'; // Assuming Label is used internally or for examples
import * as _Builtin from './_Builtin'; // Assuming access to built-in UI elements
import React, { useState } from 'react';

function MyDialogExample() {
  // State to control the visibility of the dialog
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to open the dialog
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the dialog
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Handler for the "Confirm" action within the dialog
  const handleConfirmAction = () => {
    console.log("Action confirmed!");
    closeModal(); // Close the dialog after confirmation
  };

  // Handler for the "Previous" button (if prevBtn is enabled)
  const handlePreviousStep = () => {
    console.log("Navigated to previous step");
    // Add logic here, e.g., close current dialog and open a different one, or update state
  };

  return (
    <div>
      {/* Button to trigger the dialog */}
      <_Builtin.Button onClick={openModal} size="medium" variant="primary">
        Show Confirmation Dialog
      </_Builtin.Button>

      {/* Rendering the Dialog component */}
      <Dialog
        // Controls the primary visibility of the dialog component
        dialog={isModalOpen}

        // Conditionally display built-in navigation and close buttons
        prevBtn={true} // Show the 'Previous' button
        closeBtn={true} // Show the 'Close' button

        // Attach click handlers to the built-in buttons
        prevClick={{ onClick: handlePreviousStep }}
        closeClick={{ onClick: closeModal }} // Reuse closeModal for the built-in close button

        // Make the dialog dismissible by clicking the background overlay
        bgClick={{ onClick: closeModal }}

        // Configure dialog appearance and behavior
        type="modal"        // Sets the dialog's style variant (e.g., 'modal', 'alert')
        scrim="70"          // Sets the background overlay opacity (0-100)
        blur="3"            // Applies a blur effect to the background content
        shdw="xl"           // Applies a large shadow to the dialog container
        anchor="center"     // Positions the dialog in the center of the viewport

        // The dialogMap prop renders the custom content inside the dialog container
        dialogMap={
          <>
            {/* Dialog Title */}
            <div style={{ padding: '24px 32px 0px 32px', textAlign: 'center' }}>
              <_Builtin.Heading tag="h3" _styles={"Heading3_DialogTitle"}>
                Confirm Your Choice
              </_Builtin.Heading>
            </div>

            {/* Dialog Content Body */}
            <div style={{ padding: '16px 32px 24px 32px', textAlign: 'center' }}>
              <_Builtin.Paragraph tag="p" _styles={"Paragraph_DialogBody"}>
                Please review your selection. This action cannot be reversed once confirmed.
              </_Builtin.Paragraph>
            </div>

            {/* Dialog Action Buttons */}
            <div style={{ padding: '0px 32px 32px 32px', textAlign: 'center' }}>
              {/* Cancel Button */}
              <_Builtin.Button
                onClick={closeModal} // Action to close the dialog
                variant="secondary"
                size="medium"
                style={{ marginRight: '16px' }} // Add spacing between buttons
              >
                Cancel
              </_Builtin.Button>
              {/* Confirm Button */}
              <_Builtin.Button
                onClick={handleConfirmAction} // Action to confirm
                variant="primary"
                size="medium"
              >
                Confirm
              </_Builtin.Button>
            </div>
          </>
        }
      />
    </div>
  );
}
```

---
**Notes on Usage:**
*   **Managing Visibility**: Use the `dialog` prop in conjunction with React state (`useState`) to control when the dialog appears and disappears.
*   **Custom Content**: The `dialogMap` prop is the primary way to inject your dialog's content. It accepts any valid React node, allowing you to structure titles, body text, input fields, and custom action buttons using other components.
*   **Built-in Actions**: If you need standard navigation (`prevBtn`) or closing (`closeBtn`) buttons, enable these props and provide corresponding callback functions via `prevClick` and `closeClick`. These buttons are typically positioned absolutely for easy access.
*   **Dismissal**: The `bgClick` prop allows users to dismiss the dialog by clicking outside its content area. It's common practice to link this to the same handler used for the close button.
*   **Theming and Behavior**: Customize the dialog's appearance using `type`, `scrim`, `blur`, `shdw`, and `anchor` props to match your application's design system and user experience requirements.
*   **Accessibility**: While not explicitly detailed in the props, ensure that content within `dialogMap` adheres to accessibility best practices (e.g., proper semantic structure, keyboard navigation support). The use of built-in buttons and focus management should be considered for optimal accessibility.

---