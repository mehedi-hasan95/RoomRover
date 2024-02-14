import { ImageCarousel } from "@/components/common/image-carousel";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Room, RoomImage } from "@prisma/client";
import { Cookie, Tv, Utensils, WashingMachine, Wifi } from "lucide-react";

interface RoomCardProps {
  data: Array<Room & { roomImage: RoomImage[] }>;
}
export const RoomCard = ({ data }: RoomCardProps) => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
      {data?.map((item) => (
        <Card key={item.id}>
          <CardHeader className="group pb-2">
            <ImageCarousel data={item.roomImage} />
            <CardTitle className="pt-4">{item.title}</CardTitle>
            <p>Price: ${item.price}</p>
          </CardHeader>
          <CardContent className={cn("pb-2")}>
            <p>{item.desc}</p>
          </CardContent>
          <CardFooter className={cn("flex-col items-start pt-2")}>
            <h2 className="font-bold pb-2">What this room offers:</h2>
            <p className="font-bold pb-5">
              KingBed: {item.kingBed}, QueenBed: {item.queenBed}
            </p>
            <div className="grid grid-cols-2 gap-3">
              {/* BreckFast  */}
              {item?.breckfast ? (
                <div className="flex items-center gap-1">
                  <Utensils /> BreckFast
                </div>
              ) : (
                <div className="line-through flex items-center gap-1 text-red-500">
                  <Utensils /> No BreckFast
                </div>
              )}
              {/* Kitchen  */}
              {item?.kitchen ? (
                <div className="flex items-center gap-1">
                  <Cookie /> Kitchen
                </div>
              ) : (
                <div className="line-through flex items-center gap-1 text-red-500">
                  <Cookie /> No Kitchen
                </div>
              )}
              {/* TV  */}
              {item?.tv ? (
                <div className="flex items-center gap-1">
                  <Tv /> TV
                </div>
              ) : (
                <div className="line-through flex items-center gap-1 text-red-500">
                  <Tv /> No TV
                </div>
              )}
              {/* Washer  */}
              {item?.washer ? (
                <div className="flex items-center gap-1">
                  <WashingMachine /> Washer
                </div>
              ) : (
                <div className="line-through flex items-center gap-1 text-red-500">
                  <WashingMachine /> No Washer
                </div>
              )}
              {/* WiFi  */}
              {item?.wifi ? (
                <div className="flex items-center gap-1">
                  <Wifi /> WiFi
                </div>
              ) : (
                <div className="line-through flex items-center gap-1 text-red-500">
                  <Wifi /> No WiFi
                </div>
              )}
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
