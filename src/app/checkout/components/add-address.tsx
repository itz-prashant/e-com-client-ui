import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addAddresses } from "@/lib/http/api";
import { useState } from "react";

const formSchema = z.object({
  addresses: z.string("Address must be atleast 2 character").min(2),
});

const AddAddress = ({id}:{id:string}) => {
    const [isModelOpen, setIsModelOpen] = useState(false)
  const addressForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const queryClient = useQueryClient()

  const {mutate, isPending} = useMutation({
    mutationKey:["addresses", id],
    mutationFn: async(address:string)=>{
        return await addAddresses(id,address)
    },
    onSuccess:()=>{
        setIsModelOpen(false)
        addressForm.reset()
        return queryClient.invalidateQueries({queryKey:["customer"]})
    }
  })

  const handleSubmitAddress = (e) => {
    e.stopPropagation()

   return addressForm.handleSubmit((data:z.infer<typeof formSchema>)=>{
    mutate(data.addresses)
    })(e)
  };
  
  return (
    <Dialog open={isModelOpen} onOpenChange={setIsModelOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="link">
          <Plus size="16" />
          <span className="ml-2">Add New Address</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmitAddress}>
          <DialogHeader>
            <DialogTitle>Add Address</DialogTitle>
            <DialogDescription>
              We can save your address for next time order.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <FieldGroup>
              <Controller
                name="addresses"
                control={addressForm.control}
                render={({ field }) => (
                  <Field>
                    <FieldLabel htmlFor="addresses">Address</FieldLabel>
                    <Textarea {...field} className="mt-2" />
                  </Field>
                )}
              />
            </FieldGroup>
          </div>

          <DialogFooter>
            <Button disabled={isPending} type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddAddress;
