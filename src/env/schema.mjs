import { z } from "zod";

export const serverSchema = z.object({
  STATUS_API_TOKEN: z.string().min(1), // required string
});
