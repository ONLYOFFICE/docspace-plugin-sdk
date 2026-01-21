/**
 * Defines the types of selector components that can be rendered.
 */
export enum SelectorType {
    /** A generic selector with a customizable list of items. */
    Base = 'base',
    /** A selector for browsing and selecting files and folders. */
    Files = 'files',
    /** A selector for choosing user groups. */
    Groups = 'groups',
    /** A selector for choosing users and guests. */
    People = 'people',
    /** A selector for browsing and selecting rooms. */
    Room = 'room'
}
