import { createElement, useEffect, useRef, useState } from "react";
import { clearErrorMessage, setTitle } from '../helpers/pageHelper';
import values from '../values.json';

const ToDo = ({ errorMessageRef }) => {
    const index = 1;
    const [itemText, setItemText] = useState(values.emptyText);
    const [itemIndex, setItemIndex] = useState(index);
    const [children, setChildren] = useState([]);
    const inputRef = useRef(null);
    const itemsDivRef = useRef(null);

    useEffect(() => {
        setTitle(index);
    }, []);

    const itemButtonClick = (e, key) => {
        e.preventDefault();

        const newList = children.filter((item) => item.key !== key - 1);
        setChildren(newList);
    }

    const enterPress = (e) => {
        if (e.key === 'Enter') {
            submit(e);
        }
    }

    const submit = (e) => {
        e.preventDefault();

        clearErrorMessage(errorMessageRef);

        if (itemText === values.emptyText) {
            errorMessageRef.current.innerHTML = values.toDo.errors.textIsEmpty;
            inputRef.current.focus();

            return;
        }

        const itemButton = createElement('button', { onClick: itemButtonClick, key: itemIndex }, 'X');
        const textDiv = createElement('div', { key: `text${itemIndex}`, className: 'text' }, [itemText]);
        const newItem = createElement('div',{ className: 'item', key: itemIndex }, [textDiv, itemButton]);
        setChildren([...children, newItem]);
        setItemIndex(itemIndex + 1);

        inputRef.current.value = values.emptyText;
        inputRef.current.focus();
    }

    const handleInput = (e) => {
        setItemText(e.target.value);
    }

    return (
        <>
            <h3>{values.pages[index].text}</h3>

            <input ref={inputRef} onChange={handleInput} placeholder={values.toDo.placeholderText} onKeyDown={enterPress} /> <button onClick={submit}>{values.toDo.addButton.text}</button>

            <div id="toDoList" ref={itemsDivRef}>
                {children}
            </div>
        </>
    );
}

export default ToDo;