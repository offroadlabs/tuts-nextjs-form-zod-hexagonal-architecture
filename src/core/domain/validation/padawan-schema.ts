import { z } from "zod";

export const padawanSchema = z.object({
  name: z
    .string()
    .min(2, "A Padawan must have a name longer than 2 characters")
    .max(50, "Even Qui-Gon Jinn doesn't have such a long name"),
  age: z.coerce
    .number()
    .min(4, "Even Grogu started his training at age 4")
    .max(30, "The Council considers this the age limit to begin training"),
  midichlorianCount: z.coerce
    .number()
    .min(7000, "Midichlorian count is too low for Jedi training")
    .max(20000, "Even Anakin only had 20000 midichlorians"),
  homeworld: z
    .string()
    .min(2, "Your planet name is required"),
  primarySkill: z.enum(["combat", "healing", "meditation", "telepathy"], {
    errorMap: () => ({
      message: "This skill is not recognized by the Jedi Order",
    }),
  }),
  background: z
    .string()
    .min(20, "Tell us more about your journey"),
});

export type PadawanFormData = z.infer<typeof padawanSchema>; 