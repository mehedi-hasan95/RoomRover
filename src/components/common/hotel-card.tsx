import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ImageCarousel } from "./image-carousel";
import { Hotel, HotelImage } from "@prisma/client";
import { useLocation } from "@/hooks/use-location";
import Link from "next/link";

interface HotelCardProps {
  data: Array<Hotel & { hotelImage: HotelImage[] }>;
}

export const HotelCard: React.FC<HotelCardProps> = ({ data }) => {
  const { getCountryByCode, getStateByCode } = useLocation();
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {data?.map((item) => (
        <Card key={item.id} className="group">
          <CardHeader>
            <ImageCarousel data={item.hotelImage} />
            <CardTitle>
              <Link href={`/hotel/${item.id}`}>{item.title}</Link>
            </CardTitle>
            <CardDescription>
              Location: {getStateByCode(item.country, item.state)?.name},{" "}
              {getCountryByCode(item.country)?.name}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="line-clamp-3">{item.desc}</p>
          </CardContent>
          <CardFooter>
            <p>Price: 100</p>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
