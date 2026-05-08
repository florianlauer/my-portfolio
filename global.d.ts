import type messages from "./src/messages/fr.json";

declare global {
  type Messages = typeof messages;
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface IntlMessages extends Messages {}
}

export {};
