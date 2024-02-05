"use server";

import { v2 as cloudinary } from "cloudinary";
import { CurrentUser } from "@/lib/current-user";
import { UTApi } from "uploadthing/server";
const utapi = new UTApi();

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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

export const DeleteCloudinaryImagesAction = async (imageKey: string) => {
  try {
    const currentUser = await CurrentUser();
    if (!currentUser) {
      return { error: "Unauthorize user" };
    }
    const data = await cloudinary.uploader.destroy(imageKey);
    return { success: "Image delete successfully", data };
  } catch (error) {
    return { error: "Something went wrong" };
  }
};
