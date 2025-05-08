import { z } from "zod";

export const LanguageSchema = z.object({
  language: z.string(),
  level: z.string(),
  id:z.string()
});

export const LanguageListSchema = z.array(LanguageSchema);
export type LanguageList = z.infer<typeof LanguageListSchema>;
