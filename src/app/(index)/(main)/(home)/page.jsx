import { Link } from "next-view-transitions";
import React from "react";

const Home = () => {
    return <div className="container mx-auto flex gap-4">
        <Link href={'/user/rahulcodepython'} className="flex flex-col">
            rahulcodepython
        </Link>
        <Link href={'/user/rahulprofession'} className="flex flex-col">
            rahulprofession
        </Link>
        <Link href={'/user/rahul'} className="flex flex-col">
            rahul
        </Link>
    </div>
};

export default Home;
