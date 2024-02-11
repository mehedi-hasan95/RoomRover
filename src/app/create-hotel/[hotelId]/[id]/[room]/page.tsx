import { HotelRoomForm } from "@/app/create-hotel/_components/hotel-room-form";

const CreateRoom = ({ params }: { params: { room: string } }) => {
  return (
    <div>
      <HotelRoomForm />
    </div>
  );
};

export default CreateRoom;
