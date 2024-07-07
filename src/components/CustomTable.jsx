import {
  getCoreRowModel,
  useReactTable,
  flexRender,
} from "@tanstack/react-table";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SectionTitle } from "./";

function CustomTable({ data }) {
  const [transactions, setTransactoins] = useState(data);
  const navigate = useNavigate();
  const columns = [
    {
      header: "Date",
      accessorKey: "date",
      id: 2,
    },
    {
      header: "Amount",
      accessorKey: "amount",
      id: 3,
    },
    {
      header: "Title",
      accessorKey: "title",
      id: 4,
    },
    {
      header: "Category",
      accessorKey: "category",
      id: 5,
    },
    {
      header: "Type",
      accessorKey: "type",
      id: 6,
    },
  ];

  const table = useReactTable({
    columns: columns,
    data: transactions,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <SectionTitle text="Your Transactions" link_to="/" />
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>{header.column.columnDef.header}</th>
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
    </>
  );
}

export default CustomTable;
