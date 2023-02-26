import { BOARD_COLUMNS, BOARD_ROWS, DEFAULT_BOARD, INVALID_COLUMN } from "./constants";

export class Game {
    constructor(players) {
        this.board = DEFAULT_BOARD;
        this.players = players;
        this.currentPlayer = players[0];
        this.validColumns = [0, 1, 2, 3, 4, 5, 6]
    }

    static dropToken(columnNumber, board, playerToken) {
        if (!this.validateColumn(columnNumber, board)) {
            throw new Error(INVALID_COLUMN);
        }

        for (let i = BOARD_COLUMNS; i >= 0; i--) {
            if (board[columnNumber][i] === null) {
                board[columnNumber][i] = playerToken
                break;
            }
        }

        return board
    }

    static validateColumn(columnNumber, board) {
        if (isNaN(columnNumber)) {
            return false
        }

        if (!(columnNumber < 0 || columnNumber >= BOARD_COLUMNS)) {
            if (board[columnNumber].includes(null)) {
                return true
            }
        }

        return false
    }

    static getValidColumns(board) {
        const validColumns = []
        for (let i = 0; i <= BOARD_COLUMNS - 1; i++) {
            if (board[i].includes(null)) {
                validColumns.push(i)
            }
        }

        return validColumns
    }

    static isBoardFull(board) {
        for (let column of board) {
            if (column.includes(null)) {
                return false
            }
        }

        return true
    }


    static checkWin(board) {
        return (
            this.checkForHorizontaLWin(board) ||
            this.checkForVerticalWin(board) ||
            this.checkForDiagonalWin(board)
        )
    }

    static checkForHorizontaLWin(board) {
        for (let col = 0; col < BOARD_COLUMNS - 3; col++) {
            for (let row = BOARD_ROWS - 1; row >= 0; row--) {
                const currentCell = board[col][row]

                if (currentCell) {
                    if (currentCell === board[col + 1][row] &&
                        currentCell === board[col + 2][row] &&
                        currentCell === board[col + 3][row]) {
                        return { token: currentCell }

                    }

                }

            }
        }

        return false

    }

    static checkForVerticalWin(board) {
        for (let col = 0; col < BOARD_COLUMNS; col++) {
            for (let row = BOARD_ROWS - 1; row > BOARD_ROWS - 4; row--) {
                const currentCell = board[col][row]
                if (currentCell) {
                    if (currentCell === board[col][row - 1] &&
                        currentCell === board[col][row - 2] &&
                        currentCell === board[col][row - 3]) {
                        return { token: currentCell }
                    }
                }
            }
        }

        return false
    }

    static checkForDiagonalWin(board) {
        // Checking for diagonal win (top-left to bottom-right)
        for (let row = 0; row < BOARD_ROWS - 3; row++) {
            for (let col = 0; col < BOARD_COLUMNS - 3; col++) {
                const currentCell = board[row][col];

                if (currentCell &&
                    currentCell === board[row + 1][col + 1] &&
                    currentCell === board[row + 2][col + 2] &&
                    currentCell === board[row + 3][col + 3]) {
                    return { token: currentCell };
                }
            }
        }

        // Checking for diagonal win (bottom-left to top-right)
        for (let row = 3; row < BOARD_ROWS; row++) {
            for (let col = 0; col < BOARD_COLUMNS - 3; col++) {
                const currentCell = board[row][col];

                if (currentCell &&
                    currentCell === board[row - 1][col + 1] &&
                    currentCell === board[row - 2][col + 2] &&
                    currentCell === board[row - 3][col + 3]) {
                    return { token: currentCell };
                }
            }
        }

        return false
    }
}
