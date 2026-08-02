import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card";
import Image from "next/image";

export type Product = {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
};

type PropsTypes = { product: Product };

const Productcard = ({ product }: PropsTypes) => {
  return (
    <Card className="w-full max-w-sm border-none rounded-xl">
      <CardHeader className="flex items-center justify-center">
       <Image width={150} height={150} alt="pizza-image" src={product.image}/>
      </CardHeader>
      <CardContent>
        <h2 className="text-xl font-bold">{product.name}</h2>
        <p className="mt-2">{product.description}</p>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <p>
            <span>From </span>
            <span className="font-bold">₹{product.price}</span>
        </p>
        <Button className="bg-orange-200 hover:bg-orange-300 text-orange-500 rounded-full transition-all duration-300">Choose</Button>
      </CardFooter>
    </Card>
  );
};

export default Productcard;
