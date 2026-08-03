import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import Image from "next/image";
import Toppinglist from "./topping-list";
import { ShoppingCartIcon } from "lucide-react";

export type Product = {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
};

type PropsTypes = { product: Product };

const plans = [
  {
    id: "starter",
    name: "Starter Plan",
    description: "Perfect for small businesses.",
    price: "$10",
  },
  {
    id: "pro",
    name: "Pro Plan",
    description: "Advanced features with more storage.",
    price: "$20",
  },
] as const;

const Productcard = ({ product }: PropsTypes) => {
  return (
    <Card className="w-full max-w-sm border-none rounded-xl">
      <CardHeader className="flex items-center justify-center">
        <Image width={150} height={150} alt="pizza-image" src={product.image} />
      </CardHeader>
      <CardContent>
        <h2 className="text-xl font-bold">{product.name}</h2>
        <p className="mt-2">{product.description}</p>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <p>
          <span>From </span>
          <span className="font-bold">₹{product.price}</span>
        </p>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-orange-200 hover:bg-orange-300 text-orange-500 rounded-full transition-all duration-300">
              Choose
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-2xl sm:h-auto p-0">
            <div className="flex justify-center items-center">
              <div className="w-1/3 flex items-center bg-white rounded-2xl p-4">
                <Image
                  width={500}
                  height={500}
                  alt={product.name}
                  src="/pizza-main.png"
                />
              </div>
              <div className="w-2/3 p-4">
                <h3 className="text-xl font-bold">{product.name}</h3>
                <p className="mt-1">{product.description}</p>

                <div>
                   <h4 className="mt-5">Choose the size</h4>
                  <RadioGroup
                    defaultValue="small"
                    className="grid grid-cols-3 gap-3"
                  >
                    <div>
                      <RadioGroupItem
                        value="small"
                        id="small"
                        className="peer sr-only"
                        aria-label="Small"
                      />
                      <Label
                        className="flex flex-col items-center justify-between rounded-md border-2 bg-white p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary"
                        htmlFor="small"
                      >
                        Small
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem
                        value="medium"
                        id="medium"
                        className="peer sr-only"
                        aria-label="Medium"
                      />
                      <Label
                        className="flex flex-col items-center justify-between rounded-md border-2 bg-white p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary"
                        htmlFor="medium"
                      >
                        Medium
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem
                        value="large"
                        id="large"
                        className="peer sr-only"
                        aria-label="Large"
                      />
                      <Label
                        className="flex flex-col items-center justify-between rounded-md border-2 bg-white p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        htmlFor="large"
                      >
                        Large
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
                <div>
                   <h4 className="mt-5">Choose the crust</h4>
                  <RadioGroup
                    defaultValue="thin"
                    className="grid grid-cols-3 gap-3"
                  >
                    <div>
                      <RadioGroupItem
                        value="thin"
                        id="thin"
                        className="peer sr-only"
                        aria-label="thin"
                      />
                      <Label
                        className="flex flex-col items-center justify-between rounded-md border-2 bg-white p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        htmlFor="thin"
                      >
                        Thin
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem
                        value="thick"
                        id="thick"
                        className="peer sr-only"
                        aria-label="Thick"
                      />
                      <Label
                        className="flex flex-col items-center justify-between rounded-md border-2 bg-white p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary"
                        htmlFor="thick"
                      >
                        Thick
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <Toppinglist />

                <div className="flex items-center justify-between mt-8">
                  <span className="font-bold">₹400</span>
                  <Button size="lg">
                     <ShoppingCartIcon />
                     <span>Add to cart</span>
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
};

export default Productcard;
