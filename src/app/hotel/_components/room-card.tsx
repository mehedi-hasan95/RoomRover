import { Booking, Room, RoomImage } from "@prisma/client";

import { RoomStatus } from "./room-status";
import { Card } from "@/components/ui/card";

interface RoomCardProps {
  data: Promise<Array<Room & { roomImage: RoomImage[] }>>;
  hotelId: string;
}
export const RoomCard = async ({ data, hotelId }: RoomCardProps) => {
  const roomData = await data;
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
      {roomData?.map((item) => (
        <Card key={item.id}>
          <RoomStatus item={item} hotelId={hotelId} />
        </Card>
      ))}
    </div>
  );
};
