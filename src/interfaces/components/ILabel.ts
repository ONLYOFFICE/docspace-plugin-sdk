/**
 * Field name in the form.
 */
export interface ILabel {
  /**
   * Defines the element text.
   */
  text: string;

  /**
   * Specifies whether the field to which the label is attached is required.
   */
  isRequired?: boolean;

  /**
   * Specifies whether the field to which the label is attached is incorrect.
   */
  error?: boolean;

  /**
   * Specifies whether the "display: inline-block" property is set.
   */
  isInline?: boolean;

  /**
   * Defines the label title.
   */
  title?: string;

  /**
   * Specifies whether the word wrapping is disabled.
   */
  truncate?: boolean;

  /**
   * Defines the field ID to which the label is attached.
   */
  htmlFor?: string;

  /**
   * Specifies whether the "display" property is set.
   */
  display?: string;
}
