import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CurrentUser } from "@/lib/current-user";
import { prismaDb } from "@/lib/prismaDb";
import { Edit } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { HotelTable } from "./_components/hotel-table";

const CreateHotel = async () => {
  const currentUser = await CurrentUser();
  const data = await prismaDb.hotel.findMany({
    where: {
      userId: currentUser?.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const hotelData = data.map((item) => ({
    id: item.id,
    title: item.title,
    country: item.country,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));
  return (
    <div className="container mx-auto px-6 text-">
      <Separator className="mb-5" />
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Total Hotel ({data?.length})</h2>
        <Link href="/create-hotel/new">
          <Button>
            <Edit className="mr-2 h-4 w-4" />
            Create Hotel
          </Button>
        </Link>
      </div>
      <Separator className="my-5" />
      <HotelTable data={hotelData} />
    </div>
  );
};

export default CreateHotel;
