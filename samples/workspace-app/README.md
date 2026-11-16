# Workspace app sample

A small "Deals" app embedded into the portal the way a CRM would be: a sidebar
entry with its own page, a card in the apps block of the Home page and a
pipeline widget below it. The administrator chooses in the plugin settings who
sees all three, so a newcomer gets access without the plugin being uploaded
again. Everything lives in [`src/index.tsx`](src/index.tsx).

| Item                   | Declared by                                | Where it shows                  |
| ---------------------- | ------------------------------------------ | ------------------------------- |
| `Deals` entry and page | `IArticleNavigationItem`                   | sidebar, page at `/p/<key>`     |
| `Deals` card           | `dashboardCard` of the same navigation item | Home page, apps block           |
| `Pipeline` widget      | `IDashboardWidgetItem`                     | Home page, below the apps block |

| Settings                        | Who sees the items                                 |
| ------------------------------- | -------------------------------------------------- |
| `Restrict access` off (default) | everyone                                           |
| `Restrict access` on            | the listed people and members of the listed groups |

How it works:

- The navigation item and the widget have `users` and `groups` with user and
  group IDs. The portal shows an item only to the listed users and the members
  of the listed groups. An empty array lists no one.
- The card is part of the navigation item, so it takes the item's label, icon
  and access and keeps the portal's own look. The plugin gives the description
  and the button label only; without an `onClick` the button opens the item's
  page, and a left-out description comes from the plugin manifest.
- Widgets take the full width of the page, one under another. The portal heads
  each with its title and description, like its own blocks, and draws no frame:
  the widget's component owns its look. `Pipeline` frames itself with
  `var(--tile-border)` and `var(--tile-border-radius)`, the portal's card border,
  which follows the light and dark theme.
- The settings page picks the IDs with `showSelector` (`SelectorType.People`,
  `isMultiSelect`, plus `withGroups` and `isGroupsOnly` for groups) and stores
  `{ restricted, users, groups }` with `usePluginSettings().save()`.
- The portal calls `setAdminPluginSettingsValue` for every user with the stored
  string. The plugin registers its items there, with the lists applied, and not
  in `onLoadCallback`, so no item is shown before its access is known.

Settings are one string of up to 4096 characters, enough for about 100 IDs.
Portals before 4.1 cap it at 255, ignore `users` and `groups` and have no Home
page items. The filter hides the items, not the data: the service behind the
page still has to check who is asking.

## Build

```bash
npm install
npm run build   # vite build && npx build-docspace-plugin → dist/plugin.zip
```
