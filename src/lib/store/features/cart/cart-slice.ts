import { Product, Topping } from "@/lib/types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
  product: Product;
  choosenConfiguration: {
    priceConfiguration: {
      [key: string]: string;
    };
    selectedToppings: Topping[];
  };
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
      const newItem = {
        product: action.payload.product,
        choosenConfiguration: action.payload.choosenConfiguration,
      };
      window.localStorage.setItem("cartItem", JSON.stringify([...state.cartItem, newItem]));
      return {
        cartItem: [...state.cartItem, newItem],
      };
    },
    setInitialCart : (state, action: PayloadAction<CartItem[]>)=>{
      state.cartItem.push(...action.payload)
    }
  },
});

// Action creators are generated for each case reducer function
export const { addToCart, setInitialCart } = cartSlice.actions;

export default cartSlice.reducer;
