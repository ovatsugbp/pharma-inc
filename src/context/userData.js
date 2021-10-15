import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const UserContext = createContext();

export default function UserProvider({ children }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

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
                    picture: user.picture.large,
                    name: `${user.name.first} ${user.name.last}`,
                    email: user.email,
                    gender: user.gender === "female" ? "Feminino" : "Masculino",
                    birth: `${dob[2]}/${dob[1]}/${dob[0]}`,
                    phone: user.phone,
                    nat: user.nat,
                    location: `${user.location.street.name}, ${user.location.street.number}, ${user.location.city}, ${user.location.state}, ${user.location.country}, ${user.location.postcode}`,
                    id: user.login.uuid,
                    page: currentPage,
                });
            });
            setUsers(USERS);
        }
        fetchUser();
    }, [currentPage]);

    return (
        <UserContext.Provider
            value={{
                users,
                currentPage,
                setCurrentPage,
                isModalOpen,
                setIsModalOpen,
            }}
        >
            {children}
        </UserContext.Provider>
    );
}

export function useUserData() {
    const context = useContext(UserContext);
    const { users, currentPage, setCurrentPage, isModalOpen, setIsModalOpen } =
        context;
    return { users, currentPage, setCurrentPage, isModalOpen, setIsModalOpen };
}
