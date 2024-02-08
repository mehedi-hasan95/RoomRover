"use client";

import { CldUploadWidget } from "next-cloudinary";
import { useEffect, useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ImagePlus, Trash } from "lucide-react";
import { DeleteCloudinaryImagesAction } from "@/actions/delete-image/delete-image";
import { toast } from "sonner";

interface ImageUploadProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  disabled,
  onChange,
  onRemove,
  value,
}) => {
  const [isPending, startTransition] = useTransition();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  if (!isMounted) {
    return null;
  }

  const handleDelete = (image: string) => {
    let imageName = image.substring(image.lastIndexOf("/") + 1);
    imageName = imageName.slice(0, imageName.lastIndexOf("."));
    const imagePath = "RoomRover/" + imageName;
    onRemove(image);
    startTransition(() => {
      DeleteCloudinaryImagesAction(imagePath).then((data) => {
        data?.success && toast.success(data?.success);
        data?.error && toast.error(data?.error);
      });
    });
  };
  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        {value.map((url) => (
          <div
            key={url}
            className="relative w-[200px] h-[200px] rounded-md overflow-hidden"
          >
            <div className="z-10 absolute top-2 right-2">
              <Button
                type="button"
                onClick={() => handleDelete(url)}
                variant="destructive"
                size="sm"
                disabled={disabled}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <Image fill className="object-cover" alt="Image" src={url} />
          </div>
        ))}
      </div>
      <CldUploadWidget onUpload={onUpload} uploadPreset="hz391dwa">
        {({ open }) => {
          const onClick = () => {
            open();
          };

          return (
            <Button
              type="button"
              disabled={disabled}
              variant="secondary"
              onClick={onClick}
            >
              <ImagePlus className="h-4 w-4 mr-2" />
              Upload an Image
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};
