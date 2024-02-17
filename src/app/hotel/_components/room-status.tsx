"use client";

import { ImageCarousel } from "@/components/common/image-carousel";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  Cookie,
  Loader2,
  Tv,
  Utensils,
  WashingMachine,
  Wifi,
} from "lucide-react";
import { DatePickerWithRange } from "./date-picker";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { Room, RoomImage } from "@prisma/client";
import { differenceInDays } from "date-fns";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";
import { toast } from "sonner";

interface RoomStatusProps {
  item: Room & { roomImage: RoomImage[] };
}
export const RoomStatus = ({ item }: RoomStatusProps) => {
  const currentUser = useCurrentUser();
  const [date, setDate] = useState<DateRange | undefined>();
  const [bookingDate, setBookingDate] = useState(1);
  const [totalPrice, setTotalPrice] = useState(item.price);
  const [includeBreckfast, setIncludeBreckfast] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (date?.to && date.from) {
      const dayCount = differenceInDays(date.to, date.from) + 1;
      setBookingDate(dayCount);
      if (item.breckfast === false && includeBreckfast === true) {
        const tp = dayCount * item.breckfastPrice + dayCount * item.price;
        setTotalPrice(tp);
      } else {
        setTotalPrice(dayCount * item.price);
      }
    }
  }, [
    date?.from,
    date?.to,
    item.breckfast,
    item.breckfastPrice,
    item.price,
    includeBreckfast,
  ]);

  const handleReserve = async () => {
    if (!currentUser) {
      toast.error("Login first");
    }
    if (date?.from && date.to) {
      const data = {
        title: item.title,
        roomId: item.id,
        startDate: date.from,
        endDate: date.to,
        breackfastInclude: includeBreckfast,
        totalPrice: totalPrice,
      };

      // Data sent
      try {
        setIsLoading(true);
        const response = await fetch(`/api/payment`, {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        const result = await response.json();
        if (result) {
          window.location.href = result.url;
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    } else {
      toast.error("Please pick reserve date");
    }
  };
  return (
    <>
      <CardHeader className="group pb-2">
        <ImageCarousel data={item.roomImage} />
        <CardTitle className="pt-4">{item.title}</CardTitle>
      </CardHeader>
      <CardContent className={cn("pb-2")}>
        <p>{item.desc}</p>
      </CardContent>
      <CardFooter className={cn("flex-col items-start pt-2")}>
        <h2 className="font-bold pb-2">What this room offers:</h2>
        <p className="font-bold pb-5">
          KingBed: {item.kingBed}, QueenBed: {item.queenBed}
        </p>
        <div className="grid grid-cols-2 gap-3">
          {/* Kitchen  */}
          {item?.kitchen ? (
            <div className="flex items-center gap-1">
              <Cookie /> Kitchen
            </div>
          ) : (
            <div className="line-through flex items-center gap-1 text-red-500">
              <Cookie /> No Kitchen
            </div>
          )}
          {/* TV  */}
          {item?.tv ? (
            <div className="flex items-center gap-1">
              <Tv /> TV
            </div>
          ) : (
            <div className="line-through flex items-center gap-1 text-red-500">
              <Tv /> No TV
            </div>
          )}
          {/* Washer  */}
          {item?.washer ? (
            <div className="flex items-center gap-1">
              <WashingMachine /> Washer
            </div>
          ) : (
            <div className="line-through flex items-center gap-1 text-red-500">
              <WashingMachine /> No Washer
            </div>
          )}
          {/* WiFi  */}
          {item?.wifi ? (
            <div className="flex items-center gap-1">
              <Wifi /> WiFi
            </div>
          ) : (
            <div className="line-through flex items-center gap-1 text-red-500">
              <Wifi /> No WiFi
            </div>
          )}

          <p className="py-3 text-lg font-semibold">Price: ${item.price}</p>
          {/* BreckFast  */}
          {item?.breckfast ? (
            <div className="flex items-center gap-1">
              <Utensils /> BreckFast
            </div>
          ) : (
            <div className="flex items-center gap-1 ">
              <div className="flex items-center space-x-2">
                <Checkbox
                  onCheckedChange={(value) => setIncludeBreckfast(!!value)}
                  id="breckfast"
                />
                <label
                  htmlFor="breckfast"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Breckfast price {item.breckfastPrice}
                </label>
              </div>{" "}
            </div>
          )}
        </div>
        <div>
          <p>
            Total Price {totalPrice} for {bookingDate} days
          </p>
          <DatePickerWithRange date={date} setDate={setDate} id={item.id} />
        </div>
        <div className="py-5">
          {isLoading ? (
            <Button disabled>
              Loading... <Loader2 className="ml-2 h-4 w-4 animate-spin" />
            </Button>
          ) : (
            <Button onClick={() => handleReserve()}>Reserve Room</Button>
          )}
        </div>
      </CardFooter>
    </>
  );
};
