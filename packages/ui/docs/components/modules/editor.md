# Editor

Rich text editor module with collaborative features and media support.

## Overview

Editor is a comprehensive rich text editing module built on TipTap, featuring real-time collaboration, media embedding, auto-save, and extensive formatting options.

## Basic Usage

```tsx
import { Editor } from '@acrobi/ui';

function DocumentEditor() {
  const [content, setContent] = useState('');

  return (
    <Editor
      content={content}
      onChange={setContent}
      tools={[
        'bold', 'italic', 'underline',
        'heading', 'list', 'link',
        'image', 'table', 'code'
      ]}
      placeholder="Start writing..."
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `content` | `string` | - | Editor content (HTML) |
| `onChange` | `function` | - | Content change handler |
| `tools` | `string[]` | - | Available editing tools |
| `collaboration` | `object` | - | Collaboration settings |
| `autosave` | `object` | - | Auto-save configuration |
| `mediaUpload` | `object` | - | Media upload settings |

## Examples

### Collaborative Editor

```tsx
function CollaborativeEditor() {
  return (
    <Editor
      content={document.content}
      onChange={handleContentChange}
      collaboration={{
        enabled: true,
        users: collaborators,
        onUserJoin: handleUserJoin,
        onUserLeave: handleUserLeave
      }}
      autosave={{
        enabled: true,
        interval: 30000,
        onSave: handleAutosave
      }}
    />
  );
}
```

### Full-Featured Editor

```tsx
<Editor
  content={content}
  onChange={setContent}
  tools={[
    'bold', 'italic', 'underline', 'strike',
    'heading', 'paragraph', 'blockquote',
    'bulletList', 'orderedList', 'taskList',
    'link', 'image', 'video', 'table',
    'code', 'codeBlock', 'horizontalRule'
  ]}
  mediaUpload={{
    endpoint: '/api/upload',
    maxSize: 10 * 1024 * 1024,
    allowedTypes: ['image/*', 'video/*']
  }}
  placeholder="Write something amazing..."
/>
```