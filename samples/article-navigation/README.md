# Article navigation sample

The smallest useful `ArticleNavigation` plugin: two sidebar entries, each opening
a plugin page built from [`@docspace/ui-kit`](https://github.com/ONLYOFFICE/docspace-ui-kit-react).
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
npm run build   # vite build && npx build-plugin → dist/plugin.zip
```

`@docspace/ui-kit` is not published to npm. Two packed tarballs have to sit next
to this `package.json` before the install:

- `docspace-ui-kit-0.0.1.tgz` — the UI kit itself, which the `dependencies` entry
  already points at;
- `onlyoffice-docspace-api-sdk-3.7.0.tgz` — the UI kit depends on it as
  `file:onlyoffice-docspace-api-sdk-3.7.0.tgz`, a path npm resolves against the
  project root rather than the tarball, so the install fails with `ENOENT` when
  it is missing.

```bash
# the UI kit: from a docspace-ui-kit-react checkout
pnpm build && pnpm pack

# the API SDK is on npm, so packing it needs no checkout
npm pack @onlyoffice/docspace-api-sdk@3.7.0
```

## Why react and the ui kit stay external

`vite.config.ts` keeps `react`, `react-dom`, `react/jsx-runtime`, the SDK's
React entry and every `@docspace/ui-kit` specifier out of the bundle. The client
rewrites those specifiers to its own copies when it loads the plugin. A bundled
React would be a second React instance with its own context objects, and every
SDK hook would throw; a bundled UI kit would read empty theme and direction
contexts and render light and left-to-right regardless of the portal.
