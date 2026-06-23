import DataTablePagination from "@/components/data-table/DataTablePagination";
import DataTableSkeleton from "@/components/data-table/DataTableSkeleton";
import { getUserCount, getUsersPage } from "@/queries/User";
import { getPaginationParams } from "@/components/data-table/PaginationParams";
import DataTable from "@/components/data-table/DataTable";
import { Suspense } from "react";

const USERS_HEADER = ["User ID", "Firstname", "Lastname", "Email", "Role"];

type PageProps = {
  searchParams: Promise<{ page?: string }>;
};

export default async function UsersPage({ searchParams }: PageProps) {
  const params = await searchParams;

  const totalCount = await getUserCount();
  const { page, totalPages } = getPaginationParams(params, totalCount);

  const users = await getUsersPage(page);
  const rows = users.map(({ password, ...user }) => user);

  const pageKey = params.page ?? "1";
  return (
    <>
      <Suspense
        key={pageKey}
        fallback={<DataTableSkeleton header={USERS_HEADER} />}
      >
        <DataTable<(typeof rows)[0]> header={USERS_HEADER} rows={rows} />
      </Suspense>
      {totalPages > 1 && (
        <DataTablePagination basePath={"/users"} totalPages={totalPages} />
      )}
    </>
  );
}
