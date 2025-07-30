import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { useEditor, EditorContent, type Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import { TextStyle } from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import Link from '@tiptap/extension-link';
import { Button } from '../primitives/button';
import { ColorPalette } from '../structures/color-palette';
import { Input } from '../primitives/input';

const editorVariants = cva(
  'w-full border border-input rounded-md overflow-hidden',
  {
    variants: {
      mode: {
        simple: 'min-h-[120px]',
        rich: 'min-h-[200px]',
        full: 'min-h-[300px]',
      },
      size: {
        sm: 'text-sm',
        default: 'text-base',
        lg: 'text-lg',
      },
    },
    defaultVariants: {
      mode: 'simple',
      size: 'default',
    },
  }
);

const toolbarVariants = cva(
  'flex items-center gap-1 p-2 border-b border-input bg-muted/30',
  {
    variants: {
      layout: {
        compact: 'flex-wrap gap-1',
        full: 'flex-wrap gap-2',
        minimal: 'gap-1',
      },
    },
    defaultVariants: {
      layout: 'compact',
    },
  }
);

export type EditorMode = 'simple' | 'rich' | 'full';

export interface EditorProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof editorVariants> {
  /**
   * Editor content (HTML string)
   */
  content?: string;
  /**
   * Callback when content changes
   */
  onContentChange?: (content: string) => void;
  /**
   * Editor mode
   * @default "simple"
   */
  mode?: EditorMode;
  /**
   * Placeholder text
   */
  placeholder?: string;
  /**
   * Whether the editor is editable
   * @default true
   */
  editable?: boolean;
  /**
   * Whether to show the toolbar
   * @default true
   */
  showToolbar?: boolean;
  /**
   * Whether to enable emoji picker
   * @default false
   */
  enableEmoji?: boolean;
  /**
   * Whether to auto-focus on mount
   * @default false
   */
  autoFocus?: boolean;
  /**
   * Maximum character limit
   */
  maxLength?: number;
  /**
   * Whether to show character count
   * @default false
   */
  showCharacterCount?: boolean;
  /**
   * Custom toolbar layout
   */
  toolbarLayout?: 'compact' | 'full' | 'minimal';
  /**
   * Callback when editor is ready
   */
  onReady?: (editor: Editor) => void;
}

// Emoji data (simplified - in real app would use emoji-mart)
const commonEmojis = [
  '😀',
  '😃',
  '😄',
  '😁',
  '😊',
  '😍',
  '🤩',
  '😘',
  '😗',
  '😚',
  '😋',
  '😛',
  '😜',
  '🤪',
  '😝',
  '🤗',
  '🤭',
  '🤫',
  '🤔',
  '🤐',
  '👍',
  '👎',
  '👏',
  '🙌',
  '👋',
  '🤟',
  '✌️',
  '🤞',
  '🤘',
  '👌',
  '❤️',
  '🧡',
  '💛',
  '💚',
  '💙',
  '💜',
  '🤍',
  '🖤',
  '🤎',
  '💕',
  '🎉',
  '🎊',
  '🎈',
  '🎁',
  '🏆',
  '🥇',
  '🥈',
  '🥉',
  '⭐',
  '✨',
];

const TextEditor = React.forwardRef<HTMLDivElement, EditorProps>(
  (
    {
      className,
      content = '',
      onContentChange,
      mode = 'simple',
      placeholder = 'Start typing...',
      editable = true,
      showToolbar = true,
      enableEmoji = false,
      autoFocus = false,
      maxLength,
      showCharacterCount = false,
      toolbarLayout = 'compact',
      onReady,
      size,
      ...props
    },
    ref
  ) => {
    const [showEmojiPicker, setShowEmojiPicker] = React.useState(false);
    const [showColorPicker, setShowColorPicker] = React.useState(false);
    const [linkUrl, setLinkUrl] = React.useState('');
    const [showLinkInput, setShowLinkInput] = React.useState(false);

    // Initialize TipTap editor
    const editor = useEditor({
      extensions: [
        StarterKit.configure({
          heading:
            mode === 'simple'
              ? false
              : {
                  levels: [1, 2, 3, 4, 5, 6],
                },
          bulletList: mode !== 'simple' ? {} : false,
          orderedList: mode !== 'simple' ? {} : false,
          blockquote: mode === 'rich' || mode === 'full' ? {} : false,
          codeBlock: mode === 'full' ? {} : false,
          horizontalRule: mode === 'full' ? {} : false,
        }),
        Placeholder.configure({
          placeholder,
        }),
        TextStyle,
        Color.configure({
          types: ['textStyle'],
        }),
        Link.configure({
          openOnClick: false,
          HTMLAttributes: {
            class: 'text-primary underline',
          },
        }),
      ],
      content,
      editable,
      autofocus: autoFocus,
      onUpdate: ({ editor }) => {
        const html = editor.getHTML();
        onContentChange?.(html);
      },
      onCreate: ({ editor }) => {
        onReady?.(editor);
      },
    });

    // Character count
    const characterCount = editor?.storage.characterCount?.characters() || 0;
    const isOverLimit = maxLength ? characterCount > maxLength : false;

    // Toolbar actions
    const handleBold = React.useCallback(() => {
      editor?.chain().focus().toggleBold().run();
    }, [editor]);

    const handleItalic = React.useCallback(() => {
      editor?.chain().focus().toggleItalic().run();
    }, [editor]);

    const handleUnderline = React.useCallback(() => {
      editor?.chain().focus().toggleUnderline().run();
    }, [editor]);

    const handleStrike = React.useCallback(() => {
      editor?.chain().focus().toggleStrike().run();
    }, [editor]);

    const handleHeading = React.useCallback(
      (level: 1 | 2 | 3 | 4 | 5 | 6) => {
        editor?.chain().focus().toggleHeading({ level }).run();
      },
      [editor]
    );

    const handleBulletList = React.useCallback(() => {
      editor?.chain().focus().toggleBulletList().run();
    }, [editor]);

    const handleOrderedList = React.useCallback(() => {
      editor?.chain().focus().toggleOrderedList().run();
    }, [editor]);

    const handleBlockquote = React.useCallback(() => {
      editor?.chain().focus().toggleBlockquote().run();
    }, [editor]);

    const handleColor = React.useCallback(
      (color: string) => {
        if (color === '') {
          editor?.chain().focus().unsetColor().run();
        } else {
          editor?.chain().focus().setColor(color).run();
        }
        setShowColorPicker(false);
      },
      [editor]
    );

    const handleEmoji = React.useCallback(
      (emoji: string) => {
        editor?.chain().focus().insertContent(emoji).run();
        setShowEmojiPicker(false);
      },
      [editor]
    );

    const handleLink = React.useCallback(() => {
      if (linkUrl) {
        editor?.chain().focus().setLink({ href: linkUrl }).run();
        setLinkUrl('');
        setShowLinkInput(false);
      }
    }, [editor, linkUrl]);

    const handleUnlink = React.useCallback(() => {
      editor?.chain().focus().unsetLink().run();
    }, [editor]);

    // Render toolbar
    const renderToolbar = () => {
      if (!showToolbar || !editor) return null;

      const isActive = (command: string) => {
        switch (command) {
          case 'bold':
            return editor.isActive('bold');
          case 'italic':
            return editor.isActive('italic');
          case 'underline':
            return editor.isActive('underline');
          case 'strike':
            return editor.isActive('strike');
          case 'bulletList':
            return editor.isActive('bulletList');
          case 'orderedList':
            return editor.isActive('orderedList');
          case 'blockquote':
            return editor.isActive('blockquote');
          case 'link':
            return editor.isActive('link');
          default:
            return false;
        }
      };

      return (
        <div className={cn(toolbarVariants({ layout: toolbarLayout }))}>
          {/* Text formatting */}
          <div className='flex items-center gap-1'>
            <Button
              type='button'
              variant={isActive('bold') ? 'default' : 'ghost'}
              size='sm'
              onClick={handleBold}
              className='w-8 h-8 p-0'
            >
              <strong>B</strong>
            </Button>
            <Button
              type='button'
              variant={isActive('italic') ? 'default' : 'ghost'}
              size='sm'
              onClick={handleItalic}
              className='w-8 h-8 p-0'
            >
              <em>I</em>
            </Button>
            {mode !== 'simple' && (
              <Button
                type='button'
                variant={isActive('underline') ? 'default' : 'ghost'}
                size='sm'
                onClick={handleUnderline}
                className='w-8 h-8 p-0'
              >
                <u>U</u>
              </Button>
            )}
          </div>

          {/* Headings for rich/full mode */}
          {mode !== 'simple' && (
            <div className='flex items-center gap-1 border-l pl-2 ml-2'>
              <Button
                type='button'
                variant={
                  editor.isActive('heading', { level: 1 }) ? 'default' : 'ghost'
                }
                size='sm'
                onClick={() => handleHeading(1)}
                className='text-xs px-2 h-8'
              >
                H1
              </Button>
              <Button
                type='button'
                variant={
                  editor.isActive('heading', { level: 2 }) ? 'default' : 'ghost'
                }
                size='sm'
                onClick={() => handleHeading(2)}
                className='text-xs px-2 h-8'
              >
                H2
              </Button>
            </div>
          )}

          {/* Lists for rich/full mode */}
          {mode !== 'simple' && (
            <div className='flex items-center gap-1 border-l pl-2 ml-2'>
              <Button
                type='button'
                variant={isActive('bulletList') ? 'default' : 'ghost'}
                size='sm'
                onClick={handleBulletList}
                className='w-8 h-8 p-0'
              >
                •
              </Button>
              <Button
                type='button'
                variant={isActive('orderedList') ? 'default' : 'ghost'}
                size='sm'
                onClick={handleOrderedList}
                className='w-8 h-8 p-0'
              >
                1.
              </Button>
            </div>
          )}

          {/* Color picker */}
          {mode !== 'simple' && (
            <div className='relative border-l pl-2 ml-2'>
              <Button
                type='button'
                variant='ghost'
                size='sm'
                onClick={() => setShowColorPicker(!showColorPicker)}
                className='w-8 h-8 p-0'
              >
                A
              </Button>
              {showColorPicker && (
                <div className='absolute top-full left-0 z-50 bg-background border border-input rounded-md shadow-lg'>
                  <ColorPalette
                    colors={[
                      { value: '#000000', name: 'Black' },
                      { value: '#374151', name: 'Gray' },
                      { value: '#DC2626', name: 'Red' },
                      { value: '#16A34A', name: 'Green' },
                      { value: '#2563EB', name: 'Blue' },
                      { value: '#7C2D12', name: 'Purple' },
                      { value: '#D97706', name: 'Orange' },
                      { value: '#0891B2', name: 'Cyan' },
                    ]}
                    value={editor.getAttributes('textStyle').color}
                    onValueChange={handleColor}
                    columns={8}
                    size='sm'
                    allowNoColor
                  />
                </div>
              )}
            </div>
          )}

          {/* Emoji picker */}
          {enableEmoji && (
            <div className='relative border-l pl-2 ml-2'>
              <Button
                type='button'
                variant='ghost'
                size='sm'
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className='w-8 h-8 p-0'
              >
                😀
              </Button>
              {showEmojiPicker && (
                <div className='absolute top-full left-0 z-50 bg-background border border-input rounded-md shadow-lg p-2'>
                  <div className='grid grid-cols-10 gap-1 max-w-xs'>
                    {commonEmojis.map(emoji => (
                      <Button
                        key={emoji}
                        type='button'
                        variant='ghost'
                        size='sm'
                        onClick={() => handleEmoji(emoji)}
                        className='w-8 h-8 p-0 text-lg'
                      >
                        {emoji}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Link tools */}
          {mode !== 'simple' && (
            <div className='relative border-l pl-2 ml-2'>
              <Button
                type='button'
                variant={isActive('link') ? 'default' : 'ghost'}
                size='sm'
                onClick={() => setShowLinkInput(!showLinkInput)}
                className='w-8 h-8 p-0'
              >
                🔗
              </Button>
              {isActive('link') && (
                <Button
                  type='button'
                  variant='ghost'
                  size='sm'
                  onClick={handleUnlink}
                  className='w-8 h-8 p-0 ml-1'
                >
                  🔗❌
                </Button>
              )}
              {showLinkInput && (
                <div className='absolute top-full left-0 z-50 bg-background border border-input rounded-md shadow-lg p-2'>
                  <div className='flex items-center gap-2 min-w-[200px]'>
                    <Input
                      value={linkUrl}
                      onChange={e => setLinkUrl(e.target.value)}
                      placeholder='Enter URL'
                      size='sm'
                    />
                    <Button
                      type='button'
                      size='sm'
                      onClick={handleLink}
                      disabled={!linkUrl}
                    >
                      Add
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      );
    };

    return (
      <div
        ref={ref}
        className={cn(editorVariants({ mode, size }), className)}
        {...props}
      >
        {renderToolbar()}

        <div className='relative'>
          <EditorContent
            editor={editor}
            className={cn(
              'prose prose-sm max-w-none p-3 min-h-[80px] focus-within:outline-none',
              size === 'sm' && 'prose-xs p-2',
              size === 'lg' && 'prose-base p-4',
              isOverLimit && 'text-destructive'
            )}
          />

          {/* Character count */}
          {showCharacterCount && (
            <div
              className={cn(
                'absolute bottom-2 right-2 text-xs',
                isOverLimit ? 'text-destructive' : 'text-muted-foreground'
              )}
            >
              {characterCount}
              {maxLength && `/${maxLength}`}
            </div>
          )}
        </div>
      </div>
    );
  }
);

TextEditor.displayName = 'TextEditor';

export { TextEditor, editorVariants, toolbarVariants };
