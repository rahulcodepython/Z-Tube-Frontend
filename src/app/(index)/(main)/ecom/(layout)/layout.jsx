import React from "react";
import EComNavbar from "@/app/(index)/(main)/ecom/(layout)/components/client/EComNavbar";
import PaginationButton from "@/app/(index)/(main)/ecom/(layout)/components/server/PaginationButton";

const EComLayout = ({children}) => {
    return <section>
        <EComNavbar />
        {children}
        <PaginationButton />
    </section>
}

export default EComLayout