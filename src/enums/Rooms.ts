/**
 * Enumerations for DocSpace room types and search scopes.
 * @packageDocumentation
 */

/**
 * Defines the available search scopes for rooms within a room selector.
 */
export enum RoomSearchArea {
    /** Search across all available rooms. */
    Any = "Any",
    /** Search only within active rooms. */
    Active = "Active",
    /** Search only within archived rooms. */
    Archive = "Archive",
    /** Search only within room templates. */
    Templates = "Templates",
}

/**
 * Defines the different types of rooms available in the system.
 */
export enum RoomsType {
    /** A public room accessible to a wide audience. */
    PublicRoom = "public-room",
    /** A room designed for filling out forms. */
    FormRoom = "form-room",
    /** A room focused on collaborative document editing. */
    EditingRoom = "editing-room",
    /** A secure room for data storage and review. */
    VirtualDataRoom = "virtual-data-room",
    /** A room with custom permissions and settings. */
    CustomRoom = "custom-room",
}