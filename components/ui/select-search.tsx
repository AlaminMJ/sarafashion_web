"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "./input";
import { useEffect, useState } from "react";

type DataItem = {
  value: string;
  label: string;
};

type SelectSearchProps = {
  data: DataItem[];
};

export function SelectSearch({ data }: SelectSearchProps) {
  const [search, setSearch] = useState(data); // Initialize with the full data array
  const [query, setQuery] = useState(""); // Store user input for filtering

  // Filter data based on user input
  useEffect(() => {
    if (query === "") {
      setSearch(data); // Reset to full data when the input is cleared
    } else {
      const filteredData = data.filter((item) =>
        item.label.toLowerCase().includes(query.toLowerCase())
      );
      setSearch(filteredData);
    }
  }, [query, data]);

  return (
    <Select>
      <SelectTrigger className="w-20">
        <SelectValue placeholder="Select an option" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>
            <Input
              placeholder="Search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </SelectLabel>
          {search.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
