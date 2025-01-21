import { useEffect, useState } from 'react';
import values from '../values.json';
import { setTitle } from '../helpers/pageHelper';

function Calculator() {
    const index = 3;
    const defaultValue = values.calculator.defaultValue;
    const stringDefaultValue = defaultValue.toString();

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
                    calcInput.num === 0 && value === stringDefaultValue
                    ? stringDefaultValue
                    : removeSpaces(calcInput.num) % values.calculator.oneValue === defaultValue
                    ? toLocaleString(Number(removeSpaces(Number(calcInput.num + value))))
                    : toLocaleString(calcInput.num + value),
                    res: !calcInput.sign ? defaultValue : calcInput.res
            });
        }
    }

    const commaClickHandler  = (e) => {
        e.preventDefault();

        const value = getValue(e);

        setCalcInput({
            ...calcInput,
            num : !calcInput.num.toString().includes(values.calculator.periodValue) ? calcInput.num + value : calcInput.num
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
                sign === getSignValue(1)
                    ? a + b
                    : sign === getSignValue(0)
                    ? a - b
                    : sign === getSignValue(2)
                    ? a * b
                    : a / b;

            setCalcInput({
                ...calcInput,
                res:
                    calcInput.num === stringDefaultValue && calcInput.sign === getSignValue(3)
                    ? values.calculator.errors.cantDivideByZero
                    : math(Number(calcInput.res), Number(calcInput.num), calcInput.sign),
                    sign: values.emptyText,
                    num: defaultValue
            });
        }
    }

    const resetClickHandler  = () => {
        setCalcInput({
            ...calcInput,
            sign: values.emptyText,
            num: defaultValue,
            res: defaultValue
        });
    }

    const toLocaleString  = (num) =>
        String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ");

    const removeSpaces = (num) => num.toString().replace(/\s/g, values.emptyText);

    function getValue(e) {
        return e.target.innerHTML;
    }

    function getSignValue(index) {
        return values.calculator.signs[index];
    }

    return (
        <>
            <h3>{values.pages[index].text}</h3>

            <div id='calculatorDiv' className='box'>
                <div id='calculatorScreen'>{calcInput.num ? calcInput.num : calcInput.res}</div>
                <div id='calcButtons'>
                    {buttons.flat().map((btn, i) => {
                        return (
                            <button key={i} className={btn === values.calculator.equalValue || btn === values.calculator.clearValue ? values.calculator.classValue : values.emptyText }
                            onClick={
                                btn === values.calculator.clearValue
                                    ? resetClickHandler
                                    : btn === values.calculator.equalValue
                                    ? equalsClickHandler
                                    : btn === getSignValue(3) || btn === getSignValue(2) || btn === getSignValue(0) || btn === getSignValue(1)
                                    ? signClickHandler
                                    : btn === values.calculator.periodValue
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