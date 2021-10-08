import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import "./style.css";

import { useUserData } from "../../context/userData";

export const Pagination = ({ paginate }) => {
    const history = useHistory();

    const [pages, setPages] = useState([1, 2, 3, 4, 5, 6, 7]);
    const { currentPage, setCurrentPage } = useUserData();

    const previousPage = (page) => {
        history.push("/");

        let newArr = [];

        for (let i = 0; i < pages.length; i++) {
            newArr.push(pages[i]);
        }
        if (pages[0] > 1) {
            newArr.unshift(pages[0] - 1);
            newArr.pop();
        }
        setPages(newArr);
        if (page > 1) setCurrentPage(Number(page) - 1);
    };

    const nextPage = (page) => {
        history.push("/");

        let newArr = [];
        for (let i = 0; i < pages.length; i++) {
            newArr.push(pages[i]);
        }
        newArr.push(pages[pages.length - 1] + 1);
        newArr.shift();
        setPages(newArr);
        setCurrentPage(Number(page) + 1);
    };

    return (
        <nav>
            <ul className="flex justify-center mt-9">
                <span onClick={() => previousPage(currentPage)}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 inline-block mt-3 cursor-pointer"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 19l-7-7 7-7"
                        />
                    </svg>
                </span>
                {pages.map((item) => (
                    <span
                        key={item}
                        className={`mx-2.5 cursor-pointer pagination__item ${
                            item === Number(currentPage)
                                ? "pagination__item--active"
                                : ""
                        }`}
                    >
                        <li onClick={() => paginate(item)}>{item}</li>
                    </span>
                ))}
                <span onClick={() => nextPage(currentPage)}>
                    {" "}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 inline-block mt-3 cursor-pointer"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                        />
                    </svg>
                </span>
            </ul>
        </nav>
    );
};
