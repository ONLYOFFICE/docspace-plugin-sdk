# DocSpace plugin samples

Every folder here is a standalone plugin, but they are wired together as npm workspaces:
a single `samples/node_modules` serves all of them, so there is no need to install
dependencies sample by sample.

## Build everything

From the repository root:

```sh
npm run build:samples
```

The script installs the shared dependencies on first run and writes one archive per
sample into `dist-plugins/` (git-ignored). Copy that folder to wherever you test
plugins and upload the archives to DocSpace.

Useful flags:

```sh
npm run build:samples -- --filter selector   # build a single sample
npm run build:samples -- --jobs 8            # more parallel builds
npm run build:samples -- --out ../plugins    # custom output folder
npm run build:samples -- --no-install        # skip the dependency check
npm run build:samples -- --help
```

## Adding a sample

Create the folder with a `package.json` that has a `build` script - the same layout as
any existing sample - and that is all. Samples are discovered from the filesystem, so
nothing has to be registered: the build script picks up the new folder, notices it is
missing from `samples/package-lock.json`, refreshes the shared dependencies and builds it.

## Notes

- The samples resolve `@onlyoffice/docspace-plugin-sdk` from the tarball in the repository
  root. When that tarball is rebuilt, the next `npm run build:samples` reinstalls it
  automatically (it compares modification times).
- `"types": []` in each `tsconfig.json` is deliberate. Sample code is browser-side and
  needs no ambient Node types; without it, TypeScript picks up the hoisted `@types/node`,
  which is newer than the TypeScript version the samples pin and fails to parse.
- Building a single sample by hand still works - `cd <sample> && npm run build` - the
  binaries and packages resolve from the shared `samples/node_modules`.
