/** Enum for filter type used in file selectors. */
export enum FilterType {
	/** No filter applied. */
	None = 0,
	/** Show files only (excludes folders). */
	FilesOnly = 1,
	/** Show folders only (excludes files). */
	FoldersOnly = 2,
	/** Show document files only (e.g. .docx, .odt). */
	DocumentsOnly = 3,
	/** Show presentation files only (e.g. .pptx, .odp). */
	PresentationsOnly = 4,
	/** Show spreadsheet files only (e.g. .xlsx, .ods). */
	SpreadsheetsOnly = 5,
	/** Show image files only (e.g. .png, .jpg, .gif). */
	ImagesOnly = 7,
}
