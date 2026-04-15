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
		// "src/interfaces/items/*.ts",
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
	outputFileStrategy: "members",
	membersWithOwnFile: ["Interface", "Class", "Enum", "TypeAlias"],
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
	hideGenerator: true,
	categorizeByGroup: false,
	groupOrder: ["*"],
	sort: ["source-order"],
	sortEntryPoints: false,
	kindSortOrder: [
		"Project",
		"Module",
		"Namespace",
		"Enum",
		"EnumMember",
		"Class",
		"Interface",
		"TypeAlias",
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
	useCodeBlocks: true,
	expandObjects: true,
	expandParameters: true,
	propertiesFormat: "table",
	interfacePropertiesFormat: "table",
	classPropertiesFormat: "table",
	enumMembersFormat: "table",
	typeDeclarationFormat: "table",
	parametersFormat: "table",
	propertyMembersFormat: "table",
	tableColumnSettings: {
		hideDefaults: false,
		hideInherited: false,
		hideModifiers: false,
		hideOverrides: false,
		hideSources: false,
		hideValues: false,
		leftAlignHeaders: false
	},
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
		},
		member: (args) => {
			// Keep the default format for members
			return `${args.keyword ? args.keyword + " " : ""}${args.kind}: ${args.name}`;
		}
	}
};
