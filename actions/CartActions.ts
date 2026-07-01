"use server";

import { prisma } from "@/lib/prisma";
import { updateTag } from "next/cache";

async function createCart(formData: FormData) {
  const userId = Number(formData.get("userId"));
  const totalAmount = Number(formData.get("totalAmount")) || 0;

  await prisma.cart.create({
    data: {
      userId,
      totalAmount,
    },
  });

  updateTag("carts");
}

export { createCart };
