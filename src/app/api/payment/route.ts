import { CurrentUser } from "@/lib/current-user";
import { prismaDb } from "@/lib/prismaDb";
import { stripe } from "@/lib/stripe";
import { endOfDay, isWithinInterval, startOfDay } from "date-fns";
import { NextRequest, NextResponse } from "next/server";

type DateRoomTypes = {
  startDate: Date;
  endDate: Date;
};
function hasOverlap(
  startDate: Date,
  endDate: Date,
  dateRange: DateRoomTypes[]
) {
  const targetInterval = {
    start: startOfDay(new Date(startDate)),
    end: endOfDay(new Date(endDate)),
  };
  for (const range of dateRange) {
    const rangeStart = startOfDay(new Date(range.startDate));
    const rangeEnd = endOfDay(new Date(range.endDate));
    if (
      isWithinInterval(targetInterval.start, {
        start: rangeStart,
        end: rangeEnd,
      }) ||
      isWithinInterval(targetInterval.end, {
        start: rangeStart,
        end: rangeEnd,
      }) ||
      (targetInterval.start < rangeStart && targetInterval.end > rangeEnd)
    ) {
      return true;
    }
  }
  return false;
}
export async function POST(req: NextRequest) {
  try {
    const currentUser = await CurrentUser();
    const {
      roomId,
      startDate,
      endDate,
      breackfastInclude,
      totalPrice,
      title,
      hotelId,
    } = await req.json();

    const bookingData = await prismaDb.booking.findMany({
      where: {
        roomId: roomId,
        endDate: {
          gte: new Date(),
        },
      },
    });

    const reserveRoom = bookingData.map((item) => {
      return {
        startDate: item.startDate,
        endDate: item.endDate,
      };
    });

    const overlapDates = hasOverlap(startDate, endDate, reserveRoom);
    if (overlapDates) {
      return new NextResponse("fail", { status: 403 });
    }

    const order = await prismaDb.booking.create({
      data: {
        userId: currentUser?.id as string,
        endDate,
        roomId,
        startDate,
        totalPrice,
        breackfastInclude,
        hotelId,
      },
    });

    const paymantIntent = await stripe.checkout.sessions.create({
      mode: "payment",
      billing_address_collection: "required",
      phone_number_collection: { enabled: true },
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "USD",
            unit_amount: totalPrice * 100,
            product_data: {
              name: title,
            },
          },
        },
      ],
      metadata: {
        id: order.id,
      },
      success_url: `${process.env.NEXT_PUBLIC_URL}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}`,
    });
    return NextResponse.json({ url: paymantIntent.url });
  } catch (error) {
    return NextResponse.json({ msg: "fail", error });
  }
}
