import React from "react";
import Header from "../../components/Header";
import Table from "../../components/Table";

function Home() {
    return (
        <div className="bg-gray-200 h-full min-h-screen">
            <Header />
            <div className="container mx-auto pb-10">
                <Table />
            </div>
        </div>
    );
}

export default Home;
