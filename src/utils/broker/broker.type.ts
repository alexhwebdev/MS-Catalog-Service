import { MessageType, CatalogEvent, TOPIC_TYPE } from "../../types";

export interface PublishType {
  headers: Record<string, any>;  // key is string, type can be any
  topic: TOPIC_TYPE;  // "OrderEvents" | "CatalogEvents";
  event: CatalogEvent;
  message: Record<string, any>;
}// Record : object type with specific key-value constraints

// export type MessageHandler = (input: MessageType) => {};
export type MessageHandler = (input: MessageType) => void;  // void is same as {}

export type MessageBrokerType = {
  // producer
  connectProducer: <T>() => Promise<T>;
  disconnectProducer: () => Promise<void>;  // void return type means the function does not return any meaningful value; it simply indicates completion.
  publish: (data: PublishType) => Promise<boolean>;

  // consumer
  connectConsumer: <T>() => Promise<T>;
  disconnectConsumer: () => Promise<void>;  // void return type means the function does not return any meaningful value; it simply indicates completion.
  subscribe: (
    messageHandler: MessageHandler,  // was messageHandler: Function,
    topic: TOPIC_TYPE   // was topic: string
  ) => Promise<void>;
};
