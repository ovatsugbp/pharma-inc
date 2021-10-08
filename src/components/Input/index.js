import React from "react";
import "./style.css";

export default function Input({ filter, setFiler }) {
    return (
        <div className="w-5/12 my-16 mx-auto relative flex">
            <input
                type="text"
                className="input"
                placeholder="Digite aqui o dado na tabela que deseja buscar"
                value={filter || ""}
                onChange={(e) => setFiler(e.target.value)}
            />
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 absolute right-2 top-4 cursor-pointer text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
            </svg>
        </div>
    );
}
