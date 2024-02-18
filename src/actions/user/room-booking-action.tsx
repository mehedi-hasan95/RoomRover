import { prismaDb } from "@/lib/prismaDb";

export const GetRoomBookingAciton = async (id: string) => {
  try {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const booking = await prismaDb.booking.findMany({
      where: {
        hotelId: id,
        endDate: {
          gte: yesterday,
        },
      },
    });
    return booking;
  } catch (error) {
    return { error: "Something went wrong" };
  }
};
