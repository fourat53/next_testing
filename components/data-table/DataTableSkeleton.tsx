import { Skeleton } from "@/components/ui/skeleton";
import { PAGE_SIZE } from "@/components/data-table/PaginationParams";
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type DataTableSkeletonProps = {
  header: string[];
  rowCount?: number;
};

export default function DataTableSkeleton({
  header,
  rowCount = PAGE_SIZE,
}: DataTableSkeletonProps) {
  return (
    <Table>
      <TableHeader className="bg-chart-1 dark:bg-sidebar-accent">
        <TableRow>
          {header.map((item) => (
            <TableCell
              key={item}
              className={cn(
                "border-l border-mist-300 dark:border-mist-700",
                item === header[0] && "border-none",
              )}
            >
              {item}
            </TableCell>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: rowCount }, (_, rowIndex) => (
          <TableRow key={`${header[0]}-${rowIndex}`}>
            {header.map((item) => (
              <TableCell
                key={item}
                className={cn(
                  "border-l border-mist-300 dark:border-mist-700",
                  item === header[0] && "border-none",
                )}
              >
                <Skeleton className="h-4 w-full" />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
