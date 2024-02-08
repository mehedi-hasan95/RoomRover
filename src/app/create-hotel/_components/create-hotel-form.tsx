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
import { ImageUpload } from "@/components/custom/image-upload";
import { useLocation } from "@/hooks/use-location";
import { useEffect, useState, useTransition } from "react";
import { ICity, IState } from "country-state-city";
import { CountryComboboxForm } from "./country-combobox";
import { StateComboboxForm } from "./state-combobox";
import { CityComboboxForm } from "./city-combobox";
import {
  CreateHotelAction,
  UpdateHotelAction,
} from "@/actions/admin/hotel-related-actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Hotel, HotelImage } from "@prisma/client";
import { Separator } from "@/components/ui/separator";

interface CreateHotelFormProps {
  initialData: (Hotel & { hotelImage: HotelImage[] }) | null;
}
export const CreateHotelForm = ({ initialData }: CreateHotelFormProps) => {
  const id = initialData?.id;
  const router = useRouter();
  const [error, setError] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();
  const [state, setState] = useState<IState[]>([]);
  const [city, setCity] = useState<ICity[]>([]);

  const action = initialData ? "Update" : "Create";
  const afterActin = initialData ? "Updating..." : "Creating...";

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
      title: initialData?.title || "",
      desc: initialData?.desc || "",
      country: initialData?.country || "",
      state: initialData?.state || "",
      city: initialData?.city || undefined,
      locationDesc: initialData?.locationDesc || "",
      workspace: initialData?.workspace || true,
      pool: initialData?.pool || true,
      petAllowed: initialData?.petAllowed || false,
      resturent: initialData?.resturent || true,
      parking: initialData?.parking || true,
      cctv: initialData?.cctv || true,
      gym: initialData?.gym || false,
      hotelImage: initialData?.hotelImage || [],
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
  }, [watch, setState, getCountryState, setCity, city]);

  useEffect(() => {
    const subscription = watch((value) => {
      if (value.country && value.state) {
        const theCity = getCountryCity(value.country, value.state);
        if (theCity) {
          setCity(theCity);
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [getCountryCity, watch, setState, setCity]);

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof CreateHotelSchema>) {
    startTransition(() => {
      initialData
        ? UpdateHotelAction(values, id as string).then((data) => {
            if (data?.data) {
              toast.success(data?.success);
              router.push(`/create-hotel/${data?.data?.id}`);
            }
            data?.error && toast.error(data?.error);
          })
        : CreateHotelAction(values).then((data) => {
            if (data?.data) {
              toast.success(data?.success);
              router.push(`/create-hotel/${data?.data?.id}`);
            }
            data?.error && toast.error(data?.error);
          });
    });
  }
  return (
    <div>
      <Separator className="mb-5" />
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
              <CountryComboboxForm form={form} />
              <StateComboboxForm form={form} data={state} />
              <CityComboboxForm form={form} data={city} />

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
              <SwitchField
                form={form}
                name={"parking"}
                label={"Has parking?"}
              />
              <SwitchField form={form} name={"cctv"} label={"Has cctv?"} />
              <SwitchField form={form} name={"gym"} label={"Has gym?"} />
            </div>

            {/* Cloudinary  */}
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
                          ...field.value.filter(
                            (current) => current.url !== url
                          ),
                        ])
                      }
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {isPending ? (
              <Button disabled>
                {afterActin} <Loader2 className="ml-2 h-4 w-4 animate-spin" />
              </Button>
            ) : (
              <Button type="submit">{action}</Button>
            )}
          </form>
        </Form>
      </div>
    </div>
  );
};
