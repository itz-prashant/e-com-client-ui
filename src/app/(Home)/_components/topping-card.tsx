"use client";

import { Button } from "@/components/ui/button";
import { PropType, Topping } from "@/lib/types";
import { cn } from "@/lib/utils";
import { CircleCheckIcon } from "lucide-react";
import Image from "next/image";


const ToppingCard = ({
  topping,
  selectedToppings,
  handleCheckBoxCheck,
}: PropType) => {
  const isCurrentSelected = selectedToppings.some(
    (element:Topping) => element.id === topping.id
  );
  return (
    <Button
      onClick={() => handleCheckBoxCheck(topping)}
      variant={"secondary"}
      className={cn(
        "flex flex-col h-42 w-32 relative",
        isCurrentSelected ? "border-primary" : ""
      )}
    >
      <Image src={topping.image} width={80} height={80} alt={topping.name} unoptimized/>
      <h4>{topping.name}</h4>
      <p>₹{topping.price}</p>
      <CircleCheckIcon className={cn("absolute top-2 right-2", isCurrentSelected && "text-primary")}/>
    </Button>
  );
};

export default ToppingCard;
