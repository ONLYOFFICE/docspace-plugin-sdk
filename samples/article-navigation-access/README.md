# Article navigation access sample

A sidebar entry, `Deals`, that only chosen people and groups see. The
administrator picks them in the plugin settings, so a newcomer gets access
without the plugin being uploaded again. Everything lives in
[`src/index.tsx`](src/index.tsx).

| Settings                        | Who sees `Deals`                                  |
| ------------------------------- | ------------------------------------------------- |
| `Restrict access` off (default) | everyone                                          |
| `Restrict access` on            | the listed people and members of the listed groups |

How it works:

- `IArticleNavigationItem.users` and `groups` hold user and group IDs. The portal
  shows the entry only to the listed users and the members of the listed groups.
  An empty array lists no one.
- The settings page picks the IDs with `showSelector` (`SelectorType.People`,
  `isMultiSelect`, plus `withGroups` and `isGroupsOnly` for groups) and stores
  `{ restricted, users, groups }` with `usePluginSettings().save()`.
- The portal calls `setAdminPluginSettingsValue` for every user with the stored
  string. The plugin registers the entry there, with the lists applied, and not
  in `onLoadCallback`, so the entry is never shown before its access is known.

Settings are one string of up to 4096 characters, enough for about 100 IDs.
Portals before 4.1 cap it at 255 and ignore `users` and `groups`. The filter
hides the entry, not the data: the service behind the page still has to check
who is asking.

## Build

```bash
npm install
npm run build   # vite build && npx build-docspace-plugin → dist/plugin.zip
```
