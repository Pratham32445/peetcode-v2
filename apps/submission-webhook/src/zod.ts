import { z } from "zod";

export const testCase = z.object({
  token: z.string().min(1, "Please provie the token"),
  status: z.object({
    id: z.number(),
    description: z.string().nullable(),
  }),
  time: z.string().nullable(),
  memory: z.string().nullable(),
});
