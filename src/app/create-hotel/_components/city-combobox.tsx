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

interface CityComboboxFormProps {
  form: any;
  data: any;
  disabled?: boolean;
}

export function CityComboboxForm({
  form,
  data,
  disabled,
}: CityComboboxFormProps) {
  return (
    <FormField
      control={form.control}
      name="city"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>City</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  disabled={data?.length < 1}
                  variant="outline"
                  role="combobox"
                  className={cn(
                    "w-full justify-between",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value
                    ? data.find((item: any) => item.name === field.value)?.name
                    : "Select City"}
                  <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
              <Command>
                <CommandInput placeholder="Search City..." className="h-9" />
                <CommandEmpty>No City found.</CommandEmpty>
                <CommandGroup>
                  {data?.map((item: any) => (
                    <CommandItem
                      disabled={disabled}
                      value={item.name}
                      key={item.name}
                      onSelect={() => {
                        form.setValue("city", item.name);
                      }}
                    >
                      {item.name}
                      <CheckIcon
                        className={cn(
                          "ml-auto h-4 w-4",
                          item.name === field.value
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
