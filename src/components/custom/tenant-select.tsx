"use client";

import { Tenant } from "@/lib/types";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useRouter } from "next/navigation";

const TenantSelect = ({ restaurants }: { restaurants: { data: Tenant[] } }) => {
    const router = useRouter()
  const handleValueChange = (value: string) => {
    router.push(`/?restaurantId=${value}`)
  };
  return (
    <Select onValueChange={handleValueChange}>
      <SelectTrigger className="w-full max-w-48">
        <SelectValue placeholder="Select a Restaurant" />
      </SelectTrigger>

      <SelectContent>
        <SelectGroup>
          {restaurants.data.map((item) => (
            <SelectItem key={item.id} value={String(item.id)}>
              {item.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default TenantSelect;
