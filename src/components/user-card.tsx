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
import moment from 'moment'

export function UserCard({ user }: { user: User }) {
const createdAt=moment(user.createdAt).fromNow()
const updatedAt=moment(user.updatedAt).fromNow()
  return (
    <Card className="mb-2">
      <CardHeader className="flex flex-row justify-between ">
        <CardTitle>{user.name}</CardTitle>
        <Badge
          className={clsx({
            "bg-red-500 text-white": user.role === "",
            "bg-yellow-500": user.role === "user",
            "bg-green-500": user.role === "supperAdmin",
            "bg-blue-500": user.role === "admin",
          })}
        >
          {user.role}
        </Badge>
      </CardHeader>
      <CardContent className="flex flex-col">
        <div className="w-full">
        <p>Username: {user.username}</p>
        <span className="text-slate-600">
          {moment(user.createdAt).fromNow()}<br/>
          <span className="text-sm">{createdAt!==updatedAt && `updated at :  ${moment(user.updatedAt).format('MMMM Do YYYY, h:mm:ss a')}`}</span>
         
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
