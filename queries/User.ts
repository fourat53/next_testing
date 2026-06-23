import { prisma, CACHE_REVALIDATE_SECONDS } from "@/lib/prisma";
import { PAGE_SIZE } from "@/components/data-table/PaginationParams";
import { unstable_cache } from "next/cache";

const getUserCount = unstable_cache(
  async () => prisma.user.count(),
  ["users-count"],
  {
    revalidate: CACHE_REVALIDATE_SECONDS,
    tags: ["users"],
  },
);

function getUsersPage(page: number) {
  return unstable_cache(
    async () =>
      prisma.user.findMany({
        skip: (page - 1) * PAGE_SIZE,
        take: PAGE_SIZE,
        orderBy: { id: "asc" },
      }),
    ["users-page", String(page)],
    { revalidate: CACHE_REVALIDATE_SECONDS, tags: ["users"] },
  )();
}

export { getUserCount, getUsersPage };
