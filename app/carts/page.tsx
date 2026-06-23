import DataTablePagination from "@/components/data-table/DataTablePagination";
import DataTableSkeleton from "@/components/data-table/DataTableSkeleton";
import { getCartCount, getCartsPage } from "@/queries/Cart";
import { getPaginationParams } from "@/components/data-table/PaginationParams";
import DataTable from "@/components/data-table/DataTable";
import { Suspense } from "react";

const CARTS_HEADER = ["Cart ID", "Total Amount", "User ID"];

type PageProps = {
  searchParams: Promise<{ page?: string }>;
};

export default async function CartsPage({ searchParams }: PageProps) {
  const params = await searchParams;

  const totalCount = await getCartCount();
  const { page, totalPages } = getPaginationParams(params, totalCount);

  const carts = await getCartsPage(page);

  const pageKey = params.page ?? "1";
  return (
    <>
      <Suspense
        key={pageKey}
        fallback={<DataTableSkeleton header={CARTS_HEADER} />}
      >
        <DataTable<(typeof carts)[0]> header={CARTS_HEADER} rows={carts} />
      </Suspense>
      {totalPages > 1 && (
        <DataTablePagination basePath={"/carts"} totalPages={totalPages} />
      )}
    </>
  );
}
