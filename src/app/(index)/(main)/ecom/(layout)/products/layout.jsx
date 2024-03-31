import React from "react";

const EComProductsLayout = ({filterSidebar, children}) => {
    return <section className={'grid grid-cols-6 mx-2 gap-2'}>
        {filterSidebar}
        <div className={'col-span-5'}>
            {children}
        </div>
    </section>
}

export default EComProductsLayout