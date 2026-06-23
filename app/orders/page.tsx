import DataTablePagination from "@/components/data-table/DataTablePagination";
import DataTableSkeleton from "@/components/data-table/DataTableSkeleton";
import { getOrderCount, getOrdersPage } from "@/queries/Order";
import { getPaginationParams } from "@/components/data-table/PaginationParams";
import DataTable from "@/components/data-table/DataTable";
import { formatDate } from "@/lib/date-format";
import { Suspense } from "react";

const ORDERS_HEADER = [
  "Order ID",
  "Order Date",
  "Total Amount",
  "Order Status",
  "User ID",
];

type PageProps = {
  searchParams: Promise<{ page?: string }>;
};

export default async function OrdersPage({ searchParams }: PageProps) {
  const params = await searchParams;

  const totalCount = await getOrderCount();
  const { page, totalPages } = getPaginationParams(params, totalCount);

  const rows = await getOrdersPage(page);
  const orders = rows.map((order) => ({
    ...order,
    orderDate: formatDate(order.orderDate),
  }));

  const pageKey = params.page ?? "1";
  return (
    <>
      <Suspense
        key={pageKey}
        fallback={<DataTableSkeleton header={ORDERS_HEADER} />}
      >
        <DataTable<(typeof orders)[0]> header={ORDERS_HEADER} rows={orders} />
      </Suspense>
      {totalPages > 1 && (
        <DataTablePagination basePath={"/orders"} totalPages={totalPages} />
      )}
    </>
  );
}
