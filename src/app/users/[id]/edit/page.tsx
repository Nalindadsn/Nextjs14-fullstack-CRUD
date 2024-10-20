import { UserForm } from "@/components/userForm";
import prisma from "@/lib/prisma";
import { User } from "lucide-react";
import { redirect } from "next/navigation";

export default async function UserPageEdit({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const user = await prisma.user.findUnique({
    where: {
      id: params.id,
    },
  });

  if (!user) {
    redirect("/");
  }

  return (
    <div className=" lg:w-1/2 mx-auto">
      <div>
        <h2 className="text-2xl font-bold mt-8">Update User</h2>
        <p className="flex justify-end">
          <User className="w-5 h-5 mr-2" />
          {user?.name}
          {JSON.stringify(user)}
        </p>
        <UserForm userDetails={user} />
      </div>
    </div>
  );
}
