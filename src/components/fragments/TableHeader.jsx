import { flexRender } from "@tanstack/react-table";

function TableHeader({
  header,
  selectedFilter,
  setSelectedFilter,
  enableControls,
  handleTableControls,
}) {
  const headerTitle = header.column.columnDef.accessorKey;

  return (
    <th>
      <div
        className={
          header.column.getCanSort() && enableControls ? " cursor-pointer" : ""
        }
        onClick={() => {
          if (header.column.getCanSort() & enableControls) {
            header.column.toggleSorting();
            handleTableControls(1, "next", {
              column: headerTitle,
              type: header.column.getNextSortingOrder(),
            });
          }
        }}
      >
        {flexRender(header.column.columnDef.header, header.getContext())}
        {{
          asc: " 🔼",
          desc: " 🔽",
        }[header.column.getIsSorted()] ?? ""}
      </div>
      {header.column.columnDef.filters && enableControls ? (
        <select
          onChange={(e) => {
            handleTableControls(1, "next", null, {
              column: headerTitle,
              type: e.target.value,
            });
            setSelectedFilter(e.target.value == "" ? null : headerTitle);
          }}
        >
          <option key="all" value="" selected={selectedFilter != headerTitle}>
            All
          </option>
          {header.column.columnDef.filters.map((filter, index) => (
            <option
              key={index}
              className=" py-3"
              disabled={filter == "----------------"}
              value={filter}
            >
              {filter}
            </option>
          ))}
        </select>
      ) : null}
    </th>
  );
}

export default TableHeader;
