import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Edit } from "lucide-react";
import Link from "next/link";

const CreateHotel = () => {
  return (
    <div className="container mx-auto px-6 text-">
      <Separator className="mb-5" />
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Total Hotel ()</h2>
        <Link href="/create-hotel/new">
          <Button>
            <Edit className="mr-2 h-4 w-4" />
            Create Hotel
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default CreateHotel;
