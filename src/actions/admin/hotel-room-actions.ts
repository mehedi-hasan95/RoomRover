"use server";
import { CurrentUser, CurrentUserRole } from "@/lib/current-user";
import { prismaDb } from "@/lib/prismaDb";
import { CreatHotelRoomSchema } from "@/schema/admin/create-hotel-schema";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const CreateHotelRoomAction = async (
  values: z.infer<typeof CreatHotelRoomSchema>,
  id: string
) => {
  try {
    const currentUser = await CurrentUser();
    const userRole = await CurrentUserRole();
    if (!currentUser && userRole !== "ADMIN") {
      return { error: "Unauthorize User" };
    }
    const validateField = CreatHotelRoomSchema.safeParse(values);
    if (!validateField.success) {
      return { error: "Something went wrong" };
    }
    const {
      title,
      desc,
      price,
      breckfast,
      breckfastPrice,
      wifi,
      tv,
      roomService,
      kitchen,
      washer,
      kingBed,
      queenBed,
      roomImage,
    } = validateField.data;
    await prismaDb.room.create({
      data: {
        title,
        desc,
        price,
        breckfast,
        breckfastPrice,
        wifi,
        tv,
        roomService,
        kitchen,
        washer,
        kingBed,
        queenBed,
        hotelId: id,
        roomImage: {
          createMany: {
            data: [...roomImage.map((image: { url: string }) => image)],
          },
        },
      },
    });
    revalidatePath("/");
    return { success: "Hotel Room Created Successfully" };
  } catch (error) {
    return { error: "Something went wrong" };
  }
};
