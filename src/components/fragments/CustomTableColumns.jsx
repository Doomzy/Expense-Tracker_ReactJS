import { income_Categories, expense_Categories } from "../../constants";

const CustomTableColumns = [
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
    filters: ["income", "expense"],
    cell: (info) => (
      <span
        className={(info.getValue() == "income" && "text-green") || "text-red"}
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
    filters: [...income_Categories, "----------------", ...expense_Categories],
  },
  {
    header: "Amount",
    accessorKey: "amount",
    id: "amount",
  },
];

export default CustomTableColumns;
