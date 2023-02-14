import ACTIONS from "./actions"

export const initialState = {
    currentOperand: '',
    previousOperand: '',
    operation: ''
}


function reducer(state, { type, payload }) {
    switch (type) {

        case ACTIONS.ADD_DIGIT:
            console.log("state.currentOperand", state.currentOperand)
            if (state.overwrite) {
                return {
                    ...state,
                    currentOperand: payload.digit,
                    overwrite: false
                }
            }

            if (payload.digit === '0' && state.currentOperand === "0") return state;
            if (payload.digit === '.' && state.currentOperand.includes('.')) {
                return state
            };

            return {
                ...state,
                currentOperand: `${state.currentOperand || ''}${payload.digit}`
            }

        case ACTIONS.CHOOSE_OPERATION:
            if (!state.currentOperand && !state.previousOperand) return state;
            if (!state.currentOperand) {
                return {
                    ...state,
                    operation: payload.operation
                }
            }

            if (!state.previousOperand) {
                return {
                    ...state,
                    operation: payload.operation,
                    previousOperand: state.currentOperand,
                    currentOperand: ''
                }
            }

            return {
                ...state,
                previousOperand: evaluate(state),
                operation: payload.operation,
                currentOperand: ''
            }


        case ACTIONS.EVALUATE:
            if (!state.operation || !state.currentOperand || !state.previousOperand) {
                return state
            }

            return {
                ...state,
                previousOperand: '',
                operation: '',
                currentOperand: evaluate(state),
                overwrite: true
            }
        case ACTIONS.DELETE_DIGIT:
            if (state.overwrite) {
                return {
                    ...state,
                    overwrite: false,
                    currentOperand: ""
                }
            }

            if (!state.currentOperand) return state;
            if (state.currentOperand.length === 1) {
                return {
                    ...state,
                    currentOperand: ''
                }
            }

            return {
                ...state,
                currentOperand: state.currentOperand.slice(0, -1)
            }
        case ACTIONS.CLEAR:
            return initialState
    }


    return state
}

function evaluate({ currentOperand, previousOperand, operation }) {
    const prev = parseFloat(previousOperand)
    const current = parseFloat(currentOperand)
    if (isNaN(prev) || isNaN(current)) return "";

    let computation = "";

    switch (operation) {
        case "+":
            computation = prev + current;
            break;
        case "-":
            computation = prev - current;
            break;
        case "*":
            computation = prev * current;
            break;
        case "/":
            computation = prev / current;
            break;
    }

    return String(computation)

}


export default reducer