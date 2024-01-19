import { FC, useMemo, useState } from "react";
import { api } from "trpc";
import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_ColumnDef,
  type MRT_ColumnFiltersState,
  type MRT_PaginationState,
  MRT_GlobalFilterTextInput,
  MRT_ToggleDensePaddingButton,
  MRT_ToggleFullScreenButton,
  MRT_ShowHideColumnsButton,
  MRT_ToggleGlobalFilterButton,
  MRT_ToolbarAlertBanner,
} from "mantine-react-table";
import { Transaction } from "@acme/db";
import StatusBadge from "./StatusBadge";
import { STATUS } from "@acme/api/node";
import TableActions from "./TableActions";
import { Button, Flex } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconTrash } from "@tabler/icons-react";

const formateTableDate = (date: Date) => {
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
};

const Table: FC = () => {
  // Api
  const apiUtils = api.useUtils();
  const { mutateAsync: deleteMany, isLoading: isDeletingMany } =
    api.transaction.deleteMany.useMutation({
      onSuccess: () => {
        notifications.show({
          title: "Transaction Deleted",
          message: "Transaction deleted successfully",
          color: "green",
        });
        apiUtils.transaction.getAll.invalidate();
      },
      onError: () => {
        notifications.show({
          title: "Transaction Failed",
          message: "Transaction failed to delete",
          color: "red",
        });
      },
    });

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
      retry: false,
      refetchOnWindowFocus: false,
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
    renderTopToolbar: ({ table }) => {
      const handleDeactivate = async () => {
        const selected = table.getSelectedRowModel().flatRows.map((row) => {
          return row.original.id;
        });

        await deleteMany(selected);
      };

      const disabled = table.getSelectedRowModel().flatRows.length === 0;

      return (
        <>
          <MRT_ToolbarAlertBanner table={table} />
          <Flex
            p="md"
            justify="space-between"
            wrap="wrap"
            gap="sm"
            align="center"
          >
            <Flex gap="xs" wrap="wrap">
              {/* import MRT sub-components */}
              <MRT_GlobalFilterTextInput table={table} />
              <Flex>
                <MRT_ToggleGlobalFilterButton table={table} />
                <MRT_ShowHideColumnsButton table={table} />
                <MRT_ToggleDensePaddingButton table={table} />
                <MRT_ToggleFullScreenButton table={table} />
              </Flex>
            </Flex>
            <Flex gap={8}>
              <Button
                loading={isDeletingMany}
                leftSection={<IconTrash />}
                color="red"
                disabled={disabled}
                onClick={handleDeactivate}
                variant="filled"
              >
                Delete
              </Button>
            </Flex>
          </Flex>
        </>
      );
    },
  });

  return <MantineReactTable table={table} />;
};

export default Table;
