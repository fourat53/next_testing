"use server";

import { prisma } from "@/lib/prisma";
import { updateTag } from "next/cache";

async function createProduct(formData: FormData) {
  const name = formData.get("name") as string;
  const brand = formData.get("brand") as string;
  const price = Number(formData.get("price"));
  const inventory = Number(formData.get("inventory"));
  const description = formData.get("description") as string;

  await prisma.product.create({
    data: {
      name,
      brand,
      price,
      inventory,
      description,
    },
  });

  updateTag("products");
}

export { createProduct };
