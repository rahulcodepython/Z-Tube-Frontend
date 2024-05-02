import React from "react";

const EComProductsLayout = ({ filterSidebar, children }: {filterSidebar: React.ReactNode, children: React.ReactNode}) => {
    return <section className={'grid grid-cols-1 gap-4'}>
        {filterSidebar}
        {children}
    </section>
}

export default EComProductsLayout