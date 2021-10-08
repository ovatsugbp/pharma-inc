import React, { useMemo } from "react";

import { useTable, useSortBy, useGlobalFilter } from "react-table";
import Input from "../Input";
import { COLUMNS } from "./columns";

import { useUserData } from "../../context/userData";

import "./style.css";

export default function Table({ openModal }) {
    const { users } = useUserData();

    const TABLE_DATA = useMemo(() => users, [users]);
    const TABLE_COLUMNS = useMemo(() => COLUMNS, []);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        state,
        setGlobalFilter,
    } = useTable(
        {
            columns: TABLE_COLUMNS,
            data: TABLE_DATA,
        },
        useGlobalFilter,
        useSortBy
    );

    const { globalFilter } = state;

    return (
        <>
            <Input filter={globalFilter} setFiler={setGlobalFilter} />
            <table
                {...getTableProps()}
                className="mx-auto table-fixed bg-gray-50 shadow-md"
            >
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr
                            {...headerGroup.getHeaderGroupProps()}
                            className="border-b-2 border-gray-200"
                        >
                            {headerGroup.headers.map((column) => (
                                <th
                                    {...column.getHeaderProps(
                                        column.getSortByToggleProps()
                                    )}
                                    className="table__header-footer"
                                >
                                    {column.render("Header")}
                                    <span>
                                        {column.isSorted ? (
                                            column.isSortedDesc ? (
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-5 w-5 ml-4 inline-block"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M17 13l-5 5m0 0l-5-5m5 5V6"
                                                    />
                                                </svg>
                                            ) : (
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-5 w-5 ml-4 inline-block"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M7 11l5-5m0 0l5 5m-5-5v12"
                                                    />
                                                </svg>
                                            )
                                        ) : (
                                            ""
                                        )}
                                    </span>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>

                <tbody {...getTableBodyProps()}>
                    {rows.map((row) => {
                        prepareRow(row);
                        return (
                            <tr
                                {...row.getRowProps()}
                                className="table__row"
                                onClick={() => openModal(row)}
                            >
                                {row.cells.map((cell) => {
                                    return (
                                        <td
                                            {...cell.getCellProps()}
                                            className="py-4 px-6 "
                                        >
                                            {cell.render("Cell")}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
}
