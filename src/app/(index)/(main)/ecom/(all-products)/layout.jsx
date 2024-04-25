import React from "react";
import EComNavbar from "./components/client/EComNavbar";
import PaginationButton from "./components/server/PaginationButton";

const EComLayout = ({ children }) => {
    return <section>
        <EComNavbar />
        {children}
        <PaginationButton />
    </section>
}

export default EComLayout