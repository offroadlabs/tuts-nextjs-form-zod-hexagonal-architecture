import { Padawan, Result } from "@/core/domain/models/padawan";
import { PadawanRepository } from "@/core/domain/ports/padawan-repository";
import { prisma } from "@/infrastructure/db/prisma";

export class PrismaPadawanRepository implements PadawanRepository {
  async save(
    padawan: Omit<Padawan, "id" | "createdAt">
  ): Promise<Result<Padawan>> {
    try {
      const saved = await prisma.padawan.create({
        data: padawan,
      });

      return Result.success(this.mapPrismaPadawanToDomain(saved));
    } catch (error: unknown) {
      if (error instanceof Error) {
        return Result.failure(`Error during save: ${error.message}`);
      }
      return Result.failure('An unknown error occurred during save');
    }
  }

  async findById(id: string): Promise<Result<Padawan | null>> {
    try {
      const padawan = await prisma.padawan.findUnique({
        where: { id },
      });

      return Result.success(
        padawan ? this.mapPrismaPadawanToDomain(padawan) : null
      );
    } catch (error: unknown) {
      if (error instanceof Error) {
        return Result.failure(`Error during search: ${error.message}`);
      }
      return Result.failure('An unknown error occurred during search');
    }
  }

  async findAll(): Promise<Result<Padawan[]>> {
    try {
      const padawans = await prisma.padawan.findMany({
        orderBy: { createdAt: "desc" },
      });

      return Result.success(padawans.map(this.mapPrismaPadawanToDomain));
    } catch (error: unknown) {
      if (error instanceof Error) {
        return Result.failure(`Error during retrieval: ${error.message}`);
      }
      return Result.failure('An unknown error occurred during retrieval');
    }
  }

  private mapPrismaPadawanToDomain(padawan: any): Padawan {
    return {
      id: padawan.id,
      name: padawan.name,
      age: padawan.age,
      midichlorianCount: padawan.midichlorianCount,
      homeworld: padawan.homeworld,
      primarySkill: padawan.primarySkill,
      background: padawan.background,
      createdAt: padawan.createdAt,
    };
  }
} 