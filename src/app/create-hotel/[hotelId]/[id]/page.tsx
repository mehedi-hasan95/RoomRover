import { GetUniqueHotelAction } from "@/actions/admin/hotel-related-actions";
import { redirect } from "next/navigation";
import { HotelRoomForm } from "../../_components/hotel-room-form";

const CreateHotel = async ({ params }: { params: { id: string } }) => {
  const data = await GetUniqueHotelAction(params.id);
  if (data.data === null) {
    return redirect("/");
  }
  return (
    <div className="container mx-auto px-6">
      <HotelRoomForm hotelId={params.id} />
    </div>
  );
};

export default CreateHotel;
