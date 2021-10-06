import React, { useEffect, useMemo, useState } from "react";

import { useTable, useSortBy, useGlobalFilter } from "react-table";
import Input from "../Input";
import { COLUMNS } from "./columns";
import api from "../../services/api";

import "./style.css";
import { Pagination } from "../Pagination";

export default function Table() {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        async function fetchUser() {
            const USERS = [];
            const response = await api.get(
                `?page=${currentPage}&results=50&seed=abc`
            );
            response.data.results.forEach((user) => {
                const dob = user.dob.date.slice(0, 10).split("-");
                USERS.push({
                    picture: user.picture.medium,
                    name: `${user.name.first} ${user.name.last}`,
                    email: user.email,
                    gender: user.gender === "female" ? "Feminino" : "Masculino",
                    birth: `${dob[2]}/${dob[1]}/${dob[0]}`,
                    phone: user.phone,
                    nat: user.nat,
                    location: `${user.location.street.name}, ${user.location.street.number}, ${user.location.city}, ${user.location.state}, ${user.location.country}, ${user.location.postcode}`,
                    id: user.login.uuid,
                });
            });
            console.log(response, "USERS");
            setUsers(USERS);
        }
        fetchUser();
    }, [currentPage]);

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

    const paginate = (number) => {
        setCurrentPage(number);
    };

    return (
        <>
            <Input filter={globalFilter} setFiler={setGlobalFilter} />
            <table
                {...getTableProps()}
                className="mx-auto table-fixed bg-gray-50 "
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
                            <tr {...row.getRowProps()} className="table__row">
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
            <Pagination paginate={paginate} />
        </>
    );
}
