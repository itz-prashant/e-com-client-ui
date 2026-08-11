import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import CustomerForm from "./components/customer-form";

export default async function Checkout({
  searchParams,
}: {
  searchParams: Promise<{
    restaurantId?: string;
  }>;
}) {
  const session = await getSession();
  const params = await searchParams;

  const sParams = new URLSearchParams(params)

  const existingQueryParams = sParams.toString()

  sParams.append("return-to", `/checkout${existingQueryParams}`)

  if (!session) {
    redirect(`/login?${sParams}`);
  }

  return (
    <CustomerForm />
  );
}
