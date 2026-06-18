import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";

type DataTableProps<T> = {
  header: string[];
  rows: T[];
};

export default function DataTable<
  T extends { id: number } & Record<string, unknown>,
>({ header, rows }: DataTableProps<T>) {
  return (
    <Table>
      <TableHeader className="bg-chart-1 dark:bg-sidebar-accent">
        <TableRow>
          {header.map((item) => (
            <TableCell key={item}>{item}</TableCell>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.id}>
            {Object.values(row).map((value, colIndex) => (
              <TableCell key={`${row.id}-${colIndex}`}>
                {value !== null && value !== undefined ? String(value) : "-"}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
