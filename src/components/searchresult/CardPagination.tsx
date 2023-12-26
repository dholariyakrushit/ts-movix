import React, { useEffect, useState } from "react";
import Pagination from "react-bootstrap/Pagination";
import { useDispatch } from "react-redux";

import { setPaginationNumber } from "../../redux/homeSlice/HomeSlice";

interface MoviePaginationProps {
  number: number;
}

const MoviePagination: React.FC<MoviePaginationProps> = ({ number }) => {
  const [activePage, setActivePage] = useState<number>(1);
  const dispatch = useDispatch();



  const handlePageChange = (pageNumber: number) => {
    setActivePage(pageNumber);
  };

  const totalPages: number = number; // replace with actual total number of pages

  const paginationItems: JSX.Element[] = [];

  if (totalPages <= 5) {
    // if total pages <= 5, show all page numbers
    for (let number = 1; number <= totalPages; number++) {
      paginationItems.push(
        <Pagination.Item
          key={number}
          active={number === activePage}
          onClick={() => handlePageChange(number)}
        >
          {number}
        </Pagination.Item>
      );
    }
  } else {
    // if total pages > 5, show first 2 pages, last 2 pages, and current page with ellipsis
    paginationItems.push(
      <Pagination.Item
        key={1}
        active={1 === activePage}
        onClick={() => handlePageChange(1)}
      >
        1
      </Pagination.Item>
    );

    if (activePage > 3) {
      paginationItems.push(<Pagination.Ellipsis key="ellipsis-start" />);
    }

    let startPage = Math.max(2, activePage - 2);
    let endPage = Math.min(activePage + 2, totalPages - 1);

    for (let number = startPage; number <= endPage; number++) {
      paginationItems.push(
        <Pagination.Item
          key={number}
          active={number === activePage}
          onClick={() => handlePageChange(number)}
        >
          {number}
        </Pagination.Item>
      );
    }

    if (activePage < totalPages - 2) {
      paginationItems.push(<Pagination.Ellipsis key="ellipsis-end" />);
    }

    paginationItems.push(
      <Pagination.Item
        key={totalPages}
        active={totalPages === activePage}
        onClick={() => handlePageChange(totalPages)}
      >
        {totalPages}
      </Pagination.Item>
    );
  }

  useEffect(() => {
    dispatch(setPaginationNumber(activePage));
  }, [activePage, dispatch]);

  return (
    <div className=" mt-4">
      <Pagination className="mx-auto flex-wrap justify-content-center">
        <Pagination.Prev
          disabled={activePage === 1}
          onClick={() => handlePageChange(activePage - 1)}
        />
        {paginationItems}
        <Pagination.Next
          disabled={activePage === totalPages}
          onClick={() => handlePageChange(activePage + 1)}
        />
      </Pagination>
    </div>
  );
};

export default MoviePagination;
