import React from "react";
import { useHistory } from "react-router";
import { useUserData } from "../../context/userData";

import "./style.css";

function Header() {
    const history = useHistory();
    const { setCurrentPage } = useUserData();

    const backToPageOne = () => {
        history.push("/");
        setCurrentPage(1);
    };
    return (
        <div className="w-full px-10 py-5 bg-gray-300 flex justify-between">
            <div className="header__left-item">
                <div>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 fill-current text-gray-50 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"
                        />
                    </svg>
                </div>
                <div>
                    <h2 className="text-xl text-gray-50">Pharma Inc.</h2>
                </div>
            </div>
            <div className="header__right-item" onClick={backToPageOne}>
                <span className="text-white mr-3">Voltar ao início</span>
                <div>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6  text-gray-50"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                        />
                    </svg>
                </div>
            </div>
        </div>
    );
}

export default Header;
