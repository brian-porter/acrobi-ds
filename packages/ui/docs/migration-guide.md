# Migration Guide

Migrating to the Acrobi Design System from other component libraries or legacy systems. This guide provides step-by-step instructions, automated tools, and migration strategies.

## 🎯 Overview

The Acrobi Design System is designed to make migration as smooth as possible with:
- **Incremental adoption** - Migrate components gradually
- **Coexistence support** - Run alongside existing systems
- **Automated migration tools** - CLI helpers for common patterns
- **Comprehensive mapping** - Clear equivalents for popular libraries

## 🗺️ Migration Strategies

### Strategy 1: Incremental Migration (Recommended)

Gradually replace components over time while maintaining existing functionality:

```tsx
// Phase 1: Install alongside existing system
npm install @acrobi/ui

// Phase 2: Start with new components
import { Button } from '@acrobi/ui';
import { Card } from '@my-old-ui'; // Keep existing

// Phase 3: Replace components one by one
import { Button, Card } from '@acrobi/ui'; // Both migrated
```

### Strategy 2: Parallel Implementation

Run both systems side-by-side during transition:

```tsx
// Use CSS prefixes to avoid conflicts
.acrobi-components {
  /* Acrobi components scope */
}

.legacy-components {
  /* Legacy components scope */
}
```

### Strategy 3: Complete Replacement

Full migration for greenfield projects or major refactors:

```tsx
// Remove old dependencies
npm uninstall @old-ui/core @old-ui/components

// Install Acrobi
npm install @acrobi/ui

// Update all imports at once
import { Button, Card, Input } from '@acrobi/ui';
```

## 📚 Component Mapping

### From Material-UI (MUI)

| MUI Component | Acrobi Equivalent | Migration Notes |
|---------------|-------------------|-----------------|
| `Button` | `Button` | Direct replacement with similar API |
| `TextField` | `TextField` | Enhanced validation and accessibility |
| `Card` | `Card` | More flexible composition pattern |
| `Typography` | `Headline`, `Paragraph`, `Text` | Semantic-focused approach |
| `DataGrid` | `DataTable` | Simpler API, built-in features |
| `Autocomplete` | `SelectField` with `searchable` | More straightforward implementation |
| `Chip` | `Chip`, `Tag` | Both available for different use cases |
| `Dialog` | `Dialog` | Enhanced focus management |
| `FormControl` | Field components (`TextField`, etc.) | All-in-one field components |
| `Grid` | CSS Grid / Flexbox | Utility-first approach with Tailwind |

#### Migration Example: MUI to Acrobi

```tsx
// Before: Material-UI
import {
  Button,
  TextField,
  FormControl,
  FormLabel,
  FormHelperText,
  Card,
  CardContent,
  Typography
} from '@mui/material';

function MUIForm() {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5">Contact Form</Typography>
        <FormControl fullWidth margin="normal">
          <FormLabel>Email</FormLabel>
          <TextField 
            type="email"
            helperText="We'll never share your email"
          />
        </FormControl>
        <Button variant="contained">Submit</Button>
      </CardContent>
    </Card>
  );
}

// After: Acrobi Design System
import { 
  Button, 
  TextField, 
  Card, 
  CardHeader,
  CardTitle,
  CardContent 
} from '@acrobi/ui';

function AcrobiForm() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Form</CardTitle>
      </CardHeader>
      <CardContent>
        <TextField
          label="Email"
          type="email"
          helperText="We'll never share your email"
        />
        <Button>Submit</Button>
      </CardContent>
    </Card>
  );
}
```

### From Ant Design

| Ant Design | Acrobi Equivalent | Migration Notes |
|------------|-------------------|-----------------|
| `Button` | `Button` | Similar variants, enhanced accessibility |
| `Input` | `TextField` | Complete field solution with validation |
| `Form.Item` | Field components | Built-in label and validation |
| `Table` | `DataTable` | Simplified API, better performance |
| `Select` | `SelectField` | Enhanced search and accessibility |
| `Card` | `Card` | More flexible composition |
| `Typography.Title` | `Headline` | Semantic heading levels |
| `Typography.Text` | `Text`, `Paragraph` | More granular control |
| `Modal` | `Dialog` | Enhanced focus and accessibility |
| `Upload` | `UploadField` | Complete upload solution |

#### Migration Example: Ant Design to Acrobi

```tsx
// Before: Ant Design
import { 
  Button, 
  Form, 
  Input, 
  Select, 
  Card, 
  Typography 
} from 'antd';

const { Title } = Typography;
const { Option } = Select;

function AntdForm() {
  return (
    <Card>
      <Title level={3}>User Form</Title>
      <Form layout="vertical">
        <Form.Item 
          label="Name" 
          rules={[{ required: true, message: 'Please input your name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Role">
          <Select placeholder="Select a role">
            <Option value="admin">Admin</Option>
            <Option value="user">User</Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}

// After: Acrobi Design System
import { 
  Button, 
  TextField, 
  SelectField,
  Card,
  CardHeader,
  CardTitle,
  CardContent
} from '@acrobi/ui';

function AcrobiForm() {
  return (
    <Card>
      <CardHeader>
        <CardTitle level="h3">User Form</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <TextField
          label="Name"
          required
          error="Please input your name!"
        />
        <SelectField
          label="Role"
          placeholder="Select a role"
          options={[
            { value: 'admin', label: 'Admin' },
            { value: 'user', label: 'User' }
          ]}
        />
        <Button type="submit">Submit</Button>
      </CardContent>
    </Card>
  );
}
```

### From Chakra UI

| Chakra UI | Acrobi Equivalent | Migration Notes |
|-----------|-------------------|-----------------|
| `Button` | `Button` | Similar size and variant system |
| `Input` | `TextField` | Enhanced with built-in validation |
| `FormControl` | Field components | All-in-one approach |
| `Box` | `div` with Tailwind classes | Utility-first styling |
| `Text` | `Text`, `Paragraph` | More semantic options |
| `Heading` | `Headline` | Semantic heading levels |
| `VStack`, `HStack` | Flexbox utilities | Tailwind utility classes |
| `Modal` | `Dialog` | Enhanced accessibility |
| `useDisclosure` | `useState` | Standard React patterns |
| `useToast` | Custom implementation | Use notification libraries |

### From Bootstrap Components

| Bootstrap | Acrobi Equivalent | Migration Notes |
|-----------|-------------------|-----------------|
| `btn` | `Button` | Enhanced variants and accessibility |
| `form-control` | `TextField`, `SelectField` | Complete field solutions |
| `card` | `Card` | More flexible composition |
| `modal` | `Dialog` | Better focus management |
| `nav` | `Breadcrumb`, custom navigation | Semantic navigation components |
| `table` | `DataTable` | Feature-rich data display |
| `alert` | `Banner` | Enhanced dismissal and actions |
| `badge` | `Badge`, `Tag` | Multiple options available |
| `dropdown` | `SelectField`, `Dialog` | Context-appropriate solutions |
| Utility classes | Tailwind CSS classes | Modern utility-first approach |

## 🛠️ Migration Tools

### CLI Migration Assistant

The Acrobi CLI provides migration helpers:

```bash
# Analyze existing components
npx @acrobi/cli migrate analyze ./src

# Generate migration report
npx @acrobi/cli migrate report --from mui

# Auto-migrate simple components
npx @acrobi/cli migrate auto --from antd --path ./src/components

# Create migration checklist
npx @acrobi/cli migrate checklist
```

### Codemod Scripts

Automated code transformations for common patterns:

```bash
# Install transformation tools
npm install -g jscodeshift

# Run Acrobi codemods
npx @acrobi/codemods mui-to-acrobi ./src
npx @acrobi/codemods antd-to-acrobi ./src
npx @acrobi/codemods bootstrap-to-acrobi ./src
```

### Migration Configuration

Create a migration config file:

```json
// migration.config.json
{
  "from": "mui",
  "target": "@acrobi/ui",
  "rules": {
    "Button": {
      "component": "Button",
      "propMapping": {
        "variant": {
          "contained": "default",
          "outlined": "outline",
          "text": "ghost"
        }
      }
    },
    "TextField": {
      "component": "TextField", 
      "wrapFormControl": false
    }
  },
  "ignore": ["./src/legacy/**"],
  "typescript": true
}
```

## 🔧 Step-by-Step Migration Process

### Phase 1: Preparation

1. **Audit Current Components**
   ```bash
   # Generate component inventory
   npx @acrobi/cli migrate analyze ./src --export components.json
   ```

2. **Install Acrobi System**
   ```bash
   npm install @acrobi/ui
   npx @acrobi/cli init
   ```

3. **Setup Tailwind CSS**
   ```js
   // tailwind.config.js
   module.exports = {
     presets: [require('@acrobi/ui/tailwind')],
     content: [
       './src/**/*.{js,ts,jsx,tsx}',
       './node_modules/@acrobi/ui/**/*.{js,ts,jsx,tsx}',
     ],
   };
   ```

### Phase 2: Coexistence Setup

1. **Namespace CSS** (if needed)
   ```css
   /* Wrap legacy components */
   .legacy-ui {
     /* Original CSS scope */
   }
   
   /* Acrobi components use default scope */
   ```

2. **Create Component Aliases** (temporary)
   ```tsx
   // components/AcrobiButton.tsx
   export { Button as AcrobiButton } from '@acrobi/ui';
   
   // components/LegacyButton.tsx  
   export { Button as LegacyButton } from '@old-ui/core';
   ```

### Phase 3: Incremental Migration

1. **Start with Leaf Components**
   ```tsx
   // Migrate simple components first
   // ✅ Good: Start with Button, Badge, Tag
   // ❌ Avoid: Complex forms or data tables initially
   ```

2. **Update Component by Component**
   ```tsx
   // Before
   import { Button } from '@old-ui/core';
   
   // After  
   import { Button } from '@acrobi/ui';
   ```

3. **Handle Prop Differences**
   ```tsx
   // Create adapter if needed
   function MigratedButton({ variant, ...props }) {
     const acrobiVariant = variant === 'contained' ? 'default' : variant;
     return <Button variant={acrobiVariant} {...props} />;
   }
   ```

### Phase 4: Advanced Components

1. **Migrate Complex Components**
   ```tsx
   // Data tables, forms, modals
   import { DataTable, TextField, Dialog } from '@acrobi/ui';
   ```

2. **Update Styling Approach**
   ```tsx
   // Before: CSS-in-JS or custom CSS
   const StyledButton = styled.button`
     background: blue;
     padding: 8px 16px;
   `;
   
   // After: Tailwind utilities
   <Button className="bg-blue-500 px-4 py-2">Click me</Button>
   ```

### Phase 5: Cleanup

1. **Remove Old Dependencies**
   ```bash
   npm uninstall @old-ui/core @old-ui/components
   ```

2. **Update Tests**
   ```tsx
   // Update test imports and assertions
   import { render } from '@testing-library/react';
   import { Button } from '@acrobi/ui';
   ```

3. **Clean Up Styles**
   ```css
   /* Remove old CSS imports */
   /* @import '@old-ui/core/dist/styles.css'; */
   ```

## 🎨 Styling Migration

### From CSS-in-JS to Tailwind

```tsx
// Before: Styled Components
const StyledCard = styled.div`
  background: white;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  
  &:hover {
    box-shadow: 0 4px 8px rgba(0,0,0,0.15);
  }
`;

// After: Tailwind + Acrobi Card
<Card className="hover:shadow-lg transition-shadow">
  <CardContent>
    Content here
  </CardContent>
</Card>
```

### From CSS Modules

```css
/* Before: styles.module.css */
.container {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 600px;
  margin: 0 auto;
}

.button {
  background: #007bff;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 4px;
}
```

```tsx
// Before: CSS Modules
import styles from './styles.module.css';

function Component() {
  return (
    <div className={styles.container}>
      <button className={styles.button}>Click me</button>
    </div>
  );
}

// After: Tailwind + Acrobi
import { Button } from '@acrobi/ui';

function Component() {
  return (
    <div className="flex flex-col gap-4 max-w-2xl mx-auto">
      <Button>Click me</Button>
    </div>
  );
}
```

## 🧪 Testing Migration

### Update Test Utilities

```tsx
// Before: Old UI test utils
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@old-ui/core';

const renderWithTheme = (component) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

// After: Acrobi test utils
import { render, screen } from '@testing-library/react';
import { themes, themeToCSSProperties } from '@acrobi/ui';

const renderWithTheme = (component) => {
  const cssProps = themeToCSSProperties(themes.acrobi);
  return render(
    <div style={cssProps}>
      {component}
    </div>
  );
};
```

### Update Component Tests

```tsx
// Before: Testing old components
test('renders button with correct text', () => {
  render(<OldButton variant="primary">Click me</OldButton>);
  expect(screen.getByRole('button')).toHaveTextContent('Click me');
  expect(screen.getByRole('button')).toHaveClass('btn-primary');
});

// After: Testing Acrobi components
test('renders button with correct text', () => {
  render(<Button variant="default">Click me</Button>);
  expect(screen.getByRole('button')).toHaveTextContent('Click me');
  expect(screen.getByRole('button')).toHaveClass('bg-primary');
});
```

## 🚨 Common Migration Issues

### Issue 1: CSS Conflicts

**Problem**: Styles from old and new systems conflict

**Solution**: Use CSS scoping or namespacing
```css
/* Scope legacy styles */
.legacy-app {
  /* Old styles only apply here */
}

/* New styles in default scope */
```

### Issue 2: Different Event Handlers

**Problem**: Event handler signatures differ between systems

**Solution**: Create adapter functions
```tsx
// Adapter for different onChange signatures
function adaptedOnChange(acrobiOnChange) {
  return (oldEvent) => {
    const acrobiEvent = {
      target: { value: oldEvent.currentTarget.value }
    };
    acrobiOnChange(acrobiEvent);
  };
}
```

### Issue 3: Missing Components

**Problem**: Old system has components not in Acrobi

**Solution**: Build custom components using Acrobi primitives
```tsx
// Custom component using Acrobi primitives
function CustomDataGrid({ data, columns }) {
  return (
    <DataTable
      data={data}
      columns={columns}
      // Add missing features as needed
    />
  );
}
```

### Issue 4: Theme Differences

**Problem**: Color schemes and spacing don't match

**Solution**: Create custom theme
```tsx
import { Theme } from '@acrobi/ui';

const migrationTheme: Theme = {
  name: 'migration',
  tokens: {
    colors: {
      primary: { 
        light: '220 100% 50%', // Match old primary
        dark: '220 100% 60%' 
      },
      // ... match other old colors
    },
    spacing: {
      // Match old spacing scale
      xs: '4px',
      sm: '8px', 
      md: '16px',
      lg: '24px',
      xl: '32px',
    },
    // ... other tokens
  },
};
```

## 📋 Migration Checklist

### Pre-Migration
- [ ] Audit existing components and create inventory
- [ ] Identify high-risk/complex components
- [ ] Set up testing environment
- [ ] Create migration timeline
- [ ] Install Acrobi Design System
- [ ] Configure Tailwind CSS

### During Migration
- [ ] Start with simple leaf components
- [ ] Update one component type at a time
- [ ] Run tests after each component migration
- [ ] Handle styling conflicts as they arise
- [ ] Update documentation
- [ ] Get team review on migrated components

### Post-Migration
- [ ] Remove old dependencies
- [ ] Clean up unused CSS
- [ ] Update all tests
- [ ] Verify accessibility compliance
- [ ] Performance testing
- [ ] Update build processes
- [ ] Train team on new system

## 🆘 Getting Help

### Migration Support Resources

- **🤖 CLI Migration Tools**: `npx @acrobi/cli migrate --help`
- **📚 Component Mapping**: [View all mappings](./component-mappings.md)
- **💬 Community Support**: [GitHub Discussions](https://github.com/acrobi/design-system/discussions)
- **🐛 Report Issues**: [GitHub Issues](https://github.com/acrobi/design-system/issues)
- **📧 Enterprise Support**: [enterprise@acrobi.com](mailto:enterprise@acrobi.com)

### Migration Services

For complex migrations, consider our professional services:

- **Migration Assessment** - Analyze your current system and create migration plan
- **Automated Migration** - Custom codemods for your specific use case  
- **Team Training** - On-site or remote training for development teams
- **Ongoing Support** - Extended support during migration period

## 📈 Migration Success Stories

### Case Study 1: E-commerce Platform
- **Before**: 200+ components across MUI, Ant Design, and custom code
- **Timeline**: 3 months incremental migration
- **Results**: 40% reduction in bundle size, 60% fewer accessibility issues
- **Key Success Factor**: Started with design tokens alignment

### Case Study 2: SaaS Dashboard  
- **Before**: Legacy Bootstrap + jQuery components
- **Timeline**: 6 weeks complete replacement
- **Results**: Modern React architecture, full TypeScript support
- **Key Success Factor**: Comprehensive testing strategy

### Case Study 3: Mobile-First PWA
- **Before**: Custom component library
- **Timeline**: 2 months with PWA feature additions
- **Results**: Added camera, geolocation, and offline capabilities
- **Key Success Factor**: Leveraged Acrobi PWA hooks from day one

---

**Ready to migrate?** Start with our [CLI migration assistant](./cli-reference.md#migration-commands) or [join our Discord](https://discord.gg/acrobi-design) for real-time migration support.

*Migration questions? We're here to help every step of the way!*