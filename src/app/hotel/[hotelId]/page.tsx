import { ImageCarousel } from "@/components/common/image-carousel";
import { Separator } from "@/components/ui/separator";
import { useLocation } from "@/hooks/use-location";
import { prismaDb } from "@/lib/prismaDb";
import {
  Accessibility,
  Car,
  Cctv,
  Check,
  Dog,
  Laptop,
  Utensils,
} from "lucide-react";
import { RoomCard } from "../_components/room-card";
import { Suspense } from "react";
import NotFound from "@/app/not-found";
import { RoomSkeleton } from "../_components/room-skeleton";

const SingleHotel = async ({ params }: { params: { hotelId: string } }) => {
  // Get previous date
  const today = new Date();
  let previousDate = new Date(today);
  previousDate.setDate(today.getDate() - 1);
  // Get previous date
  const { getCountryByCode, getStateByCode } = useLocation();
  const data = await prismaDb.hotel.findUnique({
    where: {
      id: params.hotelId,
    },
    include: {
      hotelImage: true,
    },
  });
  const room = prismaDb.room.findMany({
    where: {
      hotelId: params.hotelId,
    },
    include: {
      roomImage: true,
    },
  });
  if (!data) {
    return <NotFound />;
  }

  return (
    <div className="container mx-auto px-6">
      <div className="grid md:grid-cols-3 gap-5">
        <div className="md:col-span-2">
          <div className="group">
            <ImageCarousel data={data?.hotelImage} />
          </div>
          <h2 className="text-md md:text-xl font-bold">{data?.title}</h2>
          <p className="py-2">
            Location: {getStateByCode(data?.country, data?.state)?.name},{" "}
            {getCountryByCode(data?.country)?.name}
          </p>
          <p>{data?.desc}</p>
        </div>
        <div>
          <h2 className="text-xl font-bold">What this hotel offers</h2>
          <div className="flex flex-wrap gap-5">
            {data?.parking ? (
              <div className="flex items-center gap-1">
                <Car /> Parking
              </div>
            ) : (
              <div className="line-through flex items-center gap-1 text-red-500">
                <Car /> No Parking
              </div>
            )}
            {/* CCTV  */}
            {data?.cctv ? (
              <div className="flex items-center gap-1">
                <Cctv /> CCTV
              </div>
            ) : (
              <div className="line-through flex items-center gap-1 text-red-500">
                <Cctv /> No CCTV
              </div>
            )}
            {/* GYM  */}
            {data?.gym ? (
              <div className="flex items-center gap-1">
                <Accessibility /> GYM
              </div>
            ) : (
              <div className="line-through flex items-center gap-1 text-red-500">
                <Accessibility /> No GYM
              </div>
            )}
            {/* Pet  */}
            {data?.petAllowed ? (
              <div className="flex items-center gap-1">
                <Dog /> Pet
              </div>
            ) : (
              <div className="line-through flex items-center gap-1 text-red-500">
                <Dog /> No Pet
              </div>
            )}
            {/* Pool  */}
            {data?.pool ? (
              <div className="flex items-center gap-1">
                <Check /> Pool
              </div>
            ) : (
              <div className="line-through flex items-center gap-1 text-red-500">
                <Check /> No Pool
              </div>
            )}
            {/* resturent  */}
            {data?.resturent ? (
              <div className="flex items-center gap-1">
                <Utensils /> Resturent
              </div>
            ) : (
              <div className="line-through flex items-center gap-1 text-red-500">
                <Utensils /> No Resturent
              </div>
            )}
            {/* Workspace  */}
            {data?.workspace ? (
              <div className="flex items-center gap-1">
                <Laptop /> Workspace
              </div>
            ) : (
              <div className="line-through flex items-center gap-1 text-red-500">
                <Laptop /> No Workspace
              </div>
            )}
          </div>
          <h2 className="text-xl font-bold pt-5">Hotel Location</h2>
          <p>{data.locationDesc}</p>
        </div>
      </div>
      <Separator className="my-5" />
      <div>
        <h2 className="md:text-xl font-bold pb-4">Where you&apos;ll sleep</h2>
        <Suspense fallback={<RoomSkeleton />}>
          <RoomCard data={room} hotelId={data.id} />
        </Suspense>
      </div>
    </div>
  );
};

export default SingleHotel;
