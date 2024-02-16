import { Room, RoomImage } from "@prisma/client";

import { RoomStatus } from "./room-status";
import { Card } from "@/components/ui/card";

interface RoomCardProps {
  data: Array<Room & { roomImage: RoomImage[] }>;
}
export const RoomCard = ({ data }: RoomCardProps) => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
      {data?.map((item) => (
        <Card key={item.id}>
          <RoomStatus item={item} />
        </Card>
      ))}
    </div>
  );
};
