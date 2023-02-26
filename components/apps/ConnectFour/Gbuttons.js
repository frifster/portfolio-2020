import { useDispatch, useSelector } from "react-redux"
import { GAME_MODES } from "./constants"
import { setGameMode, resetGame } from "./store/gameSlice"

export const GameButtons = () => {
    const winner = useSelector(state => state.game.winner)
    const gameMode = useSelector(state => state.game.gameMode)
    const dispatch = useDispatch()

    const handleGameModeClick = (btnGameMode) => {
        dispatch(setGameMode(btnGameMode))
    }

    const handleResetGame = () => {
        dispatch(resetGame())
    }


    if (gameMode) {
        return <>
            <p>Game Mode: <button>{GAME_MODES[gameMode - 1]}</button>{
                winner && (<button onClick={handleResetGame}>Reset Game</button>)
            }</p>

        </>
    }

    return (
        <>
            <p>Game Modes: </p>
            {GAME_MODES.map((gm, index) => <button key={gm + index} onClick={() => handleGameModeClick(index + 1)}>{gm}</button>)}
        </>
    )
}