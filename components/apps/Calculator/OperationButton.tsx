import React from 'react'
import ACTIONS from './actions'

interface OperationButtonProps {
    dispatch: React.Dispatch<any>;
    operation: string;
}

function OperationButton({ dispatch, operation }: OperationButtonProps) {
    return (
        <button onClick={() => dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation } })}>{operation}</button>
    )
}

export default OperationButton