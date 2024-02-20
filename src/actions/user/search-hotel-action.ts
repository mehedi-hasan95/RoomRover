import { prismaDb } from "@/lib/prismaDb";

type SearchHotelActionProps = {
  title: string;
  country: string;
};
export const SearchHotelAction = async ({
  title,
  country,
}: SearchHotelActionProps) => {
  try {
    const data = await prismaDb.hotel.findMany({
      where: {
        title: {
          search: title,
        },
        country: {
          equals: country,
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
