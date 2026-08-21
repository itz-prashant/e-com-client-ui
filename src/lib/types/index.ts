import { CartItem } from "../store/features/cart/cart-slice";

export interface Tenant {
  id: number;
  name: string;
  address: string;
  updatedAt: string;
  createdAt: string;
}

export interface PriceConfiguration {
  [key: string]: {
    priceType: "base" | "additional";
    availableOptions: string[];
  };
}

export interface Attribute {
  name: string;
  widgetType: "switch" | "radio";
  defaultValue: string;
  availableOptions: string[];
}

export interface Category {
  _id: string;
  name: string;
  priceConfiguration: PriceConfiguration;
  attributes: Attribute[];
}

export type ProductAttribute = {
  name: string;
  value: string | undefined;
};

export interface ProductPriceConfiguration {
  [key: string]: {
    priceType: "base" | "additional";
    availableOptions: {
      [key: string]: number;
    };
  };
}

export type Product = {
  _id: string;
  name: string;
  description: string;
  category: Category;
  isPublished: boolean;
  priceConfiguration: ProductPriceConfiguration;
  attributes: ProductAttribute[];
  creadtedAt: string;
  image: string;
};

export type Topping = {
  id: string;
  name: string;
  price: number;
  image: string;
};
export type PropType = {
  topping: Topping;
  selectedToppings: Topping[];
  handleCheckBoxCheck: (topping: Topping) => void;
};

export type Address = {
  text: string;
  isDefault: boolean;
};

export type Customer = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  address: Address[];
};

export type CouponCode = {
  code: string;
  tenantId: string;
};

export type Orderdata = {
  cart: CartItem[];
  couponCode: string;
  tenantId: string;
  customerId: string;
  comment?: string;
  address: string;
  paymentMode: string;
};
