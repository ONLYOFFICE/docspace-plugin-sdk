# DocSpace plugin samples

Every folder here is a standalone plugin, but they are wired together as npm workspaces:
a single `samples/node_modules` serves all of them, so there is no need to install
dependencies sample by sample.

## Build everything

From the repository root:

```sh
npm run build:samples
```

The script builds the SDK, installs the shared dependencies on first run, and writes one
archive per sample into `dist-plugins/` (git-ignored). Copy that folder to wherever you test
plugins and upload the archives to DocSpace.

Useful flags:

```sh
npm run build:samples -- --filter selector   # build a single sample
npm run build:samples -- --jobs 8            # more parallel builds
npm run build:samples -- --out ../plugins    # custom output folder
npm run build:samples -- --no-install        # skip the SDK build and dependency check
npm run build:samples -- --help
```

## Adding a sample

Create the folder with a `package.json` that has a `build` script - the same layout as
any existing sample - and that is all. Samples are discovered from the filesystem, so
nothing has to be registered: the build script picks up the new folder, notices it is
missing from `samples/package-lock.json`, refreshes the shared dependencies and builds it.

## Notes

- The samples depend on the SDK as `file:../..`, which npm installs as a link to the
  repository root rather than a copy. They therefore always compile against the SDK
  sources in the working tree, and `npm run build:samples` builds the SDK first because
  `dist/` is not checked in. A sample that fails with unexplained `implicitly has an
  'any' type` errors is usually a sample built with a missing SDK `dist/`.
- `"types": []` in each `tsconfig.json` is deliberate. Sample code is browser-side and
  needs no ambient Node types; without it, TypeScript picks up the hoisted `@types/node`,
  which is newer than the TypeScript version the samples pin and fails to parse.
- Building a single sample by hand still works - `cd <sample> && npm run build` - the
  binaries and packages resolve from the shared `samples/node_modules`.
