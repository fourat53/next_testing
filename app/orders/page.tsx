import DataTable from "@/components/tables/DataTable";
import prisma from "@/lib/prisma";

export default async function Page() {
  const orders = await prisma.order.findMany();
  const header = [
    "Order ID",
    "Order Date",
    "Total Amount",
    "Order Status",
    "User ID",
  ];
  const rows = orders.map((o) => ({
    ...o,
    orderDate: o.orderDate.toLocaleDateString(),
    totalAmount: o.totalAmount.toFixed(0),
  }));

  return <DataTable<(typeof rows)[0]> header={header} rows={rows} />;
}
