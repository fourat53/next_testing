import { getPaginationParams } from "@/components/data-table/PaginationParams";
import { getOrderCount, getOrdersPage, type OrderType } from "@/queries/Order";
import DataTablePagination from "@/components/data-table/DataTablePagination";
import DataTableSkeleton from "@/components/data-table/DataTableSkeleton";
import DataTable from "@/components/data-table/DataTable";
import { Suspense } from "react";

const ORDERS_HEADER = [
  "Order ID",
  "Order Date",
  "Total Amount",
  "Order Status",
  "User ID",
];

interface PageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function OrdersPage({ searchParams }: PageProps) {
  const params = await searchParams;

  const totalCount = await getOrderCount();
  const { page, totalPages } = getPaginationParams(params, totalCount);

  const orders: OrderType[] = await getOrdersPage(page);

  const pageKey = params.page ?? "1";
  return (
    <Suspense
      key={pageKey}
      fallback={<DataTableSkeleton header={ORDERS_HEADER} />}
    >
      <DataTable<OrderType> header={ORDERS_HEADER} rows={orders} />
      {totalPages > 1 && (
        <DataTablePagination basePath={"/orders"} totalPages={totalPages} />
      )}
    </Suspense>
  );
}
