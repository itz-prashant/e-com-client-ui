"use client";

import z from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { getCustomer } from "@/lib/http/api";
import { Address, Customer } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { Coins, CreditCard } from "lucide-react";
import AddAddress from "./add-address";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldGroup } from "@/components/ui/field";
import OrderSummary from "./order-summary";
import { useAppSelector } from "@/lib/store/hooks";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

const customerSchema = z.object({
  address: z.string("Please select an address"),
  paymentMode: z.enum(["card", "cash"]),
  comment: z.string().optional(),
});

const CustomerForm = () => {
  const customerForm = useForm<z.infer<typeof customerSchema>>({
    resolver: zodResolver(customerSchema),
  });

  const searchParams = useSearchParams()
const [chosenCouponCode, setChosenCouponCode] = useState("");
  const cart = useAppSelector((state)=> state.cart)

  const { data: customer } = useQuery<Customer>({
    queryKey: ["customer"],
    queryFn: async () => {
      // return await getCustomer().then(res => res.data)
      const res = await getCustomer();
      return res.data.customer;
    },
  });

  const handlePlaceOrder = (data: z.infer<typeof customerSchema>) => {
    // console.log(data);
    const tenantId = searchParams.get("restaurantId")
    if(!tenantId){
      toast("Restaurant id is required")
      return
    }
    const orderData = {
      cart: cart.cartItem,
      couponCode: chosenCouponCode? chosenCouponCode : "",
      tenantId: tenantId,
      customerId: customer?._id,
      comment : data.comment,
      address: data.address,
      paymentMode: data.paymentMode
    }

    console.log("orderdata", orderData)
  };

  if (!customer) {
    return;
  }
  return (
    <form onSubmit={customerForm.handleSubmit(handlePlaceOrder)}>
      <div className="flex container mx-auto gap-6 mt-16">
        <Card className="w-3/5 border-none">
          <CardHeader>
            <CardTitle>Customer details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="fname">First Name</Label>
                <Input
                  id="fname"
                  type="text"
                  className="w-full"
                  disabled
                  defaultValue={customer?.firstName}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="lname">Last Name</Label>
                <Input
                  id="lname"
                  type="text"
                  className="w-full"
                  disabled
                  defaultValue={customer?.lastName}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="text"
                  className="w-full"
                  disabled
                  defaultValue={customer?.email}
                />
              </div>
              <div className="grid gap-3">
                <div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="name">Address</Label>
                    <AddAddress id={customer._id} />
                  </div>
                  <FieldGroup>
                    <Controller
                      name="address"
                      control={customerForm.control}
                      render={({ field }) => (
                        <Field>
                          <RadioGroup
                            onValueChange={field.onChange}
                            className="grid grid-cols-2 gap-6 mt-2"
                          >
                            {customer?.address?.map((item: Address) => {
                              return (
                                <Card key={item.text} className="p-6">
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem
                                      value={item.text}
                                      id={item.text}
                                    />
                                    <Label
                                      htmlFor={item.text}
                                      className="leading-normal"
                                    >
                                      {item.text}
                                    </Label>
                                  </div>
                                </Card>
                              );
                            })}
                          </RadioGroup>
                        </Field>
                      )}
                    />
                  </FieldGroup>
                </div>
              </div>
              <div className="grid gap-3">
                <Label>Payment Mode</Label>
                <FieldGroup>
                  <Controller
                    name="paymentMode"
                    control={customerForm.control}
                    render={({ field }) => (
                      <Field>
                        <RadioGroup
                          onValueChange={field.onChange}
                          className="flex gap-6"
                        >
                          <div className="w-36">
                            <RadioGroupItem
                              value={"card"}
                              id={"card"}
                              className="peer sr-only"
                              aria-label={"card"}
                            />
                            <Label
                              htmlFor={"card"}
                              className="flex items-center justify-center rounded-md border-2 bg-white p-2 h-16 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                            >
                              <CreditCard size={"20"} />
                              <span className="ml-2">Card</span>
                            </Label>
                          </div>
                          <div className="w-36">
                            <RadioGroupItem
                              value={"cash"}
                              id={"cash"}
                              className="peer sr-only"
                              aria-label={"cash"}
                            />
                            <Label
                              htmlFor={"cash"}
                              className="flex items-center justify-center rounded-md border-2 bg-white p-2 h-16 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                            >
                              <Coins size={"20"} />
                              <span className="ml-2 text-md">Cash</span>
                            </Label>
                          </div>
                        </RadioGroup>
                      </Field>
                    )}
                  />
                </FieldGroup>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="fname">Comment</Label>
                <FieldGroup>
                  <Controller
                    name="comment"
                    control={customerForm.control}
                    render={({ field }) => <Textarea {...field} />}
                  />
                </FieldGroup>
              </div>
            </div>
          </CardContent>
        </Card>
       <OrderSummary handleCouponCodeChange={(code)=>setChosenCouponCode(code)}/>
      </div>
    </form>
  );
};

export default CustomerForm;
