import { z } from "zod";

export const CreateHotelSchema = z.object({
  title: z.string().min(2),
  desc: z.string().min(2),
  country: z.string().min(2),
  state: z.string().min(1),
  city: z.string().min(1).optional(),
  locationDesc: z.string().min(2),
  workspace: z.boolean().default(true).optional(),
  pool: z.boolean().default(true).optional(),
  petAllowed: z.boolean().default(true).optional(),
  resturent: z.boolean().default(true).optional(),
  parking: z.boolean().default(true).optional(),
  cctv: z.boolean().default(true).optional(),
  gym: z.boolean().default(true).optional(),
  hotelImage: z.object({ url: z.string() }).array(),
});
