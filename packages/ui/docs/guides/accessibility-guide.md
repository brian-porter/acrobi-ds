# Accessibility Guide

A comprehensive guide to building accessible Progressive Web Apps (PWAs) using the Acrobi Design System. This guide provides practical, production-ready techniques for achieving WCAG 2.1 AA compliance and creating inclusive experiences for all users.

## Overview

Web accessibility ensures that websites and applications are usable by people with disabilities, including users who rely on screen readers, keyboard navigation, voice recognition software, or have visual, auditory, motor, or cognitive impairments. Building accessible PWAs isn't just about compliance—it creates better experiences for everyone and is often required by law.

## Table of Contents

1. [Foundational Accessibility Principles](#foundational-accessibility-principles)
2. [Semantic HTML Foundation](#semantic-html-foundation)
3. [ARIA Implementation Guide](#aria-implementation-guide)
4. [Keyboard Navigation Mastery](#keyboard-navigation-mastery)
5. [Image Accessibility Scenarios](#image-accessibility-scenarios)
6. [Form Accessibility Patterns](#form-accessibility-patterns)
7. [Dynamic Content & Live Regions](#dynamic-content--live-regions)
8. [Color & Visual Accessibility](#color--visual-accessibility)
9. [PWA-Specific Accessibility](#pwa-specific-accessibility)
10. [Accessibility Testing Checklist](#accessibility-testing-checklist)
11. [WCAG 2.1 AA Compliance](#wcag-21-aa-compliance)

## Foundational Accessibility Principles

The Web Content Accessibility Guidelines (WCAG) are built on four foundational principles that all accessible content must satisfy:

### 1. Perceivable
Information and user interface components must be presentable to users in ways they can perceive.

**Key Requirements:**
- **Text alternatives** for non-text content
- **Captions and transcripts** for multimedia
- **Sufficient color contrast** (4.5:1 for normal text, 3:1 for large text)
- **Resizable text** up to 200% without loss of functionality
- **Adaptable content** that can be presented in different ways without losing meaning

**Implementation Example:**
```typescript
// components/perceivable-image.tsx
interface AccessibleImageProps {
  src: string;
  alt: string;
  decorative?: boolean;
  longDescription?: string;
}

export function AccessibleImage({ 
  src, 
  alt, 
  decorative = false, 
  longDescription 
}: AccessibleImageProps) {
  if (decorative) {
    return <img src={src} alt="" role="presentation" aria-hidden="true" />;
  }
  
  return (
    <figure>
      <img 
        src={src} 
        alt={alt}
        aria-describedby={longDescription ? 'img-description' : undefined}
      />
      {longDescription && (
        <figcaption id="img-description">
          {longDescription}
        </figcaption>
      )}
    </figure>
  );
}
```

### 2. Operable
User interface components and navigation must be operable by all users.

**Key Requirements:**
- **Keyboard accessibility** for all interactive elements
- **No seizure triggers** (avoid content that flashes >3 times per second)
- **Sufficient time** for users to read and use content
- **Clear navigation** and wayfinding
- **Input modalities** beyond just mouse/touch

**Implementation Example:**
```typescript
// components/operable-dropdown.tsx
import { useState, useRef, useEffect } from 'react';

export function OperableDropdown({ items, label }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        setIsOpen(!isOpen);
        break;
      case 'ArrowDown':
        event.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else {
          setActiveIndex(prev => 
            prev < items.length - 1 ? prev + 1 : 0
          );
        }
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (isOpen) {
          setActiveIndex(prev => prev > 0 ? prev - 1 : items.length - 1);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        buttonRef.current?.focus();
        break;
    }
  };

  return (
    <div className="dropdown">
      <button
        ref={buttonRef}
        aria-expanded={isOpen}
        aria-controls="dropdown-list"
        aria-haspopup="listbox"
        onKeyDown={handleKeyDown}
        onClick={() => setIsOpen(!isOpen)}
      >
        {label}
      </button>
      
      {isOpen && (
        <ul
          ref={listRef}
          id="dropdown-list"
          role="listbox"
          aria-activedescendant={
            activeIndex >= 0 ? `option-${activeIndex}` : undefined
          }
        >
          {items.map((item, index) => (
            <li
              key={index}
              id={`option-${index}`}
              role="option"
              aria-selected={index === activeIndex}
              className={index === activeIndex ? 'active' : ''}
            >
              {item.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
```

### 3. Understandable
Information and the operation of user interface must be understandable.

**Key Requirements:**
- **Readable text** with clear language
- **Predictable functionality** and layout
- **Input assistance** for forms
- **Error identification** and suggestions
- **Context and instructions** when needed

**Implementation Example:**
```typescript
// components/understandable-form.tsx
import { useState } from 'react';

interface FormErrors {
  [key: string]: string;
}

export function UnderstandableForm() {
  const [errors, setErrors] = useState<FormErrors>({});
  const [showHelp, setShowHelp] = useState<Record<string, boolean>>({});

  const validateField = (name: string, value: string): string | null => {
    switch (name) {
      case 'email':
        if (!value.includes('@')) {
          return 'Email must contain an @ symbol. Example: user@example.com';
        }
        break;
      case 'password':
        if (value.length < 8) {
          return 'Password must be at least 8 characters long for security.';
        }
        if (!/\d/.test(value)) {
          return 'Password must contain at least one number (0-9).';
        }
        break;
    }
    return null;
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const error = validateField(name, value);
    
    setErrors(prev => ({
      ...prev,
      [name]: error || ''
    }));
  };

  return (
    <form aria-describedby="form-instructions">
      <div id="form-instructions">
        <p>
          Complete all required fields marked with *. 
          Click the help (?) button next to each field for detailed instructions.
        </p>
      </div>

      <div className="form-group">
        <label htmlFor="email">
          Email Address *
          <button
            type="button"
            aria-describedby="email-help"
            onClick={() => setShowHelp(prev => ({ ...prev, email: !prev.email }))}
          >
            ?
          </button>
        </label>
        
        <input
          type="email"
          id="email"
          name="email"
          required
          aria-invalid={errors.email ? 'true' : 'false'}
          aria-describedby={`${errors.email ? 'email-error' : ''} ${showHelp.email ? 'email-help' : ''}`}
          onBlur={handleBlur}
        />
        
        {showHelp.email && (
          <div id="email-help" className="help-text">
            Enter your complete email address, like username@company.com. 
            This will be used to send you account updates and notifications.
          </div>
        )}
        
        {errors.email && (
          <div id="email-error" role="alert" className="error-text">
            <strong>Error:</strong> {errors.email}
          </div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="password">
          Password *
          <button
            type="button"
            onClick={() => setShowHelp(prev => ({ ...prev, password: !prev.password }))}
          >
            ?
          </button>
        </label>
        
        <input
          type="password"
          id="password"
          name="password"
          required
          minLength={8}
          aria-invalid={errors.password ? 'true' : 'false'}
          aria-describedby={`${errors.password ? 'password-error' : ''} ${showHelp.password ? 'password-help' : ''}`}
          onBlur={handleBlur}
        />
        
        {showHelp.password && (
          <div id="password-help" className="help-text">
            <strong>Password Requirements:</strong>
            <ul>
              <li>At least 8 characters long</li>
              <li>Must contain at least one number</li>
              <li>Should contain a mix of letters and symbols</li>
            </ul>
          </div>
        )}
        
        {errors.password && (
          <div id="password-error" role="alert" className="error-text">
            <strong>Error:</strong> {errors.password}
          </div>
        )}
      </div>
    </form>
  );
}
```

### 4. Robust
Content must be robust enough that it can be interpreted reliably by a wide variety of user agents, including assistive technologies.

**Key Requirements:**
- **Valid HTML markup** with proper semantics
- **Compatibility** with assistive technologies
- **Progressive enhancement** ensuring core functionality without JavaScript
- **Proper ARIA usage** that doesn't conflict with native semantics

**Implementation Example:**
```typescript
// components/robust-component.tsx
import { useEffect, useRef, useState } from 'react';

// Robust component with progressive enhancement
export function RobustModal({ children, isOpen, onClose, title }) {
  const modalRef = useRef<HTMLDialogElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  // Progressive enhancement: use native dialog when available
  useEffect(() => {
    const modal = modalRef.current;
    if (!modal) return;

    if (isOpen) {
      previousActiveElement.current = document.activeElement as HTMLElement;
      
      // Use native showModal if supported, fallback to custom implementation
      if ('showModal' in modal) {
        modal.showModal();
      } else {
        modal.setAttribute('aria-modal', 'true');
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
      }
      
      // Focus management
      const focusableElements = modal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusableElements.length > 0) {
        (focusableElements[0] as HTMLElement).focus();
      }
    } else {
      if ('close' in modal) {
        modal.close();
      } else {
        modal.style.display = 'none';
        document.body.style.overflow = '';
      }
      
      // Restore focus
      previousActiveElement.current?.focus();
    }
  }, [isOpen]);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose();
    }
  };

  // Fallback for non-JS users
  if (typeof window === 'undefined') {
    return isOpen ? (
      <div className="modal-fallback">
        <div className="modal-content">
          <h2>{title}</h2>
          {children}
          <form method="dialog">
            <button type="submit">Close</button>
          </form>
        </div>
      </div>
    ) : null;
  }

  return (
    <dialog
      ref={modalRef}
      aria-labelledby="modal-title"
      onKeyDown={handleKeyDown}
      onClick={(e) => {
        // Close on backdrop click
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="modal-content">
        <h2 id="modal-title">{title}</h2>
        {children}
        <button onClick={onClose} aria-label="Close dialog">
          ×
        </button>
      </div>
    </dialog>
  );
}
```

## Semantic HTML Foundation

Semantic HTML is the cornerstone of accessibility. Using the right elements provides meaning and structure that assistive technologies can understand and navigate efficiently.

### Document Structure

**✅ Good: Proper Document Structure**
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Page Title - Site Name</title>
</head>
<body>
  <!-- Skip navigation for screen readers -->
  <a href="#main-content" class="skip-link">Skip to main content</a>
  
  <!-- Site header -->
  <header role="banner">
    <h1>Site Name</h1>
    <nav aria-label="Main navigation">
      <ul>
        <li><a href="/" aria-current="page">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
    </nav>
  </header>

  <!-- Main content area -->
  <main id="main-content" role="main">
    <article>
      <header>
        <h1>Article Title</h1>
        <p>
          Published on 
          <time datetime="2025-01-30T10:00:00Z">January 30, 2025 at 10:00 AM</time>
          by <span>Author Name</span>
        </p>
      </header>
      
      <section aria-labelledby="section-1">
        <h2 id="section-1">Section Heading</h2>
        <p>Section content...</p>
      </section>
      
      <aside aria-label="Related information">
        <h3>Related Articles</h3>
        <ul>
          <li><a href="/article-1">Related Article 1</a></li>
          <li><a href="/article-2">Related Article 2</a></li>
        </ul>
      </aside>
    </article>
  </main>

  <!-- Complementary sidebar -->
  <aside role="complementary" aria-label="Sidebar">
    <section aria-labelledby="newsletter">
      <h2 id="newsletter">Newsletter Signup</h2>
      <!-- Newsletter form -->
    </section>
  </aside>

  <!-- Site footer -->
  <footer role="contentinfo">
    <nav aria-label="Footer navigation">
      <ul>
        <li><a href="/privacy">Privacy Policy</a></li>
        <li><a href="/terms">Terms of Service</a></li>
      </ul>
    </nav>
    <p>&copy; 2025 Company Name. All rights reserved.</p>
  </footer>
</body>
</html>
```

**❌ Bad: Generic Div Structure**
```html
<!-- Don't use generic divs for semantic content -->
<div class="header">
  <div class="logo">Site Name</div>
  <div class="navigation">
    <div><a href="/">Home</a></div>
    <div><a href="/about">About</a></div>
  </div>
</div>

<div class="content">
  <div class="title">Page Title</div>
  <div class="text">Content...</div>
</div>
```

### Heading Hierarchy Best Practices

Maintain logical heading hierarchy for screen reader navigation:

```html
<!-- ✅ Good: Logical heading structure -->
<h1>Page Title (only one per page)</h1>
  <h2>Main Section</h2>
    <h3>Subsection</h3>
    <h3>Another Subsection</h3>
      <h4>Sub-subsection</h4>
  <h2>Another Main Section</h2>
    <h3>Subsection</h3>

<!-- ❌ Bad: Broken hierarchy -->
<h1>Page Title</h1>
  <h4>This skips h2 and h3</h4> <!-- Don't skip levels -->
  <h1>Second h1 on same page</h1> <!-- Only one h1 per page -->
```

### Lists and Tables

Use lists for grouped content and tables for tabular data:

```html
<!-- ✅ Good: Proper list usage -->
<h2>Features</h2>
<ul>
  <li>Feature 1: Description of feature</li>
  <li>Feature 2: Description of feature</li>
  <li>Feature 3: Description of feature</li>
</ul>

<h2>Step-by-step Process</h2>
<ol>
  <li>First step: Do this</li>
  <li>Second step: Then do this</li>
  <li>Final step: Complete with this</li>
</ol>

<!-- ✅ Good: Accessible data table -->
<table>
  <caption>Quarterly Revenue by Region</caption>
  <thead>
    <tr>
      <th scope="col">Region</th>
      <th scope="col">Q1 2024</th>
      <th scope="col">Q2 2024</th>
      <th scope="col">Growth</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">North America</th>
      <td>$150,000</td>
      <td>$175,000</td>
      <td>16.7%</td>
    </tr>
    <tr>
      <th scope="row">Europe</th>
      <td>$120,000</td>
      <td>$140,000</td>
      <td>16.7%</td>
    </tr>
  </tbody>
</table>
```

## ARIA Implementation Guide

ARIA (Accessible Rich Internet Applications) attributes enhance HTML semantics when native elements aren't sufficient. Follow the golden rule: **Don't use ARIA if you can use semantic HTML instead**.

### Essential ARIA Patterns

#### ARIA Labels and Descriptions

```typescript
// components/aria-labels.tsx
export function AriaLabelsExample() {
  return (
    <div>
      {/* Use aria-label for elements without visible text */}
      <button aria-label="Close dialog">×</button>
      <input type="search" aria-label="Search products" placeholder="Search..." />
      
      {/* Use aria-labelledby to reference other elements */}
      <section aria-labelledby="billing-heading">
        <h2 id="billing-heading">Billing Information</h2>
        <div>
          <label htmlFor="card-number">Card Number</label>
          <input type="text" id="card-number" />
        </div>
      </section>
      
      {/* Use aria-describedby for additional context */}
      <div>
        <label htmlFor="password">Password</label>
        <input 
          type="password" 
          id="password" 
          aria-describedby="password-help password-error"
          required
        />
        <div id="password-help">
          Must be at least 8 characters with numbers and letters.
        </div>
        <div id="password-error" role="alert" hidden>
          Password is too short.
        </div>
      </div>
    </div>
  );
}
```

#### ARIA States and Properties

```typescript
// components/aria-states.tsx
import { useState } from 'react';

export function CollapsibleSection({ title, children }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const contentId = `content-${Date.now()}`;

  return (
    <div>
      <button
        aria-expanded={isExpanded}
        aria-controls={contentId}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {title}
        <span aria-hidden="true">{isExpanded ? '▼' : '▶'}</span>
      </button>
      
      <div
        id={contentId}
        hidden={!isExpanded}
        aria-hidden={!isExpanded}
      >
        {children}
      </div>
    </div>
  );
}

export function TabInterface({ tabs }) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      <div role="tablist" aria-label="Content sections">
        {tabs.map((tab, index) => (
          <button
            key={index}
            role="tab"
            aria-selected={index === activeTab}
            aria-controls={`panel-${index}`}
            id={`tab-${index}`}
            onClick={() => setActiveTab(index)}
            tabIndex={index === activeTab ? 0 : -1}
          >
            {tab.label}
          </button>
        ))}
      </div>
      
      {tabs.map((tab, index) => (
        <div
          key={index}
          role="tabpanel"
          id={`panel-${index}`}
          aria-labelledby={`tab-${index}`}
          hidden={index !== activeTab}
          tabIndex={0}
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
}
```

#### ARIA Live Regions

```typescript
// components/live-regions.tsx
import { useState, useEffect } from 'react';

export function LiveRegionsExample() {
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    setStatus('Saving changes...');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setStatus('Changes saved successfully');
    } catch (err) {
      setError('Failed to save changes. Please try again.');
    } finally {
      setLoading(false);
      // Clear status after announcement
      setTimeout(() => setStatus(''), 3000);
    }
  };

  return (
    <div>
      {/* Polite announcements for status updates */}
      <div 
        aria-live="polite" 
        aria-atomic="true"
        className="sr-only"
      >
        {status}
      </div>
      
      {/* Assertive announcements for errors */}
      <div 
        aria-live="assertive" 
        aria-atomic="true"
        className="sr-only"
      >
        {error}
      </div>
      
      {/* Visible status messages */}
      {status && <div role="status" className="status-message">{status}</div>}
      {error && <div role="alert" className="error-message">{error}</div>}
      
      <button 
        onClick={handleSubmit}
        disabled={loading}
        aria-busy={loading}
      >
        {loading ? 'Saving...' : 'Save Changes'}
      </button>
    </div>
  );
}
```

### Complex ARIA Patterns

#### Accessible Modal Dialog

```typescript
// components/accessible-modal.tsx
import { useEffect, useRef, useState } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function AccessibleModal({ isOpen, onClose, title, children }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);
  const [focusableElements, setFocusableElements] = useState<HTMLElement[]>([]);

  useEffect(() => {
    if (isOpen) {
      // Store previously focused element
      previousActiveElement.current = document.activeElement as HTMLElement;
      
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
      
      // Get focusable elements
      const modal = modalRef.current;
      if (modal) {
        const focusable = Array.from(
          modal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          )
        ) as HTMLElement[];
        setFocusableElements(focusable);
        
        // Focus first element
        if (focusable.length > 0) {
          focusable[0].focus();
        }
      }
    } else {
      // Restore body scroll
      document.body.style.overflow = '';
      
      // Restore focus
      previousActiveElement.current?.focus();
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose();
      return;
    }

    if (event.key === 'Tab') {
      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="modal-content"
        onKeyDown={handleKeyDown}
      >
        <header className="modal-header">
          <h2 id="modal-title">{title}</h2>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="modal-close"
          >
            ×
          </button>
        </header>
        
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
}
```

## Keyboard Navigation Mastery

Every interactive element must be keyboard accessible. Users should be able to navigate and operate your application using only the keyboard.

### Focus Management Strategies

#### Visible Focus Indicators

```css
/* ✅ Good: High-contrast focus indicators */
:focus {
  outline: 2px solid #005fcc;
  outline-offset: 2px;
}

/* Custom focus styles for better design integration */
.button:focus {
  outline: none;
  box-shadow: 
    0 0 0 2px #ffffff,
    0 0 0 4px #005fcc;
}

/* Focus-visible for mouse vs keyboard users */
.button:focus-visible {
  outline: 2px solid #005fcc;
  outline-offset: 2px;
}

/* Remove focus outline only when using mouse */
.button:focus:not(:focus-visible) {
  outline: none;
}

/* High contrast mode support */
@media (forced-colors: active) {
  .button:focus {
    outline: 2px solid ButtonText;
  }
}

/* Skip links styling */
.skip-link {
  position: absolute;
  top: -40px;
  left: 6px;
  background: #000;
  color: #fff;
  padding: 8px;
  text-decoration: none;
  border-radius: 0 0 4px 4px;
  transition: top 0.3s ease;
  z-index: 1000;
}

.skip-link:focus {
  top: 0;
}
```

#### Advanced Keyboard Navigation

```typescript
// hooks/use-keyboard-navigation.ts
import { useEffect, useRef } from 'react';

interface KeyboardNavigationOptions {
  enableArrowKeys?: boolean;
  enableHomeEnd?: boolean;
  enableTypeAhead?: boolean;
  orientation?: 'horizontal' | 'vertical' | 'both';
}

export function useKeyboardNavigation(
  options: KeyboardNavigationOptions = {}
) {
  const containerRef = useRef<HTMLElement>(null);
  const {
    enableArrowKeys = true,
    enableHomeEnd = true,
    enableTypeAhead = false,
    orientation = 'both'
  } = options;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      const focusableElements = Array.from(
        container.querySelectorAll(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      ) as HTMLElement[];

      if (focusableElements.length === 0) return;

      const currentIndex = focusableElements.indexOf(
        document.activeElement as HTMLElement
      );
      let nextIndex = currentIndex;

      switch (event.key) {
        case 'ArrowDown':
          if (enableArrowKeys && (orientation === 'vertical' || orientation === 'both')) {
            event.preventDefault();
            nextIndex = (currentIndex + 1) % focusableElements.length;
          }
          break;
        case 'ArrowUp':
          if (enableArrowKeys && (orientation === 'vertical' || orientation === 'both')) {
            event.preventDefault();
            nextIndex = (currentIndex - 1 + focusableElements.length) % focusableElements.length;
          }
          break;
        case 'ArrowRight':
          if (enableArrowKeys && (orientation === 'horizontal' || orientation === 'both')) {
            event.preventDefault();
            nextIndex = (currentIndex + 1) % focusableElements.length;
          }
          break;
        case 'ArrowLeft':
          if (enableArrowKeys && (orientation === 'horizontal' || orientation === 'both')) {
            event.preventDefault();
            nextIndex = (currentIndex - 1 + focusableElements.length) % focusableElements.length;
          }
          break;
        case 'Home':
          if (enableHomeEnd) {
            event.preventDefault();
            nextIndex = 0;
          }
          break;
        case 'End':
          if (enableHomeEnd) {
            event.preventDefault();
            nextIndex = focusableElements.length - 1;
          }
          break;
        default:
          if (enableTypeAhead && event.key.length === 1) {
            // Type-ahead functionality
            const searchChar = event.key.toLowerCase();
            const startIndex = (currentIndex + 1) % focusableElements.length;
            
            for (let i = 0; i < focusableElements.length; i++) {
              const element = focusableElements[(startIndex + i) % focusableElements.length];
              const text = element.textContent?.toLowerCase() || '';
              if (text.startsWith(searchChar)) {
                nextIndex = (startIndex + i) % focusableElements.length;
                break;
              }
            }
          }
          break;
      }

      if (nextIndex !== currentIndex && nextIndex >= 0) {
        focusableElements[nextIndex].focus();
      }
    };

    container.addEventListener('keydown', handleKeyDown);
    return () => container.removeEventListener('keydown', handleKeyDown);
  }, [enableArrowKeys, enableHomeEnd, enableTypeAhead, orientation]);

  return containerRef;
}

// Usage example
export function KeyboardNavigableMenu({ items }) {
  const menuRef = useKeyboardNavigation({
    orientation: 'vertical',
    enableTypeAhead: true
  });

  return (
    <ul ref={menuRef} role="menu" aria-label="Main menu">
      {items.map((item, index) => (
        <li key={index} role="none">
          <button 
            role="menuitem"
            onClick={() => item.action()}
            tabIndex={index === 0 ? 0 : -1}
          >
            {item.label}
          </button>
        </li>
      ))}
    </ul>
  );
}
```

### Complex Keyboard Interactions

#### Drag and Drop Alternative

```typescript
// components/accessible-sortable-list.tsx
import { useState } from 'react';

interface SortableItem {
  id: string;
  content: string;
}

export function AccessibleSortableList({ 
  items: initialItems, 
  onReorder 
}: {
  items: SortableItem[];
  onReorder: (items: SortableItem[]) => void;
}) {
  const [items, setItems] = useState(initialItems);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [instructions, setInstructions] = useState('');

  const handleKeyDown = (event: React.KeyboardEvent, index: number) => {
    switch (event.key) {
      case ' ':
      case 'Enter':
        event.preventDefault();
        if (selectedIndex === -1) {
          // Select item for moving
          setSelectedIndex(index);
          setInstructions(`${items[index].content} selected for moving. Use arrow keys to choose new position, Space to confirm, Escape to cancel.`);
        } else if (selectedIndex === index) {
          // Deselect
          setSelectedIndex(-1);
          setInstructions('');
        } else {
          // Move item to new position
          moveItem(selectedIndex, index);
          setSelectedIndex(-1);
          setInstructions(`${items[selectedIndex].content} moved to position ${index + 1}.`);
        }
        break;
        
      case 'ArrowUp':
        if (selectedIndex !== -1) {
          event.preventDefault();
          const newIndex = Math.max(0, index - 1);
          if (newIndex !== index) {
            moveItem(selectedIndex, newIndex);
            document.getElementById(`item-${items[selectedIndex].id}`)?.focus();
          }
        }
        break;
        
      case 'ArrowDown':
        if (selectedIndex !== -1) {
          event.preventDefault();
          const newIndex = Math.min(items.length - 1, index + 1);
          if (newIndex !== index) {
            moveItem(selectedIndex, newIndex);
            document.getElementById(`item-${items[selectedIndex].id}`)?.focus();
          }
        }
        break;
        
      case 'Escape':
        if (selectedIndex !== -1) {
          setSelectedIndex(-1);
          setInstructions('Move cancelled.');
        }
        break;
    }
  };

  const moveItem = (fromIndex: number, toIndex: number) => {
    const newItems = [...items];
    const [movedItem] = newItems.splice(fromIndex, 1);
    newItems.splice(toIndex, 0, movedItem);
    setItems(newItems);
    onReorder(newItems);
  };

  return (
    <div>
      <div 
        aria-live="polite" 
        aria-atomic="true"
        className="sr-only"
      >
        {instructions}
      </div>
      
      <ul 
        role="list" 
        aria-label="Sortable list. Use Space to select items for moving, arrow keys to reposition."
      >
        {items.map((item, index) => (
          <li key={item.id} role="listitem">
            <button
              id={`item-${item.id}`}
              className={`sortable-item ${selectedIndex === index ? 'selected' : ''}`}
              onKeyDown={(e) => handleKeyDown(e, index)}
              aria-describedby="sort-instructions"
            >
              <span className="drag-handle" aria-hidden="true">⋮⋮</span>
              {item.content}
            </button>
          </li>
        ))}
      </ul>
      
      <div id="sort-instructions" className="sr-only">
        To reorder items: Select an item with Space or Enter, use arrow keys to move it, then press Space or Enter to confirm the new position.
      </div>
    </div>
  );
}
```

## Image Accessibility Scenarios

Provide appropriate alternative text based on the image's purpose and context in your application.

### Informative Images

Images that convey important information need descriptive alt text:

```typescript
// components/informative-images.tsx
export function InformativeImages() {
  return (
    <div>
      {/* Chart/Graph Images */}
      <figure>
        <img 
          src="sales-chart.png" 
          alt="Line chart showing 25% increase in sales from Q1 to Q2 2024"
        />
        <figcaption>
          <p>Detailed sales data:</p>
          <ul>
            <li>Q1 2024: $100,000</li>
            <li>Q2 2024: $125,000 (25% increase)</li>
            <li>Trend: Steady growth throughout the quarter</li>
          </ul>
        </figcaption>
      </figure>

      {/* Product Images */}
      <div className="product">
        <img 
          src="laptop.jpg" 
          alt="Silver MacBook Pro 14-inch with M3 chip, showing login screen on display"
        />
        <h3>MacBook Pro 14-inch</h3>
        <p>$1,999.00</p>
      </div>

      {/* Instructional Images */}
      <div className="step">
        <img 
          src="step-1.png" 
          alt="Screenshot showing the blue 'Create Account' button in the top right corner of the homepage"
        />
        <p>Step 1: Click the 'Create Account' button</p>
      </div>
    </div>
  );
}
```

### Decorative Images

Images that are purely decorative should be hidden from screen readers:

```typescript
// components/decorative-images.tsx
export function DecorativeImages() {
  return (
    <div>
      {/* Decorative border/background images */}
      <div className="hero-section">
        <img 
          src="decorative-border.png" 
          alt="" 
          role="presentation"
          className="decorative-border"
        />
        <h1>Welcome to Our Service</h1>
        <p>Transform your business with our solutions</p>
      </div>

      {/* CSS backgrounds are better for decorative images */}
      <div 
        className="hero-bg"
        style={{ backgroundImage: 'url(hero-pattern.svg)' }}
        role="img"
        aria-label="Geometric pattern background"
      >
        <h1>Main Heading</h1>
      </div>

      {/* Decorative icons next to text */}
      <div className="feature">
        <span aria-hidden="true">🚀</span>
        <h3>Fast Performance</h3>
        <p>Lightning-fast loading times</p>
      </div>
    </div>
  );
}
```

### Functional Images

Images that serve as buttons or links need alt text describing their function:

```typescript
// components/functional-images.tsx
export function FunctionalImages() {
  return (
    <div>
      {/* Image as button */}
      <button>
        <img src="print-icon.png" alt="Print this page" />
      </button>

      {/* Better: Icon with text label */}
      <button>
        <img src="print-icon.png" alt="" aria-hidden="true" />
        Print Page
      </button>

      {/* Image as link */}
      <a href="/profile">
        <img 
          src="profile-avatar.jpg" 
          alt="Go to John Smith's profile page"
        />
      </a>

      {/* Logo as home link */}
      <a href="/" aria-label="Return to homepage">
        <img 
          src="company-logo.png" 
          alt="Company Name"
        />
      </a>

      {/* Social media icons */}
      <nav aria-label="Social media links">
        <a href="https://twitter.com/company" aria-label="Follow us on Twitter">
          <img src="twitter-icon.png" alt="" aria-hidden="true" />
        </a>
        <a href="https://facebook.com/company" aria-label="Like us on Facebook">
          <img src="facebook-icon.png" alt="" aria-hidden="true" />
        </a>
      </nav>
    </div>
  );
}
```

### Complex Images with Long Descriptions

```typescript
// components/complex-images.tsx
import { useState } from 'react';

export function ComplexImageWithDescription() {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <figure>
      <img 
        src="complex-chart.png" 
        alt="Pie chart showing website traffic sources: 45% organic search, 25% direct, 20% social media, 10% paid ads"
        aria-describedby="chart-details"
      />
      
      <figcaption>
        <p>Website Traffic Sources - Annual Summary 2024</p>
        <button 
          onClick={() => setShowDetails(!showDetails)}
          aria-expanded={showDetails}
          aria-controls="chart-details"
        >
          {showDetails ? 'Hide' : 'Show'} detailed breakdown
        </button>
      </figcaption>

      {showDetails && (
        <div id="chart-details">
          <h4>Detailed Traffic Analysis</h4>
          <dl>
            <dt>Organic Search (45%)</dt>
            <dd>
              450,000 visitors from search engines. Top keywords: 
              "web development" (150k), "design services" (200k), 
              "consultation" (100k)
            </dd>
            
            <dt>Direct Traffic (25%)</dt>
            <dd>
              250,000 visitors typing URL directly or from bookmarks. 
              Indicates strong brand recognition and repeat visitors.
            </dd>
            
            <dt>Social Media (20%)</dt>
            <dd>
              200,000 visitors from social platforms. Breakdown: 
              LinkedIn (120k), Twitter (50k), Facebook (30k)
            </dd>
            
            <dt>Paid Advertising (10%)</dt>
            <dd>
              100,000 visitors from Google Ads and social media advertising. 
              ROI: $3.50 per dollar spent.
            </dd>
          </dl>
        </div>
      )}
    </figure>
  );
}
```

## Form Accessibility Patterns

Forms are critical interaction points that must be fully accessible. Every form control needs a clear label and appropriate error handling.

### Comprehensive Form Example

```typescript
// components/accessible-form.tsx
import { useState, useId } from 'react';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  notifications: string[];
  agreedToTerms: boolean;
}

interface FormErrors {
  [key: string]: string;
}

export function AccessibleForm() {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    notifications: [],
    agreedToTerms: false
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  // Generate unique IDs for form elements
  const formId = useId();
  const firstNameId = `${formId}-firstName`;
  const lastNameId = `${formId}-lastName`;
  const emailId = `${formId}-email`;
  const phoneId = `${formId}-phone`;
  const passwordId = `${formId}-password`;
  const confirmPasswordId = `${formId}-confirmPassword`;
  const termsId = `${formId}-terms`;

  const validateField = (name: keyof FormData, value: any): string | null => {
    switch (name) {
      case 'firstName':
      case 'lastName':
        if (!value.trim()) {
          return `${name === 'firstName' ? 'First' : 'Last'} name is required`;
        }
        if (value.length < 2) {
          return `${name === 'firstName' ? 'First' : 'Last'} name must be at least 2 characters`;
        }
        break;

      case 'email':
        if (!value.trim()) {
          return 'Email address is required';
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          return 'Please enter a valid email address (example: user@domain.com)';
        }
        break;

      case 'phone':
        if (!value.trim()) {
          return 'Phone number is required';
        }
        if (!/^\+?[\d\s\-\(\)]{10,}$/.test(value)) {
          return 'Please enter a valid phone number (at least 10 digits)';
        }
        break;

      case 'password':
        if (!value) {
          return 'Password is required';
        }
        if (value.length < 8) {
          return 'Password must be at least 8 characters long';
        }
        if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
          return 'Password must contain at least one lowercase letter, one uppercase letter, and one number';
        }
        break;

      case 'confirmPassword':
        if (!value) {
          return 'Please confirm your password';
        }
        if (value !== formData.password) {
          return 'Passwords do not match';
        }
        break;

      case 'agreedToTerms':
        if (!value) {
          return 'You must agree to the terms and conditions to continue';
        }
        break;
    }
    return null;
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value, type, checked } = event.target;
    const fieldValue = type === 'checkbox' ? checked : value;

    setFormData(prev => ({
      ...prev,
      [name]: fieldValue
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
    const fieldValue = type === 'checkbox' ? checked : value;
    const error = validateField(name as keyof FormData, fieldValue);

    if (error) {
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');

    // Validate all fields
    const newErrors: FormErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key as keyof FormData, formData[key as keyof FormData]);
      if (error) {
        newErrors[key] = error;
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setIsSubmitting(false);
      setSubmitStatus(`Form has ${Object.keys(newErrors).length} error(s). Please review and correct.`);
      
      // Focus first error field
      const firstErrorField = Object.keys(newErrors)[0];
      const errorElement = document.getElementById(firstErrorField);
      errorElement?.focus();
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitStatus('Account created successfully! Welcome to our service.');
    } catch (error) {
      setSubmitStatus('Failed to create account. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit}
      aria-describedby="form-instructions"
      noValidate
    >
      <div id="form-instructions">
        <h2>Create Your Account</h2>
        <p>
          Please fill out all required fields marked with an asterisk (*). 
          Your password must be at least 8 characters and contain uppercase, 
          lowercase, and numeric characters.
        </p>
      </div>

      {/* Status messages */}
      <div aria-live="polite" aria-atomic="true">
        {submitStatus && (
          <div 
            role={submitStatus.includes('error') || submitStatus.includes('Failed') ? 'alert' : 'status'}
            className={submitStatus.includes('success') ? 'success-message' : 'error-message'}
          >
            {submitStatus}
          </div>
        )}
      </div>

      {/* Personal Information */}
      <fieldset>
        <legend>Personal Information</legend>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor={firstNameId}>
              First Name *
            </label>
            <input
              type="text"
              id={firstNameId}
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              onBlur={handleBlur}
              required
              aria-invalid={errors.firstName ? 'true' : 'false'}
              aria-describedby={errors.firstName ? `${firstNameId}-error` : undefined}
            />
            {errors.firstName && (
              <div id={`${firstNameId}-error`} role="alert" className="error-text">
                {errors.firstName}
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor={lastNameId}>
              Last Name *
            </label>
            <input
              type="text"
              id={lastNameId}
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              onBlur={handleBlur}
              required
              aria-invalid={errors.lastName ? 'true' : 'false'}
              aria-describedby={errors.lastName ? `${lastNameId}-error` : undefined}
            />
            {errors.lastName && (
              <div id={`${lastNameId}-error`} role="alert" className="error-text">
                {errors.lastName}
              </div>
            )}
          </div>
        </div>
      </fieldset>

      {/* Contact Information */}
      <fieldset>
        <legend>Contact Information</legend>
        
        <div className="form-group">
          <label htmlFor={emailId}>
            Email Address *
          </label>
          <input
            type="email"
            id={emailId}
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            onBlur={handleBlur}
            required
            aria-invalid={errors.email ? 'true' : 'false'}
            aria-describedby={`${emailId}-help ${errors.email ? `${emailId}-error` : ''}`}
            autoComplete="email"
          />
          <div id={`${emailId}-help`} className="help-text">
            We'll use this to send you account updates and notifications.
          </div>
          {errors.email && (
            <div id={`${emailId}-error`} role="alert" className="error-text">
              {errors.email}
            </div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor={phoneId}>
            Phone Number *
          </label>
          <input
            type="tel"
            id={phoneId}
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            onBlur={handleBlur}
            required
            aria-invalid={errors.phone ? 'true' : 'false'}
            aria-describedby={`${phoneId}-help ${errors.phone ? `${phoneId}-error` : ''}`}
            autoComplete="tel"
          />
          <div id={`${phoneId}-help`} className="help-text">
            Include country code if outside the US (e.g., +1-555-123-4567).
          </div>
          {errors.phone && (
            <div id={`${phoneId}-error`} role="alert" className="error-text">
              {errors.phone}
            </div>
          )}
        </div>
      </fieldset>

      {/* Security */}
      <fieldset>
        <legend>Account Security</legend>
        
        <div className="form-group">
          <label htmlFor={passwordId}>
            Password *
          </label>
          <input
            type="password"
            id={passwordId}
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            onBlur={handleBlur}
            required
            minLength={8}
            aria-invalid={errors.password ? 'true' : 'false'}
            aria-describedby={`${passwordId}-requirements ${errors.password ? `${passwordId}-error` : ''}`}
            autoComplete="new-password"
          />
          <div id={`${passwordId}-requirements`} className="help-text">
            <strong>Password requirements:</strong>
            <ul>
              <li>At least 8 characters long</li>
              <li>One uppercase letter (A-Z)</li>
              <li>One lowercase letter (a-z)</li>
              <li>One number (0-9)</li>
            </ul>
          </div>
          {errors.password && (
            <div id={`${passwordId}-error`} role="alert" className="error-text">
              {errors.password}
            </div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor={confirmPasswordId}>
            Confirm Password *
          </label>
          <input
            type="password"
            id={confirmPasswordId}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            onBlur={handleBlur}
            required
            aria-invalid={errors.confirmPassword ? 'true' : 'false'}
            aria-describedby={errors.confirmPassword ? `${confirmPasswordId}-error` : undefined}
            autoComplete="new-password"
          />
          {errors.confirmPassword && (
            <div id={`${confirmPasswordId}-error`} role="alert" className="error-text">
              {errors.confirmPassword}
            </div>
          )}
        </div>
      </fieldset>

      {/* Terms and Conditions */}
      <fieldset>
        <legend>Terms and Conditions</legend>
        
        <div className="form-group">
          <input
            type="checkbox"
            id={termsId}
            name="agreedToTerms"
            checked={formData.agreedToTerms}
            onChange={handleInputChange}
            onBlur={handleBlur}
            required
            aria-invalid={errors.agreedToTerms ? 'true' : 'false'}
            aria-describedby={`${termsId}-description ${errors.agreedToTerms ? `${termsId}-error` : ''}`}
          />
          <label htmlFor={termsId}>
            I agree to the Terms of Service and Privacy Policy *
          </label>
          <div id={`${termsId}-description`} className="help-text">
            Please read our <a href="/terms" target="_blank">Terms of Service</a> and{' '}
            <a href="/privacy" target="_blank">Privacy Policy</a> before agreeing.
          </div>
          {errors.agreedToTerms && (
            <div id={`${termsId}-error`} role="alert" className="error-text">
              {errors.agreedToTerms}
            </div>
          )}
        </div>
      </fieldset>

      {/* Submit Button */}
      <div className="form-actions">
        <button
          type="submit"
          disabled={isSubmitting}
          aria-busy={isSubmitting}
        >
          {isSubmitting ? 'Creating Account...' : 'Create Account'}
        </button>
      </div>
    </form>
  );
}
```

## Dynamic Content & Live Regions

Keep users informed about changes to dynamic content using ARIA live regions and proper focus management.

### Live Region Implementation

```typescript
// components/live-region-manager.tsx
import { createContext, useContext, useState, useCallback } from 'react';

interface LiveRegionContextType {
  announcePolite: (message: string) => void;
  announceAssertive: (message: string) => void;
  announceStatus: (message: string) => void;
}

const LiveRegionContext = createContext<LiveRegionContextType | null>(null);

export function LiveRegionProvider({ children }: { children: React.ReactNode }) {
  const [politeMessage, setPoliteMessage] = useState('');
  const [assertiveMessage, setAssertiveMessage] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  const announcePolite = useCallback((message: string) => {
    setPoliteMessage(message);
    // Clear after announcement to avoid repetition
    setTimeout(() => setPoliteMessage(''), 1000);
  }, []);

  const announceAssertive = useCallback((message: string) => {
    setAssertiveMessage(message);
    setTimeout(() => setAssertiveMessage(''), 1000);
  }, []);

  const announceStatus = useCallback((message: string) => {
    setStatusMessage(message);
    setTimeout(() => setStatusMessage(''), 5000);
  }, []);

  const contextValue = {
    announcePolite,
    announceAssertive,
    announceStatus
  };

  return (
    <LiveRegionContext.Provider value={contextValue}>
      {children}
      
      {/* Live regions for screen reader announcements */}
      <div 
        aria-live="polite" 
        aria-atomic="true"
        className="sr-only"
      >
        {politeMessage}
      </div>
      
      <div 
        aria-live="assertive" 
        aria-atomic="true"
        className="sr-only"
      >
        {assertiveMessage}
      </div>
      
      <div 
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {statusMessage}
      </div>
    </LiveRegionContext.Provider>
  );
}

export function useLiveRegion() {
  const context = useContext(LiveRegionContext);
  if (!context) {
    throw new Error('useLiveRegion must be used within a LiveRegionProvider');
  }
  return context;
}

// Usage example
export function SearchWithLiveUpdates() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const { announcePolite, announceAssertive } = useLiveRegion();

  const performSearch = async (searchQuery: string) => {
    if (searchQuery.length < 2) {
      setResults([]);
      return;
    }

    setLoading(true);
    announcePolite('Searching...');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      const mockResults = [
        { id: 1, title: 'Result 1', description: 'Description 1' },
        { id: 2, title: 'Result 2', description: 'Description 2' }
      ];
      
      setResults(mockResults);
      announcePolite(`${mockResults.length} results found for "${searchQuery}"`);
    } catch (error) {
      announceAssertive('Search failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <label htmlFor="search-input">Search Products</label>
      <input
        id="search-input"
        type="search"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          performSearch(e.target.value);
        }}
        aria-describedby="search-instructions"
      />
      <div id="search-instructions">
        Type at least 2 characters to search. Results will be announced.
      </div>

      <div role="region" aria-label="Search results" aria-busy={loading}>
        {loading && <div>Searching...</div>}
        {results.length > 0 && (
          <ul>
            {results.map(result => (
              <li key={result.id}>
                <h3>{result.title}</h3>
                <p>{result.description}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
```

### Accessible Toast Notifications

```typescript
// components/accessible-toast.tsx
import { useState, useEffect, createContext, useContext } from 'react';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

interface ToastContextType {
  showToast: (toast: Omit<Toast, 'id'>) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (toast: Omit<Toast, 'id'>) => {
    const id = Date.now().toString();
    const newToast = { ...toast, id };
    
    setToasts(prev => [...prev, newToast]);

    // Auto-remove toast
    const duration = toast.duration || (toast.type === 'error' ? 8000 : 5000);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, duration);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      
      <div 
        className="toast-container"
        aria-live="assertive"
        aria-atomic="false"
        role="region"
        aria-label="Notifications"
      >
        {toasts.map(toast => (
          <div
            key={toast.id}
            className={`toast toast-${toast.type}`}
            role={toast.type === 'error' ? 'alert' : 'status'}
            aria-describedby={`toast-${toast.id}-message`}
          >
            <div id={`toast-${toast.id}-message`} className="toast-message">
              {toast.message}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              aria-label={`Close ${toast.type} notification: ${toast.message}`}
              className="toast-close"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

// Usage example
export function ToastExample() {
  const { showToast } = useToast();

  return (
    <div>
      <button onClick={() => showToast({ 
        message: 'Settings saved successfully!', 
        type: 'success' 
      })}>
        Show Success Toast
      </button>
      
      <button onClick={() => showToast({ 
        message: 'Error: Failed to save settings. Please try again.', 
        type: 'error' 
      })}>
        Show Error Toast
      </button>
    </div>
  );
}
```

## Color & Visual Accessibility

Ensure your application is accessible to users with various visual impairments, including color blindness and low vision.

### Color Contrast Requirements

```css
/* WCAG 2.1 AA Color Contrast Requirements */

/* Normal text: 4.5:1 contrast ratio minimum */
.text-normal {
  color: #212529; /* Dark gray on white background = 16.75:1 ratio ✅ */
  background-color: #ffffff;
}

/* Large text (18pt+): 3:1 contrast ratio minimum */
.text-large {
  font-size: 1.5rem; /* 24px = 18pt */
  color: #495057; /* Medium gray = 9.37:1 ratio ✅ */
  background-color: #ffffff;
}

/* Interactive elements: 3:1 for non-text elements */
.button-primary {
  background-color: #0056b3; /* 7.5:1 ratio ✅ */
  color: #ffffff;
  border: 2px solid #004494; /* 3:1 ratio for border ✅ */
}

.button-primary:focus {
  outline: 2px solid #0056b3;
  outline-offset: 2px;
  /* Focus indicator has 3:1 contrast against background */
}

/* Error states with sufficient contrast */
.error-text {
  color: #dc3545; /* 4.5:1 ratio against white ✅ */
}

.error-border {
  border: 2px solid #dc3545;
}

/* Success states */
.success-text {
  color: #28a745; /* 4.5:1 ratio against white ✅ */
}

/* Warning states */
.warning-text {
  color: #856404; /* 4.5:1 ratio against white ✅ */
  background-color: #fff3cd;
}
```

### Color-Independent Information

```typescript
// components/color-independent-design.tsx
export function ColorIndependentDesign() {
  return (
    <div>
      {/* ✅ Good: Status indicated by color, icon, and text */}
      <div className="status-list">
        <div className="status-item status-success">
          <span className="status-icon" aria-hidden="true">✓</span>
          <span className="status-text">Completed</span>
        </div>
        <div className="status-item status-warning">
          <span className="status-icon" aria-hidden="true">⚠</span>
          <span className="status-text">Pending Review</span>
        </div>
        <div className="status-item status-error">
          <span className="status-icon" aria-hidden="true">✗</span>
          <span className="status-text">Failed</span>
        </div>
      </div>

      {/* ✅ Good: Form validation with multiple indicators */}
      <div className="form-group">
        <label htmlFor="email">Email Address *</label>
        <input 
          type="email" 
          id="email" 
          className="input-error"
          aria-invalid="true"
          aria-describedby="email-error"
        />
        <div id="email-error" className="error-message" role="alert">
          <span className="error-icon" aria-hidden="true">⚠</span>
          <strong>Error:</strong> Please enter a valid email address
        </div>
      </div>

      {/* ✅ Good: Chart with patterns and labels */}
      <div className="chart-legend">
        <div className="legend-item">
          <span className="legend-color legend-blue" aria-hidden="true"></span>
          <span className="legend-pattern legend-solid" aria-hidden="true"></span>
          <span>Sales (Solid blue)</span>
        </div>
        <div className="legend-item">
          <span className="legend-color legend-green" aria-hidden="true"></span>
          <span className="legend-pattern legend-striped" aria-hidden="true"></span>
          <span>Profits (Striped green)</span>
        </div>
      </div>

      {/* ❌ Bad: Status indicated by color only */}
      <div className="bad-example" style={{ display: 'none' }}>
        <div style={{ color: 'green' }}>Success</div>
        <div style={{ color: 'red' }}>Error</div>
        <div style={{ color: 'orange' }}>Warning</div>
      </div>
    </div>
  );
}
```

### High Contrast and Dark Mode Support

```css
/* High contrast mode support */
@media (forced-colors: active) {
  .button {
    border: 1px solid ButtonText;
  }
  
  .button:focus {
    outline: 2px solid Highlight;
  }
  
  .icon {
    forced-color-adjust: auto;
  }
}

/* Prefers reduced motion */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

/* Dark mode with accessible colors */
@media (prefers-color-scheme: dark) {
  :root {
    --text-primary: #e9ecef;     /* 14.8:1 ratio on dark bg */
    --text-secondary: #adb5bd;   /* 7.6:1 ratio on dark bg */
    --bg-primary: #212529;
    --bg-secondary: #343a40;
    --accent-primary: #4dabf7;   /* 6.3:1 ratio on dark bg */
    --error-color: #ff6b6b;      /* 4.9:1 ratio on dark bg */
    --success-color: #51cf66;    /* 6.8:1 ratio on dark bg */
  }
  
  body {
    background-color: var(--bg-primary);
    color: var(--text-primary);
  }
  
  .button-primary {
    background-color: var(--accent-primary);
    color: var(--bg-primary);
  }
}

/* Support for prefers-contrast */
@media (prefers-contrast: high) {
  :root {
    --text-primary: #000000;
    --bg-primary: #ffffff;
    --accent-primary: #0000ff;
  }
  
  .button {
    border: 2px solid;
  }
  
  .button:focus {
    outline: 3px solid;
  }
}
```

## PWA-Specific Accessibility

Progressive Web Apps have unique accessibility considerations for installation, offline functionality, and app-like behaviors.

### Accessible Installation Flow

```typescript
// components/pwa-install.tsx
import { useState, useEffect } from 'react';

export function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallButton, setShowInstallButton] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);
  const [installStatus, setInstallStatus] = useState('');

  useEffect(() => {
    const handleBeforeInstallPrompt = (event: Event) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      event.preventDefault();
      setDeferredPrompt(event);
      setShowInstallButton(true);
    };

    const handleAppInstalled = () => {
      setInstallStatus('App installed successfully! You can now find it in your app drawer or home screen.');
      setShowInstallButton(false);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    setIsInstalling(true);
    setInstallStatus('Preparing installation...');

    try {
      // Show the install prompt
      deferredPrompt.prompt();
      
      // Wait for the user to respond to the prompt
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        setInstallStatus('Installation accepted. Installing app...');
      } else {
        setInstallStatus('Installation cancelled.');
        setIsInstalling(false);
      }
      
      setDeferredPrompt(null);
    } catch (error) {
      setInstallStatus('Installation failed. Please try again.');
      setIsInstalling(false);
    }
  };

  if (!showInstallButton) return null;

  return (
    <div className="install-prompt" role="region" aria-labelledby="install-heading">
      <h3 id="install-heading">Install Our App</h3>
      <p>
        Get a better experience by installing our app. It will open faster 
        and work offline.
      </p>
      
      {/* Status announcements */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {installStatus}
      </div>
      
      {installStatus && (
        <div 
          role="status" 
          className="install-status"
          aria-describedby="install-status-desc"
        >
          {installStatus}
        </div>
      )}
      
      <div className="install-actions">
        <button
          onClick={handleInstall}
          disabled={isInstalling}
          aria-busy={isInstalling}
          aria-describedby="install-button-desc"
        >
          {isInstalling ? 'Installing...' : 'Install App'}
        </button>
        
        <button
          onClick={() => setShowInstallButton(false)}
          disabled={isInstalling}
          aria-label="Dismiss installation prompt"
        >
          Not Now
        </button>
      </div>
      
      <div id="install-button-desc" className="sr-only">
        Clicking install will prompt you to add this app to your device's home screen.
      </div>
    </div>
  );
}
```

### Offline Experience Accessibility

```typescript
// components/offline-indicator.tsx
import { useState, useEffect } from 'react';

export function OfflineIndicator() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showOfflineMessage, setShowOfflineMessage] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowOfflineMessage(false);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowOfflineMessage(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <>
      {/* Screen reader announcements */}
      <div aria-live="assertive" aria-atomic="true" className="sr-only">
        {!isOnline && 'You are now offline. Some features may be limited.'}
        {isOnline && showOfflineMessage && 'You are back online. All features are now available.'}
      </div>

      {/* Visual indicator */}
      {!isOnline && (
        <div 
          role="alert"
          className="offline-banner"
          aria-describedby="offline-description"
        >
          <span className="offline-icon" aria-hidden="true">📶</span>
          <div>
            <strong>You're offline</strong>
            <div id="offline-description">
              You can still browse previously loaded content. 
              New content will sync when you're back online.
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// Accessible offline page
export function OfflinePage() {
  const [lastVisitedPages, setLastVisitedPages] = useState<string[]>([]);

  useEffect(() => {
    // Get cached pages from service worker
    if ('serviceWorker' in navigator && 'caches' in window) {
      caches.open('pages-cache').then(cache => {
        cache.keys().then(requests => {
          const pages = requests
            .map(req => req.url)
            .filter(url => url.includes('/pages/'))
            .slice(0, 5);
          setLastVisitedPages(pages);
        });
      });
    }
  }, []);

  return (
    <main>
      <h1>You're Offline</h1>
      <p>
        You're not connected to the internet right now. Here's what you can do:
      </p>

      <section aria-labelledby="cached-content">
        <h2 id="cached-content">Available Offline Content</h2>
        {lastVisitedPages.length > 0 ? (
          <ul>
            {lastVisitedPages.map((page, index) => (
              <li key={index}>
                <a href={page}>
                  {page.split('/').pop()?.replace(/-/g, ' ') || 'Cached Page'}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p>No cached content available. Visit some pages while online to access them offline.</p>
        )}
      </section>

      <section aria-labelledby="offline-tips">
        <h2 id="offline-tips">Offline Tips</h2>
        <ul>
          <li>Check your internet connection</li>
          <li>Try refreshing the page once you're back online</li>
          <li>Use your browser's back button to return to previously loaded pages</li>
        </ul>
      </section>

      <div className="connection-status" aria-live="polite">
        <button 
          onClick={() => window.location.reload()}
          aria-describedby="retry-description"
        >
          Try Again
        </button>
        <div id="retry-description" className="help-text">
          This will attempt to reload the page when you're back online.
        </div>
      </div>
    </main>
  );
}
```

## Accessibility Testing Checklist

Use this comprehensive checklist to ensure your PWA meets WCAG 2.1 AA standards:

### Automated Testing Tools

#### 1. **Lighthouse Accessibility Audit**
- [ ] Run Lighthouse audit on all major pages
- [ ] Achieve accessibility score of 95+ (aim for 100)
- [ ] Address all flagged accessibility issues
- [ ] Test both desktop and mobile versions
- [ ] Include audit in CI/CD pipeline

```bash
# Command line Lighthouse audit
npx lighthouse https://your-app.com --only-categories=accessibility --chrome-flags="--headless"

# With custom output
npx lighthouse https://your-app.com --only-categories=accessibility --output=html --output-path=./accessibility-report.html
```

#### 2. **axe-core Integration**
- [ ] Install axe DevTools browser extension
- [ ] Run automated scans on all page templates
- [ ] Fix all violations (no Level A/AA exceptions)
- [ ] Test dynamic content and single-page app routes
- [ ] Integrate axe-core into automated testing

```javascript
// Jest + axe-core testing
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

test('should not have accessibility violations', async () => {
  const { container } = render(<YourComponent />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

#### 3. **WAVE Web Accessibility Evaluator**
- [ ] Use WAVE browser extension on live pages
- [ ] Review all errors, alerts, and structural issues
- [ ] Verify proper heading structure and landmarks
- [ ] Check form labels and ARIA usage
- [ ] Test with different themes/modes

### Manual Testing Requirements

#### 4. **Keyboard Navigation Testing**
- [ ] **Tab Order**: Navigate entire page using only Tab/Shift+Tab
- [ ] **Focus Visibility**: All focused elements have clear visual indicators
- [ ] **Skip Links**: Skip navigation links work and are properly positioned
- [ ] **Modal Focus**: Dialogs trap focus and return to trigger element
- [ ] **Dropdown Navigation**: Arrow keys work in menus and selects
- [ ] **Custom Components**: All interactive elements respond to appropriate keys
- [ ] **Escape Functionality**: Escape key closes dialogs and cancels actions

```typescript
// Keyboard testing checklist component
export function KeyboardTestingPage() {
  return (
    <div>
      <a href="#main" className="skip-link">Skip to main content</a>
      
      <nav>
        <button>Menu</button>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
        </ul>
      </nav>
      
      <main id="main">
        <h1>Keyboard Testing Page</h1>
        
        <form>
          <input type="text" placeholder="Test tab order" />
          <select>
            <option>Test option</option>
          </select>
          <button type="submit">Submit</button>
        </form>
        
        <button onClick={() => alert('Modal would open')}>
          Open Modal
        </button>
      </main>
    </div>
  );
}
```

#### 5. **Screen Reader Testing**
- [ ] **Windows**: Test with NVDA (free) or JAWS
- [ ] **macOS**: Test with VoiceOver (built-in)
- [ ] **Mobile**: Test with TalkBack (Android) or VoiceOver (iOS)
- [ ] **Page Structure**: Verify logical reading order and navigation
- [ ] **Images**: Confirm appropriate alt text announcement
- [ ] **Forms**: Check label association and error announcements
- [ ] **Dynamic Content**: Verify live region announcements

#### 6. **Visual Accessibility Testing**
- [ ] **Text Zoom**: Increase text size to 200% without horizontal scrolling
- [ ] **Browser Zoom**: Test up to 400% zoom level functionality
- [ ] **Color Contrast**: Use tools to verify 4.5:1 (normal) and 3:1 (large text) ratios
- [ ] **Color Blindness**: Test with color blindness simulators
- [ ] **High Contrast Mode**: Verify functionality in OS high contrast mode
- [ ] **Dark Mode**: Test dark theme accessibility if supported

```css
/* Testing different visual conditions */
@media (prefers-reduced-motion: reduce) {
  .animation-test {
    animation: none;
  }
}

@media (prefers-contrast: high) {
  .contrast-test {
    border: 2px solid;
  }
}

@media (forced-colors: active) {
  .forced-colors-test {
    forced-color-adjust: none;
    background-color: ButtonFace;
    color: ButtonText;
  }
}
```

### Content and Structure Validation

#### 7. **HTML Semantic Structure**
- [ ] **Document Outline**: Logical heading hierarchy (h1-h6)
- [ ] **Landmarks**: Proper use of header, nav, main, aside, footer
- [ ] **Lists**: Related items grouped in ul/ol elements
- [ ] **Tables**: Data tables have proper headers and captions
- [ ] **Forms**: All form controls have associated labels
- [ ] **Links**: Link text is descriptive and unique

#### 8. **ARIA Implementation**
- [ ] **ARIA Labels**: Used appropriately without overriding native semantics
- [ ] **Live Regions**: Dynamic content updates are announced
- [ ] **States and Properties**: aria-expanded, aria-selected, etc. are updated
- [ ] **Custom Roles**: Complex widgets use appropriate ARIA patterns
- [ ] **Hidden Content**: Decorative elements use aria-hidden="true"

### Form Accessibility Validation

#### 9. **Form Testing Checklist**
- [ ] **Label Association**: Every input has a properly associated label
- [ ] **Required Fields**: Clearly marked and programmatically identified
- [ ] **Error Messages**: Descriptive, linked to fields, and announced
- [ ] **Field Groups**: Related fields grouped with fieldset/legend
- [ ] **Help Text**: Additional instructions linked with aria-describedby
- [ ] **Validation Timing**: Real-time validation doesn't interrupt users
- [ ] **Success Messages**: Form submission feedback is accessible

### PWA-Specific Testing

#### 10. **Progressive Web App Features**
- [ ] **Installation**: Install prompt is keyboard accessible
- [ ] **Offline Functionality**: Offline pages are accessible
- [ ] **Network Status**: Connection changes are announced
- [ ] **App Updates**: Update notifications are accessible
- [ ] **Full-Screen Mode**: Navigation remains accessible
- [ ] **Push Notifications**: Accessible and not intrusive

### Performance Impact on Accessibility

#### 11. **Performance Considerations**
- [ ] **Loading States**: Accessible loading indicators and skeleton screens
- [ ] **Large Content**: Pagination or virtual scrolling with proper announcements
- [ ] **Lazy Loading**: Images and content load accessibly
- [ ] **Focus Management**: No focus loss during dynamic loading
- [ ] **Animation Performance**: Smooth animations that respect prefers-reduced-motion

## WCAG 2.1 AA Compliance

Ensure full compliance with Web Content Accessibility Guidelines 2.1 Level AA standards.

### Level A Requirements (Must Pass)

#### Perceivable
- **1.1.1 Non-text Content**: All images have appropriate alt text
- **1.2.1 Audio-only and Video-only**: Transcripts for audio-only content
- **1.2.2 Captions**: Captions for all video content
- **1.2.3 Audio Description or Media Alternative**: Audio descriptions for video
- **1.3.1 Info and Relationships**: Structure conveyed programmatically
- **1.3.2 Meaningful Sequence**: Content order makes sense
- **1.3.3 Sensory Characteristics**: Instructions don't rely solely on sensory characteristics
- **1.4.1 Use of Color**: Information not conveyed by color alone
- **1.4.2 Audio Control**: Auto-playing audio can be controlled

#### Operable
- **2.1.1 Keyboard**: All functionality available via keyboard
- **2.1.2 No Keyboard Trap**: Focus can move away from all components
- **2.1.4 Character Key Shortcuts**: Single character shortcuts can be remapped
- **2.2.1 Timing Adjustable**: Time limits can be adjusted
- **2.2.2 Pause, Stop, Hide**: Moving content can be controlled
- **2.3.1 Three Flashes or Below Threshold**: No content flashes more than 3 times per second
- **2.4.1 Bypass Blocks**: Skip navigation mechanism available
- **2.4.2 Page Titled**: Pages have descriptive titles
- **2.4.3 Focus Order**: Focus order is logical
- **2.4.4 Link Purpose**: Link purpose clear from text or context

#### Understandable
- **3.1.1 Language of Page**: Page language is specified
- **3.2.1 On Focus**: No context change on focus
- **3.2.2 On Input**: No context change on input
- **3.3.1 Error Identification**: Errors are identified
- **3.3.2 Labels or Instructions**: Form elements have labels

#### Robust
- **4.1.1 Parsing**: Valid HTML markup
- **4.1.2 Name, Role, Value**: UI components have accessible names and roles

### Level AA Requirements (Must Pass)

#### Perceivable
- **1.2.4 Captions (Live)**: Live captions for live video
- **1.2.5 Audio Description**: Audio descriptions for video content
- **1.4.3 Contrast (Minimum)**: 4.5:1 contrast ratio for normal text, 3:1 for large text
- **1.4.4 Resize text**: Text can be resized to 200% without assistive technology
- **1.4.5 Images of Text**: Avoid images of text when possible

#### Operable
- **2.4.5 Multiple Ways**: Multiple ways to find pages
- **2.4.6 Headings and Labels**: Headings and labels are descriptive
- **2.4.7 Focus Visible**: Keyboard focus is visible

#### Understandable
- **3.1.2 Language of Parts**: Language changes are identified
- **3.2.3 Consistent Navigation**: Navigation is consistent
- **3.2.4 Consistent Identification**: Components are identified consistently
- **3.3.3 Error Suggestion**: Error suggestions provided when possible
- **3.3.4 Error Prevention**: Important submissions are confirmed or reversible

### WCAG 2.1 Compliance Checklist

```typescript
// WCAG compliance validation component
export function WCAGComplianceChecker() {
  const [complianceChecklist, setComplianceChecklist] = useState({
    // Level A - Perceivable
    'non-text-content': false,
    'captions': false,
    'info-relationships': false,
    'meaningful-sequence': false,
    'sensory-characteristics': false,
    'use-of-color': false,
    'audio-control': false,

    // Level A - Operable
    'keyboard': false,
    'no-keyboard-trap': false,
    'timing-adjustable': false,
    'pause-stop-hide': false,
    'three-flashes': false,
    'bypass-blocks': false,
    'page-titled': false,
    'focus-order': false,
    'link-purpose': false,

    // Level A - Understandable
    'language-of-page': false,
    'on-focus': false,
    'on-input': false,
    'error-identification': false,
    'labels-instructions': false,

    // Level A - Robust
    'parsing': false,
    'name-role-value': false,

    // Level AA - Perceivable
    'captions-live': false,
    'audio-description': false,
    'contrast-minimum': false,
    'resize-text': false,
    'images-of-text': false,

    // Level AA - Operable
    'multiple-ways': false,
    'headings-labels': false,
    'focus-visible': false,

    // Level AA - Understandable
    'language-of-parts': false,
    'consistent-navigation': false,
    'consistent-identification': false,
    'error-suggestion': false,
    'error-prevention': false
  });

  const levelARequirements = [
    'non-text-content', 'captions', 'info-relationships', 'meaningful-sequence',
    'sensory-characteristics', 'use-of-color', 'audio-control', 'keyboard',
    'no-keyboard-trap', 'timing-adjustable', 'pause-stop-hide', 'three-flashes',
    'bypass-blocks', 'page-titled', 'focus-order', 'link-purpose',
    'language-of-page', 'on-focus', 'on-input', 'error-identification',
    'labels-instructions', 'parsing', 'name-role-value'
  ];

  const levelAARequirements = [
    'captions-live', 'audio-description', 'contrast-minimum', 'resize-text',
    'images-of-text', 'multiple-ways', 'headings-labels', 'focus-visible',
    'language-of-parts', 'consistent-navigation', 'consistent-identification',
    'error-suggestion', 'error-prevention'
  ];

  const calculateCompliance = () => {
    const levelACompliance = levelARequirements.every(req => complianceChecklist[req]);
    const levelAACompliance = levelAARequirements.every(req => complianceChecklist[req]);
    
    return {
      levelA: levelACompliance,
      levelAA: levelACompliance && levelAACompliance,
      totalScore: Object.values(complianceChecklist).filter(Boolean).length,
      maxScore: Object.keys(complianceChecklist).length
    };
  };

  const compliance = calculateCompliance();

  return (
    <div className="wcag-compliance-checker">
      <h2>WCAG 2.1 Compliance Status</h2>
      
      <div className="compliance-summary">
        <div className={`compliance-badge ${compliance.levelA ? 'pass' : 'fail'}`}>
          Level A: {compliance.levelA ? 'PASS' : 'FAIL'}
        </div>
        <div className={`compliance-badge ${compliance.levelAA ? 'pass' : 'fail'}`}>
          Level AA: {compliance.levelAA ? 'PASS' : 'FAIL'}
        </div>
        <div className="compliance-score">
          Score: {compliance.totalScore}/{compliance.maxScore}
        </div>
      </div>

      <details>
        <summary>Level A Requirements ({levelARequirements.length})</summary>
        <ul>
          {levelARequirements.map(req => (
            <li key={req} className={complianceChecklist[req] ? 'pass' : 'fail'}>
              <input
                type="checkbox"
                checked={complianceChecklist[req]}
                onChange={(e) => setComplianceChecklist(prev => ({
                  ...prev,
                  [req]: e.target.checked
                }))}
              />
              <label>{req.replace(/-/g, ' ').toUpperCase()}</label>
            </li>
          ))}
        </ul>
      </details>

      <details>
        <summary>Level AA Requirements ({levelAARequirements.length})</summary>
        <ul>
          {levelAARequirements.map(req => (
            <li key={req} className={complianceChecklist[req] ? 'pass' : 'fail'}>
              <input
                type="checkbox"
                checked={complianceChecklist[req]}
                onChange={(e) => setComplianceChecklist(prev => ({
                  ...prev,
                  [req]: e.target.checked
                }))}
              />
              <label>{req.replace(/-/g, ' ').toUpperCase()}</label>
            </li>
          ))}
        </ul>
      </details>
    </div>
  );
}
```

### Compliance Testing Script

```javascript
// automated WCAG testing script
const puppeteer = require('puppeteer');
const axe = require('axe-core');

async function testWCAGCompliance(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  await page.goto(url);
  
  // Inject axe-core
  await page.addScriptTag({
    path: require.resolve('axe-core')
  });
  
  // Run accessibility tests
  const results = await page.evaluate(() => {
    return axe.run({
      tags: ['wcag2a', 'wcag2aa', 'wcag21aa']
    });
  });
  
  console.log(`Found ${results.violations.length} accessibility violations:`);
  
  results.violations.forEach(violation => {
    console.log(`\n${violation.id}: ${violation.description}`);
    console.log(`Impact: ${violation.impact}`);
    console.log(`Tags: ${violation.tags.join(', ')}`);
    console.log(`Elements affected: ${violation.nodes.length}`);
  });
  
  await browser.close();
  
  return {
    passed: results.violations.length === 0,
    violations: results.violations,
    passes: results.passes
  };
}

// Usage
testWCAGCompliance('https://your-app.com').then(results => {
  if (results.passed) {
    console.log('✅ All WCAG tests passed!');
  } else {
    console.log('❌ WCAG violations found. Please fix before deployment.');
    process.exit(1);
  }
});
```

## Related Resources

### Internal Documentation
- [Security Best Practices](./security-guide) - Security considerations for accessible apps
- [Performance Optimization](./performance-guide) - Performance impact on accessibility
- [Service Worker Guide](./service-worker-guide) - Accessible offline experiences

### External Accessibility Resources
- **WCAG 2.1 Guidelines**: https://www.w3.org/WAI/WCAG21/quickref/
- **WebAIM Resources**: https://webaim.org/
- **The A11Y Project**: https://www.a11yproject.com/
- **MDN Accessibility**: https://developer.mozilla.org/en-US/docs/Web/Accessibility
- **Inclusive Design Principles**: https://inclusivedesignprinciples.org/

### Testing Tools and Resources
- **Lighthouse**: Built into Chrome DevTools for automated accessibility auditing
- **axe DevTools**: Browser extension for comprehensive accessibility testing
- **WAVE**: Web accessibility evaluation tool with visual feedback
- **Color Oracle**: Free color blindness simulator
- **NoCoffee**: Chrome extension for vision impairment simulation

### Screen Readers for Testing
- **NVDA** (Windows): Free, widely-used screen reader
- **JAWS** (Windows): Professional screen reader (paid)
- **VoiceOver** (macOS/iOS): Built into Apple devices
- **TalkBack** (Android): Built into Android devices

Building accessible PWAs ensures that your applications work for everyone, regardless of their abilities or the technologies they use to access the web. Accessibility is not just about compliance—it's about creating inclusive experiences that benefit all users.

Remember: Start with semantic HTML, enhance with ARIA when necessary, ensure keyboard accessibility, test thoroughly, and always keep real users in mind throughout the development process.