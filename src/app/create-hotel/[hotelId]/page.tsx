import { CurrentUser } from "@/lib/current-user";
import { CreateHotelForm } from "../_components/create-hotel-form";
import { prismaDb } from "@/lib/prismaDb";

const CreateHotel = async ({ params }: { params: { hotelId: string } }) => {
  const currentUser = await CurrentUser();
  const data = await prismaDb.hotel.findUnique({
    where: {
      id: params.hotelId,
      userId: currentUser?.id,
    },
    include: {
      hotelImage: true,
    },
  });
  return (
    <div>
      <CreateHotelForm initialData={data} />
    </div>
  );
};

export default CreateHotel;
