import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Category, Product } from "@/lib/types";
import Productcard from "./product-card";

const ProductList = async () => {
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

  console.log("p", products)
  return (
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
  );
};

export default ProductList;
