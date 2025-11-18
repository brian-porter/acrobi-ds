# Acrobi Framework - Package Integration Guide

**Version:** 1.0.0
**Last Updated:** November 18, 2024

> **For Package Maintainers & AI Agents**: This guide explains how to prepare your package for integration with the Acrobi Framework - a WordPress-like extension system for modern applications.

---

## Table of Contents

1. [Overview](#overview)
2. [Quick Start Checklist](#quick-start-checklist)
3. [Package Format Requirements](#package-format-requirements)
4. [Acrobi Extension Integration](#acrobi-extension-integration)
5. [Metadata Specifications](#metadata-specifications)
6. [Hook System Integration](#hook-system-integration)
7. [Shell Interface Implementation](#shell-interface-implementation)
8. [Publishing Process](#publishing-process)
9. [Validation & Testing](#validation--testing)
10. [Best Practices](#best-practices)
11. [Examples](#examples)

---

## Overview

### What is Acrobi Framework?

Acrobi Framework is a WordPress-inspired plugin/extension system for modern applications. It provides:

- **Hook System**: WordPress-style actions and filters
- **Extension Loader**: Dynamic loading and lifecycle management
- **Shell Architecture**: Abstract interfaces (auth, storage, payment, email, etc.)
- **Database Abstraction**: Works with SQLite, D1, PostgreSQL, MySQL
- **Type Safety**: Full TypeScript support

### Two Integration Levels

Your package can integrate with Acrobi at two levels:

1. **Level 1: Basic Package** - Standard package that can be uploaded and managed
2. **Level 2: Acrobi Extension** - Package that extends the framework with hooks, shells, and lifecycle management

This guide covers both levels.

---

## Quick Start Checklist

Before you begin, ensure your package has:

### For All Packages (Level 1)

- [ ] Valid manifest file (package.json, Cargo.toml, etc.)
- [ ] Semantic versioning (e.g., 1.2.3)
- [ ] Clear description (10-500 characters)
- [ ] License specified
- [ ] At least one tag/keyword
- [ ] README.md file
- [ ] Valid package file (.tgz, .whl, .crate, etc.)

### For Acrobi Extensions (Level 2)

- [ ] `acrobi.json` manifest file
- [ ] Main entry point exporting `activate()` function
- [ ] TypeScript type definitions
- [ ] Extension category specified
- [ ] Dependencies declared
- [ ] Hook registrations documented

---

## Package Format Requirements

### Supported Ecosystems

Acrobi Framework supports the following package ecosystems:

| Ecosystem                       | File Format               | Manifest File                | Max Size |
| ------------------------------- | ------------------------- | ---------------------------- | -------- |
| **npm** (JavaScript/TypeScript) | `.tgz`, `.tar.gz`         | `package.json`               | 100MB    |
| **PyPI** (Python)               | `.whl`, `.tar.gz`, `.zip` | `setup.py`, `pyproject.toml` | 100MB    |
| **Cargo** (Rust)                | `.crate`                  | `Cargo.toml`                 | 50MB     |
| **Maven** (Java)                | `.jar`, `.war`, `.pom`    | `pom.xml`                    | 200MB    |
| **NuGet** (.NET)                | `.nupkg`                  | `.nuspec`                    | 100MB    |

### General Requirements

All packages must:

1. **Be properly packaged** - Use standard packaging tools for your ecosystem
2. **Include a manifest** - Standard manifest file with required metadata
3. **Follow semver** - Version format: `MAJOR.MINOR.PATCH`
4. **Include README** - Markdown documentation explaining the package
5. **Specify license** - Valid SPDX license identifier

---

## Acrobi Extension Integration

### What Makes an Acrobi Extension?

An Acrobi Extension is a package that integrates with the framework's extension system. This enables:

- **Hook System Access**: Register actions and filters
- **Lifecycle Management**: Activate, deactivate, update callbacks
- **Shell Implementation**: Implement auth, storage, payment interfaces
- **Database Access**: Use the framework's database abstraction
- **Configuration**: User-configurable settings via the dashboard

### Extension Manifest (`acrobi.json`)

Create an `acrobi.json` file in your package root:

```json
{
  "id": "your-org.package-name",
  "name": "Your Package Name",
  "version": "1.0.0",
  "description": "Brief description of your extension",
  "author": {
    "name": "Your Name",
    "email": "you@example.com",
    "url": "https://your-website.com"
  },
  "license": {
    "type": "MIT",
    "url": "https://opensource.org/licenses/MIT"
  },
  "category": "tool",
  "keywords": ["auth", "security", "authentication"],
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "homepage": "https://github.com/your-org/package-name",
  "repository": "https://github.com/your-org/package-name",
  "bugs": "https://github.com/your-org/package-name/issues",
  "dependencies": [],
  "coreVersion": ">=0.1.0",
  "capabilities": [
    {
      "id": "auth.provider",
      "name": "Authentication Provider",
      "description": "Provides OAuth authentication",
      "version": "1.0.0"
    }
  ],
  "configSchema": {
    "type": "object",
    "properties": {
      "apiKey": {
        "type": "string",
        "description": "Your API key"
      },
      "enabled": {
        "type": "boolean",
        "default": true
      }
    },
    "required": ["apiKey"]
  }
}
```

### Extension Category

Choose the appropriate category:

- `ai-model` - AI/ML integrations
- `data-source` - APIs, databases
- `shell` - Shell implementations (auth, storage, payment)
- `tool` - Development tools
- `ui-component` - UI/UX components
- `workflow` - Automation
- `analytics` - Analytics and monitoring
- `security` - Security tools
- `other` - Uncategorized

### Main Entry Point

Your package must export an `activate` function:

**TypeScript:**

```typescript
import { ExtensionContext } from "@acrobi/core";

export async function activate(context: ExtensionContext): Promise<void> {
  // Extension initialization code
  console.log(`${context.extensionId} activated!`);

  // Register hooks, initialize services, etc.
}

export async function deactivate(): Promise<void> {
  // Cleanup code (optional)
  console.log("Extension deactivated");
}
```

**JavaScript:**

```javascript
exports.activate = async function (context) {
  console.log(`${context.extensionId} activated!`);

  // Your initialization code
};

exports.deactivate = async function () {
  // Cleanup code (optional)
};
```

---

## Metadata Specifications

### Required Fields (All Packages)

Every package must include these fields in its manifest:

| Field                   | Type   | Description                | Example                    |
| ----------------------- | ------ | -------------------------- | -------------------------- |
| `name`                  | string | Package name (1-214 chars) | `"my-awesome-package"`     |
| `version`               | string | Semver version             | `"1.2.3"`                  |
| `description`           | string | Description (10-500 chars) | `"Awesome package for..."` |
| `license`               | string | SPDX license ID            | `"MIT"`                    |
| `author` / `maintainer` | string | Author name                | `"John Doe"`               |

### Recommended Fields

Include these for better discoverability:

| Field               | Type   | Description              |
| ------------------- | ------ | ------------------------ |
| `keywords` / `tags` | array  | Search keywords (max 20) |
| `homepage`          | URL    | Project website          |
| `repository`        | URL    | Source code repository   |
| `bugs`              | URL    | Issue tracker            |
| `dependencies`      | object | Runtime dependencies     |

### Ecosystem-Specific Formats

#### npm (package.json)

```json
{
  "name": "@your-org/package-name",
  "version": "1.0.0",
  "description": "Package description",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "license": "MIT",
  "author": {
    "name": "Your Name",
    "email": "you@example.com"
  },
  "keywords": ["acrobi", "extension", "auth"],
  "repository": {
    "type": "git",
    "url": "https://github.com/your-org/package-name"
  },
  "dependencies": {
    "@acrobi/core": "^0.1.0"
  },
  "peerDependencies": {
    "@acrobi/core": ">=0.1.0"
  }
}
```

#### Python (pyproject.toml)

```toml
[project]
name = "your-package-name"
version = "1.0.0"
description = "Package description"
authors = [
    {name = "Your Name", email = "you@example.com"}
]
license = {text = "MIT"}
keywords = ["acrobi", "extension"]
classifiers = [
    "Development Status :: 4 - Beta",
    "Intended Audience :: Developers",
]

[project.urls]
Homepage = "https://github.com/your-org/package-name"
Repository = "https://github.com/your-org/package-name"

[tool.setuptools]
packages = ["your_package"]
```

#### Rust (Cargo.toml)

```toml
[package]
name = "your-package-name"
version = "1.0.0"
authors = ["Your Name <you@example.com>"]
edition = "2021"
license = "MIT"
description = "Package description"
homepage = "https://github.com/your-org/package-name"
repository = "https://github.com/your-org/package-name"
keywords = ["acrobi", "extension"]
categories = ["development-tools"]

[dependencies]
# Your dependencies
```

---

## Hook System Integration

### Understanding Hooks

Acrobi's hook system works like WordPress:

- **Actions**: Execute code at specific points (events)
- **Filters**: Modify data as it passes through the system

### Registering Hooks

**Actions:**

```typescript
import { ExtensionContext } from "@acrobi/core";

export async function activate(context: ExtensionContext): Promise<void> {
  // Listen for user creation
  context.hooks.addAction(
    "user:created",
    async (user) => {
      console.log("New user created:", user.email);
      await sendWelcomeEmail(user);
    },
    10,
  ); // Priority: 10 (default)

  // Listen for package upload
  context.hooks.addAction("package:uploaded", async (pkg) => {
    console.log("Package uploaded:", pkg.name);
  });
}
```

**Filters:**

```typescript
export async function activate(context: ExtensionContext): Promise<void> {
  // Modify user data before saving
  context.hooks.addFilter(
    "user:beforeSave",
    (user) => {
      user.username = user.username.toLowerCase();
      return user;
    },
    10,
  );

  // Add custom validation
  context.hooks.addFilter("package:validate", (validation, pkg) => {
    if (pkg.name.includes("badword")) {
      validation.errors.push("Package name contains inappropriate content");
      validation.valid = false;
    }
    return validation;
  });
}
```

### Available Core Hooks

#### User Lifecycle

- `user:beforeCreate` (filter) - Before user creation
- `user:created` (action) - After user created
- `user:beforeUpdate` (filter) - Before user update
- `user:updated` (action) - After user updated
- `user:beforeDelete` (action) - Before user deletion
- `user:deleted` (action) - After user deleted

#### Package Lifecycle

- `package:beforeUpload` (filter) - Before package upload
- `package:uploaded` (action) - After package uploaded
- `package:validate` (filter) - Validate package data
- `package:beforePublish` (action) - Before publishing
- `package:published` (action) - After published

#### Extension Lifecycle

- `extension:beforeRegister` (filter) - Before extension registration
- `extension:registered` (action) - After extension registered
- `extension:beforeActivate` (action) - Before activation
- `extension:activated` (action) - After activated
- `extension:beforeDeactivate` (action) - Before deactivation
- `extension:deactivated` (action) - After deactivated

#### Application Lifecycle

- `app:init` (action) - Application initialization
- `app:ready` (action) - Application ready
- `app:shutdown` (action) - Application shutdown

---

## Shell Interface Implementation

### What are Shells?

Shells are abstract interfaces that extensions can implement to provide functionality:

- **Auth Shell**: Authentication providers (OAuth, SAML, custom)
- **Storage Shell**: File storage backends (S3, R2, local)
- **Payment Shell**: Payment processors (Stripe, PayPal)
- **Email Shell**: Email service providers (SendGrid, SES)

### Implementing the Auth Shell

**TypeScript:**

```typescript
import {
  ExtensionContext,
  IAuthProvider,
  AuthCredentials,
  AuthResult,
  AuthSession,
} from "@acrobi/core";

class MyAuthProvider implements IAuthProvider {
  async signIn(credentials: AuthCredentials): Promise<AuthResult> {
    // Implement sign-in logic
    const response = await fetch("https://api.example.com/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });

    const data = await response.json();

    return {
      success: true,
      user: {
        id: data.userId,
        email: data.email,
        role: data.role,
      },
      session: {
        token: data.accessToken,
        expiresAt: new Date(data.expiresAt),
      },
    };
  }

  async signUp(credentials: AuthCredentials): Promise<AuthResult> {
    // Implement sign-up logic
  }

  async signOut(session: AuthSession): Promise<void> {
    // Implement sign-out logic
  }

  async verifySession(token: string): Promise<AuthSession | null> {
    // Verify session validity
  }

  async refreshSession(session: AuthSession): Promise<AuthSession> {
    // Refresh expired session
  }
}

export async function activate(context: ExtensionContext): Promise<void> {
  // Register the auth provider
  const authShell = context.shells.get("auth");
  const provider = new MyAuthProvider();

  await authShell.setProvider(provider);

  context.logger.info("MyAuth provider activated");
}
```

### Implementing the Storage Shell

```typescript
import { IStorageProvider, UploadResult } from "@acrobi/core";

class MyStorageProvider implements IStorageProvider {
  async upload(file: File, path: string): Promise<UploadResult> {
    // Implement file upload
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`https://storage.example.com/upload/${path}`, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    return {
      success: true,
      url: data.url,
      key: data.key,
      size: file.size,
    };
  }

  async download(key: string): Promise<Blob> {
    // Implement file download
  }

  async delete(key: string): Promise<void> {
    // Implement file deletion
  }

  async list(prefix: string): Promise<string[]> {
    // List files by prefix
  }
}
```

---

## Publishing Process

### Step-by-Step Guide

#### 1. Prepare Your Package

```bash
# Navigate to your package directory
cd your-package

# Install dependencies
npm install  # or pip install, cargo build, etc.

# Build your package
npm run build

# Run tests
npm test

# Create package file
npm pack  # Creates .tgz file
```

#### 2. Create `acrobi.json` (For Extensions)

```bash
# Create the manifest
cat > acrobi.json << 'EOF'
{
  "id": "your-org.package-name",
  "name": "Your Package Name",
  "version": "1.0.0",
  "description": "Your package description",
  "author": {
    "name": "Your Name",
    "email": "you@example.com"
  },
  "category": "tool",
  "main": "./dist/index.js"
}
EOF
```

#### 3. Validate Your Package

Use the validation tool (if available):

```bash
# Install Acrobi CLI
npm install -g @acrobi/cli

# Validate your package
acrobi validate ./your-package-1.0.0.tgz

# Check for issues
acrobi lint ./your-package
```

#### 4. Upload to Acrobi Framework

**Via Web Interface:**

1. Navigate to https://your-acrobi-instance.com/upload
2. Select your ecosystem (npm, PyPI, Cargo, etc.)
3. Drag and drop your package file or click to browse
4. Review extracted metadata
5. Add tags and additional information
6. Submit for publishing

**Via CLI:**

```bash
# Login to Acrobi
acrobi login

# Publish your package
acrobi publish ./your-package-1.0.0.tgz

# Publish with specific tag
acrobi publish ./your-package-1.0.0.tgz --tag beta
```

#### 5. Verification Process

After upload, your package will be:

1. **Scanned for security issues** - Malware, vulnerabilities
2. **Validated for completeness** - Required fields, format
3. **Checked for naming conflicts** - Unique package name
4. **Tested for compatibility** - Works with framework version
5. **Reviewed (if required)** - Manual review for certain categories

You'll receive an email when verification completes.

---

## Validation & Testing

### Pre-Submission Checklist

Before uploading your package, verify:

#### Package Structure

- [ ] Package builds without errors
- [ ] All dependencies are declared
- [ ] README.md is included and well-formatted
- [ ] LICENSE file is included
- [ ] .gitignore excludes build artifacts and node_modules

#### Metadata

- [ ] Package name follows naming conventions
- [ ] Version follows semantic versioning
- [ ] Description is clear and concise (10-500 chars)
- [ ] License is a valid SPDX identifier
- [ ] At least 3 relevant tags/keywords
- [ ] Author/maintainer email is valid

#### For Acrobi Extensions

- [ ] `acrobi.json` manifest is valid JSON
- [ ] Extension ID is unique (org.package-name format)
- [ ] Main entry point exports `activate()` function
- [ ] TypeScript types are included
- [ ] Category is specified
- [ ] Core version compatibility is declared

#### Security

- [ ] No hardcoded secrets or API keys
- [ ] Dependencies are up-to-date and secure
- [ ] No known vulnerabilities (run `npm audit` or equivalent)
- [ ] Input validation is implemented
- [ ] Error handling doesn't leak sensitive info

#### Testing

- [ ] Unit tests pass
- [ ] Integration tests pass (if applicable)
- [ ] Code coverage > 70%
- [ ] Manual testing completed
- [ ] Works in target environments

### Testing Your Extension Locally

```bash
# Clone Acrobi Framework
git clone https://github.com/Acrobi/acrobi-framework.git
cd acrobi-framework

# Install dependencies
npm install

# Link your extension
cd extensions
ln -s /path/to/your-extension your-extension

# Start the framework
cd ..
npm run dev

# Your extension should be loaded automatically
```

### Validation Tools

**Package Validator (npm):**

```bash
npm install -g @acrobi/validator

# Validate package structure
acrobi-validate ./package.tgz

# Check acrobi.json
acrobi-validate --manifest ./acrobi.json

# Full validation with security scan
acrobi-validate --full ./package.tgz
```

**Manual Validation:**

```javascript
const fs = require("fs");
const path = require("path");

// Load and validate acrobi.json
const manifest = JSON.parse(fs.readFileSync("./acrobi.json", "utf8"));

// Check required fields
const required = ["id", "name", "version", "description", "author", "main"];
const missing = required.filter((field) => !manifest[field]);

if (missing.length > 0) {
  console.error("Missing required fields:", missing);
  process.exit(1);
}

// Validate version format
const semverRegex = /^\d+\.\d+\.\d+(-[\w.]+)?(\+[\w.]+)?$/;
if (!semverRegex.test(manifest.version)) {
  console.error("Invalid version format:", manifest.version);
  process.exit(1);
}

console.log("✓ Manifest is valid");
```

---

## Best Practices

### 1. Naming Conventions

**Package Names:**

- Use lowercase and hyphens: `my-awesome-package`
- Be descriptive but concise
- Avoid generic names like `utils` or `helpers`
- Include scope for npm: `@your-org/package-name`

**Extension IDs:**

- Format: `org.package-name` or `com.company.product`
- Use reverse domain notation
- Examples: `acrobi.better-auth`, `mycompany.payment-stripe`

### 2. Versioning Strategy

Follow semantic versioning:

- **MAJOR** (1.0.0): Breaking changes
- **MINOR** (0.1.0): New features, backward compatible
- **PATCH** (0.0.1): Bug fixes

```bash
# Initial release
1.0.0

# Bug fix
1.0.1

# New feature
1.1.0

# Breaking change
2.0.0

# Pre-release
2.0.0-beta.1
```

### 3. Documentation

**Include in README.md:**

- What the package does
- Installation instructions
- Basic usage examples
- Configuration options
- API reference
- Contributing guidelines
- License information

**Example README structure:**

````markdown
# Your Package Name

Brief description of what your package does.

## Installation

```bash
npm install @your-org/package-name
```
````

## Quick Start

```javascript
import { YourPackage } from "@your-org/package-name";

const instance = new YourPackage({
  apiKey: "your-api-key",
});

await instance.doSomething();
```

## Configuration

| Option  | Type   | Default  | Description           |
| ------- | ------ | -------- | --------------------- |
| apiKey  | string | required | Your API key          |
| timeout | number | 5000     | Request timeout in ms |

## API Reference

### `doSomething(params)`

Description of what this method does.

**Parameters:**

- `params` (object): Configuration object

**Returns:**

- Promise<Result>

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md)

## License

MIT

````

### 4. Security

**Do NOT include:**
- API keys, tokens, or secrets
- Passwords or credentials
- Private keys or certificates
- Internal URLs or endpoints

**DO include:**
- Environment variable examples (`.env.example`)
- Configuration templates
- Public documentation links

**Security checklist:**
- [ ] Input validation on all user inputs
- [ ] SQL injection prevention (parameterized queries)
- [ ] XSS prevention (escape output)
- [ ] CSRF protection
- [ ] Rate limiting on API endpoints
- [ ] Secure random generation for tokens
- [ ] Dependency vulnerability scanning

### 5. Dependencies

**Best practices:**
- Keep dependencies minimal
- Use exact versions for critical deps
- Regular dependency updates
- Check for known vulnerabilities
- Document peer dependencies

```json
{
  "dependencies": {
    "critical-package": "1.2.3",  // Exact version
    "regular-package": "^2.0.0"   // Compatible versions
  },
  "peerDependencies": {
    "@acrobi/core": ">=0.1.0"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "jest": "^29.0.0"
  }
}
````

### 6. Error Handling

**Good error messages:**

```typescript
// Bad
throw new Error("Failed");

// Good
throw new Error(
  "Authentication failed: Invalid API key provided. " +
    "Please check your configuration in acrobi.json. " +
    "Documentation: https://docs.example.com/auth",
);
```

**Structured errors:**

```typescript
class ConfigurationError extends Error {
  constructor(field: string, value: any, expected: string) {
    super(
      `Configuration error in field "${field}": ` +
        `Expected ${expected}, got ${typeof value}`,
    );
    this.name = "ConfigurationError";
  }
}
```

### 7. Logging

Use the provided logger:

```typescript
export async function activate(context: ExtensionContext): Promise<void> {
  // Use context.logger instead of console.log
  context.logger.info("Extension activated");
  context.logger.debug("Debug information", { data: "value" });
  context.logger.warn("Warning message");
  context.logger.error("Error occurred", error);
}
```

### 8. TypeScript Support

Even for JavaScript packages, provide TypeScript definitions:

**index.d.ts:**

```typescript
export interface YourPackageConfig {
  apiKey: string;
  timeout?: number;
}

export class YourPackage {
  constructor(config: YourPackageConfig);
  doSomething(params: Record<string, any>): Promise<Result>;
}

export interface Result {
  success: boolean;
  data?: any;
  error?: string;
}
```

---

## Examples

### Example 1: Basic npm Package

**Directory structure:**

```
my-auth-package/
├── src/
│   ├── index.ts
│   └── provider.ts
├── dist/               (generated)
├── package.json
├── acrobi.json
├── tsconfig.json
├── README.md
└── LICENSE
```

**acrobi.json:**

```json
{
  "id": "myorg.auth-provider",
  "name": "My Auth Provider",
  "version": "1.0.0",
  "description": "Custom authentication provider for Acrobi",
  "author": {
    "name": "Your Name",
    "email": "you@example.com"
  },
  "category": "shell",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts"
}
```

**src/index.ts:**

```typescript
import { ExtensionContext, IAuthProvider } from "@acrobi/core";
import { MyAuthProvider } from "./provider";

export async function activate(context: ExtensionContext): Promise<void> {
  const authShell = context.shells.get("auth");
  const provider = new MyAuthProvider(context.config);

  await authShell.setProvider(provider);

  context.logger.info("My Auth Provider activated");
}

export async function deactivate(): Promise<void> {
  // Cleanup
}
```

### Example 2: Python Package with Hooks

**Directory structure:**

```
my-analytics/
├── src/
│   └── analytics/
│       ├── __init__.py
│       └── tracker.py
├── pyproject.toml
├── acrobi.json
├── README.md
└── LICENSE
```

**acrobi.json:**

```json
{
  "id": "myorg.analytics",
  "name": "Analytics Tracker",
  "version": "1.0.0",
  "description": "Track package downloads and user analytics",
  "author": {
    "name": "Your Name"
  },
  "category": "analytics",
  "main": "./src/analytics/__init__.py"
}
```

**src/analytics/**init**.py:**

```python
async def activate(context):
    """Extension activation function"""

    # Register hook for package downloads
    @context.hooks.add_action('package:downloaded')
    async def track_download(package):
        await track_event('download', {
            'package_id': package.id,
            'package_name': package.name,
            'version': package.version
        })

    context.logger.info('Analytics Tracker activated')

async def deactivate():
    """Cleanup function"""
    pass

async def track_event(event_type, data):
    """Send analytics event"""
    # Your tracking logic here
    pass
```

### Example 3: Rust Storage Provider

**Cargo.toml:**

```toml
[package]
name = "my-storage-provider"
version = "1.0.0"
authors = ["Your Name <you@example.com>"]
edition = "2021"
license = "MIT"

[dependencies]
# Your dependencies
```

**acrobi.json:**

```json
{
  "id": "myorg.storage-s3",
  "name": "S3 Storage Provider",
  "version": "1.0.0",
  "description": "AWS S3 storage backend for Acrobi",
  "author": {
    "name": "Your Name"
  },
  "category": "shell",
  "main": "./target/release/libmy_storage_provider.so"
}
```

---

## Support & Resources

### Documentation

- **Framework Docs**: https://github.com/Acrobi/acrobi-framework/tree/main/docs
- **Core API Reference**: https://github.com/Acrobi/acrobi-framework/tree/main/core/docs
- **Extension Examples**: https://github.com/Acrobi/acrobi-framework/tree/main/extensions

### Getting Help

- **GitHub Issues**: https://github.com/Acrobi/acrobi-framework/issues
- **Discussions**: https://github.com/Acrobi/acrobi-framework/discussions
- **Stack Overflow**: Tag your questions with `acrobi-framework`

### Contributing

- **Contributing Guide**: https://github.com/Acrobi/acrobi-framework/blob/main/CONTRIBUTING.md
- **Code of Conduct**: https://github.com/Acrobi/acrobi-framework/blob/main/CODE_OF_CONDUCT.md

---

## Appendix

### A. Complete acrobi.json Schema

```typescript
interface AcrobiManifest {
  // Required fields
  id: string; // Unique extension ID (org.package-name)
  name: string; // Human-readable name
  version: string; // Semantic version
  description: string; // Brief description
  author: Author | Author[]; // Author information
  category: ExtensionCategory; // Extension category
  main: string; // Entry point path

  // Optional fields
  license?: License; // License information
  keywords?: string[]; // Search keywords
  homepage?: string; // Homepage URL
  repository?: string; // Source repository URL
  bugs?: string; // Issue tracker URL
  dependencies?: Dependency[]; // Extension dependencies
  coreVersion?: string; // Required core version
  capabilities?: Capability[]; // Provided capabilities
  configSchema?: JSONSchema; // Configuration schema
  icon?: string; // Icon URL or data URI
  screenshots?: string[]; // Screenshot URLs
  types?: string; // TypeScript definitions path
  metadata?: Record<string, unknown>; // Custom metadata
}
```

### B. Hook Reference

See the [Core Hooks Documentation](./core/docs/HOOKS_REFERENCE.md) for a complete list of available hooks.

### C. Shell Interfaces

See the [Shell Architecture Guide](./core/docs/SHELLS.md) for detailed interface specifications.

---

**Last Updated:** November 18, 2024
**Version:** 1.0.0
**Maintained by:** Acrobi Framework Team
