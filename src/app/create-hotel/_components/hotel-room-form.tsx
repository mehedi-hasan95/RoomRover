"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CreatHotelRoomSchema } from "@/schema/admin/create-hotel-schema";
import { Textarea } from "@/components/ui/textarea";
import { SwitchField } from "./switch-field";
import { useTransition } from "react";
import { ImageUpload } from "@/components/custom/image-upload";

export const HotelRoomForm = () => {
  const [isPending, startTransition] = useTransition();
  // 1. Define your form.
  const form = useForm<z.infer<typeof CreatHotelRoomSchema>>({
    resolver: zodResolver(CreatHotelRoomSchema),
    defaultValues: {
      title: "",
      desc: "",
      kingBed: undefined,
      breckfast: undefined,
      breckfastPrice: undefined,
      kitchen: undefined,
      price: undefined,
      queenBed: undefined,
      roomService: undefined,
      tv: undefined,
      washer: undefined,
      wifi: undefined,
      roomImage: [],
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof CreatHotelRoomSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <div className="container mx-auto px-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Room Name</FormLabel>
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
                <FormLabel>Room Desc</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us a little bit about Room"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 gap-5">
            <FormField
              control={form.control}
              name="kingBed"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>King Bed</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={0}
                      placeholder="Number of King Bed"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="queenBed"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Queen Bed</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={0}
                      placeholder="Number of Queen Bed"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-3">
            <SwitchField
              form={form}
              label="Kitchen"
              name="kitchen"
              disabled={isPending}
            />
            <SwitchField
              form={form}
              label="Room Service"
              name="roomService"
              disabled={isPending}
            />
            <SwitchField
              form={form}
              label="TV"
              name="tv"
              disabled={isPending}
            />
            <SwitchField
              form={form}
              label="Washer"
              name="washer"
              disabled={isPending}
            />
            <SwitchField
              form={form}
              label="WiFi"
              name="wifi"
              disabled={isPending}
            />
            <SwitchField
              form={form}
              label="Free Breckfast"
              name="breckfast"
              disabled={isPending}
            />
            {form.watch("breckfast") === false && (
              <FormField
                control={form.control}
                name="breckfastPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Breckfast Price</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={0}
                        placeholder="5.00"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={0}
                      placeholder="10.00"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="roomImage"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>Room Image</FormLabel>
                <FormControl>
                  <ImageUpload
                    disabled={isPending}
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
