import { CurrentUser } from "@/lib/current-user";
import { prismaDb } from "@/lib/prismaDb";
import { stripe } from "@/lib/stripe";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  try {
    const currentUser = await CurrentUser();
    const { roomId, startDate, endDate, breackfastInclude, totalPrice, title } =
      await req.json();

    const order = await prismaDb.booking.create({
      data: {
        userId: currentUser?.id as string,
        endDate,
        roomId,
        startDate,
        totalPrice,
        breackfastInclude,
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
