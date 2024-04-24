import React from "react";
import EComNavbar from "./components/client/EComNavbar";
import PaginationButton from "./components/server/PaginationButton";

const EComLayout = ({ children }) => {
    return <section className="my-8">
        <EComNavbar />
        {children}
        <PaginationButton />
    </section>
}

export default EComLayout