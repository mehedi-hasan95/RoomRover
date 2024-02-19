import { HotelCard } from "@/components/common/hotel-card";
import { prismaDb } from "@/lib/prismaDb";

export default async function Home() {
  const data = await prismaDb.hotel.findMany({
    include: {
      hotelImage: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  if (!data) {
    return null;
  }
  return (
    <main className="container mx-auto px-6">
      <HotelCard data={data} />
    </main>
  );
}
