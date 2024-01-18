import { z } from "zod";

export const paginationSchema = z.object({
  skip: z.number().nullish(),
  take: z.number().nullish(),
});

// Transcation status
export const statusShema = z.enum(["PENDING", "SUCCESS", "FAILED"]);

export type STATUS = z.infer<typeof statusShema>;
