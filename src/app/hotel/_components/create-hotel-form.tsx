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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { SwitchField } from "./switch-field";
import { ImageUpload } from "@/components/custom/image-upload";
import { useLocation } from "@/hooks/use-location";
import { useEffect, useState } from "react";
import { ICity, IState } from "country-state-city";
import { CountryComboboxForm } from "./country-combobox";
import FileUpload from "@/components/custom/file-upload";

export const CreateHotelForm = () => {
  const [state, setState] = useState<IState[]>([]);
  const [city, setCity] = useState<ICity[]>([]);

  const {
    getAllCountry,
    getCountryByCode,
    getStateByCode,
    getCountryState,
    getCountryCity,
  } = useLocation();
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

  const { watch } = form;

  useEffect(() => {
    const subscription = watch((value) => {
      if (value.country) {
        const theState = getCountryState(value.country);
        if (theState) {
          setState(theState);
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, setState, getCountryState]);

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
            {/* <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a Country" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {country.map((item) => (
                        <SelectItem key={item.isoCode} value={item.isoCode}>
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
            <CountryComboboxForm form={form} />
            {/* Todo filter */}
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

          {/* Cloudinary  */}
          {/* <FormField
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
          /> */}

          {/* Uploadthing  */}
          <FormField
            control={form.control}
            name="hotelImage"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>Add Image</FormLabel>
                <FormControl>
                  <FileUpload
                    apiEndpoint="multipleImageUploader"
                    value={field.value.map((image) => image.url)}
                    // disabled={loading}
                    onChange={(url: any) => {
                      const urls = url.map((item: any) => item.url);
                      field.onChange(
                        urls.map((url: string) => {
                          return { url };
                        })
                      );
                    }}
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
