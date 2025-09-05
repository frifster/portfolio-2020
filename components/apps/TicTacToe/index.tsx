import React, { useState, useEffect } from 'react';
import styles from '../../../styles/Projects.module.less';

type Player = 'X' | 'O';
type SquareValue = Player | null;
type Winner = Player | 'draw' | null;

interface Scores {
    X: number;
    O: number;
    draws: number;
}

const TicTacToe: React.FC = () => {
    const [board, setBoard] = useState<SquareValue[]>(Array(9).fill(null));
    const [xIsNext, setXIsNext] = useState<boolean>(true);
    const [winner, setWinner] = useState<Winner>(null);
    const [scores, setScores] = useState<Scores>({ X: 0, O: 0, draws: 0 });

    const calculateWinner = (squares: SquareValue[]): Player | null => {
        const lines = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
            [0, 4, 8], [2, 4, 6] // diagonals
        ];
        
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    };

    const handleClick = (i: number): void => {
        if (board[i] || winner) return;
        
        const newBoard = [...board];
        newBoard[i] = xIsNext ? 'X' : 'O';
        setBoard(newBoard);
        setXIsNext(!xIsNext);
    };

    const resetGame = (): void => {
        setBoard(Array(9).fill(null));
        setXIsNext(true);
        setWinner(null);
    };

    const resetScores = (): void => {
        setScores({ X: 0, O: 0, draws: 0 });
        resetGame();
    };

    useEffect(() => {
        const gameWinner = calculateWinner(board);
        if (gameWinner) {
            setWinner(gameWinner);
            setScores(prev => ({
                ...prev,
                [gameWinner]: prev[gameWinner] + 1
            }));
        } else if (board.every(cell => cell !== null)) {
            setWinner('draw');
            setScores(prev => ({
                ...prev,
                draws: prev.draws + 1
            }));
        }
    }, [board]);

    const renderSquare = (i: number): JSX.Element => (
        <button
            key={i}
            className={styles.ticTacSquare}
            onClick={() => handleClick(i)}
            disabled={!!board[i] || !!winner}
        >
            {board[i]}
        </button>
    );

    const getStatus = (): string => {
        if (winner === 'draw') return "It's a draw!";
        if (winner) return `Winner: ${winner}`;
        return `Next player: ${xIsNext ? 'X' : 'O'}`;
    };

    return (
        <>
            <h2>Tic Tac Toe</h2>
            <div className={styles.projectDesc}>
                <p>
                    <em>Classic Tic Tac Toe game</em> - Challenge a friend in this timeless strategy game. 
                    Get three in a row horizontally, vertically, or diagonally to win!
                </p>
                
                <div className={styles.ticTacGameContainer}>
                    <div className={styles.scoreBoard}>
                        <div className={styles.scoreItem}>
                            <span className={styles.scoreLabel}>Player X:</span>
                            <span className={styles.scoreValue}>{scores.X}</span>
                        </div>
                        <div className={styles.scoreItem}>
                            <span className={styles.scoreLabel}>Player O:</span>
                            <span className={styles.scoreValue}>{scores.O}</span>
                        </div>
                        <div className={styles.scoreItem}>
                            <span className={styles.scoreLabel}>Draws:</span>
                            <span className={styles.scoreValue}>{scores.draws}</span>
                        </div>
                    </div>

                    <div className={styles.gameStatus}>
                        {getStatus()}
                    </div>

                    <div className={styles.ticTacBoard}>
                        {Array(9).fill(null).map((_, i) => renderSquare(i))}
                    </div>

                    <div className={styles.gameControls}>
                        <button className={styles.gameButton} onClick={resetGame}>
                            New Game
                        </button>
                        <button className={styles.gameButton} onClick={resetScores}>
                            Reset Scores
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TicTacToe;