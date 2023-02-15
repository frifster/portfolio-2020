import React, { useReducer } from 'react'
import styles from "../../../styles/Projects.module.less"
import reducer, { initialState } from './reducer'
import DigitButton from './DigitButton'
import OperationButton from './OperationButton'
import ACTIONS from './actions'



const FORMATTER = new Intl.NumberFormat('en-us', { maximumFractionDigits: 0 })
function formatOperand(operand) {
    if (!operand) return '';

    const [integer, decimal] = operand.split('.')

    if (!decimal) {
        return FORMATTER.format(integer)
    }

    return FORMATTER.format(integer) + "." + decimal
}



function Calculator() {
    const [{
        currentOperand,
        previousOperand,
        operation
    }, dispatch] = useReducer(reducer, initialState)

    return (
        <div className={styles.projectBox}>
            <h2>Calculator</h2>
            <div className={styles.calculator}>
                <div className={styles.output}>
                    <div className={styles.previousOperand}>{formatOperand(previousOperand)} {operation}</div>
                    <div className={styles.currentOperand}>{formatOperand(currentOperand)}</div>
                </div>
                <button className={styles.spanTwo}
                    onClick={() => dispatch({ type: ACTIONS.CLEAR })}
                >AC</button>
                <button onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}>DEL</button>
                <OperationButton dispatch={dispatch} operation="/" />
                <DigitButton dispatch={dispatch} digit="1" />
                <DigitButton dispatch={dispatch} digit="2" />
                <DigitButton dispatch={dispatch} digit="3" />
                <OperationButton dispatch={dispatch} operation="*" />
                <DigitButton dispatch={dispatch} digit="4" />
                <DigitButton dispatch={dispatch} digit="5" />
                <DigitButton dispatch={dispatch} digit="6" />
                <OperationButton dispatch={dispatch} operation="+" />
                <DigitButton dispatch={dispatch} digit="7" />
                <DigitButton dispatch={dispatch} digit="8" />
                <DigitButton dispatch={dispatch} digit="9" />
                <OperationButton dispatch={dispatch} operation="-" />
                <DigitButton dispatch={dispatch} digit="." />
                <DigitButton dispatch={dispatch} digit="0" />
                <button className={styles.spanTwo} onClick={() => dispatch({ type: ACTIONS.EVALUATE })}> =</button>

            </div>
            <div className={styles.projectDesc}>
                <p>
                    <em>
                        Behold, a wondrous incantation that summons forth a mystical tool of arithmetic, a digital marvel to astound and bewilder the unwary observer!
                    </em>

                </p>
                <p>
                    <em>
                        Using the powerful enchantments of a tool known as React, the code weaves together an intricate web of buttons and displays, conjuring a potent force capable of adding, subtracting, multiplying, and dividing with ease.
                    </em>
                </p>
                <p>
                    <em>
                        The calculator even includes a magical function to format numbers in a most enchanting way, casting spells of commas and periods to create readable and pleasing displays. Truly, this is a magical creation to delight the mind and enchant the senses!
                    </em>
                </p>

                <div>
                    <h4>Concepts Applied:</h4>
                    <p>- Reducer/Redux State management</p>
                    <p>- CSS GRID</p>
                    <p>- React Event Handling</p>
                    <p>- Basic React JS</p>
                    <p>- Number Formatting</p>
                </div>
            </div>
        </div >
    )
}

export default Calculator