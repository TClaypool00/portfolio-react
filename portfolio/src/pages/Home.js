import { useEffect } from "react";
import { setTitle } from '../helpers/pageHelper';
import values from '../values.json';

const Home = () => {
    useEffect(() => {
        setTitle(0);
    }, []);

    return (
        <>
            {values.home.text}
        </>
    );
}

export default Home;