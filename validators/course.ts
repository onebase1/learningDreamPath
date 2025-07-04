import { z } from "zod";

export const createChaptersSchema = z.object({
  title: z.string().min(3).max(100),
  Chapters: z.array(z.string()),
});
