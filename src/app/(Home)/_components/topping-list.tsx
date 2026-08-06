import { useEffect, useState } from "react";
import ToppingCard from "./topping-card";
import { Topping } from "@/lib/types";
import { useSearchParams } from "next/navigation";

const Toppinglist = ({
  selectedToppings,
  handleCheckBoxCheck,
}: {
  selectedToppings: Topping[];
  handleCheckBoxCheck: (topping: Topping) => void;
}) => {
  const [toppings, setToppings] = useState<Topping[]>([]);
const searchParams = useSearchParams()
  useEffect(() => {
    const fetchData = async () => {
      const toppingResponse = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/catalog/toppings?tenantId=${searchParams.get("restaurantId")}`
      );
      const toppings = await toppingResponse.json();
      setToppings(toppings);
    };
    fetchData();
  }, []);

  return (
    <section>
      <h4 className="mt-5">Extra toppings</h4>
      <div className="grid grid-cols-3 gap-4 mt-2">
        {toppings.map((topping) => (
          <ToppingCard
            key={topping.id}
            topping={topping}
            selectedToppings={selectedToppings}
            handleCheckBoxCheck={handleCheckBoxCheck}
          />
        ))}
      </div>
    </section>
  );
};

export default Toppinglist;
