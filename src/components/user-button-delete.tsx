"use client"
import { Button } from "./ui/button";
import { removeUser } from "@/actions/users-actions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "./ui/badge";
import { User } from "lucide-react";
import {  useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import toast from "react-hot-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { z } from "zod";
import { UserDeleteSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
export function UserButtonDelete({ user }: { user: any }) {
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(UserDeleteSchema),
    defaultValues: {
      username: "",
    },
  });
  const onSubmit = (values:z.infer<typeof UserDeleteSchema>) => {
  
    startTransition(() => {
      if(user?.username===values?.username){

        
      removeUser(values?.username)
      .then((data: any) => {
        console.log(data)
        toast.error("user deleted");
        form.reset({});
        setOpen(false)
      });
      }else{
        toast.error("incorrect username");
      }

    });
  };

  return (


      <Dialog  open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="destructive">DELETE</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
              <br/>
              
              <div className="border p-2 mt-2 flex gap-2"><User className="w-4 w-4"/>username: {user?.username}</div>
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            
          <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="type username"
                      // type="username"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
            disabled={isPending}
            type="submit"
            className="w-full mt-2"
             variant="destructive"
          >
            Delete
          </Button>          
          
          </form>
          </Form>
        </DialogContent>
      </Dialog>
    
  );
}
