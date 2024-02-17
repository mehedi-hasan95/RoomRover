"use server";

import { prismaDb } from "@/lib/prismaDb";

export const GetSingleHotelAction = async (id: string) => {
  try {
    await prismaDb.hotel.findUnique({
      where: {
        id: id,
      },
      include: {
        hotelImage: true,
        room: {
          include: {
            roomImage: true,
          },
        },
      },
    });
  } catch (error) {
    return null;
  }
};
