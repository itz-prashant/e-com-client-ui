import Image from "next/image";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Toppinglist from "./topping-list";
import { ShoppingCartIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product } from "@/lib/types";

const ProductModel = ({ product }: { product: Product }) => {
  return (
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
              src={product.image}
              unoptimized
            />
          </div>
          <div className="w-2/3 p-4">
            <h3 className="text-xl font-bold">{product.name}</h3>
            <p className="mt-1">{product.description}</p>
            {Object.entries(product.category.priceConfiguration).map(
              ([key, value]) => {
                return (
                  <div key={key}>
                    <h4 className="mt-5">Choose the {key}</h4>
                    <RadioGroup
                      defaultValue={value.availableOptions[0]}
                      className="grid grid-cols-3 gap-3"
                    >
                      {value.availableOptions.map((option) => {
                        return (
                          <div key={option}>
                            <RadioGroupItem
                              value={option}
                              id={option}
                              className="peer sr-only"
                              aria-label={option}
                            />
                            <Label
                              className="flex flex-col items-center justify-between rounded-md border-2 bg-white p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary"
                              htmlFor={option}
                            >
                              {option}
                            </Label>
                          </div>
                        );
                      })}
                    </RadioGroup>
                  </div>
                );
              }
            )}

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
  );
};

export default ProductModel;
