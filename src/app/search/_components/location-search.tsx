"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useLocation } from "@/hooks/use-location";
import { useDebounce } from "@/hooks/use-debounce";
import qs from "query-string";
import { useRouter, useSearchParams } from "next/navigation";

export function LocationSearch() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const { getAllCountry } = useLocation();
  const countrys = getAllCountry();
  const debouncedValue = useDebounce(value);

  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategoryId = searchParams.get("title");

  React.useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: "/search",
        query: {
          title: currentCategoryId,
          country: debouncedValue,
        },
      },
      { skipEmptyString: true, skipNull: true }
    );

    if (value.length) {
      router.push(url);
    }
  }, [debouncedValue, currentCategoryId, router, value.length]);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? countrys.find((item) => item.isoCode === value)?.name
            : "Search Country..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search Country..." />
          <CommandEmpty>No Country found.</CommandEmpty>
          <CommandGroup>
            {countrys.map((item) => (
              <CommandItem
                key={item.isoCode}
                value={item.name}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : item.isoCode);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === item.isoCode ? "opacity-100" : "opacity-0"
                  )}
                />
                {item.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
