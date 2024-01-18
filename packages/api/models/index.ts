import { z } from "zod";

// Transcation status
export const statusShema = z.enum(["PENDING", "SUCCESS", "FAILED"]);

export type STATUS = z.infer<typeof statusShema>;
