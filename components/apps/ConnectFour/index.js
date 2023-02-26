import React, { useEffect } from 'react'
import { Provider, useDispatch, useSelector } from 'react-redux'

import styles from "../../../styles/Projects.module.less"
import GameBoard from './GameBoard';
import { GameButtons } from './Gbuttons';
import { store } from './store/reducer';
import { COMPUTER } from './constants';
import { Player } from './player';
import { Game } from './Game';
import { checkWin, dropToken, switchPlayer } from './store/gameSlice';

const GameContainer = () => {
    const gameMode = useSelector(state => state.game.gameMode)
    const winner = useSelector(state => state.game.winner)
    const currentPlayer = useSelector(state => state.game.currentPlayer)
    const board = useSelector(state => state.game.board)

    const dispatch = useDispatch()

    useEffect(() => {


        if (gameMode & !winner && currentPlayer.playerType === COMPUTER) {
            setTimeout(() => {
                const columnIndex = Player.chooseRandomColumn(Game.getValidColumns(board))
                dispatch(dropToken(columnIndex))
                dispatch(checkWin())
                dispatch(switchPlayer())

            }, 1000)

        }

    }, [gameMode, currentPlayer, winner])


    return (
        <div className={styles.connectFour}>
            <div className={styles.gameModes}>
                <GameButtons />
                <GameBoard />
            </div>
        </div>
    )
}

function ConnectFour() {

    return (
        <Provider store={store}>
            <div className={styles.projectBox}>
                <h2>Connect Four</h2>
                <GameContainer />
            </div>
        </Provider>
    )
}

export default ConnectFour