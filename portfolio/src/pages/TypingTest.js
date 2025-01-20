import { useEffect } from "react";
import { setTitle } from "../helpers/pageHelper";
import values from '../values.json';

const TypingTest = () => {
    const index = 2;

    useEffect(() => {
        setTitle(index);
    });

    return (
        <>
            <h3>{values.pages[index].text}</h3>
        </>
    )
}

export default TypingTest;