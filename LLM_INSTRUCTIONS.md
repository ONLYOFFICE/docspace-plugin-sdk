# ONLYOFFICE DocSpace Plugin SDK - LLM Instructions

## 1. PROJECT CONTEXT

### What is DocSpace Plugin SDK?

**@onlyoffice/docspace-plugin-sdk** is an official TypeScript-based npm package that provides interfaces, types, and tools for creating plugins for ONLYOFFICE DocSpace portal.

**Core repositories:**
- **SDK**: https://github.com/ONLYOFFICE/docspace-plugin-sdk
- **Plugin Examples**: https://github.com/ONLYOFFICE/docspace-plugins
- **DocSpace Client Core**: https://github.com/ONLYOFFICE/DocSpace-client/tree/master/packages/client/src/helpers/plugins

### Plugin Architecture

DocSpace plugins use an **iframe-based message-passing architecture**:

1. **Plugin Runtime**: Runs inside an isolated iframe in DocSpace
2. **Communication**: Uses `postMessage` API to communicate with DocSpace client
3. **UI Integration**: Plugins extend DocSpace UI through predefined integration points
4. **Lifecycle**: Managed by DocSpace with callbacks for load, status updates, and cleanup

### Main Plugin Types (Scopes)

Plugins implement one or more of these interfaces:

1. **IPlugin** (required) - Base interface with status and lifecycle
2. **IApiPlugin** - Provides custom API methods callable from DocSpace
3. **ISettingsPlugin** - Adds plugin settings page in admin panel
4. **IContextMenuPlugin** - Adds items to file/folder context menus
5. **IInfoPanelPlugin** - Adds items to right-side info panel
6. **IMainButtonPlugin** - Adds items to main "+" button
7. **IProfileMenuPlugin** - Adds items to user profile menu
8. **IEventListenerPlugin** - Subscribes to DocSpace events (file operations, user actions)
9. **IFilePlugin** - Provides file format handlers and converters

### Key Capabilities

- **UI Components**: 20+ ready-to-use components (Button, Input, Modal, Selector, Toast, etc.)
- **Actions**: 20+ actions to control DocSpace (show modals, update UI, open selectors, etc.)
- **Events**: Subscribe to file operations, user actions, room changes
- **Settings**: Persistent plugin configuration stored in DocSpace

---

## 2. CODE GENERATION RULES

### TypeScript Style Guide

**MANDATORY RULES:**

1. **Always use TypeScript** - Never generate plain JavaScript for plugins
2. **Import types from SDK** - Never define custom interfaces that exist in SDK
3. **Use exact SDK API** - Never invent methods or properties not in SDK
4. **Implement required interfaces** - Every plugin MUST implement `IPlugin` at minimum
5. **Use enums, not strings** - Use `Actions`, `Components`, `Events`, `PluginStatus` enums
6. **Return IMessage** - Item callbacks must return `IMessage` object with `actions` array

**CORRECT IMPORTS:**

```typescript
import {
  IPlugin,
  IContextMenuPlugin,
  IContextMenuItem,
  Actions,
  Components,
  FilesType,
  PluginStatus,
  IMessage,
  IButton,
  IModalDialog,
} from "@onlyoffice/docspace-plugin-sdk";
```

**WRONG - Never do this:**

```typescript
// ❌ WRONG: Custom interface instead of SDK
interface MyPlugin {
  name: string;
  init: () => void;
}

// ❌ WRONG: String instead of enum
onClick: () => ({ actions: ["show-toast"] })

// ❌ WRONG: Missing IPlugin implementation
export const plugin: IContextMenuPlugin = { /* ... */ }
```

### Plugin Structure After npx

When `npx create-docspace-plugin` creates a project, it generates:

```
my-plugin/
├── src/
│   └── index.ts          # Main plugin file
├── assets/               # Icons and images (16x16px PNG/SVG)
├── dist/                 # Build output (generated)
│   ├── plugin.js        # Compiled code
│   ├── plugin.css       # Compiled styles (if any)
│   └── plugin.zip       # Final plugin archive
├── package.json         # Dependencies and scripts
├── tsconfig.json        # TypeScript config
├── webpack.config.js    # Build configuration
├── .prettierrc.json     # Code formatting
└── .gitignore
```

**Key Files:**

- **src/index.ts** - Plugin implementation (export all plugin interfaces)
- **assets/** - Store icons as `icon-name.svg` or `icon-name.png` (16x16px)
- **package.json** - Must include `"scopes"` array matching plugin types
- **dist/plugin.zip** - Final artifact uploaded to DocSpace

### Build System

**Scripts in package.json:**

```json
{
  "scripts": {
    "build": "webpack && npx build-docspace-plugin",
    "format": "npx prettier --write ."
  }
}
```

**Build process:**
1. `webpack` - Compiles TypeScript → `dist/plugin.js`
2. `npx build-docspace-plugin` - Bundles into `dist/plugin.zip` with:
   - dist/plugin.js (required)
   - dist/plugin.css (if exists)
   - assets/* (icons, images)
   - config.json (auto-generated from package.json)

### Return Message Pattern

**ALWAYS follow this pattern for callbacks:**

```typescript
onClick: () => {
  return {
    actions: [Actions.showToast, Actions.closeModal],
    toastProps: [{
      type: ToastType.success,
      title: "Operation completed"
    }],
  };
}
```
## 3. STEP-BY-STEP PLUGIN CREATION

### Step 1: Initialize Plugin

```bash
# Install SDK globally
npm install -g @onlyoffice/docspace-plugin-sdk

# Check if SDK is installed
npm list -g @onlyoffice/docspace-plugin-sdk

# Create new plugin (interactive)
npx create-docspace-plugin

# Follow prompts:
# - Plugin name: my-awesome-plugin
# - Version: 1.0.0
# - Author: Your Name
# - Logo: logo.svg
# - Description: My awesome plugin
# - License: MIT
# - Homepage: https://example.com
# - Scopes: [Select with Space, Enter to confirm]
#   [x] Context menu
#   [x] Settings
#   [x] API
```

### Step 2: Minimal Working Plugin

**src/index.ts:**

```typescript
import {
  IPlugin,
  IContextMenuPlugin,
  IApiPlugin,
  IContextMenuItem,
  Actions,
  FilesType,
  PluginStatus,
  ToastType,
} from "@onlyoffice/docspace-plugin-sdk";

// Required: Base plugin interface
class PluginName implements IPlugin, IContextMenuPlugin, IApiPlugin {
  status: PluginStatus = PluginStatus.Active;

  origin = "";
  proxy = "";
  prefix = "";

  contextMenuItems: Map<string, IContextMenuItem> = new Map();

  onLoadCallback = async () => {
    console.log("Plugin loaded successfully");
  };

  setOnLoadCallback = (callback: () => Promise<void>) => {
    this.onLoadCallback = callback;
  };

  updateStatus = (status: PluginStatus) => {
    this.status = status;
  };

  getStatus = () => {
    return this.status;
  };

   setOrigin = (origin: string): void => {
    this.origin = origin;
  };

  getOrigin = (): string => {
    return this.origin;
  };

  setProxy = (proxy: string): void => {
    this.proxy = proxy;
  };

  getProxy = (): string => {
    return this.proxy;
  };

  setPrefix = (prefix: string): void => {
    this.prefix = prefix;
  };

  getPrefix = (): string => {
    return this.prefix;
  };

  setAPI = (origin: string, proxy: string, prefix: string): void => {
    this.origin = origin;
    this.proxy = proxy;
    this.prefix = prefix;
  };

  getAPI = (): { origin: string; proxy: string; prefix: string } => {
    return { origin: this.origin, proxy: this.proxy, prefix: this.prefix };
  };

  // Context Menu Plugin Methods
  getContextMenuItems = (): Map<string, IContextMenuItem> => {
    return this.contextMenuItems;
  };

   getContextMenuItemsKeys = (): string[] => {
    const keys = Array.from(this.contextMenuItems).map(([key, item]) => key);

    return keys;
  };

   updateContextMenuItem = (item: IContextMenuItem): void => {
    this.contextMenuItems.set(item.key, item);
  };

};

const plugin = new PluginName();

declare global {
  interface Window {
    Plugins: any;
  }
}

// Context menu item definition
const contextMenuItem: IContextMenuItem = {
  key: "my-action",
  label: "My Action",
  icon: "icon.svg", // From assets/icon.svg
  fileType: [FilesType.file],
  withActiveItem: true,

  onClick: () => {
    return {
      actions: [Actions.showToast],
      toastProps: [{
        type: ToastType.success,
        title: "Action executed!",
      }],
    };
  },
};

plugin.addContextMenuItem(contextMenuItem);

window.Plugins.PluginName = plugin || {};

export default plugin;
```

### Step 3: Add Icon Asset

**assets/icon.svg:**

```svg
<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
  <rect width="16" height="16" fill="#4CAF50"/>
  <text x="8" y="12" font-size="12" text-anchor="middle" fill="white">A</text>
</svg>
```

### Step 4: Update package.json

Ensure scopes match your implementation:

```json
{
  "name": "my-awesome-plugin",
  "version": "1.0.0",
  "scopes": ["API", "ContextMenu"],
  "scripts": {
    "build": "webpack && npx build-docspace-plugin"
  }
}
```

### Step 5: Build Plugin

```bash
# Install dependencies (first time)
yarn install

# Build plugin
yarn build

# Output: dist/plugin.zip
```

### Step 6: Upload to DocSpace

1. Open DocSpace as admin
2. Navigate to Settings → Developer Tools → Plugins
3. Click "Upload plugin"
4. Select `dist/plugin.zip`
5. Enable plugin in list

### Step 7: Test Plugin

1. Go to files section
2. Right-click on a file
3. Look for "My Action" in context menu
4. Click it - should show success toast

---

## 4. QUICK REFERENCE

### Common Actions

```typescript
// Show toast notification
{ actions: [Actions.showToast], toastProps: [{ type: ToastType.success, title: "Done" }] }

// Open modal
{ actions: [Actions.showModal], modalDialogProps: { /* ... */ } }

// Close modal
{ actions: [Actions.closeModal] }

// Open selector (files, people, rooms)
{ actions: [Actions.showSelector], selectorProps: { type: SelectorType.Files, /* ... */ } }

// Save settings
{ actions: [Actions.saveSettings], settings: { key: "value" } }

// Add floating operations
{ actions: [Actions.addFloatingOperationsButton], floatingOperationsButtonProps: { /* ... */ } }

// Update floating operations
{ actions: [Actions.updateFloatingOperationsButton], floatingOperationsButtonProps: { /* ... */ } }

// Remove floating operations
{ actions: [Actions.removeFloatingOperationsButton], floatingOperationsButtonPropsId: "id" }
```

### Component Groups

```typescript
import { Components } from "@onlyoffice/docspace-plugin-sdk";

// Available components:
Components.button
Components.input
Components.checkbox
Components.toggleButton
Components.comboBox
Components.textarea
Components.label
Components.text
Components.box
Components.image
Components.iframe
Components.skeleton
Components.toasts // For toast array
```

### File Types & Extensions

```typescript
import { FilesType, FilesExst } from "@onlyoffice/docspace-plugin-sdk";

// File types
FilesType.file
FilesType.folder
FilesType.room

// Extensions
FilesExst.docx
FilesExst.xlsx
FilesExst.pptx
FilesExst.pdf
// ... and more
```

---

## 5. VERSION COMPATIBILITY

**Current SDK Version: 2.0.0+**

**Breaking changes from 1.x:**

1. `npx build-docspace-plugin` command replaces manual createZip.js
2. Build script must be: `"build": "webpack && npx build-docspace-plugin"`

**Migration from 1.x to 2.0:**

```json
// OLD (1.x)
{
  "scripts": {
    "build": "webpack && node scripts/createZip.js"
  }
}

// NEW (2.0+)
{
  "scripts": {
    "build": "webpack && npx build-docspace-plugin"
  }
}
```

---

## 6. AI ASSISTANT BEHAVIOR EXAMPLES

### Example 1: User Asks to Create Plugin (Correct Flow)

**User:** "Create a plugin that adds a 'Share to Telegram' button in context menu"

**AI Response:**

```
I'll help you create a "Share to Telegram" plugin! Let's start with the setup.

**Step 1: Verify SDK Installation**

Please run this command to check if the SDK is installed:

```bash
npm list -g @onlyoffice/docspace-plugin-sdk
```

Let me know what output you get, and we'll proceed from there!
```

**✅ Correct:** AI checks installation BEFORE doing anything else.

---

### Example 2: SDK Not Installed (Correct Guidance)

**User:** "It says 'npm ERR! code ELSPROBLEMS'"

**AI Response:**

```
The SDK is not installed globally. Let's install it:

```bash
npm install -g @onlyoffice/docspace-plugin-sdk
```

After installation completes, verify it worked:

```bash
npx create-docspace-plugin --help
```

You should see help text. Let me know when you see it!
```

**✅ Correct:** AI guides user through installation and verification.

---

### Example 3: User in SDK Directory (Correct Fix)

**User:** "Getting error: 'could not determine executable to run'"

**AI Response:**

```
This error usually means you're inside the SDK repository directory. Let's navigate elsewhere:

```bash
# Go to home directory
cd ~

# Create a plugins directory
mkdir docspace-plugins
cd docspace-plugins

# Now try creating the plugin
npx create-docspace-plugin
```

This should start the interactive wizard!
```

**✅ Correct:** AI identifies the issue and provides clear fix.

---

### Example 4: WRONG - Skipping Prerequisites

**User:** "Create a plugin that shows file statistics"

**❌ WRONG AI Response:**

```
Sure! Here's the code for your plugin:

[generates tons of TypeScript code without checking SDK installation]
```

**Why it's wrong:**
- Assumes SDK is installed
- Doesn't verify user can actually create a plugin
- User will be stuck with code but no way to use it

**✅ CORRECT AI Response:**

```
I'll help you create a file statistics plugin!

First, let's make sure your environment is ready. Please run:

```bash
npm list -g @onlyoffice/docspace-plugin-sdk
```

This checks if the SDK is installed. What output do you get?
```

---

### Example 5: After Template Created (Correct Next Steps)

**User:** "Template created successfully! What's next?"

**AI Response:**

```
Great! Now let's implement the plugin logic.

**Navigate to your plugin:**

```bash
cd your-plugin-name
```

**Open src/index.ts** - this is where we'll add the functionality.

Based on your requirements, we need:
- Context menu integration (already in template)
- File statistics calculation
- Modal to display stats

Let me show you the implementation...

[provides actual TypeScript code using SDK interfaces]
```

**✅ Correct:** AI proceeds to implementation ONLY after template is ready.

---

### Example 6: User Without DocSpace Access

**User:** "I don't have DocSpace installed, can I still develop?"

**AI Response:**

```
You can write the plugin code, but you'll need DocSpace to test it.

**Options:**

1. **Install DocSpace locally** (Docker recommended):

2. **Use ONLYOFFICE Cloud** - Sign up for free trial at onlyoffice.com

3. **Develop without testing** - Write code now, test later (not recommended)

**For learning**, I recommend option 1 or 2. Which would you prefer?
```

**✅ Correct:** AI provides options and explains limitations.

---

### Key Takeaways for AI Assistants

1. **ALWAYS check prerequisites first** - Don't assume anything is installed
2. **Guide step-by-step** - Especially for users without experience
3. **Verify each step** - Ask for confirmation before proceeding
4. **Provide context** - Explain WHY each step is needed
5. **Handle errors gracefully** - Common issues have common solutions
6. **Don't overwhelm** - One step at a time, especially for beginners
7. **Test assumptions** - If user says "it doesn't work", ask for error messages

**Remember:** The goal is to make plugin development accessible to developers WITHOUT prior DocSpace/SDK knowledge. Your patient guidance is critical!

---

## FINAL NOTES

- **Always validate your code** against real SDK types - never guess
- **Test in real DocSpace instance** before considering plugin complete
- **Follow TypeScript strict mode** - enable in tsconfig.json
- **Use Prettier** for consistent formatting - included in template
- **Check examples** at https://github.com/ONLYOFFICE/docspace-plugins for reference
- **Read SDK source code** when documentation is unclear - it's the source of truth
- **Multiple actions** can be combined in single return message
- **Async operations** should use proper loading states and error handling

When in doubt, refer to official SDK types and working plugin examples. The SDK is strongly typed - leverage TypeScript intellisense!
