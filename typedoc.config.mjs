// @ts-check
/**
 * TypeDoc configuration
 * Note: Some properties are provided by plugins (typedoc-plugin-markdown, typedoc-docusaurus-theme)
 * and may not be present in the base TypeDocOptions type
 * @type {Partial<import('typedoc').TypeDocOptions> & Record<string, any>}
 */
export default {
  entryPoints: [
    "src/interfaces/components/*.ts",
    "src/interfaces/components/Selector/index.ts",
    "src/interfaces/items/*.ts",
    "src/interfaces/plugins/*.ts",
    "src/interfaces/settings/*.ts",
    "src/interfaces/utils/index.ts",
    "src/enums/*.ts"
  ],
  exclude: [
    "src/interfaces/components/index.ts",
    "src/interfaces/items/index.ts",
    "src/interfaces/plugins/index.ts",
    "src/interfaces/settings/index.ts",
    "src/enums/index.ts"
  ],
  entryPointStrategy: "expand",
  plugin: [
    "typedoc-plugin-markdown",
    "typedoc-plugin-frontmatter",
    "typedoc-docusaurus-theme"
  ],
  out: "docs",
  entryFileName: "index.md",
  outputFileStrategy: "modules",
  name: "@onlyoffice/docspace-plugin-sdk",
  includeVersion: true,
  excludeReferences: true,
  excludePrivate: true,
  excludeProtected: true,
  excludeInternal: true,
  excludeExternals: true,
  readme: "none",
  hideBreadcrumbs: true,
  hidePageHeader: true,
  hidePageTitle: true,
  hideGroupHeadings: true,
  categorizeByGroup: false,
  groupOrder: ["Overview", "Types", "*"],
  sort: ["source-order"],
  sortEntryPoints: false,
  kindSortOrder: [
    "Project",
    "Module",
    "Namespace",
    "Interface",
    "TypeAlias",
    "Class",
    "Enum",
    "EnumMember",
    "Constructor",
    "Property",
    "Variable",
    "Function",
    "Accessor",
    "Method",
    "Parameter",
    "TypeParameter",
    "TypeLiteral",
    "CallSignature",
    "ConstructorSignature",
    "IndexSignature",
    "GetSignature",
    "SetSignature"
  ],
  validation: {
    notExported: true,
    invalidLink: true,
    rewrittenLink: true,
    notDocumented: false,
    unusedMergeModuleWith: true
  },
  treatValidationWarningsAsErrors: false,
  disableSources: false,
  sourceLinkTemplate:
    "https://github.com/ONLYOFFICE/docspace-plugin-sdk/blob/{gitRevision}/{path}#L{line}",
  gitRevision: "master",
  // Keeps TypeDoc from dropping a .nojekyll into docs/, which docs:sync would
  // then carry into the site repository.
  githubPages: false,
  cleanOutputDir: true,
  commentStyle: "jsdoc",
  locales: {
    en: {
      tag_deprecated: "Deprecated:",
      tag_remarks: "Remarks:"
    }
  },
  useTsLinkResolution: true,
  jsDocCompatibility: {
    defaultTag: true,
    exampleTag: true,
    ignoreUnescapedBraces: true
  },
  sidebar: {
    autoConfiguration: true,
    pretty: true
  },
  // Signatures as ```ts fences. The alternative, blockquotes, keeps type names
  // linked, but a long union or intersection then wraps into a dense run of
  // escaped braces; the fence breaks it across lines and highlights it.
  useCodeBlocks: true,
  // Expand inline objects and parameters in signatures. Collapsed, they render
  // as a bare `object`, which tells the reader nothing. The cost is that their
  // fields also appear in the "Type Declaration" section below — the signature
  // is the overview, that section is the reference.
  expandObjects: true,
  expandParameters: true,
  // Table format throughout, matching docspace-sdk-js: members are rows rather
  // than headings, which keeps a long member list scannable. TypeDoc puts an
  // <a id> anchor on every row, so deep links still work — that is the one place
  // the output carries raw HTML.
  propertiesFormat: "table",
  interfacePropertiesFormat: "table",
  classPropertiesFormat: "table",
  // Enum members stay a list. Their descriptions carry the @example blocks that
  // show the message an action belongs in, and a fenced block cannot live in a
  // table cell — TypeDoc flattens it into one unreadable run of inline code.
  enumMembersFormat: "list",
  typeDeclarationFormat: "table",
  parametersFormat: "table",
  propertyMembersFormat: "table",
  // The per-member source link is dropped from the tables: generate-index-pages
  // keeps one "View source on GitHub" link per symbol instead.
  tableColumnSettings: {
    hideSources: true
  }
};
