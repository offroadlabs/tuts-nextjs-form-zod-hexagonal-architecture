export interface DomainEvent {
  occurredOn: Date;
}

export class PadawanRegistered implements DomainEvent {
  occurredOn: Date = new Date();

  constructor(
    public readonly padawanId: string,
    public readonly name: string,
    public readonly midichlorianCount: number
  ) {}
} 