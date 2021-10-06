import React from "react";
import "./style.css";

export const Pagination = ({ paginate }) => {
    const pages = [1, 2, 3, 4, 5, 6, 7];

    return (
        <nav>
            <ul className="flex justify-center mt-9">
                {pages.map((item) => (
                    <span
                        key={item}
                        className={`mx-2.5 cursor-pointer pagination__item ${
                            item && "pagination__item--active"
                        }`}
                    >
                        <li onClick={() => paginate(item)}>{item}</li>
                    </span>
                ))}
            </ul>
        </nav>
    );
};
