import { getPaginationParams } from "@/components/data-table/PaginationParams";
import DataTablePagination from "@/components/data-table/DataTablePagination";
import DataTableSkeleton from "@/components/data-table/DataTableSkeleton";
import DataTable from "@/components/data-table/DataTable";
import { Suspense } from "react";
import {
  getProductCount,
  getProductsPage,
  type ProductType,
} from "@/queries/Product";

const PRODUCTS_HEADER = [
  "Product ID",
  "Name",
  "Brand",
  "Price ($)",
  "Inventory",
  "Description",
  "Category ID",
];

interface PageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function ProductsPage({ searchParams }: PageProps) {
  const params = await searchParams;

  const totalCount = await getProductCount();
  const { page, totalPages } = getPaginationParams(params, totalCount);

  const products: ProductType[] = await getProductsPage(page);

  const pageKey = params.page ?? "1";
  return (
    <Suspense
      key={pageKey}
      fallback={<DataTableSkeleton header={PRODUCTS_HEADER} />}
    >
      <DataTable<ProductType> header={PRODUCTS_HEADER} rows={products} />
      {totalPages > 1 && (
        <DataTablePagination basePath={"/products"} totalPages={totalPages} />
      )}
    </Suspense>
  );
}
