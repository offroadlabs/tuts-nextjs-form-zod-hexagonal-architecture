import { JediRegistrationForm } from "./components/jedi-form";
import { PadawanList } from "./components/padawan-list";
import { PrismaPadawanRepository } from "@/infrastructure/db/repositories/prisma-padawan-repository";

export default async function Home() {
  const padawanRepository = new PrismaPadawanRepository();
  const result = await padawanRepository.findAll();
  const padawans = result.getValue() || [];

  return (
    <div className="space-y-8">
      <header className="text-center">
        <h1 className="text-4xl font-bold mb-2">Jedi Academy</h1>
        <p className="text-slate-600">
          May the Force be with you, young Padawan
        </p>
      </header>

      <div className="grid gap-8 md:grid-cols-2">
        <section>
          <JediRegistrationForm />
        </section>
        <section>
          <PadawanList padawans={padawans} />
        </section>
      </div>
    </div>
  );
}
