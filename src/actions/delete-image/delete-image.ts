"use server";

import { CurrentUser } from "@/lib/current-user";
import { UTApi } from "uploadthing/server";
const utapi = new UTApi();

export const DeleteImagesAction = async (imageKey: string) => {
  try {
    const currentUser = await CurrentUser();
    if (!currentUser) {
      return { error: "Unauthorize user" };
    }
    const data = await utapi.deleteFiles(imageKey);
    return { success: "Image delete successfully", data };
  } catch (error) {
    return { error: "Something went wrong" };
  }
};
