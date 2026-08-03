import { useEffect, useState } from "react";
import ToppingCard from "./topping-card";
import { Topping } from "@/lib/types";

const Toppinglist = () => {
  const [toppings, setToppings] = useState<Topping[]>([])
  const [selectedToppings, setSelectedToppings] = useState<Topping[]>([]);

  const handleCheckBoxCheck = (topping:Topping) => {
    const isAlreadyExist = selectedToppings.some((element)=> element.id === topping.id)

    if(isAlreadyExist){
        setSelectedToppings((prev) => prev.filter((elm:Topping) => elm.id !== topping.id))
        return
    }

    setSelectedToppings((prev:Topping[]) => [...prev, topping])
  };

  useEffect(()=>{
    const fetchData = async ()=>{
        const toppingResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/catalog/toppings?tenantId=7`)
        const toppings = await toppingResponse.json()
        console.log("topping", toppings)
        setToppings(toppings)
    }
    fetchData()
  },[])

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
