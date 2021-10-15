import React from "react";
import reactDom from "react-dom";

import { useUserData } from "../../context/userData";
import useQuery from "../../Hooks/useQuery";

import "./style.css";

export const Modal = ({ onClose, showMessage, tableData }) => {
    let query = useQuery();

    const page = query.get("page");
    const id = query.get("id");

    const { users, setCurrentPage, setIsModalOpen, isModalOpen } =
        useUserData();

    const externalData = users.filter((item) => item.id === id)[0];
    const exportId = tableData?.id || externalData?.id;
    const exportPage = tableData?.page || page;

    const userModal = {
        picture: tableData?.picture || externalData?.picture,
        name: tableData?.name || externalData?.name,
        id: tableData?.id || externalData?.id,
        email: tableData?.email || externalData?.email,
        gender: tableData?.gender || externalData?.gender,
        phone: tableData?.phone || externalData?.phone,
        birth: tableData?.birth || externalData?.birth,
        nat: tableData?.nat || externalData?.nat,
    };

    if (id) {
        setIsModalOpen(true);
        setCurrentPage(page);
    }
    if (!isModalOpen) return null;

    return reactDom.createPortal(
        <section className="overlay">
            {!userModal.name && !userModal.email ? (
                <div className="user-modal">
                    <div className="user-modal__not-founded">
                        <button
                            className="self-end"
                            onClick={() => onClose(exportPage)}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 text-gray-700"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                        <p className="self-center my-36 text-2xl">
                            Desculpe, não encontramos o usuário :(
                        </p>
                    </div>
                </div>
            ) : (
                <div className="user-modal">
                    <div className="user-modal__img-container">
                        <div className="user-modal__left-container">
                            <img
                                className="user-modal__image"
                                src={userModal.picture}
                                alt={`foto de ${userModal.name}`}
                                width="250"
                                height="250"
                            />
                            <h2 className="text-2xl uppercase mt-8 mb-3 text-center">
                                {userModal.name}
                            </h2>
                            <hr className="user-modal__division" />
                        </div>
                    </div>
                    <div className="user-modal__right-container">
                        <div className="user-modal__header">
                            <button onClick={() => onClose(exportPage)}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4 text-gray-700"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                        <div className="user-modal__data">
                            <p className="mb-4">
                                <span className="user-modal__info">Id:</span>{" "}
                                {userModal.id}
                            </p>
                            <p className="mb-4">
                                <span className="user-modal__info">Email:</span>{" "}
                                {userModal.email}
                            </p>
                            <p className="mb-4">
                                <span className="user-modal__info">
                                    Gênero:
                                </span>{" "}
                                {userModal.gender}
                            </p>

                            <p className="mb-4">
                                <span className="user-modal__info">
                                    Telefone:
                                </span>{" "}
                                {userModal.phone}
                            </p>
                            <p className="mb-4">
                                <span className="user-modal__info">
                                    Data de Nascimento:
                                </span>{" "}
                                {userModal.birth}
                            </p>
                            <p className="mb-4">
                                <span className="user-modal__info">
                                    Nacionalidade:
                                </span>{" "}
                                {userModal.nat}
                            </p>

                            <button
                                className="user-modal__button"
                                onClick={() =>
                                    showMessage(exportId, exportPage)
                                }
                            >
                                Copiar Link
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4 inline-block ml-2"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>,
        document.getElementById("portal")
    );
};
