import { UserCard } from "@/components/user-card";
import prisma from "@/lib/prisma";
import { UserForm } from "@/components/userForm";

export const dynamic = "force-dynamic";

async function HomePage({
  searchParams,
}: {
  searchParams?: {
    id: string;
  };
}) {
  const users = await prisma.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="lg:flex lg:space-x-4 max-w-screen-lg mx-auto p-3">
      <div className="lg:w-1/3">
        <UserForm />
      </div>

      <div className="lg:w-2/3 ">
        <h2 className="text-2xl font-bold my-3 border-b flex justify-between">
          User List
          <span>{`(${
            users.length > 9 ? users.length : "0" + users.length
          })`}</span>
        </h2>

        {users.map((user) => (
          <UserCard user={user} key={user.id} />
        ))}
      </div>
    </div>
  );
}

export default HomePage;
