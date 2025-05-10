import { z } from "zod";

// export const LanguageSchema = z.object({
//   language: z.string(),
//   level: z.string(),
//   id:z.string()
// });

export const FlashCardSchema = z.object({
  userLanguageId: z.string(),
  // userLanguages:LanguageListSchema
});

export const WordSchema = z.object({
  id: z.string(),
  word: z.string(),
});

export const LanguageSchema = z.object({
  id: z.string(),
  language: z.string(),
  level: z.string(),
  words: z.array(WordSchema).nullable(),
});
export type Language = z.infer<typeof LanguageSchema>;

export const LanguageListSchema = z.array(LanguageSchema);
export type LanguageList = z.infer<typeof LanguageListSchema>;
