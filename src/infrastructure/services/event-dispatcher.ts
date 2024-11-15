import { DomainEvent } from "@/core/domain/events/padawan-registered";
import { EventDispatcher } from "@/core/domain/ports/event-dispatcher";

export class ConsoleEventDispatcher implements EventDispatcher {
  async dispatch(event: DomainEvent): Promise<void> {
    console.log(`[Event dispatched at ${event.occurredOn}]`, event);
  }
} 