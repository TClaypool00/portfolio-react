import { useEffect, useState } from 'react';
import values from '../values.json';
import { setTitle } from '../helpers/pageHelper';

function Calculator() {
    const index = 3;
    const defaultValue = 0;
    const [calcInput, setCalcInput] = useState({
        sign: values.emptyText,
        num: defaultValue,
        res: defaultValue
    });
    const buttons = values.calculator.buttons;

    useEffect(() => {
        setTitle(index);

    }, []);

    const numClickHandler = (e) => {
        e.preventDefault();
        const value = getValue(e);

        if (removeSpaces(calcInput.num).length < 16) {
            setCalcInput({
                ...calcInput,
                num:
                    calcInput.num === 0 && value === '0'
                    ? '0'
                    : removeSpaces(calcInput.num) % 1 === 0
                    ? toLocaleString(Number(removeSpaces(Number(calcInput.num + value))))
                    : toLocaleString(calcInput.num + value),
                    res: !calcInput.sign ? 0 : calcInput.res
            });
        }
    }

    const commaClickHandler  = (e) => {
        e.preventDefault();

        const value = getValue(e);

        setCalcInput({
            ...calcInput,
            num : !calcInput.num.toString().includes('.') ? calcInput.num + value : calcInput.num
        });
    }

    const signClickHandler  = (e) => {
        e.preventDefault();

        const value = getValue(e);

        setCalcInput({
            ...calcInput,
            sign: value,
            res:!calcInput.res && calcInput.num ? calcInput.num : calcInput.res,
            num: 0
        })
    }

    const equalsClickHandler  = () => {
        if (calcInput.sign && calcInput.num) {
            const math = (a, b, sign) => 
                sign === "+"
                    ? a + b
                    : sign === '-'
                    ? a - b
                    : sign === "*"
                    ? a * b
                    : a / b;

            setCalcInput({
                ...calcInput,
                res:
                    calcInput.num === '0' && calcInput.sign === '/'
                    ? 'Can\'t divide with 0'
                    : math(Number(calcInput.res), Number(calcInput.num), calcInput.sign),
                    sign: values.emptyText,
                    num: 0
            });
        }
    }

    const resetClickHandler  = () => {
        setCalcInput({
            ...calcInput,
            sign: values.emptyText,
            num: 0,
            res: 0
        });
    }

    const toLocaleString  = (num) =>
        String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ");

    const removeSpaces = (num) => num.toString().replace(/\s/g, "");

    function getValue(e) {
        return e.target.innerHTML;
    }

    return (
        <>
            <h3>{values.pages[index].text}</h3>

            <div id='calculatorDiv'>
                <div id='calculatorScreen'>{calcInput.num ? calcInput.num : calcInput.res}</div>
                <div id='calcButtons'>
                    {buttons.flat().map((btn, i) => {
                        return (
                            <button key={i} className={btn === '=' || btn === "C" ? 'equals' : values.emptyText }
                            onClick={
                                btn === 'C'
                                    ? resetClickHandler
                                    : btn === '='
                                    ? equalsClickHandler
                                    : btn === '/' || btn === '*' || btn === '-' || btn === '+'
                                    ? signClickHandler
                                    : btn === '.'
                                    ? commaClickHandler
                                    : numClickHandler
                            } >
                                {btn}
                            </button>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default Calculator;