import {
  getCoreRowModel,
  useReactTable,
  flexRender,
  getSortedRowModel,
} from "@tanstack/react-table";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CustomTable({ data, class_name }) {
  const [transactions, setTransactoins] = useState(data);
  const [sorting, setSorting] = useState([{ id: "date", asc: true }]);

  const navigate = useNavigate();
  const columns = [
    {
      header: "Date",
      accessorKey: "date",
      id: "date",
      sortingFn: "datetime",
    },
    {
      header: "Amount",
      accessorKey: "amount",
      id: "amount",
    },
    {
      header: "Title",
      accessorKey: "title",
      id: "title",
    },
    {
      header: "Category",
      accessorKey: "category",
      id: "category",
    },
    {
      header: "Type",
      accessorKey: "type",
      id: "type",
    },
  ];

  const table = useReactTable({
    columns: columns,
    data: transactions,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,

    state: {
      sorting,
    },
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
                      className=" cursor-pointer"
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {header.column.columnDef.header}
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
    </div>
  );
}

export default CustomTable;
