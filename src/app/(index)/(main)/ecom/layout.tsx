import React from 'react'

const EComParentLayout = ({children}: {children: React.ReactNode}) => {
    return <section className={'pt-16'}>
        {children}
    </section>
}

export default EComParentLayout