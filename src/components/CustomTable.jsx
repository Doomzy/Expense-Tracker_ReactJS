import {
  getCoreRowModel,
  useReactTable,
  flexRender,
} from "@tanstack/react-table";
import { useState, useEffect } from "react";
import { useTransactionsStore, useModalStore } from "../hooks";
import { TableHeader, PaginationCtrls, CustomTableColumns } from "./";
import { useUser } from "@clerk/clerk-react";

function CustomTable({ class_name, enableControls = false, itemsPerPage }) {
  const [sorting, setSorting] = useState([{ id: "date", desc: true }]);
  const [selectedFilter, setSelectedFilter] = useState("");

  const {
    handleTableControls,
    transactions,
    pagination,
    getTransactions,
    sortingQuery,
    filteringQuery,
  } = useTransactionsStore((state) => state);
  const { user } = useUser();

  const handleOpen = useModalStore((state) => state.handleOpen);
  const setContentDetails = useModalStore((state) => state.setContentDetails);

  const columns = CustomTableColumns;

  const table = useReactTable({
    columns: columns,
    data: transactions,
    sortDescFirst: true,
    getCoreRowModel: getCoreRowModel(),

    manualSorting: true,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
  });

  useEffect(
    () => async () => await getTransactions(itemsPerPage, user.id),
    [pagination.currentPage, pagination.direction, sortingQuery, filteringQuery]
  );

  return (
    <div>
      <p className=" text-end">
        <span className=" ms-3 text-white text-sm">
          Sorting By
          <span className=" text-secondary-dark">
            {" "}
            {sorting[0]?.id.toLocaleUpperCase() ?? "Default"}
          </span>
        </span>
        {selectedFilter && (
          <span className=" ms-3 text-white text-sm">
            | Filterd By
            <span className=" text-secondary-dark">
              {" "}
              {selectedFilter.toLocaleUpperCase()}
            </span>
          </span>
        )}
      </p>

      <div className=" overflow-x-auto">
        <table className={class_name}>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHeader
                    key={header.id}
                    header={header}
                    selectedFilter={selectedFilter}
                    enableControls={enableControls}
                    setSelectedFilter={setSelectedFilter}
                    handleTableControls={handleTableControls}
                  />
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              //navigate({row.id})
              <tr
                key={row.id}
                onClick={() => {
                  setContentDetails(row.original);
                  handleOpen("transactionDetails");
                }}
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    data-label={cell.column.columnDef.accessorKey}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {enableControls && (
        <PaginationCtrls
          currentPage={pagination.currentPage}
          isLast={pagination.isLast}
          handleTableControls={handleTableControls}
        />
      )}
    </div>
  );
}

export default CustomTable;
