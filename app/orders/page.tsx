import DataTable from "@/components/tables/DataTable";
import { getPaginationParams } from "@/lib/pagination";
import prisma from "@/lib/prisma";

type PageProps = {
  searchParams: Promise<{ page?: string }>;
};

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;
  const totalCount = await prisma.order.count();
  const { page, skip, take, totalPages } = getPaginationParams(
    params,
    totalCount,
  );

  const orders = await prisma.order.findMany({
    skip,
    take,
    orderBy: { id: "asc" },
  });

  const header = [
    "Order ID",
    "Order Date",
    "Total Amount",
    "Order Status",
    "User ID",
  ];
  const rows = orders.map((o) => ({
    ...o,
    orderDate: o.orderDate.toISOString().split("T")[0],
    totalAmount: o.totalAmount.toFixed(0),
  }));

  return (
    <DataTable<(typeof rows)[0]>
      header={header}
      rows={rows}
      pagination={{ currentPage: page, totalPages, basePath: "/orders" }}
    />
  );
}
