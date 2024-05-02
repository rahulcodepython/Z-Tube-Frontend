import React from "react";
import EComNavbar from "@/app/(index)/(main)/ecom/components/client/EComNavbar";
import PaginationButton from "@/app/(index)/(main)/ecom/components/server/PaginationButton";

const EComLayout = ({ children }: {children: React.ReactNode}) => {
    return <section>
        <EComNavbar />
        {children}
        <PaginationButton />
    </section>
}

export default EComLayout