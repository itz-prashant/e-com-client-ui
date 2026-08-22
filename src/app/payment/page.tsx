import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeftIcon,
  CheckCircle2Icon,
  CircleXIcon,
  LayoutDashboardIcon,
  StoreIcon,
} from "lucide-react";
import Link from "next/link";

const PaymentPage = ({
  searchParams,
}: {
  searchParams: { success: string; orderId: string };
}) => {
  const isOrderSuccess = searchParams.success === "true";
  return (
    <div className="flex flex-col items-center gap-4 w-full mt-28">
      {isOrderSuccess ? (
        <>
          <CheckCircle2Icon size={68} className="text-green-500" />
          <h1>Order Placed successfully</h1>
          <p className="text-base font-semibold -mt-2">
            Thank you for your order
          </p>
        </>
      ) : (
        <>
          <CircleXIcon size={68} className="text-red-500" />
          <h1>Payment has been failed.</h1>
          <p className="text-base font-semibold -mt-2">Please try again</p>
        </>
      )}

      {isOrderSuccess && (
        <Card className="mt-6">
          <CardHeader className="p-4">
            <CardTitle className="flex items-start gap-3 text-lg justify-between">
              <div className="flex items-center gap-3">
                <StoreIcon size={36} className="text-primary" />
                <span>Your Order Information</span>
              </div>
              <Badge className="px-4" variant={"secondary"}>
                Confirmed
              </Badge>
            </CardTitle>
          </CardHeader>
          <Separator />
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <LayoutDashboardIcon size={20} />
              <h2 className="text-base font-medium">Order refrence:</h2>
              <Link
                href={`/order-status/${searchParams.orderId}`}
                className="underline text-primary"
              >
                {searchParams.orderId}
              </Link>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <LayoutDashboardIcon size={20} />
              <h2 className="text-base font-medium">Payment status</h2>
              <span className="underline text-primary">Paid</span>
            </div>
          </CardContent>
        </Card>
      )}

      {isOrderSuccess ? (
        <Button asChild className="mt-6">
          <Link
            href={`/order-status/${searchParams.orderId}`}
            className="flex items-center gap-2"
          >
            <ArrowLeftIcon size={20} className="text-white" />
            <span>Go to status page</span>
          </Link>
        </Button>
      ) : (
        <Button asChild className="mt-6">
          <Link href={`/checkout`} className="flex items-center gap-2">
            <ArrowLeftIcon size={20} className="text-white" />
            <span>Go to checkout page</span>
          </Link>
        </Button>
      )}
    </div>
  );
};

export default PaymentPage;
