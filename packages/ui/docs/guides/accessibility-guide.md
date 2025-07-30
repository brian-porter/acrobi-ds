# Accessibility Guide

A comprehensive guide to building accessible Progressive Web Apps (PWAs) that meet WCAG 2.1 AA standards. This guide provides practical examples and best practices for creating inclusive experiences using the Acrobi Design System.

## Overview

Web accessibility ensures that websites and applications are usable by people with disabilities. This includes users who rely on screen readers, keyboard navigation, voice recognition software, or have visual, auditory, motor, or cognitive impairments. Building accessible PWAs isn't just about compliance—it creates better experiences for everyone.

## Table of Contents

1. [Foundational Accessibility Principles](#foundational-accessibility-principles)
2. [Semantic HTML](#semantic-html)
3. [ARIA Attributes](#aria-attributes)
4. [Keyboard Navigation](#keyboard-navigation)
5. [Image Accessibility](#image-accessibility)
6. [Form Accessibility](#form-accessibility)
7. [Dynamic Content Updates](#dynamic-content-updates)
8. [Accessibility Testing Checklist](#accessibility-testing-checklist)
9. [Tools and Resources](#tools-and-resources)

## Foundational Accessibility Principles

The Web Content Accessibility Guidelines (WCAG) are built on four foundational principles. All web content must be:

### 1. Perceivable
Information must be presentable in ways users can perceive.

- **Text alternatives**: Provide alt text for images
- **Captions and transcripts**: For audio and video content
- **Color contrast**: Ensure sufficient contrast ratios
- **Resizable text**: Support zoom up to 200% without horizontal scrolling

### 2. Operable
Interface components must be operable by all users.

- **Keyboard accessible**: All functionality available via keyboard
- **No seizures**: Avoid content that flashes more than 3 times per second
- **Enough time**: Provide users enough time to read content
- **Navigation**: Help users navigate and find content

### 3. Understandable
Information and UI operation must be understandable.

- **Readable**: Text is readable and understandable
- **Predictable**: Web pages appear and operate predictably
- **Input assistance**: Help users avoid and correct mistakes

### 4. Robust
Content must be robust enough for interpretation by various assistive technologies.

- **Compatible**: Maximize compatibility with current and future assistive tools
- **Valid markup**: Use clean, semantic HTML
- **Progressive enhancement**: Ensure core functionality works without JavaScript

## Semantic HTML

Using the correct HTML elements is the foundation of accessibility. Semantic HTML provides meaning and structure that assistive technologies can understand.

### ✅ Good: Semantic Elements

```html
<!-- Navigation -->
<nav aria-label="Main navigation">
  <ul>
    <li><a href="/" aria-current="page">Home</a></li>
    <li><a href="/about">About</a></li>
    <li><a href="/contact">Contact</a></li>
  </ul>
</nav>

<!-- Main content structure -->
<main>
  <article>
    <header>
      <h1>Article Title</h1>
      <p>Published on <time datetime="2025-01-30">January 30, 2025</time></p>
    </header>
    
    <section>
      <h2>Section Heading</h2>
      <p>Article content goes here...</p>
    </section>
    
    <aside>
      <h3>Related Links</h3>
      <ul>
        <li><a href="/related-1">Related Article 1</a></li>
        <li><a href="/related-2">Related Article 2</a></li>
      </ul>
    </aside>
  </article>
</main>

<!-- Footer -->
<footer>
  <p>&copy; 2025 Company Name. All rights reserved.</p>
</footer>
```

### ❌ Bad: Generic Elements

```html
<!-- Don't use generic divs for semantic content -->
<div class="navigation">
  <div class="nav-item"><a href="/">Home</a></div>
  <div class="nav-item"><a href="/about">About</a></div>
</div>

<div class="content">
  <div class="title">Article Title</div>
  <div class="body">Article content...</div>
</div>
```

### Heading Hierarchy

Maintain proper heading hierarchy for screen reader navigation:

```html
<!-- ✅ Good: Logical heading structure -->
<h1>Page Title</h1>
  <h2>Main Section</h2>
    <h3>Subsection</h3>
    <h3>Another Subsection</h3>
  <h2>Another Main Section</h2>
    <h3>Subsection</h3>

<!-- ❌ Bad: Skipping heading levels -->
<h1>Page Title</h1>
  <h4>This skips h2 and h3</h4>
```

### Landmark Elements

Use landmark elements to help users navigate page structure:

```html
<header>
  <!-- Site header content -->
</header>

<nav aria-label="Main navigation">
  <!-- Primary navigation -->
</nav>

<main>
  <!-- Main page content -->
  <section aria-labelledby="products-heading">
    <h2 id="products-heading">Our Products</h2>
    <!-- Product content -->
  </section>
</main>

<aside aria-label="Sidebar">
  <!-- Complementary content -->
</aside>

<footer>
  <!-- Site footer content -->
</footer>
```

## ARIA Attributes

ARIA (Accessible Rich Internet Applications) attributes provide additional semantic information when HTML alone isn't sufficient. Use ARIA to enhance, not replace, semantic HTML.

### Essential ARIA Attributes

#### aria-label
Provides accessible names for elements:

```html
<!-- ✅ Good: Descriptive labels -->
<button aria-label="Close dialog">×</button>
<input type="search" aria-label="Search products">

<!-- Navigation with descriptive labels -->
<nav aria-label="Breadcrumb">
  <ol>
    <li><a href="/">Home</a></li>
    <li><a href="/products">Products</a></li>
    <li aria-current="page">Laptops</li>
  </ol>
</nav>
```

#### aria-labelledby
References other elements that label the current element:

```html
<!-- ✅ Good: Form section with heading -->
<section aria-labelledby="billing-heading">
  <h2 id="billing-heading">Billing Information</h2>
  <div>
    <label for="card-number">Card Number</label>
    <input type="text" id="card-number">
  </div>
</section>
```

#### aria-describedby
Links to elements that provide additional description:

```html
<!-- ✅ Good: Password field with requirements -->
<div>
  <label for="password">Password</label>
  <input 
    type="password" 
    id="password" 
    aria-describedby="password-help"
    required
  >
  <div id="password-help">
    Password must be at least 8 characters long and contain a number.
  </div>
</div>
```

#### aria-expanded
Indicates if collapsible content is expanded:

```html
<!-- ✅ Good: Dropdown menu -->
<button 
  aria-expanded="false" 
  aria-controls="menu-list"
  onclick="toggleMenu()"
>
  Menu
</button>
<ul id="menu-list" hidden>
  <li><a href="/home">Home</a></li>
  <li><a href="/about">About</a></li>
</ul>

<script>
function toggleMenu() {
  const button = document.querySelector('[aria-controls="menu-list"]');
  const menu = document.getElementById('menu-list');
  const isExpanded = button.getAttribute('aria-expanded') === 'true';
  
  button.setAttribute('aria-expanded', !isExpanded);
  menu.hidden = isExpanded;
}
</script>
```

#### aria-hidden
Hides decorative content from screen readers:

```html
<!-- ✅ Good: Decorative icons -->
<button>
  <span aria-hidden="true">🔍</span>
  Search
</button>

<!-- For icon fonts -->
<button>
  <i class="icon-search" aria-hidden="true"></i>
  Search Products
</button>
```

#### aria-live
Announces dynamic content changes:

```html
<!-- ✅ Good: Status updates -->
<div aria-live="polite" id="status-message"></div>

<!-- For urgent announcements -->
<div aria-live="assertive" id="error-message"></div>

<script>
// Announce status changes
function updateStatus(message) {
  document.getElementById('status-message').textContent = message;
}

// Usage
updateStatus('Form saved successfully');
</script>
```

### ARIA Roles Cheat Sheet

Common ARIA roles and when to use them:

```html
<!-- Button role (use actual <button> when possible) -->
<div role="button" tabindex="0" onclick="doAction()">Custom Button</div>

<!-- Alert for important messages -->
<div role="alert">Error: Please fill in all required fields</div>

<!-- Status for non-critical updates -->
<div role="status">5 items in cart</div>

<!-- Tab interface -->
<div role="tablist">
  <button role="tab" aria-selected="true" aria-controls="panel1">Tab 1</button>
  <button role="tab" aria-selected="false" aria-controls="panel2">Tab 2</button>
</div>
<div role="tabpanel" id="panel1">Panel 1 content</div>
<div role="tabpanel" id="panel2" hidden>Panel 2 content</div>

<!-- Dialog -->
<div role="dialog" aria-labelledby="dialog-title" aria-modal="true">
  <h2 id="dialog-title">Confirm Action</h2>
  <p>Are you sure you want to delete this item?</p>
  <button>Yes, Delete</button>
  <button>Cancel</button>
</div>
```

## Keyboard Navigation

All interactive elements must be keyboard accessible. Users should be able to navigate and operate your application using only the keyboard.

### Focus Management

#### Visible Focus Indicators

Ensure all interactive elements have clear focus indicators:

```css
/* ✅ Good: Custom focus styles */
button:focus,
input:focus,
select:focus,
textarea:focus,
a:focus {
  outline: 2px solid #007bff;
  outline-offset: 2px;
  /* Alternative: box-shadow for better control */
  box-shadow: 0 0 0 2px #007bff;
}

/* Skip outline removal without replacement */
button:focus {
  outline: none; /* ❌ Bad: No focus indicator */
}

/* ✅ Good: Custom focus for specific design needs */
.custom-button:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
  border-color: #007bff;
}
```

#### Tab Order

Ensure logical tab order matches visual layout:

```html
<!-- ✅ Good: Natural tab order -->
<form>
  <input type="text" placeholder="First Name">
  <input type="text" placeholder="Last Name">
  <input type="email" placeholder="Email">
  <button type="submit">Submit</button>
</form>

<!-- ✅ Good: Custom tab order when needed -->
<div>
  <input type="text" tabindex="1" placeholder="Primary field">
  <input type="text" tabindex="3" placeholder="Third field">
  <input type="text" tabindex="2" placeholder="Second field">
</div>

<!-- ❌ Bad: Removing from tab order unnecessarily -->
<button tabindex="-1">This button can't be reached by keyboard</button>
```

#### Skip Navigation Links

Provide skip links for efficient navigation:

```html
<!-- ✅ Good: Skip navigation -->
<a href="#main-content" class="skip-link">Skip to main content</a>
<a href="#navigation" class="skip-link">Skip to navigation</a>

<nav id="navigation">
  <!-- Navigation content -->
</nav>

<main id="main-content">
  <!-- Main content -->
</main>

<style>
.skip-link {
  position: absolute;
  top: -40px;
  left: 6px;
  background: #000;
  color: #fff;
  padding: 8px;
  text-decoration: none;
  transition: top 0.3s;
}

.skip-link:focus {
  top: 6px;
}
</style>
```

### Keyboard Event Handling

Handle keyboard interactions properly:

```javascript
// ✅ Good: Proper keyboard handling
function handleButtonKeyDown(event) {
  // Activate with Space or Enter
  if (event.key === ' ' || event.key === 'Enter') {
    event.preventDefault();
    event.target.click();
  }
}

// ✅ Good: Arrow key navigation for custom components
function handleMenuKeyDown(event) {
  const items = Array.from(document.querySelectorAll('[role="menuitem"]'));
  const currentIndex = items.indexOf(event.target);
  
  switch (event.key) {
    case 'ArrowDown':
      event.preventDefault();
      const nextIndex = (currentIndex + 1) % items.length;
      items[nextIndex].focus();
      break;
      
    case 'ArrowUp':
      event.preventDefault();
      const prevIndex = (currentIndex - 1 + items.length) % items.length;
      items[prevIndex].focus();
      break;
      
    case 'Escape':
      closeMenu();
      break;
      
    case 'Home':
      event.preventDefault();
      items[0].focus();
      break;
      
    case 'End':
      event.preventDefault();
      items[items.length - 1].focus();
      break;
  }
}
```

## Image Accessibility

Provide appropriate alternative text for images based on their purpose and context.

### Informative Images

Images that convey information need descriptive alt text:

```html
<!-- ✅ Good: Descriptive alt text -->
<img src="chart.png" alt="Sales increased 25% from Q1 to Q2 2024">

<img src="map.png" alt="Office location at 123 Main Street, Downtown">

<!-- Product images -->
<img src="laptop.jpg" alt="Silver MacBook Pro with 13-inch display, opened showing desktop">
```

### Decorative Images

Images that are purely decorative should have empty alt attributes:

```html
<!-- ✅ Good: Decorative images -->
<img src="border-decoration.png" alt="" role="presentation">

<!-- CSS backgrounds are better for decorative images -->
<div class="hero-section" style="background-image: url('hero-bg.jpg');">
  <h1>Welcome to Our Site</h1>
</div>
```

### Functional Images

Images that serve as buttons or links need alt text describing their function:

```html
<!-- ✅ Good: Functional alt text -->
<a href="/search">
  <img src="search-icon.png" alt="Search">
</a>

<button>
  <img src="print-icon.png" alt="Print this page">
</button>

<!-- ✅ Better: Use aria-label with icons -->
<button aria-label="Print this page">
  <img src="print-icon.png" alt="" aria-hidden="true">
</button>
```

### Complex Images

For charts, graphs, and complex images, provide detailed descriptions:

```html
<!-- ✅ Good: Complex image with detailed description -->
<figure>
  <img src="sales-chart.png" alt="Quarterly sales chart showing growth trend">
  <figcaption>
    Sales data for 2024: Q1: $100K, Q2: $125K (25% increase), 
    Q3: $150K (20% increase), Q4: $175K (17% increase).
  </figcaption>
</figure>

<!-- Alternative: Link to detailed description -->
<img src="complex-chart.png" alt="Annual revenue by region" 
     aria-describedby="chart-description">

<div id="chart-description">
  <h3>Detailed Chart Description</h3>
  <p>This chart shows annual revenue by region for 2024...</p>
  <!-- Detailed description -->
</div>
```

### Images with Text

Avoid putting text in images, but if necessary, include the text in alt attribute:

```html
<!-- ❌ Bad: Important text in image without alt -->
<img src="sale-banner.jpg">

<!-- ✅ Good: Include text content in alt -->
<img src="sale-banner.jpg" alt="50% Off Sale - This Weekend Only">

<!-- ✅ Better: Use actual text with CSS styling -->
<div class="sale-banner">
  <h2>50% Off Sale</h2>
  <p>This Weekend Only</p>
</div>
```

## Form Accessibility

Forms are critical interaction points that must be fully accessible to all users.

### Labels and Input Association

Every form input must have a clear, associated label:

```html
<!-- ✅ Good: Explicit label association -->
<div>
  <label for="first-name">First Name</label>
  <input type="text" id="first-name" required>
</div>

<!-- ✅ Good: Implicit label association -->
<label>
  Last Name
  <input type="text" required>
</label>

<!-- ✅ Good: aria-label for compact forms -->
<input type="search" aria-label="Search products" placeholder="Search...">

<!-- ❌ Bad: No label association -->
<input type="text" placeholder="Enter your name">
```

### Required Fields and Validation

Clearly indicate required fields and provide helpful error messages:

```html
<!-- ✅ Good: Required field indication -->
<div>
  <label for="email">
    Email Address
    <span aria-label="required">*</span>
  </label>
  <input 
    type="email" 
    id="email" 
    required 
    aria-describedby="email-error"
    aria-invalid="false"
  >
  <div id="email-error" role="alert" hidden>
    Please enter a valid email address.
  </div>
</div>

<!-- JavaScript for validation feedback -->
<script>
function validateEmail(input) {
  const errorDiv = document.getElementById('email-error');
  const isValid = input.validity.valid;
  
  input.setAttribute('aria-invalid', !isValid);
  
  if (!isValid) {
    errorDiv.textContent = input.validationMessage;
    errorDiv.hidden = false;
  } else {
    errorDiv.hidden = true;
  }
}
</script>
```

### Fieldsets and Legends

Group related form fields with fieldsets:

```html
<!-- ✅ Good: Grouped form fields -->
<form>
  <fieldset>
    <legend>Personal Information</legend>
    <div>
      <label for="first-name">First Name</label>
      <input type="text" id="first-name">
    </div>
    <div>
      <label for="last-name">Last Name</label>
      <input type="text" id="last-name">
    </div>
  </fieldset>
  
  <fieldset>
    <legend>Contact Preferences</legend>
    <div>
      <input type="checkbox" id="email-updates">
      <label for="email-updates">Receive email updates</label>
    </div>
    <div>
      <input type="checkbox" id="sms-updates">
      <label for="sms-updates">Receive SMS updates</label>
    </div>
  </fieldset>
</form>
```

### Radio Buttons and Checkboxes

Properly group and label radio buttons and checkboxes:

```html
<!-- ✅ Good: Radio button group -->
<fieldset>
  <legend>Shipping Method</legend>
  <div>
    <input type="radio" id="standard" name="shipping" value="standard">
    <label for="standard">Standard Shipping (5-7 days)</label>
  </div>
  <div>
    <input type="radio" id="express" name="shipping" value="express">
    <label for="express">Express Shipping (2-3 days)</label>
  </div>
  <div>
    <input type="radio" id="overnight" name="shipping" value="overnight">
    <label for="overnight">Overnight Shipping</label>
  </div>
</fieldset>

<!-- ✅ Good: Checkbox with description -->
<div>
  <input type="checkbox" id="terms" required aria-describedby="terms-desc">
  <label for="terms">I agree to the Terms of Service</label>
  <div id="terms-desc">
    <a href="/terms">Read our Terms of Service</a>
  </div>
</div>
```

### Form Instructions and Help Text

Provide clear instructions and help text:

```html
<!-- ✅ Good: Form with instructions -->
<form aria-labelledby="form-title" aria-describedby="form-instructions">
  <h2 id="form-title">Account Registration</h2>
  <div id="form-instructions">
    <p>Fields marked with * are required. Your password must be at least 8 characters.</p>
  </div>
  
  <div>
    <label for="username">
      Username *
    </label>
    <input 
      type="text" 
      id="username" 
      required 
      aria-describedby="username-help"
    >
    <div id="username-help">
      Username must be 3-20 characters, letters and numbers only.
    </div>
  </div>
  
  <div>
    <label for="password">Password *</label>
    <input 
      type="password" 
      id="password" 
      required 
      minlength="8"
      aria-describedby="password-requirements"
    >
    <div id="password-requirements">
      <ul>
        <li>At least 8 characters long</li>
        <li>Include at least one number</li>
        <li>Include at least one special character</li>
      </ul>
    </div>
  </div>
</form>
```

## Dynamic Content Updates

Keep users informed about changes to dynamic content using ARIA live regions and proper focus management.

### ARIA Live Regions

Use `aria-live` to announce content changes to screen readers:

```html
<!-- Status messages (polite announcements) -->
<div id="status" aria-live="polite" aria-atomic="true"></div>

<!-- Error messages (assertive announcements) -->
<div id="errors" aria-live="assertive" aria-atomic="true"></div>

<!-- Loading indicators -->
<div id="loading" aria-live="polite">
  <span aria-hidden="true">Loading...</span>
</div>

<script>
// Announce status updates
function announceStatus(message) {
  const statusDiv = document.getElementById('status');
  statusDiv.textContent = message;
  
  // Clear after announcement to avoid repetition
  setTimeout(() => {
    statusDiv.textContent = '';
  }, 1000);
}

// Usage examples
announceStatus('Item added to cart');
announceStatus('Form saved successfully');
announceStatus('Search returned 25 results');
</script>
```

### Toast Notifications

Create accessible toast notifications:

```html
<!-- Toast container -->
<div id="toast-container" aria-live="assertive" aria-atomic="true"></div>

<script>
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.setAttribute('role', type === 'error' ? 'alert' : 'status');
  
  toast.innerHTML = `
    <div class="toast-content">
      ${message}
      <button class="toast-close" aria-label="Close notification">×</button>
    </div>
  `;
  
  container.appendChild(toast);
  
  // Auto-remove after delay
  setTimeout(() => {
    if (toast.parentNode) {
      toast.parentNode.removeChild(toast);
    }
  }, 5000);
  
  // Handle close button
  toast.querySelector('.toast-close').addEventListener('click', () => {
    toast.parentNode.removeChild(toast);
  });
}

// Usage
showToast('Settings saved successfully', 'success');
showToast('Error: Unable to save changes', 'error');
</script>

<style>
.toast {
  margin: 10px 0;
  padding: 15px;
  border-radius: 4px;
  background: #fff;
  border-left: 4px solid #007bff;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
}

.toast-success {
  border-left-color: #28a745;
}

.toast-error {
  border-left-color: #dc3545;
}

.toast-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.toast-close {
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  margin-left: 10px;
}
</style>
```

### Loading States

Provide accessible loading indicators:

```html
<!-- Loading button -->
<button id="submit-btn" onclick="submitForm()">
  <span class="btn-text">Submit</span>
  <span class="btn-spinner" hidden aria-hidden="true">⟳</span>
</button>

<script>
function submitForm() {
  const button = document.getElementById('submit-btn');
  const text = button.querySelector('.btn-text');
  const spinner = button.querySelector('.btn-spinner');
  
  // Update button state
  button.disabled = true;
  button.setAttribute('aria-busy', 'true');
  text.textContent = 'Submitting...';
  spinner.hidden = false;
  
  // Simulate form submission
  setTimeout(() => {
    // Reset button state
    button.disabled = false;
    button.removeAttribute('aria-busy');
    text.textContent = 'Submit';
    spinner.hidden = true;
    
    // Announce completion
    announceStatus('Form submitted successfully');
  }, 2000);
}
</script>
```

### Search Results and Filtering

Handle dynamic search results accessibly:

```html
<!-- Search form -->
<form role="search">
  <label for="product-search">Search Products</label>
  <input 
    type="search" 
    id="product-search" 
    aria-describedby="search-instructions"
    oninput="debounceSearch(this.value)"
  >
  <div id="search-instructions">
    Type to search products. Results will appear below.
  </div>
</form>

<!-- Results container -->
<div id="search-results" aria-live="polite" aria-atomic="false">
  <div id="results-summary" aria-live="polite"></div>
  <div id="results-list"></div>
</div>

<script>
let searchTimeout;

function debounceSearch(query) {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => performSearch(query), 300);
}

function performSearch(query) {
  const summaryDiv = document.getElementById('results-summary');
  const listDiv = document.getElementById('results-list');
  
  if (query.length < 2) {
    summaryDiv.textContent = '';
    listDiv.innerHTML = '';
    return;
  }
  
  // Simulate search
  const results = mockSearch(query);
  
  // Announce results summary
  summaryDiv.textContent = `${results.length} results found for "${query}"`;
  
  // Display results
  listDiv.innerHTML = results.map(result => `
    <div class="search-result">
      <h3><a href="${result.url}">${result.title}</a></h3>
      <p>${result.description}</p>
    </div>
  `).join('');
}

function mockSearch(query) {
  // Mock search results
  return [
    { title: 'Product 1', description: 'Description 1', url: '/product-1' },
    { title: 'Product 2', description: 'Description 2', url: '/product-2' }
  ];
}
</script>
```

## Accessibility Testing Checklist

Use this comprehensive checklist to test your PWA's accessibility:

### Automated Testing

#### 1. Lighthouse Accessibility Audit
- [ ] Run Lighthouse accessibility audit
- [ ] Achieve score of 90+ (aim for 100)
- [ ] Address all flagged issues
- [ ] Test on multiple pages, especially complex ones

#### 2. axe DevTools
- [ ] Install axe DevTools browser extension
- [ ] Run full scan on key pages
- [ ] Fix all violations (no exceptions for Level A/AA)
- [ ] Test dynamic content and interactions

#### 3. WAVE Web Accessibility Evaluator
- [ ] Use WAVE browser extension
- [ ] Check for errors, alerts, and structural issues
- [ ] Verify proper heading structure
- [ ] Confirm form labels and descriptions

### Manual Testing

#### 4. Keyboard Navigation
- [ ] Tab through entire page in logical order
- [ ] Verify all interactive elements are reachable
- [ ] Check focus indicators are clearly visible
- [ ] Test skip navigation links
- [ ] Verify modal dialogs trap focus
- [ ] Test dropdown menus and collapsible content
- [ ] Confirm Escape key closes dialogs/menus

#### 5. Screen Reader Testing
- [ ] Test with screen reader (NVDA, JAWS, or VoiceOver)
- [ ] Verify page structure makes sense when read aloud
- [ ] Check that images have appropriate alt text
- [ ] Confirm form labels are properly announced
- [ ] Test error messages are announced
- [ ] Verify dynamic content updates are announced

#### 6. Visual Testing
- [ ] Increase text size to 200% - content should not overflow
- [ ] Check color contrast ratios (4.5:1 for normal text, 3:1 for large text)
- [ ] Verify information isn't conveyed by color alone
- [ ] Test in high contrast mode
- [ ] Check that focus indicators are visible in all themes

#### 7. Motor Accessibility
- [ ] Verify click targets are at least 44x44 pixels
- [ ] Check that drag-and-drop has keyboard alternatives
- [ ] Test that time limits can be extended or disabled
- [ ] Confirm hover-triggered content has alternatives

### Content and Structure

#### 8. Semantic HTML
- [ ] Use proper heading hierarchy (h1-h6)
- [ ] Implement landmark elements (header, nav, main, aside, footer)
- [ ] Use lists for grouped content
- [ ] Verify table headers are properly associated
- [ ] Check that form fields have labels

#### 9. ARIA Implementation
- [ ] Use ARIA labels and descriptions appropriately
- [ ] Implement live regions for dynamic content
- [ ] Use proper ARIA roles for custom components
- [ ] Verify aria-expanded states for collapsible content
- [ ] Check that decorative images have aria-hidden="true"

### Form Accessibility

#### 10. Form Testing
- [ ] All form fields have associated labels
- [ ] Required fields are clearly marked
- [ ] Error messages are descriptive and actionable
- [ ] Field validation provides immediate feedback
- [ ] Form submission success/failure is announced
- [ ] Group related fields with fieldsets and legends

### PWA-Specific Testing

#### 11. Installation and Updates
- [ ] Install prompt is accessible
- [ ] Installation process is keyboard navigable
- [ ] Update notifications are announced to screen readers
- [ ] Offline functionality gracefully degrades

#### 12. Offline Experience
- [ ] Offline page is accessible
- [ ] Network status changes are announced
- [ ] Cached content remains accessible
- [ ] Service worker updates don't break accessibility

### Tools and Resources

#### Automated Testing Tools
- **Lighthouse**: Built into Chrome DevTools, comprehensive accessibility audit
- **axe DevTools**: Browser extension with detailed accessibility testing
- **WAVE**: Web accessibility evaluation tool with visual indicators
- **Pa11y**: Command-line accessibility testing tool
- **Accessibility Insights**: Microsoft's accessibility testing extension

#### Screen Readers
- **NVDA** (Windows): Free, open-source screen reader
- **JAWS** (Windows): Professional screen reader (paid)
- **VoiceOver** (macOS/iOS): Built into Apple devices
- **TalkBack** (Android): Built into Android devices
- **Orca** (Linux): Built into GNOME desktop

#### Color and Contrast Tools
- **WebAIM Contrast Checker**: Online contrast ratio calculator
- **Colour Contrast Analyser**: Desktop application for contrast testing
- **Stark**: Design tool plugin for contrast checking
- **Chrome DevTools**: Built-in contrast ratio information

#### Code Quality Tools
- **eslint-plugin-jsx-a11y**: ESLint plugin for React accessibility
- **react-axe**: Runtime accessibility testing for React
- **@axe-core/playwright**: Accessibility testing with Playwright
- **cypress-axe**: Accessibility testing with Cypress

### Implementation Examples

#### React/Next.js Example

```tsx
// Accessible React component example
import { useState, useId } from 'react';

interface AccessibleFormProps {
  onSubmit: (data: FormData) => void;
}

export function AccessibleForm({ onSubmit }: AccessibleFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState('');
  
  const emailId = useId();
  const passwordId = useId();
  const errorId = useId();
  const statusId = useId();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setErrors({});
    
    try {
      const formData = new FormData(event.target as HTMLFormElement);
      await onSubmit(formData);
      setStatus('Form submitted successfully');
    } catch (error) {
      setErrors({ general: 'Failed to submit form. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <fieldset disabled={isSubmitting}>
        <legend>Login Form</legend>
        
        {/* Status messages */}
        <div id={statusId} aria-live="polite" aria-atomic="true">
          {status && <div role="status">{status}</div>}
        </div>
        
        <div id={errorId} aria-live="assertive" aria-atomic="true">
          {errors.general && <div role="alert">{errors.general}</div>}
        </div>

        {/* Email field */}
        <div>
          <label htmlFor={emailId}>
            Email Address <span aria-label="required">*</span>
          </label>
          <input
            type="email"
            id={emailId}
            name="email"
            required
            aria-invalid={errors.email ? 'true' : 'false'}
            aria-describedby={errors.email ? `${emailId}-error` : undefined}
          />
          {errors.email && (
            <div id={`${emailId}-error`} role="alert">
              {errors.email}
            </div>
          )}
        </div>

        {/* Password field */}
        <div>
          <label htmlFor={passwordId}>
            Password <span aria-label="required">*</span>
          </label>
          <input
            type="password"
            id={passwordId}
            name="password"
            required
            minLength={8}
            aria-invalid={errors.password ? 'true' : 'false'}
            aria-describedby={`${passwordId}-help ${errors.password ? `${passwordId}-error` : ''}`}
          />
          <div id={`${passwordId}-help`}>
            Password must be at least 8 characters long.
          </div>
          {errors.password && (
            <div id={`${passwordId}-error`} role="alert">
              {errors.password}
            </div>
          )}
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={isSubmitting}
          aria-busy={isSubmitting}
        >
          {isSubmitting ? 'Signing In...' : 'Sign In'}
        </button>
      </fieldset>
    </form>
  );
}
```

### Additional Resources

- **WCAG 2.1 Guidelines**: https://www.w3.org/WAI/WCAG21/quickref/
- **WebAIM Resources**: https://webaim.org/
- **The A11Y Project**: https://www.a11yproject.com/
- **MDN Accessibility**: https://developer.mozilla.org/en-US/docs/Web/Accessibility
- **Government Digital Service**: https://www.gov.uk/service-manual/helping-people-to-use-your-service/making-your-service-accessible-an-introduction

Building accessible PWAs isn't just about compliance—it's about creating inclusive experiences that work for everyone. Start with semantic HTML, enhance with ARIA when needed, ensure keyboard accessibility, and test thoroughly with both automated tools and real users.