import { DomainEvent } from "@/core/domain/events/padawan-registered";

export interface EventDispatcher {
  dispatch(event: DomainEvent): Promise<void>;
} 