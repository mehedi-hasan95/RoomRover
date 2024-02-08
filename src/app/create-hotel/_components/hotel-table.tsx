import { DataTable } from "@/components/ui/data-table";
import { HotelColumnsProps, hotelColumns } from "./hotel-columns";

interface DashboardFormProps {
  data: HotelColumnsProps[];
}
export const HotelTable: React.FC<DashboardFormProps> = ({ data }) => {
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={hotelColumns} data={data} searchKey="title" />
    </div>
  );
};
