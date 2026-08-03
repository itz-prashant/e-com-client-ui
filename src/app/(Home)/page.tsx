import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import Productcard from "./_components/product-card";
import { Category, Product } from "@/lib/types";

export default async function Home() {
  const [categoryResponse, productResponse] = await Promise.all([
    fetch(`${process.env.BACKEND_URL}/api/catalog/categories`, {
      next: {
        revalidate: 3600, // 1 hour
      },
    }),
    fetch(
      `${process.env.BACKEND_URL}/api/catalog/products?perPage=100&tenantId=7`,
      {
        next: {
          revalidate: 3600, // 1 hour
        },
      }
    ),
  ]);

  if (!categoryResponse.ok) {
    throw new Error("Failed to fetch categories");
  }

  if (!productResponse.ok) {
    throw new Error("Failed to fetch product");
  }

  const [categories, products] = await Promise.all([
    categoryResponse.json() as Promise<Category[]>,
    productResponse.json() as Promise<{ data: Product[] }>,
  ]);

  return (
    <>
      <section className="bg-white">
        <div className="container mx-auto flex items-center justify-between py-24">
          <div>
            <h1 className="text-7xl font-black font-sans ">
              Super Delicious Pizza in <br />
              <span className="text-primary">Only 45 Minutes!</span>
            </h1>
            <p className="text-2xl mt-8 max-w-lg leading-snug">
              Enjoy a Free Meal if Your Order Takes More Than 45 Minutes!
            </p>
            <Button className="mt-8 text-lg rounded-full py-7 px-6 font-bold">
              Get your pizza now
            </Button>
          </div>
          <div>
            <Image
              alt="pizza-main"
              src={"/pizza-main.png"}
              width={400}
              height={400}
            />
          </div>
        </div>
      </section>

      <section>
        <div className="container mx-auto p-12">
          <Tabs defaultValue={categories[0]._id}>
            <TabsList>
              {categories.map((category) => (
                <TabsTrigger key={category._id} value={category._id}>
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
            {categories.map((category) => (
              <TabsContent key={category._id} value={category._id}>
                <div className="grid grid-cols-4 gap-6 mt-6">
                  {products.data
                    .filter((product) => product.category._id === category._id)
                    .map((product) => (
                      <Productcard key={product._id} product={product} />
                    ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>
    </>
  );
}
