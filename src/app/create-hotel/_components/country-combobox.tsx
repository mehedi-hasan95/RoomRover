"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import { useLocation } from "@/hooks/use-location";
import { useEffect, useState } from "react";

interface CountryComboboxFormProps {
  form: any;
}

export function CountryComboboxForm({ form }: CountryComboboxFormProps) {
  const [countries, setCountries] = useState<any[]>([]);
  const { getAllCountry } = useLocation();

  useEffect(() => {
    let countries = getAllCountry();
    setCountries(countries);
  }, [getAllCountry]);

  return (
    <FormField
      control={form.control}
      name="country"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>Country</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    "w-full justify-between",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value
                    ? countries.find((item) => item.isoCode === field.value)
                        ?.name
                    : "Select Country"}
                  <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
              <Command>
                <CommandInput placeholder="Search country..." className="h-9" />
                <CommandEmpty>No country found.</CommandEmpty>
                <CommandGroup>
                  {countries.map((item) => (
                    <CommandItem
                      value={item.name}
                      key={item.isoCode}
                      onSelect={() => {
                        form.setValue("country", item.isoCode);
                      }}
                    >
                      {item.name}
                      <CheckIcon
                        className={cn(
                          "ml-auto h-4 w-4",
                          item.isoCode === field.value
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        </FormItem>
      )}
    />
  );
}
