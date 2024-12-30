import { useEffect } from "react";
import { setTitle } from '../helpers/pageHelper';

const ToDo = () => {
    useEffect(() => {
        setTitle(1);
    }, []);

    return (
        <>
        To Do list
        </>
    );
}

export default ToDo;