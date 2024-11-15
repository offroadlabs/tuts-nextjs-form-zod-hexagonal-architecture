import { Padawan, Result } from "@/core/domain/models/padawan";
import { PadawanRepository } from "@/core/domain/ports/padawan-repository";
import { PadawanEligibilityService } from "@/core/domain/services/padawan-eligibility";
import { PadawanRegistered } from "@/core/domain/events/padawan-registered";
import { EventDispatcher } from "@/core/domain/ports/event-dispatcher";

export class RegisterPadawanUseCase {
  constructor(
    private readonly padawanRepository: PadawanRepository,
    private readonly eventDispatcher: EventDispatcher
  ) {}

  async execute(
    padawan: Omit<Padawan, "id" | "createdAt">
  ): Promise<Result<Padawan>> {
    const eligibilityResult = PadawanEligibilityService.check(padawan);
    if (!eligibilityResult.isSuccess()) {
      return Result.failure(eligibilityResult.getError()!);
    }

    const saveResult = await this.padawanRepository.save(padawan);
    if (!saveResult.isSuccess()) {
      return Result.failure(saveResult.getError()!);
    }

    const savedPadawan = saveResult.getValue()!;

    await this.eventDispatcher.dispatch(
      new PadawanRegistered(
        savedPadawan.id!,
        savedPadawan.name,
        savedPadawan.midichlorianCount
      )
    );

    return Result.success(savedPadawan);
  }
} 