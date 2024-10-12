"use client";

import * as z from "zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { UserSchema } from "@/schemas";
import { Input } from "@/components/_ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,  
} from "@/components/ui/form";
// import { CardWrapper } from "@/components/auth/card-wrapper"
import { Button } from "@/components/_ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { createUser, updateUser } from "@/actions/users-actions";
import { Card } from "./ui/card";
import toast from "react-hot-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
// import { register } from "@/actions/register";


export const UserForm = ({ userDetails }: { userDetails?: any }) => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof UserSchema>>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      name:userDetails?userDetails?.name: "",
      role: userDetails?userDetails?.role: "",
      username: userDetails?userDetails?.username: "",
    },
  });

  const onSubmit = (values: z.infer<typeof UserSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      if(userDetails) {
        values.id=userDetails.id;
        
      updateUser(values)
      .then((data: any) => {
        toast.success("updated");
      });
      }else{

        createUser(values)
        .then((data: any) => {

          if (data.success) {
            
          toast.success(data.success);
          form.reset()
          }else{

            toast.error(data.error);
          }
        });
      }
    });
  };

  return (
    <div>
    <Card className="p-2">
      <Form {...form}>
        <form 
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="Nalinda Dissanayaka"
                      type="name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <FormControl>
                    
                    <Select  onValueChange={field.onChange} defaultValue={field.value}
                      disabled={isPending}>
                              <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a verified email to display" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                <SelectItem value="supperAdmin">Super Admin</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="user">User</SelectItem>
                </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>username</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="username"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button
            disabled={isPending}
            type="submit"
            className="w-full"
          >
            {userDetails ? "Update user" : "Create new user"}
          </Button>
        </form>
      </Form>
      </Card>
    </div>
  );
};
