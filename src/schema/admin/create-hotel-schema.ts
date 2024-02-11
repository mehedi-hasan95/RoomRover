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

export const CreatHotelRoomSchema = z.object({
  title: z.string().min(2),
  desc: z.string(),
  price: z.coerce.number(),
  breckfast: z.boolean().optional(),
  breckfastPrice: z.coerce.number(),
  wifi: z.boolean().optional(),
  tv: z.boolean().optional(),
  roomService: z.boolean().optional(),
  kitchen: z.boolean().optional(),
  washer: z.boolean().optional(),
  kingBed: z.coerce.number(),
  queenBed: z.coerce.number(),
  roomImage: z.object({ url: z.string() }).array(),
});
