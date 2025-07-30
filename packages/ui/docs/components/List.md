[Table of Contents](../../toc.md)

# List Component

## Overview
This section provides a concise overview of the **List** component. The `List` component serves as a parent container for `ListItm` elements, providing a structured and organized way to display multiple items in a list format. It is built using an `<ul>` tag by default and is designed to be unstyled, allowing for maximum flexibility in applying custom styles. It renders a collection of `ListItm` components or accepts custom children.

## Properties
This section details all the configurable properties (props) that the **List** component accepts.

| Name              | Description                                                                                                                                       | Possible Values                                                                                                                                             | Default Setting |
| :---------------- | :------------------------------------------------------------------------------------------------------------------------------------------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------- |
| `as`              | Specifies the HTML element type for the list container (e.g., `ul`, `ol`).                                                                      | `React.ElementType`                                                                                                                                         | `_Builtin.List` |
| `list`            | Toggles the overall visibility of the list component. If `false`, the list will not render.                                                     | `boolean` (`true` to show, `false` to hide)                                                                                                                 | `true`          |
| `listItmMap`      | Renders a collection of list items. If provided, it overrides the default example `ListItm` rendering. It's treated as `React.ReactNode`.           | `React.ReactNode`                                                                                                                                           | `undefined`     |
| `exampleListItm`  | Toggles the rendering of an example or placeholder list item, typically used when `listItmMap` is not provided.                                   | `boolean` (`true` to show, `false` to hide)                                                                                                                 | `true`          |
| `children`        | Can also accept children directly, representing the list items to be rendered. These are rendered if `listItmMap` is not provided.                 | `React.ReactNode`                                                                                                                                           | `null`          |


## Styling
This section describes how the **List** component is styled and how users can customize its appearance.

*   **Base Styles (`List.module.css`):**
    *   The component applies the `.list` class from `List.module.css`.
    *   The primary style defined is `position: relative;`.
    *   The component is rendered with `unstyled={true}`, meaning default browser list styles (like bullets or numbers) are typically removed, allowing for complete custom styling.
    *   The component defaults to using a `<ul>` tag (`tag="ul"`).

*   **Customization:**
    *   Users can pass custom CSS classes via the `className` prop (though not explicitly listed in the `.d.ts`, it's a common React pattern and used internally via `_utils.cx`).
    *   The `as` prop allows changing the base HTML element (e.g., from `<ul>` to `<ol>` or a `<div>`).

## Usage
This section provides practical examples of how to use the **List** component in your application.

```jsx
// Import the component
import { List } from './List';
// Assuming ListItm component is available for examples
// import { ListItm } from './ListItm';

// --- Basic List Rendering ---
// Renders a list structure, showing an example ListItm by default if no listItmMap or children are provided.
<List />

// --- Conditionally Visible List ---
// The 'list' prop controls the overall rendering.
const showList = false;
<List list={showList} /> // This will render null

// --- List with Example Item (explicitly) ---
// Showcases a single ListItm when no other content is mapped.
<List exampleListItm={true} />

// --- List with Mapped Items ---
// Demonstrates passing a collection of ListItm components via listItmMap.
// Assuming ListItm can accept props like 'label' or 'text'.
// const myItems = [
//   <ListItm key="1" label="Item 1" />,
//   <ListItm key="2" label="Item 2" />,
// ];
// <List listItmMap={myItems} />

// --- List with Direct Children ---
// Render custom content directly as children of the List component.
// <List>
//   <li>First Item</li>
//   <li>Second Item</li>
// </List>

// --- Using 'as' prop to change element type ---
// Render the list as an ordered list (<ol>) instead of an unordered list (<ul>).
// <List as="ol">
//   <li>Step 1</li>
//   <li>Step 2</li>
// </List>
```
