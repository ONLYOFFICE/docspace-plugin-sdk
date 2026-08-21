# Article navigation sample

Two article navigation items whose section pages are React components:

| Item              | Visible in       | Visible to               | Section page                                     |
| ----------------- | ---------------- | ------------------------ | ------------------------------------------------ |
| `Sample Overview` | all sections     | all user types           | [`OverviewSection.tsx`](src/OverviewSection.tsx) |
| `Sample Settings` | Settings section | owner, DocSpace admin    | [`SettingsSection.tsx`](src/SettingsSection.tsx) |

Between them they cover the whole React path of the `ArticleNavigation` scope:

- `sectionComponent` instead of the deprecated `section` IBox tree and `onLoad`;
- `usePluginAPI` for portal data, `useCurrentUser` for the signed-in user,
  `usePluginSettings` for persisted plugin settings, `usePluginActions` for toasts;
- `updateArticleNavigationItems` to redraw the sidebar after an item is renamed
  from inside its own page;
- [`@docspace/ui-kit`](https://github.com/ONLYOFFICE/DocSpace-client/tree/master/libs/ui-kit)
  components (`Heading`, `Text`, `Button`, `TextInput`, `RectangleSkeleton`), so the
  page matches the portal's own look and theme.

## Build

```bash
yarn install
yarn build     # vite build && npx build-docspace-plugin → dist/plugin.zip
```

`@docspace/ui-kit` is not published to npm. Drop the packed tarball next to this
`package.json` as `docspace-ui-kit-0.0.1.tgz` — the `dependencies` entry already
points at it — or repoint that entry at your local checkout:

```bash
# from libs/ui-kit in the DocSpace-client repo
pnpm build && pnpm pack
```

## Why everything shared is external

`vite.config.ts` keeps `react`, `react-dom`, `react/jsx-runtime`, both SDK entry
points and every `@docspace/ui-kit` specifier out of the bundle. This is not a
size optimisation — it is the only way the plugin can work:

- the plugin is loaded as an ES module and rendered **inside** the DocSpace React
  tree. A bundled copy of React would create a second React instance with its own
  context objects, and every SDK hook would throw
  "must be used inside a plugin component rendered by DocSpace";
- the UI kit reads the portal theme, locale and direction through its own React
  contexts, which the client mounts once at the application root. A bundled copy
  of the UI kit gets empty contexts — unthemed, untranslated components;
- `styled-components`, `i18next` and `mobx`, which the UI kit builds on, all
  require a single instance per page.

The client resolves the external specifiers when it loads the plugin. See
`packages/client/src/helpers/plugins/reactPluginShim.ts` in DocSpace-client: it
registers the host's copies on `window`, wraps each one in a blob-URL module and
rewrites the plugin's bare specifiers to those URLs before executing it.

> **Note**
> `reactPluginShim.ts` currently maps `react`, `react/jsx-runtime` and the two SDK
> entry points. `@docspace/ui-kit` has to be added to `SPECIFIER_MAP` for this
> sample to run — and because the shim matches specifiers exactly, either the
> lookup needs a prefix fallback for `@docspace/ui-kit/*` subpaths, or plugins
> must import from the package root only. This sample imports from the root, so
> a single `SPECIFIER_MAP` entry is enough for it.
