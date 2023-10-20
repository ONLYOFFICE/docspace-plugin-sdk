/**
 * Plain text.
 */
export interface IText {
  /**
   * Defines the text.
   */
  text: string;

  /**
   * Defines the text title.
   */
  title?: string;

  /**
   * Defines the text font size.
   */
  fontSize?: string;

  /**
   * Defines the text font weight.
   */
  fontWeight?: string | number;

  /**
   * Specifies whether the word wrapping is set.
   */
  truncate?: boolean;

  /**
   * Specifies whether the text font weight is set to bold.
   */
  isBold?: boolean;

  /**
   * Specifies whether the text style is set to italic.
   */
  isItalic?: boolean;

  /**
   * Specifies whether the "display: inline-block" property is set.
   */
  isInline?: boolean;

  /**
   * Specifies whether the "text-align" property is set.
   */
  textAlign?: string;

  /**
   * Specifies whether the text selection is disabled.
   */
  noSelect?: boolean;

  /**
   * Specifies whether the "display" property is set.
   */
  display?: string;

  /**
   * Defines the text line height.
   */
  lineHeight?: string;

  /**
   * Defines the text color.
   */
  color?: string;
}
