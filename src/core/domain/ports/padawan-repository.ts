import { Padawan, Result } from "@/core/domain/models/padawan";

export interface PadawanRepository {
  save(padawan: Omit<Padawan, "id" | "createdAt">): Promise<Result<Padawan>>;
  findById(id: string): Promise<Result<Padawan | null>>;
  findAll(): Promise<Result<Padawan[]>>;
} 