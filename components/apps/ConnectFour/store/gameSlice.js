import { createSlice } from '@reduxjs/toolkit'
import { Game } from '../Game';
import { Player } from '../player';
import { DEFAULT_BOARD, FIRST_PLAYER, HUMAN, SECOND_PLAYER } from '../constants';

const initialState = {
    gameInProgress: false,
    gameMode: null,
    board: null,
    currentPlayer: { playerToken: FIRST_PLAYER, playerType: HUMAN },
    boardFull: false,
    board: DEFAULT_BOARD,
    winner: null,
    validColumns: [],
    players: []
}


const createGameInstance = gameMode => {
    let player1;
    let player2;
    switch (gameMode) {
        case 1:
            player1 = new Player(FIRST_PLAYER, HUMAN)
            player2 = new Player(SECOND_PLAYER, HUMAN)
            break;
        case 2:
            player1 = new Player(FIRST_PLAYER, HUMAN)
            player2 = new Player(SECOND_PLAYER)
            break;
        case 3:
            player1 = new Player(FIRST_PLAYER)
            player2 = new Player(SECOND_PLAYER)
            break;
        default:
            break;
    }

    return new Game([player1, player2])
}


export const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        setGameMode: (state, action) => {
            state.gameMode = action.payload
            state.gameInProgress = true

            const game = createGameInstance(action.payload)
            state.board = game.board
            state.currentPlayer = { ...game.currentPlayer }
            state.validColumns = game.validColumns
            state.players = [{ ...game.players[0] }, { ...game.players[1] }]
        },
        dropToken: (state, action) => {
            if (!state.winner) {
                state.board = Game.dropToken(action.payload, state.board, state.currentPlayer.playerToken)
            }

        },
        switchPlayer: (state) => {
            state.currentPlayer = state.currentPlayer.playerToken === state.players[0].playerToken ?
                state.players[1] :
                state.players[0]
        },
        checkWin: state => {
            const thereIsAwinner = Game.checkWin(state.board)

            if (thereIsAwinner) {
                state.winner = state.players.find(player => player.playerToken === thereIsAwinner.token)
            }
        },
        resetGame: () => {
            return initialState
        }
    },
})

// Action creators are generated for each case reducer function
export const { setGameMode, dropToken, switchPlayer, checkWin, resetGame } = gameSlice.actions

export default gameSlice.reducer