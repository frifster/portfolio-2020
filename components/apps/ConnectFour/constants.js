export const WANNA_PLAY_FIRST = "Do you wanna go first?: Y | N ";
export const CHOOSE_COLUMN = `Please choose your move: `
export const CHOOSE_GAME_MODE = "Choose from one of the following game modes:\n Human vs Human (1) \n Human vs Com (2) \n Com vs Com (3) \n  ";
export const INVALID_GAME_MODE = "\nPlease enter a valid game mode"


export const BOARD_COLUMNS = 7;
export const BOARD_ROWS = 6;
export const FIRST_PLAYER = 'X';
export const SECOND_PLAYER = 'O';
export const HUMAN = 'Human';
export const COMPUTER = 'Computer'
export const DEFAULT_BOARD = Array.from({ length: BOARD_COLUMNS }, () => Array.from({ length: BOARD_ROWS }, () => null))


export const GAME_OVER_WITH_WINNER = 'Game over, winner has already been determined';
export const INVALID_COLUMN = `Please enter number between 1 and ${BOARD_COLUMNS}`
export const GAME_TIE = "Good game!, Game is a tie."
export const GAME_MODES = [
    "Human vs Human",
    "Human vs Computer", 
    "Computer vs Computer"
]