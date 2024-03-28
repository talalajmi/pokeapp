"use client";

import { Fragment } from "react";
import { Button } from "./ui/button";
import { Icon } from "@iconify/react";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) => {
  const pagesToShow = 5;
  const startPage = Math.max(2, currentPage - Math.floor(pagesToShow / 2));
  const endPage = Math.min(totalPages - 1, startPage + pagesToShow - 1);

  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <Fragment>
      {/* Mobile Pagination */}
      <div className="flex items-center justify-between md:hidden">
        <Button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="rounded-full border border-primary bg-yellow-400 transition duration-300 ease-in-out hover:scale-110 hover:bg-yellow-500 active:scale-95"
        >
          <Icon
            fontSize={24}
            icon="akar-icons:arrow-left"
            className="text-primary transition duration-300 ease-in-out"
          />
        </Button>
        <Button
          onClick={() => onPageChange(currentPage + 1)}
          className="rounded-full border border-primary bg-yellow-400 transition duration-300 ease-in-out hover:scale-110 hover:bg-yellow-500 active:scale-95"
        >
          <Icon
            fontSize={24}
            icon="akar-icons:arrow-right"
            className="text-primary transition duration-300 ease-in-out"
          />
        </Button>
      </div>

      {/* Web Pagination */}
      <div className="hidden items-center gap-3 md:flex">
        {currentPage > 1 && (
          <Button
            onClick={() => onPageChange(currentPage - 1)}
            className="rounded-full border border-primary bg-yellow-400 transition duration-300 ease-in-out hover:scale-110 hover:bg-yellow-500 active:scale-95"
          >
            <Icon
              fontSize={24}
              icon="akar-icons:arrow-left"
              className="text-primary transition duration-300 ease-in-out"
            />
          </Button>
        )}
        <Button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className={`rounded-full ${currentPage === 1 ? "bg-primary text-yellow-400" : "border border-primary bg-yellow-400 text-primary"}   transition duration-300 ease-in-out hover:scale-110 hover:bg-yellow-500 active:scale-95`}
        >
          1
        </Button>
        {startPage > 2 && <p>...</p>}
        {pages.map((page) => (
          <Button
            key={page}
            onClick={() => onPageChange(page)}
            className={
              page === currentPage
                ? "rounded-full bg-blue-700 text-yellow-400 transition duration-300 ease-in-out hover:scale-110 hover:bg-blue-600 active:scale-95 active:bg-blue-700"
                : "rounded-full border border-primary bg-yellow-400 text-primary transition duration-300 ease-in-out hover:scale-110 hover:bg-yellow-500 active:scale-95 active:bg-yellow-600"
            }
          >
            {page}
          </Button>
        ))}
        {endPage < totalPages - 1 && <p>...</p>}
        <Button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="rounded-full border border-primary bg-yellow-400 text-primary transition duration-300 ease-in-out hover:scale-110 hover:bg-yellow-500 active:scale-95"
        >
          {totalPages}
        </Button>
        <Button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="rounded-full border border-primary bg-yellow-400  transition duration-300 ease-in-out hover:scale-110 hover:bg-yellow-500 active:scale-95"
        >
          <Icon
            fontSize={24}
            icon="akar-icons:arrow-right"
            className="text-primary transition duration-300 ease-in-out"
          />
        </Button>
      </div>
    </Fragment>
  );
};

export default Pagination;
