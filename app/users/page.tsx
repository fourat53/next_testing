import DataTable from "@/components/tables/DataTable";
import prisma from "@/lib/prisma";

export default async function Page() {
  const users = await prisma.user.findMany();
  const header = ["User ID", "Firstname", "Lastname", "Email", "Role"];
  const rows = users.map(({ password, ...u }) => u);

  return <DataTable<(typeof rows)[0]> header={header} rows={rows} />;
}
