import DataTable from "@/components/tables/DataTable";
import prisma from "@/lib/prisma";

export default async function Page() {
  const products = await prisma.product.findMany();
  const header = [
    "Product ID",
    "Name",
    "Brand",
    "Price",
    "Inventory",
    "Description",
    "Category ID",
  ];
  const rows = products.map((p) => ({
    ...p,
    price: p.price.toFixed(2),
  }));

  return <DataTable<(typeof rows)[0]> header={header} rows={rows} />;
}
