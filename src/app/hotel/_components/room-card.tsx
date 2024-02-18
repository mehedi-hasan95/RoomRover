import { Room, RoomImage } from "@prisma/client";

import { RoomStatus } from "./room-status";
import { Card } from "@/components/ui/card";
import { GetRoomBookingAciton } from "@/actions/user/room-booking-action";

interface RoomCardProps {
  data: Promise<Array<Room & { roomImage: RoomImage[] }>>;
  hotelId: string;
}
export const RoomCard = async ({ data, hotelId }: RoomCardProps) => {
  const roomData = await data;
  const bookingData = await GetRoomBookingAciton(hotelId);
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
      {roomData?.map((item) => (
        <Card key={item.id}>
          <RoomStatus
            item={item}
            hotelId={hotelId}
            bookings={bookingData as any}
          />
        </Card>
      ))}
    </div>
  );
};
