import ACTIONS from "./actions"

interface CalculatorState {
    currentOperand: string;
    previousOperand: string;
    operation: string;
    overwrite?: boolean;
}

interface CalculatorAction {
    type: string;
    payload?: {
        digit?: string;
        operation?: string;
    };
}

export const initialState: CalculatorState = {
    currentOperand: '',
    previousOperand: '',
    operation: ''
}


function reducer(state: CalculatorState, { type, payload }: CalculatorAction): CalculatorState {
    switch (type) {

        case ACTIONS.ADD_DIGIT:
            if (state.overwrite) {
                return {
                    ...state,
                    currentOperand: payload.digit,
                    overwrite: false
                }
            }

            if (payload?.digit === '0' && state.currentOperand === "0") return state;
            if (payload?.digit === '.' && state.currentOperand.includes('.')) {
                return state
            };

            return {
                ...state,
                currentOperand: `${state.currentOperand || ''}${payload?.digit || ''}`
            }

        case ACTIONS.CHOOSE_OPERATION:
            if (!state.currentOperand && !state.previousOperand) return state;
            if (!state.currentOperand) {
                return {
                    ...state,
                    operation: payload?.operation || ''
                }
            }

            if (!state.previousOperand) {
                return {
                    ...state,
                    operation: payload?.operation || '',
                    previousOperand: state.currentOperand,
                    currentOperand: ''
                }
            }

            return {
                ...state,
                previousOperand: evaluate(state),
                operation: payload?.operation || '',
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

function evaluate({ currentOperand, previousOperand, operation }: CalculatorState): string {
    const prev = parseFloat(previousOperand)
    const current = parseFloat(currentOperand)
    if (isNaN(prev) || isNaN(current)) return "";

    let computation: number = 0;

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