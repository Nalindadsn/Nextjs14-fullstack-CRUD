import { UserForm } from "@/components/userForm";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function UserPageEdit({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const user = await prisma.user.findFirst({
    where: {
      id: params.id,
    },
  });

  if (!user) {
    redirect("/");
  }

  return (
    <div className="flex justify-center items-center h-screen lg:w-1/2 mx-auto">
      <UserForm userDetails={user} />
    </div>
  );
}
