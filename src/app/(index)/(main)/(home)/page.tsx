import {Link} from "next-view-transitions";

const Home = ()=>{
    return <div>
        <Link href={'/user/xyz'}>
            XYZ
        </Link>
    </div>
}

export default Home;