import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface ImageCarouselProps {
  data: {
    hotelImage: Array<{
      id: string;
      url: string;
    }>;
  };
}
export const ImageCarousel: React.FC<ImageCarouselProps> = ({ data }) => {
  return (
    <Carousel>
      <CarouselContent>
        {data.hotelImage.map((item) => (
          <CarouselItem key={item.id}>
            <Image
              src={item.url}
              alt=""
              height={500}
              width={500}
              className="h-full w-full"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="hidden group-hover:block">
        <CarouselPrevious className={cn("left-0")} />
        <CarouselNext className={cn("right-0")} />
      </div>
    </Carousel>
  );
};
