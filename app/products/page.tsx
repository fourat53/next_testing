import DataTable from "@/components/tables/DataTable";
import { getPaginationParams } from "@/lib/pagination";
import prisma from "@/lib/prisma";

type PageProps = {
  searchParams: Promise<{ page?: string }>;
};

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;
  const totalCount = await prisma.product.count();
  const { page, skip, take, totalPages } = getPaginationParams(
    params,
    totalCount,
  );

  const products = await prisma.product.findMany({
    skip,
    take,
    orderBy: { id: "asc" },
  });

  const header = [
    "Product ID",
    "Name",
    "Brand",
    "Price",
    "Inventory",
    "Description",
    "Category ID",
  ];
  const rows = products.map((p) => ({
    ...p,
    price: `${p.price.toFixed(2)} $`,
  }));

  return (
    <DataTable<(typeof rows)[0]>
      header={header}
      rows={rows}
      pagination={{ currentPage: page, totalPages, basePath: "/products" }}
    />
  );
}
