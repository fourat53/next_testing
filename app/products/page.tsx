import DataTablePagination from "@/components/data-table/DataTablePagination";
import DataTableSkeleton from "@/components/data-table/DataTableSkeleton";
import { getProductCount, getProductsPage } from "@/queries/Product";
import { getPaginationParams } from "@/components/data-table/PaginationParams";
import DataTable from "@/components/data-table/DataTable";
import { Suspense } from "react";

const PRODUCTS_HEADER = [
  "Product ID",
  "Name",
  "Brand",
  "Price ($)",
  "Inventory",
  "Description",
  "Category ID",
];

type PageProps = {
  searchParams: Promise<{ page?: string }>;
};

export default async function ProductsPage({ searchParams }: PageProps) {
  const params = await searchParams;

  const totalCount = await getProductCount();
  const { page, totalPages } = getPaginationParams(params, totalCount);

  const products = await getProductsPage(page);

  const pageKey = params.page ?? "1";
  return (
    <>
      <Suspense
        key={pageKey}
        fallback={<DataTableSkeleton header={PRODUCTS_HEADER} />}
      >
        <DataTable<(typeof products)[0]>
          header={PRODUCTS_HEADER}
          rows={products}
        />
      </Suspense>
      {totalPages > 1 && (
        <DataTablePagination basePath={"/products"} totalPages={totalPages} />
      )}
    </>
  );
}
