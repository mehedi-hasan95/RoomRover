"use client";

import qs from "query-string";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/use-debounce";

export const SearchInput = () => {
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce(value);

  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategoryId = searchParams.get("country");

  useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: "/search",
        query: {
          country: currentCategoryId,
          title: debouncedValue,
        },
      },
      { skipEmptyString: true, skipNull: true }
    );

    if (value.length) {
      router.push(url);
    }
  }, [debouncedValue, currentCategoryId, router, value.length]);

  return (
    <div className="relative">
      <Search className="h-4 w-4 absolute top-3 left-3 text-slate-600" />
      <Input
        onChange={(e) => setValue(e.target.value)}
        value={value}
        className="w-full md:w-[300px] pl-9 rounded-full bg-slate-100 dark:bg-slate-700  focus-visible:ring-slate-200"
        placeholder="Search for a Hotel"
      />
    </div>
  );
};
