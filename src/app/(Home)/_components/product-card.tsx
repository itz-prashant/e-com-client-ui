import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Product } from "@/lib/types";
import ProductModel from "./product-model";
import { getFromPrice } from "@/lib/utils";

type PropsTypes = { product: Product };

const Productcard = ({ product }: PropsTypes) => {
  console.log(product)
  return (
    <Card className="w-full max-w-sm border-none rounded-xl">
      <CardHeader className="flex items-center justify-center">
        <Image
          width={150}
          height={150}
          alt="pizza-image"
          src={product.image}
          unoptimized
        />
      </CardHeader>
      <CardContent>
        <h2 className="text-xl font-bold">{product.name}</h2>
        <p className="mt-2">{product.description}</p>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <p>
          <span>From </span>
          <span className="font-bold">₹{getFromPrice(product)}</span>
        </p>
          <ProductModel product={product} />
      </CardFooter>
    </Card>
  );
};

export default Productcard;
