import { getPaginationParams } from "@/components/data-table/PaginationParams";
import DataTablePagination from "@/components/data-table/DataTablePagination";
import { getUserCount, getUsersPage, type UserType } from "@/queries/User";
import DataTableSkeleton from "@/components/data-table/DataTableSkeleton";
import DataTable from "@/components/data-table/DataTable";
import { Suspense } from "react";

const USERS_HEADER = ["User ID", "Firstname", "Lastname", "Email", "Role"];

interface PageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function UsersPage({ searchParams }: PageProps) {
  const params = await searchParams;

  const totalCount = await getUserCount();
  const { page, totalPages } = getPaginationParams(params, totalCount);

  const users: UserType[] = await getUsersPage(page);

  const pageKey = params.page ?? "1";
  return (
    <Suspense
      key={pageKey}
      fallback={<DataTableSkeleton header={USERS_HEADER} />}
    >
      <DataTable<UserType> header={USERS_HEADER} rows={users} />
      {totalPages > 1 && (
        <DataTablePagination basePath={"/users"} totalPages={totalPages} />
      )}
    </Suspense>
  );
}
