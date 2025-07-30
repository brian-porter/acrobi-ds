# Structure Components

Structure components are advanced compositions built from primitive components. They provide higher-level functionality and complete solutions for common UI patterns and complex use cases.

## 🎯 Overview

The structure layer contains **22 components** across 4 categories:

- **Form Structures** (8) - Complete form field compositions
- **Grouping Structures** (7) - Content and action organization
- **Data Display Structures** (5) - Information presentation
- **Advanced Input Structures** (2) - Specialized input patterns

## 📝 Form Structures

Complete form field implementations with labels, validation, and helper text.

### [TextField](./text-field.md)
A complete text input field with label, helper text, and error handling.

```tsx
<TextField label="Email" placeholder="Enter your email" />
<TextField label="Password" type="password" error="Password is required" required />
```

**Built from**: Input primitive
**Use cases**: Text input with validation, form fields
**Tags**: structure, form, input, field

### [TextareaField](./textarea-field.md)
A complete textarea field with label, helper text, and character counting.

```tsx
<TextareaField label="Message" placeholder="Enter your message" />
<TextareaField label="Bio" showCount maxLength={200} />
```

**Built from**: Textarea primitive
**Use cases**: Multi-line text input, comments, descriptions
**Tags**: structure, form, textarea, field

### [SelectField](./select-field.md)
A complete select field with label, helper text, and searchable options.

```tsx
<SelectField label="Country" options={[{value: 'us', label: 'United States'}]} />
<SelectField label="City" searchable options={cities} />
```

**Built from**: Select primitive
**Use cases**: Dropdown selection with validation
**Tags**: structure, form, select, field

### [CheckboxField](./checkbox-field.md)
A complete checkbox field with label, helper text, and error handling.

```tsx
<CheckboxField label="Accept terms and conditions" required />
<CheckboxField label="Subscribe" helperText="Get updates via email" />
```

**Built from**: Checkbox primitive
**Use cases**: Agreement checkboxes, boolean options
**Tags**: structure, form, checkbox, field

### [SwitchField](./switch-field.md)
A complete switch field with label, helper text, and toggle functionality.

```tsx
<SwitchField label="Enable notifications" />
<SwitchField label="Dark mode" description="Toggle between light and dark themes" />
```

**Built from**: Switch primitive
**Use cases**: Settings toggles, binary preferences
**Tags**: structure, form, switch, field

### [RadioField](./radio-field.md)
A complete radio field with label, helper text, and grouped options.

```tsx
<RadioField label="Size" name="size" options={[
  {value: 'sm', label: 'Small'}, 
  {value: 'lg', label: 'Large'}
]} />
<RadioField label="Payment" orientation="horizontal" options={paymentOptions} />
```

**Built from**: Radio primitive
**Use cases**: Single selection with validation
**Tags**: structure, form, radio, field

### [SliderField](./slider-field.md)
A complete slider field with label, helper text, and value visualization.

```tsx
<SliderField label="Volume" defaultValue={[50]} max={100} showLabels />
<SliderField label="Price Range" defaultValue={[20, 80]} formatLabel={(v) => `$${v}`} />
```

**Built from**: Slider primitive
**Use cases**: Numeric range selection, settings
**Tags**: structure, form, slider, field

## 🏗️ Grouping Structures

Components for organizing and grouping content, actions, and UI elements.

### [ButtonPanel](./button-panel.md)
A structure for organizing and grouping button actions with flexible layouts.

```tsx
<ButtonPanel buttons={[
  {label: 'Save', onClick: () => {}}, 
  {label: 'Cancel', variant: 'outline', onClick: () => {}}
]} />
<ButtonPanel orientation="vertical" buttons={buttons} />
```

**Built from**: Button primitive
**Use cases**: Action groups, form controls, toolbars
**Tags**: structure, grouping, buttons, layout

### [ButtonGroup](./button-group.md)
A segmented control structure for single or multiple selection with button-like interface.

```tsx
<ButtonGroup options={[
  {value: 'left', label: 'Left'}, 
  {value: 'center', label: 'Center'}, 
  {value: 'right', label: 'Right'}
]} />
<ButtonGroup multiple options={options} />
```

**Built from**: Button primitive
**Use cases**: Toggle controls, segmented selections
**Tags**: structure, grouping, selection, segmented, interactive

### [ObjectGroup](./object-group.md)
A flexible container structure for grouping UI objects with headers, footers, and collapsible functionality.

```tsx
<ObjectGroup title="Settings">
  <div>Content here</div>
</ObjectGroup>
<ObjectGroup title="Advanced" collapsible defaultCollapsed>
  Advanced settings
</ObjectGroup>
```

**Built from**: Multiple primitives
**Use cases**: Settings panels, content sections
**Tags**: structure, grouping, container, collapsible, layout

### [CheckboxGroup](./checkbox-group.md)
A structure for grouping multiple checkbox options with proper accessibility and form handling.

```tsx
<CheckboxGroup label="Interests" options={[
  {value: 'tech', label: 'Technology'}, 
  {value: 'sports', label: 'Sports'}
]} />
<CheckboxGroup orientation="horizontal" options={options} />
```

**Built from**: Checkbox primitive
**Use cases**: Multi-select forms, preference settings
**Tags**: structure, form, checkbox, grouping, input

### [RadioGroup](./radio-group.md)
A structure for grouping radio button options with proper accessibility and form handling.

```tsx
<RadioGroup label="Size" name="size" options={[
  {value: 'sm', label: 'Small'}, 
  {value: 'lg', label: 'Large'}
]} />
<RadioGroup orientation="horizontal" options={options} />
```

**Built from**: Radio primitive
**Use cases**: Single-select forms, option selection
**Tags**: structure, form, radio, grouping, input

### [List Structure](./list-structure.md)
An enhanced list structure with loading states, empty states, and header actions.

```tsx
<List title="Users" loading={false}>
  <ListItem>John Doe</ListItem>
</List>
<List title="Tasks" actions={[{label: 'Add Task', onClick: () => {}}]}>
  {items}
</List>
```

**Built from**: List primitive
**Use cases**: Data lists, content collections
**Tags**: structure, list, display, loading, content

### [ListItem Structure](./list-item-structure.md)
A flexible list item structure with leading/trailing content, actions, and structured layout.

```tsx
<ListItem leading={<Avatar />} title="John Doe" subtitle="Software Engineer" />
<ListItem clickable actions={[{label: 'Edit', onClick: () => {}}]}>
  Content
</ListItem>
```

**Built from**: Multiple primitives
**Use cases**: User lists, content items, navigation
**Tags**: structure, list, item, interactive, content

## 📊 Data Display Structures

Advanced components for presenting and organizing information and data.

### [DataTable](./data-table.md)
A comprehensive data table structure with sorting, filtering, pagination, row selection, and actions.

```tsx
<DataTable data={users} columns={[
  {key: 'name', header: 'Name'}, 
  {key: 'email', header: 'Email'}
]} />
<DataTable data={data} columns={columns} selectable sorting pagination />
```

**Built from**: Multiple primitives
**Use cases**: Data grids, admin interfaces, reports
**Tags**: structure, table, data, sorting, pagination, interactive

### [FilterBar](./filter-bar.md)
A comprehensive filter bar structure for data filtering with multiple field types and search functionality.

```tsx
<FilterBar fields={[
  {key: 'name', label: 'Name', type: 'text'}, 
  {key: 'status', label: 'Status', type: 'select', options: statusOptions}
]} />
<FilterBar showSearch fields={filterFields} onFiltersChange={handleFilters} />
```

**Built from**: Multiple form primitives
**Use cases**: Data filtering, search interfaces
**Tags**: structure, filter, search, form, data, interactive

### [EmptyState](./empty-state.md)
A comprehensive empty state structure with predefined variants for different scenarios.

```tsx
<EmptyState title="No items found" description="There are no items to display" />
<EmptyCollection actions={[{label: 'Add Item', onClick: () => {}}]} />
```

**Built from**: Typography and layout primitives
**Use cases**: Empty collections, no results, error states
**Tags**: structure, empty-state, placeholder, feedback, content

### [Banner Structure](./banner-structure.md)
An enhanced banner structure with dismissal, auto-dismiss, actions, and positioning options.

```tsx
<Banner variant="info" dismissible onDismiss={() => {}}>
  Important update available
</Banner>
<Banner variant="warning" actions={[{label: 'Update Now', onClick: () => {}}]}>
  New version available
</Banner>
```

**Built from**: Banner primitive
**Use cases**: Notifications, alerts, announcements
**Tags**: structure, banner, notification, dismissible, feedback

### [Headline Structure](./headline-structure.md)
A rich headline structure with subtitle, actions, and layout variants (hero, section).

```tsx
<HeadlineStructure title="Welcome" subtitle="Get started with our platform" />
<HeadlineStructure layout="hero" title="Build Amazing Apps" actions={[
  {label: 'Get Started', onClick: () => {}}
]} />
```

**Built from**: Headline primitive
**Use cases**: Page headers, hero sections, content titles
**Tags**: structure, headline, hero, typography, content

### [Breadcrumb Structure](./breadcrumb-structure.md)
A smart breadcrumb structure with collapsing, max items, mobile responsiveness, and ellipsis handling.

```tsx
<BreadcrumbStructure items={[
  {label: 'Home', href: '/'}, 
  {label: 'Products', href: '/products'}, 
  {label: 'Detail'}
]} />
<BreadcrumbStructure maxItems={3} collapsible items={longItems} />
```

**Built from**: Breadcrumb primitive
**Use cases**: Navigation hierarchy, mobile navigation
**Tags**: structure, breadcrumb, navigation, responsive, hierarchy

## 🚀 Advanced Input Structures

Specialized input patterns for complex data collection and device integration.

### [UploadField](./upload-field.md)
An advanced file upload structure with drag & drop, previews, progress tracking, and validation.

```tsx
<UploadField label="Upload Images" accept="image/*" multiple />
<UploadField label="Documents" accept=".pdf,.doc,.docx" maxSize={10485760} showPreviews />
```

**Built from**: Input primitives and custom logic
**Use cases**: File uploads, media management, document handling
**Tags**: structure, upload, file, drag-drop, validation, form

### [GrantPermissions](./grant-permissions.md)
A PWA permissions structure for requesting and managing device permissions with comprehensive UI states.

```tsx
<GrantPermissions permissions={[
  {key: 'notifications', name: 'Notifications', description: 'Get important updates'}
]} />
<GrantPermissions permissions={permissions} showIndividualControls onGrantAll={handleGrantAll} />
```

**Built from**: Multiple primitives
**Use cases**: PWA onboarding, permission management, device access
**Tags**: structure, pwa, permissions, device, accessibility, interactive

## 🎨 Design Patterns

### Complete Field Pattern
Form structures follow a consistent pattern:

```tsx
<FieldStructure
  label="Field Label"        // Always present
  helperText="Helpful info"  // Optional guidance
  error="Error message"      // Validation feedback
  required                   // Visual indicators
>
  <PrimitiveComponent />     // Core input element
</FieldStructure>
```

### Grouping Pattern
Grouping structures organize related elements:

```tsx
<GroupStructure
  title="Group Title"        // Optional header
  collapsible               // Optional behavior
  orientation="horizontal"   // Layout control
>
  <ChildComponents />        // Grouped content
</GroupStructure>
```

### Data Pattern
Data structures handle complex information:

```tsx
<DataStructure
  data={items}               // Data source
  loading={isLoading}        // Loading states
  empty={<EmptyState />}     // Empty states
  actions={headerActions}    // Available actions
>
  <RenderLogic />            // Display logic
</DataStructure>
```

## 🔄 Composition Architecture

Structures demonstrate the power of composition:

```tsx
// A complete user management interface
<Card>
  <HeadlineStructure 
    title="Team Members" 
    actions={[{label: 'Add Member', onClick: addMember}]} 
  />
  
  <FilterBar 
    showSearch
    fields={[
      {key: 'role', label: 'Role', type: 'select', options: roles},
      {key: 'status', label: 'Status', type: 'select', options: statuses}
    ]}
    onFiltersChange={handleFilters}
  />
  
  <DataTable
    data={filteredUsers}
    columns={userColumns}
    selectable
    sorting
    pagination={{page: 1, pageSize: 10, total: users.length}}
    actions={[
      {label: 'Edit', onClick: editUser},
      {label: 'Delete', onClick: deleteUser, variant: 'destructive'}
    ]}
  />
</Card>
```

## ♿ Accessibility Features

All structure components maintain accessibility through:

- **Proper Form Association** - Labels connected to inputs
- **Error Announcements** - Screen reader error feedback
- **Group Navigation** - Logical tab order and focus management
- **State Communication** - Loading and empty state announcements
- **Action Clarity** - Clear button labels and descriptions

## 🔗 Related Resources

- [Primitive Components](../primitives/) - Foundation building blocks
- [PWA Hooks](../hooks/) - Device integration capabilities
- [Form Patterns Guide](../../guides/forms.md) - Best practices for forms
- [Data Display Guide](../../guides/data-display.md) - Presenting information effectively

---

*Documentation auto-generated from registry v1.0.0*