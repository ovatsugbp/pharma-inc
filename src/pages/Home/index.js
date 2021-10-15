import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { useUserData } from "../../context/userData";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import Table from "../../components/Table";
import { Modal } from "../../components/Modal";

function Home() {
    const history = useHistory();

    const [user, setUser] = useState(null);
    const { setCurrentPage, isModalOpen, setIsModalOpen } = useUserData();

    const paginate = (number) => {
        history.push("/");
        setCurrentPage(number);
    };
    const openModal = (user) => {
        setUser(user.original);
        setIsModalOpen(true);
    };
    const closeModal = (page) => {
        setIsModalOpen(false);
        setCurrentPage(page);
        if (page) {
            history.push(`/?page=${page}`);
        } else {
            history.push("/");
        }
    };
    const showMessage = (id, page) => {
        const currentURL = window.location.href.split("?")[0];
        let newUrl = new URL(currentURL);
        newUrl.searchParams.set("page", page);
        newUrl.searchParams.set("id", id);

        navigator.clipboard.writeText(newUrl);

        toast.success("Seu texto foi copiado com sucesso!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    return (
        <div className="bg-gray-200 h-full min-h-screen">
            <Header />
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />

            <div className="container mx-auto pb-10">
                <p className="text-center pt-10">
                    Bem-vindo(a) ao sistema de busca de usuários da Pharma Inc.
                </p>
                <p className="text-center pt-3">
                    Aqui você consegue ter uma visualização otimizada dos nossos
                    usuários, podendo filtrar e ordenar os dados <br /> ou ter
                    uma visão expandida clicando na linha desejada.
                </p>
                <Table openModal={openModal} />
                <Modal
                    tableData={user}
                    open={isModalOpen}
                    onClose={closeModal}
                    showMessage={showMessage}
                />
                <Pagination paginate={paginate} />
            </div>
        </div>
    );
}

export default Home;
