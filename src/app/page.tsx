import { UserCard } from "@/components/user-card";
import prisma from "@/lib/prisma";
import { UserForm } from "@/components/userForm";

export const dynamic = "force-dynamic";

async function HomePage({searchParams}:{
  searchParams?: {
    id: string
  }
}) {
  const users = await prisma.user.findMany();

  return (<div className="lg:flex lg:space-x-4 max-w-screen-lg mx-auto">
    {/* {JSON.stringify(searchParams?id)} */}
    
    <div >

    <UserForm/>
    </div>
{/* ----- */}
{/* <UserForm/> */}
    <div className="w-full ">
      <h2 className="text-2xl font-bold my-3 border-b">User List</h2>
      
      {users.map((user) => (
        <UserCard user={user} key={user.id} />
      ))}
    </div></div>
  );
}

export default HomePage;
