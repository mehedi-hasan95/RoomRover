import { prismaDb } from "@/lib/prismaDb";

type SearchHotelActionProps = {
  title: string;
};
export const SearchHotelAction = async ({ title }: SearchHotelActionProps) => {
  try {
    const data = await prismaDb.hotel.findMany({
      where: {
        title: {
          search: title,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        hotelImage: true,
      },
    });
    return { data };
  } catch (error) {
    return { error: "Something went wrong" };
  }
};
