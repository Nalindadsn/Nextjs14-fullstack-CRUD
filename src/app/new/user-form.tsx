import { Button, buttonVariants } from "@/components/_ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/_ui/card";
import { Input } from "@/components/_ui/input";
import { Label } from "@/components/_ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/_ui/select";
import { Textarea } from "@/components/_ui/textarea";
import { createUser, updateUser } from "@/actions/users-actions";
import { User } from "@prisma/client";
import Link from "next/link";

export function UserForm({ user }: { user?: User }) {
  const functionAction = user?.id ? updateUser : createUser;

  return (
    <form action={functionAction}>
      <input type="hidden" name="id" value={user?.id} />
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Create User</CardTitle>
          <CardDescription>
            Fill out the form below to create a new user.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input
                name="name"
                id="name"
                placeholder="Name of your user"
                defaultValue={user?.name}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="role">Role</Label>
              <Textarea
                name="role"
                id="role"
                placeholder="Role of your user"
                defaultValue={user?.role || ""}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="username">username</Label>
              <Input
                name="username"
                id="username"
                placeholder="Username of your user"
                defaultValue={user?.name}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="submit" className="w-full">
            {user?.id ? "Update User" : "Create User"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
