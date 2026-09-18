# Article navigation sample

The smallest useful `ArticleNavigation` plugin: two sidebar entries, each opening
a plugin page built from [`@onlyoffice/apps-ui-kit`](https://github.com/ONLYOFFICE/docspace-ui-kit-react).
Everything lives in [`src/index.tsx`](src/index.tsx).

| Sidebar entry     | Appears in       | Visible to        | Page shows                   |
| ----------------- | ---------------- | ----------------- | ---------------------------- |
| `Sample files`    | Files section    | all user types    | signed-in user, toast button |
| `Sample settings` | Settings section | owner, full admin | a toggle                     |

A navigation item is four lines of data — `key`, `label`, `icon`, `component` —
plus the optional `appears` and `usersTypes` filters that decide where it shows
up. Clicking it opens a full portal page, not a dialog, and ONLYOFFICE Apps renders
`component` on that page inside its own React tree. So the page is a plain
component: `useCurrentUser` and `usePluginActions` reach the portal through
context, and the UI kit picks up the portal theme.

## Build

```bash
npm install
npm run build   # vite build && npx build-onlyoffice-plugin → dist/plugin.zip
```

`@onlyoffice/apps-ui-kit` is not published to npm. The packed tarball has to sit
next to this `package.json` before the install: `onlyoffice-apps-ui-kit-4.0.0.tgz`,
which the `dependencies` entry already points at. It is the same build the
ONLYOFFICE Apps client ships as `onlyoffice-apps-ui-kit.tgz` in its repository root, so
the components the plugin imports are the ones the portal substitutes at load
time.

```bash
# from a docspace-ui-kit-react checkout
pnpm build && pnpm pack
```

## Why react and the ui kit stay external

`vite.config.ts` keeps `react`, `react-dom`, `react/jsx-runtime`, the SDK's
React entry and every `@onlyoffice/apps-ui-kit` specifier out of the bundle. The client
rewrites those specifiers to its own copies when it loads the plugin. A bundled
React would be a second React instance with its own context objects, and every
SDK hook would throw; a bundled UI kit would read empty theme and direction
contexts and render light and left-to-right regardless of the portal.
