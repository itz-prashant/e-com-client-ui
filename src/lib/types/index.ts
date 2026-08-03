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
     _id: string,
    name: string;
    priceConfiguration: PriceConfiguration;
    attributes: Attribute[];
}

export type ProductAttribute = {
    name: string;
    value : string | undefined
}

export type Product ={
    _id: string
    name: string
    description: string
    category: Category
    isPublished: boolean
    priceConfiguration: PriceConfiguration;
    attributes: ProductAttribute[]
    creadtedAt: string
    image: string
}
