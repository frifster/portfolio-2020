import { useDispatch, useSelector } from "react-redux"
import { GAME_MODES } from "./constants"
import { setGameMode, resetGame } from "./store/gameSlice"
import styles from "../../../styles/Projects.module.less"

export const GameButtons = () => {
    const winner = useSelector(state => state.game.winner)
    const gameMode = useSelector(state => state.game.gameMode)
    const gameInProgress = useSelector(state => state.game.gameInProgress)
    const currentPlayer = useSelector(state => state.game.currentPlayer)
    const dispatch = useDispatch()

    const handleGameModeClick = (btnGameMode) => {
        dispatch(setGameMode(btnGameMode))
    }

    const handleResetGame = () => {
        dispatch(resetGame())
    }

    const handleBackToMenu = () => {
        dispatch(resetGame())
    }

    if (gameMode && gameInProgress) {
        return (
            <div className={styles.connectFourControls}>
                <div className={styles.gameStatus}>
                    <div className={styles.currentGameMode}>
                        <span className={styles.modeLabel}>Mode:</span> 
                        <span className={styles.modeValue}>{GAME_MODES[gameMode - 1]}</span>
                    </div>
                    
                    {!winner && (
                        <div className={styles.currentPlayerStatus}>
                            <span className={styles.playerLabel}>Current Player:</span>
                            <span className={`${styles.playerToken} ${styles[`player${currentPlayer.playerToken}`]}`}>
                                {currentPlayer.playerToken}
                            </span>
                            <span className={styles.playerType}>({currentPlayer.playerType})</span>
                        </div>
                    )}

                    {winner && (
                        <div className={styles.winnerStatus}>
                            🎉 Winner: <span className={`${styles.winnerToken} ${styles[`player${winner.playerToken}`]}`}>
                                Player {winner.playerToken}
                            </span>
                        </div>
                    )}
                </div>

                <div className={styles.gameControls}>
                    <button 
                        className={styles.gameButton} 
                        onClick={handleBackToMenu}
                        aria-label="Back to game mode selection"
                    >
                        ← Back to Menu
                    </button>
                    
                    {winner && (
                        <button 
                            className={`${styles.gameButton} ${styles.primaryButton}`} 
                            onClick={handleResetGame}
                            aria-label="Start new game with same mode"
                        >
                            Play Again
                        </button>
                    )}
                </div>
            </div>
        )
    }

    return (
        <div className={styles.gameModeSelection}>
            <p className={styles.selectionTitle}>Choose Game Mode:</p>
            <div className={styles.gameModeButtons}>
                {GAME_MODES.map((gm, index) => (
                    <button 
                        key={gm + index} 
                        className={styles.gameModeButton}
                        onClick={() => handleGameModeClick(index + 1)}
                        aria-label={`Select ${gm} mode`}
                    >
                        {gm.replace(" [WIP] NOT WORKING!", "")}
                    </button>
                ))}
            </div>
        </div>
    )
}