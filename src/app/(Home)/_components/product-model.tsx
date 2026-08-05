"use client";

import Image from "next/image";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Toppinglist from "./topping-list";
import { ShoppingCartIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product, Topping } from "@/lib/types";
import { startTransition, Suspense, useMemo, useState } from "react";
import { useAppDispatch } from "@/lib/store/hooks";
import { addToCart } from "@/lib/store/features/cart/cart-slice";

type ChoosenConfig = {
  [key: string]: string;
};

const ProductModel = ({ product }: { product: Product }) => {
  const dispatch = useAppDispatch();
  const defaultConfiguration = Object.entries(
    product.category.priceConfiguration
  )
    .map(([key, value]) => {
      return { [key]: value.availableOptions[0] };
    })
    .reduce((acc, curr) => ({ ...acc, ...curr }), {});
  const [choosenConfig, setChoosenConfig] = useState<ChoosenConfig>(
    defaultConfiguration as unknown as ChoosenConfig
  );
  const [selectedToppings, setSelectedToppings] = useState<Topping[]>([]);

  const totalPrice = useMemo(() => {
    const toppingsTotal = selectedToppings.reduce(
      (acc, curr) => acc + curr.price,
      0
    );
    const configPrice = Object.entries(choosenConfig).reduce(
      (acc, [key, value]: [string, string]) => {
        const price = Number(
          product.priceConfiguration[key].availableOptions?.[value]
        );
        return acc + price;
      },
      0
    );
    return toppingsTotal + configPrice;
  }, [choosenConfig, selectedToppings, product]);

  const handleCheckBoxCheck = (topping: Topping) => {
    const isAlreadyExist = selectedToppings.some(
      (element) => element.id === topping.id
    );

    startTransition(() => {
      if (isAlreadyExist) {
        setSelectedToppings((prev) =>
          prev.filter((elm: Topping) => elm.id !== topping.id)
        );
        return;
      }

      setSelectedToppings((prev: Topping[]) => [...prev, topping]);
    });
  };

  const handleAddTocart = (product: Product) => {
    const ItemAdd = {
      product,
      choosenConfiguration: {
        priceConfiguration: choosenConfig!,
        selectedToppings,
      },
    };
    dispatch(addToCart(ItemAdd));
  };

  const handleRadioChange = (key: string, data: string) => {
    setChoosenConfig((prev) => {
      return { ...prev, [key]: data };
    });
  };

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
                      onValueChange={(data) => {
                        handleRadioChange(key, data);
                      }}
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

            {product.category.name === "Pizza" && (
              <Suspense fallback={"Topping Loading..."}>
                <Toppinglist
                  selectedToppings={selectedToppings}
                  handleCheckBoxCheck={handleCheckBoxCheck}
                />
              </Suspense>
            )}

            <div className="flex items-center justify-between mt-8">
              <span className="font-bold">₹{totalPrice}</span>
              <Button size="lg" onClick={() => handleAddTocart(product)}>
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
