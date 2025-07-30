[Table of Contents](../../toc.md)

# ListItm Component

## Overview
This section provides a concise overview of the **ListItm** component. The `ListItm` component is a versatile element designed to display repeated information in a structured list format. It serves as a building block for the `List` component, offering various configurations for content display and optional visual elements like gutters, making it highly adaptable for various use cases such as navigation items, feature lists, or grouped data. It integrates `ListItmCtrl` and `GutterBadge` components to provide rich functionality and visual cues.

## Properties
This section details all the configurable properties (props) that the **ListItm** component accepts.

| Name                 | Description                                                                                                                                      | Possible Values                                                                                                                                             | Default Setting |
| :------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------- |
| `as`                 | Specifies the HTML element type for the list item container (e.g., `li`, `div`).                                                               | `React.ElementType`                                                                                                                                         | `_Builtin.ListItem` |
| `exampleListItm`     | Toggles the overall rendering of the `ListItm` component itself. If `false`, the component renders `null`.                                     | `boolean` (`true` to show, `false` to hide)                                                                                                                 | `false`         |
| `listItmCtrlMap`     | Renders custom content or slots within the list item. If provided, it overrides the default `ListItmCtrl` and gutter elements. Treated as `React.ReactNode`. | `React.ReactNode`                                                                                                                                           | `undefined`     |
| `exampleListItmCtrl` | Toggles the rendering of the `ListItmCtrl` component when `listItmCtrlMap` is not provided.                                                      | `boolean` (`true` to show, `false` to hide)                                                                                                                 | `false`         |
| `gttrBdg`            | Toggles the visibility of the gutter badge area containing icons like pin, alarm, or bookmark. If `true`, the `GutterBadge` component is rendered.  | `boolean` (`true` to show, `false` to hide)                                                                                                                 | `false`         |
| `gttrGttrBdgPin`     | Controls the 'pin' state of the `GutterBadge` when `gttrBdg` is enabled.                                                                       | `boolean` (`true` to show, `false` to hide)                                                                                                                 | `false`         |
| `gttrGttrBdgAlarm`   | Controls the 'alarm' state of the `GutterBadge` when `gttrBdg` is enabled.                                                                     | `boolean` (`true` to show, `false` to hide)                                                                                                                 | `false`         |
| `gttrGttrBkmrk`      | Controls the 'bookmark' state of the `GutterBadge` when `gttrBdg` is enabled.                                                                  | `boolean` (`true` to show, `false` to hide)                                                                                                                 | `false`         |
| `children`           | Content rendered directly within the list item, used if `listItmCtrlMap` is not provided.                                                        | `React.ReactNode`                                                                                                                                           | `null`          |

## Styling
This section describes how the **ListItm** component is styled and how users can customize its appearance.

*   **Base Styles (`ListItm.module.css`):**
    *   The component applies the `.listitm` class for its main container.
    *   Key base styles include `position: relative;` and `margin-bottom: 0em;`.
    *   An additional class `.listitm-gttr` is used for the gutter elements, styled with `position: absolute; top: 0%; left: 0%;`. This ensures gutters are positioned correctly relative to the list item's content.

*   **Customization:**
    *   The `as` prop allows changing the base HTML element (e.g., from `<li>` to a `<div>`).
    *   Gutter elements (`GutterBadge`) are conditionally rendered based on the `gttrBdg` prop and styled using the `.listitm-gttr` class.
    *   Users can pass custom CSS classes via a `className` prop (though not explicitly listed in the `.d.ts`, it's a common React pattern).

## Usage
This section provides practical examples of how to use the **ListItm** component in your application.

```jsx
// Import the component
import { ListItm } from './ListItm';
// Assuming ListItmCtrl and GutterBadge are internal and not directly imported for usage examples here.

// --- Basic List Item Rendering ---
// Renders a basic list item container. By default, it renders null unless exampleListItm is true.
// <ListItm /> // This would render null by default

// --- Showing an Example List Item ---
// Explicitly renders a default/example ListItm structure, including ListItmCtrl.
<ListItm exampleListItm={true} />

// --- List Item with Gutter Elements ---
// Demonstrates showing pin, alarm, and bookmark indicators.
<ListItm
  exampleListItm={true}
  gttrBdg={true} // Enable the gutter badge area
  gttrGttrBdgPin={true}
  gttrGttrBdgAlarm={true}
  gttrGttrBkmrk={true}
/>

// --- List Item with Custom Content via Children ---
// Renders custom content directly within the list item.
<ListItm exampleListItm={true}>
  <div>Custom Content Here</div>
</ListItm>

// --- List Item with Custom Content via listItmCtrlMap ---
// Renders custom content, overriding the default ListItmCtrl.
// This slot is useful for complex list item structures.
// <ListItm
//   exampleListItm={true}
//   listItmCtrlMap={
//     <div>Mapped Custom Content</div>
//   }
// />

// --- Using 'as' prop to change element type ---
// Render the list item as a div instead of the default li.
// <ListItm as="div" exampleListItm={true}>
//   Div-based List Item
// </ListItm>

// --- List Item without Example Item (renders null) ---
// If exampleListItm is false, the component itself will not render.
// <ListItm exampleListItm={false} />
