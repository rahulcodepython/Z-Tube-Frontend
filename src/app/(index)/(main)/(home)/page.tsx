import {Link} from "next-view-transitions";

const Home = ()=>{
    return <section className={'pt-16'}>
        <Link href={'/user/xyz'}>
            XYZ
        </Link>
    </section>
}

export default Home;