"use server";

import { CurrentUser, CurrentUserRole } from "@/lib/current-user";
import { prismaDb } from "@/lib/prismaDb";
import { CreateHotelSchema } from "@/schema/admin/create-hotel-schema";
import { revalidatePath } from "next/cache";
import * as z from "zod";

export const CreateHotelAction = async (
  values: z.infer<typeof CreateHotelSchema>
) => {
  try {
    const currentUser = await CurrentUser();
    const userRole = await CurrentUserRole();
    if (!currentUser && userRole !== "ADMIN") {
      return { error: "Unauthorize user" };
    }
    const validateField = CreateHotelSchema.safeParse(values);
    if (!validateField.success) {
      return { error: "Something went wrong" };
    }
    const {
      title,
      desc,
      shortDesc,
      country,
      state,
      city,
      locationDesc,
      workspace,
      pool,
      petAllowed,
      resturent,
      parking,
      cctv,
      gym,
      hotelImage,
    } = validateField.data;

    const data = await prismaDb.hotel.create({
      data: {
        title,
        desc,
        shortDesc,
        country,
        state,
        city,
        locationDesc,
        workspace,
        pool,
        petAllowed,
        resturent,
        parking,
        cctv,
        gym,
        userId: currentUser?.id as string,
        hotelImage: {
          createMany: {
            data: [...hotelImage.map((image: { url: string }) => image)],
          },
        },
      },
    });
    revalidatePath("/");
    revalidatePath("/create-hotel");
    return { success: "Hotel Created successfully", data };
  } catch (error) {
    return { error: "Something went wrong" };
  }
};

export const UpdateHotelAction = async (
  values: z.infer<typeof CreateHotelSchema>,
  id: string
) => {
  try {
    const currentUser = await CurrentUser();
    const userRole = await CurrentUserRole();
    if (!currentUser && userRole !== "ADMIN") {
      return { error: "Unauthorize user" };
    }

    const validateField = CreateHotelSchema.safeParse(values);
    if (!validateField.success) {
      return { error: "Something went wrong" };
    }
    const {
      title,
      desc,
      shortDesc,
      country,
      state,
      city,
      locationDesc,
      workspace,
      pool,
      petAllowed,
      resturent,
      parking,
      cctv,
      gym,
      hotelImage,
    } = validateField.data;
    // Delete selected image
    await prismaDb.hotel.update({
      where: {
        id: id,
      },
      data: {
        hotelImage: {
          deleteMany: {},
        },
      },
    });

    // update others
    const data = await prismaDb.hotel.update({
      where: {
        id,
      },
      data: {
        title,
        desc,
        shortDesc,
        country,
        state,
        city,
        locationDesc,
        workspace,
        pool,
        petAllowed,
        resturent,
        parking,
        cctv,
        gym,
        userId: currentUser?.id as string,
        hotelImage: {
          createMany: {
            data: [...hotelImage.map((image: { url: string }) => image)],
          },
        },
      },
    });
    revalidatePath("/");
    revalidatePath("/create-hotel");
    return { success: "Hotel update successfully", data };
  } catch (error) {
    return { error: "Something went wrong" };
  }
};

export const DeleteHotelAction = async (id: string) => {
  try {
    const currentUser = await CurrentUser();
    const userRole = await CurrentUserRole();
    if (!currentUser && userRole !== "ADMIN") {
      return { error: "Unauthorize user" };
    }
    await prismaDb.hotel.delete({
      where: {
        id,
        userId: currentUser?.id,
      },
    });
    revalidatePath("/");
    revalidatePath("/create-hotel");
    return { success: "Hotel Delete Successfully" };
  } catch (error) {
    return { error: "Something went wrong" };
  }
};

export const GetUniqueHotelAction = async (id: string) => {
  try {
    const currentUser = await CurrentUser();
    const userRole = await CurrentUserRole();
    if (!currentUser && userRole !== "ADMIN") {
      return { error: "Unauthorize user" };
    }
    const data = await prismaDb.hotel.findUnique({
      where: {
        id: id,
        userId: currentUser?.id,
      },
    });
    return { success: "Hotel found", data };
  } catch (error) {
    return { error: "Something went wrong" };
  }
};
