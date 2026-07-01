"use server";

import { Role } from "@/lib/generated/prisma/enums";
import { prisma } from "@/lib/prisma";
import { updateTag } from "next/cache";

async function createUser(formData: FormData) {
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const email = formData.get("email") as string;
  const role = (formData.get("role") as Role) || "USER";

  await prisma.user.create({
    data: {
      firstName,
      lastName,
      email,
      role,
    },
  });

  updateTag("users");
}

export { createUser };
