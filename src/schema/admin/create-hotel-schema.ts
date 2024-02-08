import { z } from "zod";

export const CreateHotelSchema = z.object({
  title: z.string().min(2),
  desc: z.string().min(2),
  country: z.string().min(2),
  state: z.string().min(1),
  city: z.string().min(1).optional(),
  locationDesc: z.string().min(2),
  workspace: z.boolean().optional(),
  pool: z.boolean().optional(),
  petAllowed: z.boolean().optional(),
  resturent: z.boolean().optional(),
  parking: z.boolean().optional(),
  cctv: z.boolean().optional(),
  gym: z.boolean().optional(),
  hotelImage: z.object({ url: z.string() }).array(),
});
