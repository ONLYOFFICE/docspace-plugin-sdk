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
	hideGenerator: true,
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
	githubPages: false,
	searchInComments: true,
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
	// Leave objects collapsed in signatures: expanding them inlines the whole
	// shape into one dense line that the "Type Declaration" section below already
	// documents property by property.
	expandObjects: true,
	expandParameters: true,
	// List format throughout: every member becomes a heading, so Docusaurus gives
	// it a native anchor and no HTML has to be injected into the output.
	propertiesFormat: "list",
	interfacePropertiesFormat: "list",
	classPropertiesFormat: "list",
	enumMembersFormat: "list",
	typeDeclarationFormat: "list",
	parametersFormat: "list",
	propertyMembersFormat: "list",
	textContentMappings: {
		"header.title": "API Reference",
		"breadcrumbs.home": "Home"
	},
	// Custom page title templates
	pageTitleTemplates: {
		index: (args) => `${args.projectName} ${args.version}`,
		module: (args) => {
			// Extract the last part of the path (e.g., "interfaces/components/Component" -> "Component")
			const parts = args.name.split("/");
			return parts[parts.length - 1];
		}
	}
};
