import React, { useState } from "react";
export const Pagination = ({ postPerPage, totalPosts, paginate }) => {
  let startPage, endPage;
  const [page, setPage] = useState(1);
  if (+page > 5) {
    startPage = +page - 5;
    endPage = +page + 5;
    if (endPage > Math.ceil(totalPosts / postPerPage)) {
      endPage = Math.ceil(totalPosts / postPerPage);
      startPage = endPage - 10;
    }
  } else {
    startPage = 1;
    endPage = 10;
  }
  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }
  //   for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
  //     pageNumbers.push(i);
  //   }
  console.log(pageNumbers);
  return (
    <>
      <div className="pagination">
        {pageNumbers.map((n) => (
          <button
            key={n}
            onClick={() => {
              setPage(n);
              paginate(n);
            }}
            className="btns"
            disabled={n == page ? true : false}
            id={n == page ? "disabled" : null}
          >
            {n}
          </button>
        ))}
      </div>
    </>
  );
};
