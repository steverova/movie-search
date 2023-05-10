import { useState, useEffect } from "react";
import PropTypes from "prop-types";

export default function PaginationCustom({
  totalResult,
  maxButtons,
  onPageChange,
  activePage,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  let startPage, endPage, records;
  records = totalResult;

  totalResult = Math.ceil(totalResult / 10);

  useEffect(() => {
    setCurrentPage(activePage);
  }, [activePage]);

  if (totalResult <= maxButtons) {
    startPage = 1;
    endPage = totalResult;
  } else {
    const middle = Math.floor(maxButtons / 2);
    if (currentPage <= middle) {
      startPage = 1;
      endPage = maxButtons;
    } else if (currentPage + middle >= totalResult) {
      startPage = totalResult - maxButtons + 1;
      endPage = totalResult;
    } else {
      startPage = currentPage - middle;
      endPage = currentPage + middle;
    }
  }

  const pages =
    endPage >= startPage
      ? [...Array(endPage - startPage + 1)].map((_, i) => startPage + i)
      : [];

  function handlePageChange(pageNumber) {
    setCurrentPage(pageNumber);
    onPageChange(pageNumber);
  }

  const activeButtonStyle = {
    backgroundColor: "#f8403d",
    color: "white",
  };

  return (
    <>
      {totalResult > 1 && (
        <div>
          <p style={{margin: "10px 10px 10px 10px"}}>   {records ? "Showing " + records + " records" : "No results"}</p>
          {currentPage > 1 && (
            <button onClick={() => handlePageChange(currentPage - 1)}>
              &lt;&lt;
            </button>
          )}
          {startPage > 1 && (
            <button onClick={() => handlePageChange(1)}>1</button>
          )}
          {startPage > 2 && <button disabled>...</button>}
          {pages.map((page) => (
            <button
              key={page}
              style={currentPage === page ? activeButtonStyle : {}}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          ))}
          {endPage < totalResult - 1 && <button disabled>...</button>}
          {endPage < totalResult && (
            <button onClick={() => handlePageChange(totalResult)}>
              {totalResult}
            </button>
          )}
          {currentPage < totalResult && (
            <button onClick={() => handlePageChange(currentPage + 1)}>
              &gt;&gt;
            </button>
          )}
        </div>
      )}
    </>
  );
}

PaginationCustom.defaultProps = {
  maxButtons: 5,
};

PaginationCustom.propTypes = {
  totalResult: PropTypes.number.isRequired,
  maxButtons: PropTypes.number,
  onPageChange: PropTypes.func.isRequired,
  activePage: PropTypes.number.isRequired,
};
