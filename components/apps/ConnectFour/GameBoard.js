import { useDispatch, useSelector } from "react-redux"
import styles from "../../../styles/Projects.module.less"
import { COMPUTER, FIRST_PLAYER, SECOND_PLAYER } from './constants'
import { Game } from "./Game"
import { dropToken, switchPlayer, checkWin } from "./store/gameSlice"


const BallRenderer = ({ token }) => {

    if (token === FIRST_PLAYER) {
        return <div className={styles.blueBall} />
    }

    if (token === SECOND_PLAYER) {
        return (
            <div className={styles.redBall} />
        )
    }

    return (
        <div className={styles.blackBall} />
    )
}


const BoardColumn = ({ column, index }) => {

    const dispatch = useDispatch()
    const board = useSelector(state => state.game.board)
    const winner = useSelector(state => state.game.winner)
    const playerType = useSelector(state => state.game.currentPlayer.playerType)

    const handleColumnClick = () => {
        if (winner || playerType === COMPUTER) {
            return
        }

        const validColumns = Game.getValidColumns(board)
        if (validColumns.includes(index) & !winner) {
            dispatch(dropToken(index))
            dispatch(checkWin())
            dispatch(switchPlayer())
        }
    }

    return (
        <div className={styles.boardColumn} onClick={() => handleColumnClick()}>
            {column.map((row, index) => <div key={"boardRow" + index} className={styles.boardRow}><BallRenderer token={row} /></div>)}
        </div>
    )
}

const PlayerWinnerInfo = () => {
    const gameMode = useSelector(state => state.game.gameMode)
    const currentPlayer = useSelector(state => state.game.currentPlayer)
    const winner = useSelector(state => state.game.winner)

    if (!gameMode) {
        return
    }


    if (winner) {
        return (
            <div className={styles.playerInfo}>
                <h3>Winner! {winner.playerType}</h3>
                <BallRenderer token={winner.playerToken} />
            </div>
        )

    }
    return (
        <div className={styles.playerInfo}>
            <h3>Current player: {currentPlayer.playerType}</h3>
            <BallRenderer token={currentPlayer.playerToken} />
        </div>
    )
}


function GameBoard() {
    const gameMode = useSelector(state => state.game.gameMode)
    const board = useSelector(state => state.game.board)
    return (
        <>
            {!gameMode && <p>Please select a Game Mode by clicking/tapping the buttons above.</p>}
            <PlayerWinnerInfo />
            <div className={styles.gameBoard}>
                {
                    gameMode && board.map((column, index) => {
                        return (
                            <BoardColumn
                                column={column}
                                key={"boardRow" + index}
                                index={index}
                            />
                        )
                    })
                }

            </div>
        </>
    )
}

export default GameBoard