function PaginationCtrls({ currentPage, handleTableControls, isLast }) {
  return (
    <div>
      <span className="ms-4 text-white text-sm">Page No. {currentPage}</span>

      <div id="Pagination" className="flex justify-between px-1 pt-6">
        <div className="min-w-1 max-w-max">
          {currentPage > 1 && (
            <button
              onClick={() => handleTableControls(currentPage - 1, "previous")}
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
  );
}

export default PaginationCtrls;
