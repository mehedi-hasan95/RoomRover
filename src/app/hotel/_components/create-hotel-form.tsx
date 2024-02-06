"use client";
import { CreateHotelSchema } from "@/schema/admin/create-hotel-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { SwitchField } from "./switch-field";
import { ComboboxForm } from "./combobox-form";
import { ImageUpload } from "@/components/custom/image-upload";

const languages = [
  { label: "English", value: "en" },
  { label: "French", value: "fr" },
  { label: "German", value: "de" },
  { label: "Spanish", value: "es" },
  { label: "Portuguese", value: "pt" },
  { label: "Russian", value: "ru" },
  { label: "Japanese", value: "ja" },
  { label: "Korean", value: "ko" },
  { label: "Chinese", value: "zh" },
] as const;

export const CreateHotelForm = () => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof CreateHotelSchema>>({
    resolver: zodResolver(CreateHotelSchema),
    defaultValues: {
      title: "",
      desc: "",
      country: "",
      state: "",
      city: "",
      locationDesc: "",
      workspace: true,
      pool: true,
      petAllowed: false,
      resturent: true,
      parking: true,
      cctv: true,
      gym: false,
      hotelImage: [],
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof CreateHotelSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <div className="mx-auto container px-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="desc"
            render={({ field }) => (
              <FormItem>
                <FormLabel>About Hotel</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us a little bit about hotel"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            <ComboboxForm
              data={languages}
              form={form}
              label="Country"
              name={"country"}
              placeholder="Search Country"
              searchText="Select Country"
              emptyText="No country found"
            />
            <ComboboxForm
              data={languages}
              form={form}
              label="State"
              name={"state"}
              placeholder="Search State"
              searchText="Select State"
            />
            <ComboboxForm
              data={languages}
              form={form}
              label="City"
              name={"city"}
              placeholder="Search City"
              searchText="Select City"
            />
          </div>
          <FormField
            control={form.control}
            name="locationDesc"
            render={({ field }) => (
              <FormItem>
                <FormLabel>About Hotel Location</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us a little bit about hotel location"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            <SwitchField
              form={form}
              name={"workspace"}
              label={"Has Workspace?"}
            />
            <SwitchField form={form} name={"pool"} label={"Has Pool?"} />
            <SwitchField
              form={form}
              name={"petAllowed"}
              label={"Has Pet Allowed?"}
            />
            <SwitchField
              form={form}
              name={"resturent"}
              label={"Has resturent?"}
            />
            <SwitchField form={form} name={"parking"} label={"Has parking?"} />
            <SwitchField form={form} name={"cctv"} label={"Has cctv?"} />
            <SwitchField form={form} name={"gym"} label={"Has gym?"} />
          </div>

          <FormField
            control={form.control}
            name="hotelImage"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>Add Image</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value.map((image) => image.url)}
                    // disabled={loading}
                    onChange={(url) =>
                      field.onChange([...field.value, { url }])
                    }
                    onRemove={(url) =>
                      field.onChange([
                        ...field.value.filter((current) => current.url !== url),
                      ])
                    }
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};
