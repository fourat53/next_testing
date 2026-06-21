import DataTable from "@/components/tables/DataTable";
import { getPaginationParams } from "@/lib/pagination";
import prisma from "@/lib/prisma";

type PageProps = {
  searchParams: Promise<{ page?: string }>;
};

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;
  const totalCount = await prisma.cart.count();
  const { page, skip, take, totalPages } = getPaginationParams(
    params,
    totalCount,
  );

  const carts = await prisma.cart.findMany({
    skip,
    take,
    orderBy: { id: "asc" },
  });

  const header = ["Cart ID", "Total Amount", "User ID"];

  return (
    <DataTable<(typeof carts)[0]>
      header={header}
      rows={carts}
      pagination={{ currentPage: page, totalPages, basePath: "/carts" }}
    />
  );
}
