[Table of Contents](../../toc.md)

# Rate - Form Component

## Overview
This section provides a concise overview of the **RateForm** component. The `RateForm` component is designed to wrap the rating control with a label and optional helper text. This makes it easy to collect and explain ratings in forms or feedback sections, providing a user-friendly way to ask for user feedback on a scale.

![rate-form](https://github.com/user-attachments/assets/a107c63f-654f-481a-af50-2ac0f26cb867)

## Properties
This section details all the configurable properties (props) that the **RateForm** component accepts.

| Name                | Description                                                                                                           | Possible Values                                                                                        | Default Setting |
| :------------------ | :-------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------- | :-------------- |
| `as`                | Specifies the HTML element or React component to render the `RateForm` as.                                           | `React.ElementType`                                                                                    | `undefined`     |
| `fld`               | Defines the visibility conditions for the entire field wrapper.                                                       | `boolean` (`true` to show, `false` to hide)                                                            | `undefined`     |
| `fldLbl`            | Determines the visibility condition for the main field label.                                                         | `boolean` (`true` to show, `false` to hide)                                                            | `undefined`     |
| `fldHelp`           | Determines the visibility condition for the field's help text.                                                        | `boolean` (`true` to show, `false` to hide)                                                            | `undefined`     |
| `fldTopLblSrc`      | The primary text content for the label displayed at the top of the field.                                           | `React.ReactNode` (e.g., "Rate your experience")                                                       | `undefined`     |
| `fldTopLblFor`      | The `for` attribute for the top label, associating it with the rating input's `id`.                                 | `string` (Should match the `id` of the rating input)                                                   | `undefined`     |
| `fldTopLblSz`       | Sets the size of the top label text.                                                                                  | `string` (e.g., `"r4"`)                                                                                | `undefined`     |
| `fldTopLblClr`      | Sets the color of the top label text.                                                                                 | `string` (e.g., `"n900"`)                                                                              | `undefined`     |
| `fldTopLblShdw`     | Applies a shadow effect to the top label text.                                                                        | `string`                                                                                               | `undefined`     |
| `fldTopOpt`         | Toggles the visibility of an optional indicator for the top label.                                                    | `boolean` (`true`, `false`)                                                                            | `undefined`     |
| `fldTopOptSrc`      | The text content for the optional indicator on the top label (e.g., "optional", "required").                        | `React.ReactNode`                                                                                      | `undefined`     |
| `fldTopOptSz`       | Sets the size of the optional indicator text for the top label.                                                       | `string`                                                                                               | `undefined`     |
| `fldTopOptClr`      | Sets the color of the optional indicator text for the top label.                                                      | `string`                                                                                               | `undefined`     |
| `fieldValue`        | The current value passed to the underlying rating control.                                                            | `React.ReactNode` (typically corresponds to `number`)                                                  | `undefined`     |
| `RateFormId`       | The unique ID for the rating input field, used for accessibility and label association.                             | `string`                                                                                               | `undefined`     |
| `fldHelpHelpL`      | Determines the visibility condition for the left-aligned helper text.                                               | `boolean` (`true`, `false`)                                                                            | `undefined`     |
| `fldHelpHelpR`      | Determines the visibility condition for the right-aligned helper text.                                              | `boolean` (`true`, `false`)                                                                            | `undefined`     |
| `fldHelpHelpLSrc`   | The source text for the left-aligned helper text.                                                                     | `React.ReactNode`                                                                                      | `undefined`     |
| `fldHelpHelpRSrc`   | The source text for the right-aligned helper text.                                                                    | `React.ReactNode`                                                                                      | `undefined`     |
| `fldHelpHelpShdw`   | Applies a shadow effect to the helper text.                                                                           | `string`                                                                                               | `undefined`     |
| `label`             | A shortcut prop for the main label text (`fldTopLblSrc`).                                                           | `string`                                                                                               | `undefined`     |
| `helper`            | A shortcut prop for the main helper text, likely for right-aligned helper text.                                     | `string`                                                                                               | `undefined`     |
| `Value`             | The current rating value (passed directly to the Rating control).                                                     | `number`                                                                                               | `0`             |
| `Max`               | The maximum rating value (passed directly to the Rating control).                                                     | `number`                                                                                               | `5`             |
| `Icon`              | The icon to be used for the rating (passed to the Rating control).                                                    | `React.ReactNode` (e.g., `"star"`, `"heart"`)                                                          | `undefined`     |
| `Disabled`          | Whether the entire rating field (including the rating control) is disabled.                                         | `boolean` (`true`, `false`)                                                                            | `false`         |
| `IconPosition`      | Specifies the position of the icon (likely for the Rating component if it supports icons).                          | `string` (e.g., "L" for Leading)                                                                       | `undefined`     |

---
**Notes on Properties:**
*   **`Name`**: The exact name of the prop as used in the code (e.g., `fldTopLblSrc`, `Value`).
*   **`Description`**: Clearly explain the purpose and effect of the prop.
*   **`Possible Values`**: List all accepted data types, specific string literals, enums, or reference types. Provide examples where helpful.
*   **`Default Setting`**: Indicate the value the prop takes if it's not explicitly provided.
---

## Styling
This section describes how the **RateForm** component is styled and how users can customize its appearance.

*   **Base Styles (`RateForm.module.css` or similar):**
    *   Defines the core visual properties and layout for the `RateForm` component.
    *   Likely uses flexbox for arranging the label, rating control, and helper text.
    *   Includes styles for the main wrapper, label, rating control, and helper text elements.

*   **Attribute-Based Styling / Modifier Classes:**
    *   Props like `fldLbl`, `fldHelp`, `fldTopLblSrc`, `fieldValue`, `RateFormId`, `fldHelpHelpL`, `fldHelpHelpR`, `label`, `helper`, `Value`, `Max`, `Icon`, and `Disabled` are used to configure the internal `Rating` component and its associated label/helper text elements.
    *   Specific styles for labels (`fldTopLblSz`, `fldTopLblClr`, `fldTopLblShdw`, `fldTopOpt`, etc.) and helper text (`fldHelpHelpShdw`, etc.) are applied based on these props.
    *   The `as` prop might influence the root HTML element, and `fld` would control the overall rendering.

## Usage
This section provides practical examples of how to use the **RateForm** component in your application.

```jsx
// Import the component and necessary React hooks/components
import { RateForm } from './RateForm';
import { Rating } from './Rating'; // Assuming RateForm wraps a Rating component
import React, { useState } from 'react';

// --- Basic Field Rate ---
// A simple rating field with a label and default rating settings.
function BasicRateForm() {
  const [rating, setRating] = useState(0);

  return (
    <RateForm
      RateFormId="product-rating"
      label="Product Rating"
      value={rating} // Controlled value
      onValueChange={setRating} // Callback to update state
    />
  );
}

// --- Field Rate with Helper Text ---
// Includes a label, helper text, and pre-set rating.
function RateFormWithHelper() {
  const [experienceRating, setExperienceRating] = useState(4);

  return (
    <RateForm
      RateFormId="experience-rating"
      label="Your Experience"
      helper="Please rate your experience on a scale of 1 to 5."
      value={experienceRating}
      onValueChange={setExperienceRating}
      Max={5} // Explicitly setting Max
    />
  );
}

// --- Disabled Field Rate ---
// A rating field that is read-only.
function DisabledRateForm() {
  return (
    <RateForm
      RateFormId="review-rating-disabled"
      label="Your Rating"
      value={3}
      Disabled={true} // Setting the disabled prop
      helper="This rating is already submitted."
    />
  );
}

// --- Field Rate with Custom Icon and Optional Label ---
// Demonstrates using a different icon and marking the field as optional.
function CustomRateForm() {
  const [feedbackRating, setFeedbackRating] = useState(0);

  return (
    <RateForm
      RateFormId="feedback-rating"
      fldTopLblSrc="Feedback Score"
      fldTopOpt={true}
      fldTopOptSrc="optional"
      Icon="heart" // Passing the icon prop to the underlying Rating
      value={feedbackRating}
      onValueChange={setFeedbackRating}
    />
  );
}
```

