import React, { useReducer } from "react";
import styles from "../../../styles/Projects.module.less";
import reducer, { initialState } from "./reducer";
import DigitButton from "./DigitButton";
import OperationButton from "./OperationButton";
import ACTIONS from "./actions";

const FORMATTER = new Intl.NumberFormat("en-us", { maximumFractionDigits: 0 });

function formatOperand(operand: string | null): string {
  if (!operand) return "";

  const [integer, decimal] = operand.split(".");

  if (!decimal) {
    return FORMATTER.format(parseInt(integer));
  }

  return FORMATTER.format(parseInt(integer)) + "." + decimal;
}

const Calculator: React.FC = () => {
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(
    reducer,
    initialState
  );

  return (
    <>
      <h2>Calculator</h2>
      <div className={styles.calculator}>
        <div className={styles.output}>
          <div className={styles.previousOperand}>
            {formatOperand(previousOperand)} {operation}
          </div>
          <div className={styles.currentOperand}>
            {formatOperand(currentOperand)}
          </div>
        </div>
        <button
          className={styles.spanTwo}
          onClick={() => dispatch({ type: ACTIONS.CLEAR })}
        >
          AC
        </button>
        <button onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}>
          DEL
        </button>
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
        <button
          className={styles.spanTwo}
          onClick={() => dispatch({ type: ACTIONS.EVALUATE })}
        >
          {" "}
          =
        </button>
      </div>
      <div className={styles.projectDesc}>
        <p>
          <em>Professional calculator app</em> - Perform basic arithmetic
          operations with a clean, intuitive interface. Features number
          formatting and proper state management.
        </p>
      </div>
    </>
  );
};

export default Calculator;
