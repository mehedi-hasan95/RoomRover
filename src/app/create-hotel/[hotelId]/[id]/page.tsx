import { GetUniqueHotelAction } from "@/actions/admin/hotel-related-actions";
import { Button } from "@/components/ui/button";
import { HomeIcon } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

const CreateHotel = async ({ params }: { params: { id: string } }) => {
  const data = await GetUniqueHotelAction(params.id);
  if (data.data === null) {
    return redirect("/");
  }
  return (
    <div className="container mx-auto px-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Total Room ()</h2>
        <Link href={`/create-hotel/room/${params.id}/new`}>
          <Button>
            <HomeIcon className="mr-2 h-4 w-4" /> Create Room
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default CreateHotel;
