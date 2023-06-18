"use client";

import { returnPaginationRange } from "@/utils/pagination";
import { useRouter, useSearchParams } from "next/navigation";

export default function Pagination({
  totalData,
  defaultPage,
  defaultLimit,
  siblings,
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  let page = defaultPage;

  let totalPage = Math.ceil(totalData / defaultLimit);

  if (page >= totalPage) {
    page = totalPage;
  }

  let pageArray = returnPaginationRange(totalPage, page, siblings);

  function createNavigationURL(page) {
    let url = `/?page=${page}`;

    searchParams.forEach((value, key) => {
      if (key !== "page") {
        url = url + `&${key}=${value}`;
      }
    });

    return url;
  }

  function handlePageChange(value) {
    if (value !== defaultPage) {
      if (value === "&laquo;") {
        if (page !== 1) {
          router.push(createNavigationURL(1));
        }
      } else if (value === "&lsaquo;") {
        if (page !== 1) {
          router.push(createNavigationURL(page - 1));
        }
      } else if (value === "&rsaquo;") {
        if (page !== totalPage) {
          router.push(createNavigationURL(page + 1));
        }
      } else if (value === "&raquo;") {
        if (page !== totalPage) {
          router.push(createNavigationURL(totalPage));
        }
      } else {
        router.push(createNavigationURL(value));
      }
    }
  }

  return (
    <div className="pagination">
      <ul>
        <li className="pagi-btn" onClick={() => handlePageChange("&laquo;")}>
          <span>&laquo;</span>
        </li>
        <li className="pagi-btn" onClick={() => handlePageChange("&lsaquo;")}>
          <span>&lsaquo;</span>
        </li>
        {pageArray.map((value) => {
          if (value === page) {
            return (
              <li
                key={value}
                className="numb active"
                onClick={() => handlePageChange(value)}
              >
                <span>{value}</span>
              </li>
            );
          } else if (value === " ..." || value === "... ") {
            return (
              <li key={value} className="dots">
                <span>{value}</span>
              </li>
            );
          } else {
            return (
              <li
                key={value}
                className="numb"
                onClick={() => handlePageChange(value)}
              >
                <span>{value}</span>
              </li>
            );
          }
        })}
        <li className="pagi-btn" onClick={() => handlePageChange("&rsaquo;")}>
          <span>&rsaquo;</span>
        </li>
        <li className="pagi-btn" onClick={() => handlePageChange("&raquo;")}>
          <span>&raquo;</span>
        </li>
      </ul>
    </div>
  );
}
