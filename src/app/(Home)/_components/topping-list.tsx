"use client";
import { useState } from "react";
import ToppingCard, { Topping } from "./topping-card";

const toppings = [
  {
    id: "1",
    name: "Chicken",
    image: "/chicken.png",
    price: 50,
    isAvailable: true,
  },
  {
    id: "2",
    name: "jelapeno",
    image: "/Jelapeno.png",
    price: 50,
    isAvailable: true,
  },
  {
    id: "3",
    name: "Cheese",
    image: "/cheese.png",
    price: 50,
    isAvailable: true,
  },
];

const Toppinglist = () => {
  const [selectedToppings, setSelectedToppings] = useState([toppings[0]]);

  const handleCheckBoxCheck = (topping:Topping) => {
    const isAlreadyExist = selectedToppings.some((element)=> element.id === topping.id)

    if(isAlreadyExist){
        setSelectedToppings((prev) => prev.filter((elm) => elm.id !== topping.id))
        return
    }

    setSelectedToppings((prev) => [...prev, topping])
  };
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
