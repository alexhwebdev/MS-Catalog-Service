export enum CatalogEvent {
  CREATE_ORDER = "create_order",
  CANCEL_ORDER = "cancel_order",
}
export type TOPIC_TYPE = "OrderEvents" | "CatalogEvents";

export interface MessageType {
  headers?: Record<string, any>;  // key is string, type can be any
  event: CatalogEvent;
  data: Record<string, any>;  // key is string, type can be any
}
// Record : object type with specific key-value constraints

export enum OrderStatus {
  PENDING = "pending",
  PROCESSING = "processing",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
}
