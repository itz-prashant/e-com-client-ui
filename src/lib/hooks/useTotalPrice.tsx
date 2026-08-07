import { useMemo } from "react";
import { CartItem } from "../store/features/cart/cart-slice";

function useTotalPrice(product: CartItem) {
  const totalPrice = useMemo(() => {
    const toppingsTotal = product.chosenConfiguration.selectedToppings.reduce(
      (acc, curr) => acc + curr.price,
      0
    );
    const configPrice = Object.entries(product.chosenConfiguration.priceConfiguration).reduce(
      (acc, [key, value]: [string, string]) => {
        const price = Number(
          product.priceConfiguration[key].availableOptions?.[value]
        );
        return acc + price;
      },
      0
    );
    return toppingsTotal + configPrice;
  }, [product]);

  return totalPrice
}

export default useTotalPrice
