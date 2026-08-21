"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { verifyCoupon } from "@/lib/http/api";
import { useAppSelector } from "@/lib/store/hooks";
import { CouponCode } from "@/lib/types";
import { getItemTotal } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { LoaderCircleIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useMemo, useRef, useState } from "react";

const OrderSummary = ({
  isPlaceOrderPending,
  handleCouponCodeChange,
}: {
  isPlaceOrderPending: boolean;
  handleCouponCodeChange: (code: string) => void;
}) => {
  const searchParams = useSearchParams();
  const cart = useAppSelector((state) => state.cart.cartItem);

  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [discountError, setDiscountError] = useState("");
  const couponCodeRef = useRef<HTMLInputElement>(null);
  const taxesPercentage = 5;
  const deliveryCharges = 50;

  const subTotal = useMemo(() => {
    return cart.reduce((acc, curr) => {
      return acc + curr.qty * getItemTotal(curr);
    }, 0);
  }, [cart]);

  const discountAmount = useMemo(() => {
    return Math.round((subTotal * discountPercentage) / 100);
  }, [subTotal, discountPercentage]);

  const taxesAmount = useMemo(() => {
    const amountAfterDiscount = subTotal - discountAmount;
    return Math.round((amountAfterDiscount * taxesPercentage) / 100);
  }, [subTotal, discountAmount, taxesPercentage]);

  const grandTotalWithDiscount = useMemo(() => {
    return subTotal - discountAmount + taxesAmount + deliveryCharges;
  }, [discountAmount, subTotal, taxesAmount]);

  const grandTotalWithOutDiscount = useMemo(() => {
    return subTotal + taxesAmount + deliveryCharges;
  }, [subTotal, taxesAmount]);

  const { mutate, isError, error } = useMutation({
    mutationKey: ["coupon-code"],
    mutationFn: async () => {
      if (!couponCodeRef.current) {
        return;
      }
      const restaurantid = searchParams.get("restaurantId");
      if (!restaurantid) {
        return;
      }
      const data: CouponCode = {
        code: couponCodeRef.current.value,
        tenantId: restaurantid,
      };
      return await verifyCoupon(data).then((res) => res.data);
    },
    onSuccess: (data) => {
      console.log("data rec", data);
      if (data.valid) {
        setDiscountError("");
        handleCouponCodeChange(
          couponCodeRef.current ? couponCodeRef.current.value : ""
        );
        setDiscountPercentage(data.discount);
        return;
      }
      setDiscountError("Coupon is invalid");
      handleCouponCodeChange("");
      setDiscountPercentage(0);
    },
  });

  const handleCouponValidation = (e) => {
    e.preventDefault();
    mutate();
  };

  return (
    <Card className="w-2/5 border-none h-auto self-start">
      <CardHeader>
        <CardTitle>Order summary</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 pt-6">
        <div className="flex items-center justify-between">
          <span>Subtotal</span>
          <span className="font-bold">₹{subTotal}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Taxes</span>
          <span className="font-bold">₹{taxesAmount}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Delivery charges</span>
          <span className="font-bold">₹{deliveryCharges}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Discount</span>
          <span className="font-bold">₹{discountAmount}</span>
        </div>
        <hr />
        <div className="flex items-center justify-between">
          <span className="font-bold">Order total</span>
          <span className="font-bold flex flex-col items-center">
            <span
              className={discountPercentage ? "line-through text-gray-400" : ""}
            >
              ₹{grandTotalWithOutDiscount}
            </span>
            {discountPercentage ? (
              <span className="text-green-500">₹{grandTotalWithDiscount}</span>
            ) : null}
          </span>
        </div>
        {discountError && <span className="text-red-500">{discountError}</span>}
        {isError && <span className="text-red-500">{error.message}</span>}
        <div className="flex items-center gap-4">
          <Input
            id="coupon"
            name="code"
            type="text"
            className="w-full"
            placeholder="Coupon code"
            ref={couponCodeRef}
          />
          <Button
            type="submit"
            onClick={handleCouponValidation}
            variant={"outline"}
          >
            Apply
          </Button>
        </div>

        <div className="text-right mt-6">
          <Button disabled={isPlaceOrderPending} type="submit">
            {isPlaceOrderPending ? (
              <span className="flex items-center gal-2">
                <LoaderCircleIcon className="animate-spin" />
                <span>Please wait...</span>
              </span>
            ) : (
              <span>Place order</span>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderSummary;
