import DataTable from "@/components/tables/DataTable";
import { getPaginationParams } from "@/lib/pagination";
import prisma from "@/lib/prisma";

type PageProps = {
  searchParams: Promise<{ page?: string }>;
};

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;
  const totalCount = await prisma.user.count();
  const { page, skip, take, totalPages } = getPaginationParams(
    params,
    totalCount,
  );

  const users = await prisma.user.findMany({
    skip,
    take,
    orderBy: { id: "asc" },
  });

  const header = ["User ID", "Firstname", "Lastname", "Email", "Role"];
  const rows = users.map(({ password, ...u }) => u);

  return (
    <DataTable<(typeof rows)[0]>
      header={header}
      rows={rows}
      pagination={{ currentPage: page, totalPages, basePath: "/users" }}
    />
  );
}
