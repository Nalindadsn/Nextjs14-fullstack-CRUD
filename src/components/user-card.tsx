import { Badge } from "@/components/_ui/badge";
import { Button, buttonVariants } from "@/components/_ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/_ui/card";
import { User } from "@prisma/client";
import clsx from "clsx";
import { UserButtonDelete } from "./user-button-delete";
import Link from "next/link";

export function UserCard({ user }: { user: User }) {
  return (
    <Card className="mb-2">
      <CardHeader className="flex flex-row justify-between ">
        <CardTitle>{user.name}</CardTitle>
        <Badge
          className={clsx({
            "bg-red-500 text-white": user.username === "high",
            "bg-yellow-500": user.username === "medium",
            "bg-green-500": user.username === "low",
            "bg-blue-500": user.username === "urgent",
          })}
        >
          {user.username}
        </Badge>
      </CardHeader>
      <CardContent className="flex flex-col">
        <div className="w-full">
        <p>{user.role}</p>
        <span className="text-slate-600">
          {new Date(user.createdAt).toLocaleDateString()}
        </span>
        </div>
        <div className="flex gap-x-2 justify-end">
        <UserButtonDelete user={user} />
        <Link
          href={`/users/${user.id}/edit`}
          className={buttonVariants({ variant: "secondary" })}
        >
          Edit
        </Link>
      </div>
        
      </CardContent>

    </Card>
  );
}
