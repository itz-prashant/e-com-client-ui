import { CartItem } from "../store/features/cart/cart-slice";
import { getItemTotal } from "../utils";

function useTotalPrice(product: CartItem) {
  return getItemTotal(product)
}

export default useTotalPrice
