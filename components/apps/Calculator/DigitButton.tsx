import React from 'react'
import ACTIONS from './actions'

interface DigitButtonProps {
    dispatch: React.Dispatch<any>;
    digit: string;
}

function DigitButton({ dispatch, digit }: DigitButtonProps) {
    return (
        <button onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } })}>{digit}</button>
    )
}

export default DigitButton