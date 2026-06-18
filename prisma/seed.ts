import { PrismaClient, type Prisma } from "@/lib/generated/prisma/client";
import { checkedEnvVar } from "@/lib/checked-env-var";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({
  connectionString: checkedEnvVar("DATABASE_URL"),
});

const prisma = new PrismaClient({
  adapter,
});

const userData: Prisma.UserCreateInput[] = [
  {
    firstName: "Alice",
    lastName: "Wonderland",
    email: "alice@wonder.io",
  },
];

export async function main() {
  for (const u of userData) {
    await prisma.user.create({ data: u });
  }
}

main();
