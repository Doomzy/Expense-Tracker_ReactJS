import {
  getCoreRowModel,
  useReactTable,
  flexRender,
} from "@tanstack/react-table";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetItems } from "../hooks";

function CustomTable({ class_name, enablePagination = false, itemsPerPage }) {
  const [sorting, setSorting] = useState([{ id: "date", desc: true }]);
  const { transactions, handleTableControls, currentPage, isLast } =
    useGetItems(itemsPerPage);

  const navigate = useNavigate();
  const columns = [
    {
      header: "Date",
      accessorKey: "datetime",
      id: "date",
      sortingFn: "datetime",
      cell: (info) => {
        const fireBaseTime = new Date(
          info.getValue().seconds * 1000 + info.getValue().nanoseconds / 1000000
        );
        return (
          <span>
            {fireBaseTime.toDateString() +
              " || " +
              fireBaseTime.toLocaleTimeString()}
          </span>
        );
      },
    },
    {
      header: () => <div className="px-32">Title</div>,
      accessorKey: "title",
      id: "title",
      enableSorting: false,
    },
    {
      header: "Type",
      accessorKey: "type",
      id: "type",
      enableSorting: false,
      cell: (info) => (
        <span
          className={
            (info.getValue() == "income" && "text-green") || "text-red"
          }
        >
          {info.getValue()}
        </span>
      ),
    },
    {
      header: "Category",
      accessorKey: "category",
      id: "category",
      enableSorting: false,
    },
    {
      header: "Amount",
      accessorKey: "amount",
      id: "amount",
    },
  ];

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

  return (
    <div>
      <p className=" ms-3 text-white text-sm text-end">
        Sorting By
        <span className=" text-secondary-dark">
          {" "}
          {sorting[0]?.id.toLocaleUpperCase() ?? "Default"}
        </span>
      </p>
      <div className=" overflow-x-auto">
        <table className={class_name}>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    <div
                      className={
                        header.column.getCanSort() && " cursor-pointer"
                      }
                      onClick={() => {
                        if (header.column.getCanSort()) {
                          header.column.toggleSorting();
                          handleTableControls(1, "next", {
                            column: header.column.columnDef.accessorKey,
                            type: header.column.getNextSortingOrder(),
                          });
                        }
                      }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {{
                        asc: " 🔼",
                        desc: " 🔽",
                      }[header.column.getIsSorted()] ?? ""}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              //navigate({row.id})
              <tr key={row.id} onClick={() => navigate("")}>
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
      {enablePagination && (
        <div>
          <span className="ms-4 text-white text-sm">
            Page No. {currentPage}
          </span>

          <div id="Pagination" className="flex justify-between px-1 pt-6">
            <div className="min-w-1 max-w-max">
              {currentPage > 1 && (
                <button
                  onClick={() =>
                    handleTableControls(currentPage - 1, "previous")
                  }
                >
                  Previous
                </button>
              )}
            </div>
            <div className="min-w-1 max-w-max">
              {!isLast && (
                <button
                  onClick={() => handleTableControls(currentPage + 1, "next")}
                >
                  Next
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CustomTable;
