import { CurrentUser } from "@/lib/current-user";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

const authHandle = async () => {
  const currentUser = await CurrentUser();
  if (!currentUser) throw new Error("Unauthorize");
  return { currentUser };
};

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(() => authHandle())
    .onUploadComplete(() => {}),
  multipleImageUploader: f({
    image: { maxFileSize: "256MB", maxFileCount: 10 },
  })
    .middleware(() => authHandle())
    .onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
