import { Product, Topping } from "@/lib/types";
import { hashTheItem } from "@/lib/utils";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CartItem extends Pick<Product, '_id' | 'name' | 'image' | 'priceConfiguration'> {
    chosenConfiguration: {
        priceConfiguration: {
            [key: string]: string;
        };
        selectedToppings: Topping[];
    };
    qty: number;
    hash?: string;
}
export interface CartState {
  cartItem: CartItem[];
}

const initialState: CartState = {
  cartItem: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const hash = hashTheItem(action.payload)
      const newItem = {
        ...action.payload,
        hash:hash
        // product: action.payload.product,
        // choosenConfiguration: action.payload.choosenConfiguration,
      };
      window.localStorage.setItem(
        "cartItem",
        JSON.stringify([...state.cartItem, newItem])
      );
      return {
        cartItem: [...state.cartItem, newItem],
      };
    },
    setInitialCart: (state, action: PayloadAction<CartItem[]>) => {
      state.cartItem.push(...action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToCart, setInitialCart } = cartSlice.actions;

export default cartSlice.reducer;
