# ONLYOFFICE Apps Plugins SDK

## Overview

ONLYOFFICE Apps Plugins SDK is an npm package based on TypeScript engines which provides interfaces to create your own plugins for embedding in the ONLYOFFICE Apps portal.

To install the *@onlyoffice/docspace-plugin-sdk* npm package globally, run the following command in the terminal:

```
npm i -g @onlyoffice/docspace-plugin-sdk
```

:::note
Plugins built with SDK 3.0.0 require ONLYOFFICE Apps 4.0.0 or higher. On an earlier portal the plugin is installed but does not work: the portal marks it as incompatible and does not supply the module runtime it needs.
:::

## Functionality

- Creating base plugins with the [npx](https://github.com/ONLYOFFICE/docspace-plugin-sdk/tree/master/npx) command.
- Embedding plugins in context menu, info panel, profile menu, main button, article panel and the article sidebar using the corresponding [interfaces](https://github.com/ONLYOFFICE/docspace-plugin-sdk/tree/master/src/interfaces).
- Configuring plugin UI using the ONLYOFFICE Apps plugins [components](https://github.com/ONLYOFFICE/docspace-plugin-sdk/tree/master/src/interfaces/components).
- Writing plugin UI as React components and connecting them to the portal with the hooks from the [@onlyoffice/docspace-plugin-sdk/react](https://github.com/ONLYOFFICE/docspace-plugin-sdk/tree/master/src/react) entry.

## npx

After installing the npm package, the *npx create-onlyoffice-plugin* command becomes available and allows you to create a plugin template with the pre-installed plugin types and the implementation of basic methods.

This command displays a dialog which allows you to configure the plugin settings and select the required scopes.

You can find a list of all the dialog questions [here](https://github.com/ONLYOFFICE/docspace-plugin-sdk/blob/master/npx/dialog.js).

:::note
The former command names *create-docspace-plugin* and *build-docspace-plugin* still work as aliases and are deprecated. Both print a deprecation warning and hand over to the same scripts, so an existing plugin keeps building unchanged.
:::

## Developing a plugin

* Write code for each [plugin type](https://github.com/ONLYOFFICE/docspace-plugin-sdk/tree/master/src/interfaces/plugins) using the corresponding variables, methods and [items](https://github.com/ONLYOFFICE/docspace-plugin-sdk/tree/master/src/interfaces/items). Put the scripts into the *src* folder. Specify the required [Plugin](https://github.com/ONLYOFFICE/docspace-plugin-sdk/blob/master/src/interfaces/plugins/IPlugin.ts) interface for each plugin to be embedded in the portal.
* Export the plugin instance as the module default export. The portal imports the plugin bundle as an ES module and takes its `default` export.
* Specify [plugin messages](https://github.com/ONLYOFFICE/docspace-plugin-sdk/blob/master/src/interfaces/utils/index.ts) that will be returned by the items. Use the appropriate events that will be processed on the portal side.
* Configure the plugin UI either with the declarative [plugin components](https://github.com/ONLYOFFICE/docspace-plugin-sdk/tree/master/src/interfaces/components) or with your own React components passed to the item `component` property.

Code samples are available at [https://github.com/ONLYOFFICE/docspace-plugins](https://github.com/ONLYOFFICE/docspace-plugins) and in the [samples](https://github.com/ONLYOFFICE/docspace-plugin-sdk/tree/master/samples) folder of this repository.

## React components

An item can render a React component instead of a declarative component tree: `component` in [IInfoPanelItem](https://github.com/ONLYOFFICE/docspace-plugin-sdk/blob/master/src/interfaces/items/IInfoPanelItem.ts), [IArticleButtonItem](https://github.com/ONLYOFFICE/docspace-plugin-sdk/blob/master/src/interfaces/items/IArticleButtonItem.ts), [IArticleNavigationItem](https://github.com/ONLYOFFICE/docspace-plugin-sdk/blob/master/src/interfaces/items/IArticleNavigationItem.ts), [IMediaViewer](https://github.com/ONLYOFFICE/docspace-plugin-sdk/blob/master/src/interfaces/components/IMediaViewer.ts), [ISettings](https://github.com/ONLYOFFICE/docspace-plugin-sdk/blob/master/src/interfaces/settings/ISettings.ts), and `dialogBodyComponent` in [IModalDialog](https://github.com/ONLYOFFICE/docspace-plugin-sdk/blob/master/src/interfaces/components/IModalDialog.ts).

The component is rendered inside the ONLYOFFICE Apps application tree and reaches the portal through the hooks exported from the *@onlyoffice/docspace-plugin-sdk/react* entry: `usePluginAPI`, `usePluginActions`, `usePluginSettings`, `useCurrentFile`, `useCurrentUser`, `usePluginRuntime`, and the `withPluginRuntime` HOC.

*react* is an optional peer dependency of the SDK (version 19 or higher). Plugins that use no React components do not need it.

React, react-dom and the SDK React entry must be left out of the plugin bundle — the portal supplies its own copies at load time. The [article-navigation](https://github.com/ONLYOFFICE/docspace-plugin-sdk/tree/master/samples/article-navigation) sample contains a working build configuration, including the [@docspace/ui-kit](https://github.com/ONLYOFFICE/docspace-ui-kit-react) components which the portal supplies the same way.

## Building a plugin

To build a plugin, you need *Node.js* and *npm* to be installed. After that, follow the instructions below:

1. Open the terminal and go to the plugin root folder:

```
cd PDF-Converter
```

2. Install all the necessary dependencies (if this was not done previously when creating the plugin template):

```
npm install
```

3. Collect an archive for uploading to the portal:

```
npm run build
```

This command bundles the entire project into the *plugin.js* ES module using the *vite* npm package and then packs it with *npx build-onlyoffice-plugin*.

The *dist* folder will be created in the root plugin folder and the plugin archive will be placed in it. This archive is the completed plugin that can be uploaded to the ONLYOFFICE Apps portal.

## Updating a plugin to SDK 3.0.0

For plugins created with an SDK 2.x template:

* Replace the Webpack build with Vite. Take [vite.config.ts](https://github.com/ONLYOFFICE/docspace-plugin-sdk/blob/master/template/vite.config.ts) from the template — it already lists the modules that must stay external and names the CSS output *plugin.css*.
* Change the build script in *package.json*:

```json
"build": "vite build && npx build-onlyoffice-plugin"
```

* Add `"runtime": "module"` to *package.json*, export the plugin instance as the default export and remove the *window.Plugins* registration from *src/index.ts*.
* Replace the deprecated `body`, `content`, `settings`, `dialogBody` and `dialogFooter` properties with `component` (`dialogBodyComponent` in *IModalDialog*), and move the work done in `onLoad` into a `useEffect` inside the component.

For plugins created with the old template (SDK 1.1.1), the *createZip* script is no longer required and can be safely removed.
