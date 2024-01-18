import { FC, useMemo, useState } from "react";
import { api } from "trpc";
import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_ColumnDef,
  type MRT_ColumnFiltersState,
  type MRT_PaginationState,
} from "mantine-react-table";
import { Transaction } from "@acme/db";
import StatusBadge from "./StatusBadge";
import { STATUS } from "@acme/api/node";
import TableActions from "./TableActions";

const formateTableDate = (date: Date) => {
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
};

const Table: FC = () => {
  // Table state
  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>(
    [],
  );
  const [transactionName, setTransactionName] = useState("");
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  // data and fetching state
  const {
    data: transactions,
    isLoading,
    isRefetching,
    isError,
  } = api.transaction.getAll.useInfiniteQuery(
    {
      limit: pagination.pageSize,
      filters: columnFilters.map((filter) => ({
        id: filter.id,
        value: String(filter.value),
      })),
      name: transactionName,
      skip: pagination.pageIndex * pagination.pageSize,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    },
  );

  const columns = useMemo<MRT_ColumnDef<Transaction>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Transaction Name",
      },
      {
        accessorKey: "total",
        header: "Total Price",
      },
      {
        accessorKey: "status",
        header: "Status",
        Cell: ({ cell }) => {
          return <StatusBadge status={cell.getValue() as STATUS} />;
        },
      },
      {
        accessorKey: "createdAt",
        header: "Created At",
        Cell: ({ cell }) => {
          return <p>{formateTableDate(cell.getValue() as Date)}</p>;
        },
      },
      {
        accessorKey: "updatedAt",
        header: "Updated At",
        Cell: ({ cell }) => {
          return <p>{formateTableDate(cell.getValue() as Date)}</p>;
        },
      },
      {
        accessorKey: "actions",
        header: "Actions",
        Cell: ({ row }) => {
          const { id } = row.original;
          return <TableActions id={id} />;
        },
      },
    ],
    [],
  );

  const table = useMantineReactTable({
    columns,
    data: transactions?.pages.flatMap((page) => page.items) || [],
    enableRowSelection: true,
    getRowId: (row) => row.id,
    initialState: { showColumnFilters: true },
    manualFiltering: false,
    manualPagination: true,
    rowCount: transactions?.pages[0].totalCount || 0,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setTransactionName,
    onPaginationChange: setPagination,
    state: {
      columnFilters,
      globalFilter: transactionName,
      isLoading,
      pagination,
      showAlertBanner: isError,
      showProgressBars: isRefetching,
    },
    mantineToolbarAlertBannerProps: isError
      ? { color: "red", children: "Error loading data" }
      : undefined,
    enableColumnFilterModes: false,
    enableColumnFilters: false,
    enableColumnOrdering: false,
    enableSorting: false,
  });

  return <MantineReactTable table={table} />;
};

export default Table;
