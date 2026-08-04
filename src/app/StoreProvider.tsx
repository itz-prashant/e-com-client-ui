"use client";

import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { setInitialCart } from "@/lib/store/features/cart/cart-slice";
import { makeStore } from "@/lib/store/store";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [store] = useState(() => makeStore());

  useEffect(() => {
    try {
      const cart = JSON.parse(localStorage.getItem("cartItem") ?? "[]");
      store.dispatch(setInitialCart(cart));
    } catch (error) {
      console.error(error);
    }
  }, [store]);

  return <Provider store={store}>{children}</Provider>;
}
