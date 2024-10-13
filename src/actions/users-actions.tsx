"use server";
import * as z from "zod";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { UserDeleteSchema, UserSchema } from "@/schemas";

export async function createUser(values: z.infer<typeof UserSchema>) {
  const name = values.name;
  const role = values.role;
  const username = values.username;

  if (!name || !role || !username) {
    return { error: "please fill all the inputs!" };
  }
  const isExist=await prisma.user.count({where: {username: username}})

  if(isExist > 0){
    return { error: "User already exists!" };
  }
console
  const newUser = await prisma.user.create({
    data: {
      name: name,
      role: role,
      username: username,
    },
  });
revalidatePath("/");
  return { success: "User Created!" }
}

export async function removeUser(username: string) {
  "use server";

  if (!username) {
    return { error: "username is required!" };
  }

  await prisma.user.delete({
    where: {
      username: username,
    },
  });
revalidatePath("/");
  return { success: "user deleted!" };
}

export async function updateUser(values: z.infer<typeof UserSchema>) {
  const id = values.id;
  const name = values.name;
  const role = values.role;
  const username = values.username;
  

  if (!id || !name || !role || !username) {
    return { error: "please fill all the inputs!" };
  }

  await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      name: name,
      role: role,
      username: username,
    }
  });
  redirect("/");
  return { success: "updated!" };
  
}
