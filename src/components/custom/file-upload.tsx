import { Trash } from "lucide-react";
import Image from "next/image";
import React, { useTransition } from "react";
import { Button } from "../ui/button";
import { UploadDropzone } from "@/lib/uploadthing";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import { toast } from "sonner";
import { DeleteImagesAction } from "@/actions/delete-image/delete-image";

type Props = {
  apiEndpoint: keyof typeof ourFileRouter;

  // disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
};

const FileUpload = ({
  apiEndpoint,
  onChange,
  onRemove,
  // disabled,
  value,
}: Props) => {
  const [isPending, startTransition] = useTransition();
  const handleDelete = (image: string) => {
    const key = image.substring(image.lastIndexOf("/") + 1);
    onRemove(image);
    startTransition(() => {
      DeleteImagesAction(key).then((data) => {
        data?.success && toast.success(data?.success);
        data?.error && toast.error(data?.error);
      });
    });
  };
  return (
    <div className="w-full bg-muted/30">
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
                disabled={isPending}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <Image fill className="object-cover" alt="Image" src={url} />
          </div>
        ))}
      </div>
      <UploadDropzone
        endpoint={apiEndpoint}
        onClientUploadComplete={(res) => {
          onChange(res as any);
        }}
        onUploadError={(error) => {
          toast.error(`${error?.message}`);
        }}
      />
    </div>
  );
};

export default FileUpload;
