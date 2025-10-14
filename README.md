# ONLYOFFICE DocSpace Plugins SDK

## Overview

ONLYOFFICE DocSpace Plugins SDK is an npm package based on TypeScript engines which provides interfaces to create your own plugins for embedding in the DocSpace portal.

To install the *@onlyoffice/docspace-plugin-sdk* npm package globally, run the following command in the terminal:

```
npm i -g @onlyoffice/docspace-plugin-sdk
```

## Functionality

- Creating base plugins with the [npx](https://github.com/ONLYOFFICE/docspace-plugin-sdk/tree/master/npx) command.
- Embedding plugins in context menu, info panel, profile menu, main button using the corresponding [interfaces](https://github.com/ONLYOFFICE/docspace-plugin-sdk/tree/master/src/interfaces).
- Configuring plugin UI using the DocSpace plugins [components](https://github.com/ONLYOFFICE/docspace-plugin-sdk/tree/master/src/interfaces/components).

## npx

After installing the npm package, the *npx create-docspace-plugin* command becomes available and allows you to create a plugin template with the pre-installed plugin types and the implementation of basic methods.

This command displays a dialog which allows you to configure the plugin settings and select the required scopes.

You can find a list of all the dialog questions [here](https://github.com/ONLYOFFICE/docspace-plugin-sdk/blob/master/npx/dialog.js).

## Developing a plugin

* Write code for each [plugin type](https://github.com/ONLYOFFICE/docspace-plugin-sdk/tree/master/src/interfaces/plugins) using the corresponding variables, methods and [items](https://github.com/ONLYOFFICE/docspace-plugin-sdk/tree/master/src/interfaces/items). Put the scripts into the *src* folder. Specify the required [Plugin](https://github.com/ONLYOFFICE/docspace-plugin-sdk/blob/master/src/interfaces/plugins/IPlugin.ts) interface for each plugin to be embedded in the portal.
* Specify [plugin messages](https://github.com/ONLYOFFICE/docspace-plugin-sdk/blob/master/src/interfaces/utils/index.ts) that will be returned by the items. Use the appropriate events that will be processed on the portal side.
* Configure the plugin UI using the [plugin components](https://github.com/ONLYOFFICE/docspace-plugin-sdk/tree/master/src/interfaces/components).

Code samples are available at [https://github.com/ONLYOFFICE/docspace-plugins](https://github.com/ONLYOFFICE/docspace-plugins).

For plugins created with the old template (SDK 1.1.1), replace the build script in *package.json* with the following:
```json
"build": "webpack && npx build-docspace-plugin"
```

## Building a plugin

To build a plugin, you need the *yarn* package manager to be installed. After that, follow the instructions below:

1. Open the terminal and go to the plugin root folder:

```
cd PDF-Converter
```

2. Install all the necessary dependencies (if this was not done previously when creating the plugin template):

```
yarn install
```

3. Collect an archive for uploading to the portal:

```
yarn build
```

This command generates the obfuscated code from the entire project and collects it into the *plugin.js* file using the *webpack* npm package.

The *dist* folder will be created in the root plugin folder and the plugin archive will be placed in it. This archive is the completed plugin that can be uploaded to the DocSpace portal.