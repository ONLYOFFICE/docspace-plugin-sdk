import { IEventListenerItem } from "../items";
/**
 * The plugin that is given the access to the portal events.
 */
export interface IEventListenerPlugin {
  /**
   * Stores a collection of elements where the keys are the key parameters from the EventListenerItem objects.
   * A list of event listeners is generated based on this collection.
   */
  eventListenerItems: Map<string, IEventListenerItem>;

  /**
   * Add a new event listener item.
   *
   * @param item Defines an event listener item.
   */
  addEventListenerItem(item: IEventListenerItem): void;

  /**
   * Get all the event listener items.
   *
   * @returns A collection of elements where the keys are the key parameters from the EventListenerItem objects.
   */
  getEventListenerItems(): Map<string, IEventListenerItem>;
}
