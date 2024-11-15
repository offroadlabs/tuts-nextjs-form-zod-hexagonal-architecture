import { Padawan, Result } from "@/core/domain/models/padawan";

export class PadawanEligibilityService {
  static check(padawan: Omit<Padawan, "id" | "createdAt">): Result<void> {
    if (padawan.age < 4) {
      return Result.failure("Too young to begin the training");
    }
    if (padawan.age > 30) {
      return Result.failure("Too old to begin the training");
    }

    if (padawan.midichlorianCount < 7000) {
      return Result.failure("Midichlorian count is too low");
    }
    if (padawan.midichlorianCount > 20000) {
      return Result.failure("Suspicious midichlorian count");
    }

    if (padawan.background.length < 20) {
      return Result.failure("Personal story needs more details");
    }

    return Result.success(void 0);
  }
} 