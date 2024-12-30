import { useEffect } from "react";
import { setTitle } from '../helpers/pageHelper';

const Home = () => {
    useEffect(() => {
        setTitle(0);
    }, []);

    return (
        <>
            Home
        </>
    );
}

export default Home;