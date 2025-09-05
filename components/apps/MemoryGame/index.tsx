import React, { useState, useEffect } from 'react';
import styles from '../../../styles/Projects.module.less';

interface Card {
    id: number;
    symbol: string;
    isMatched: boolean;
}

type Difficulty = 'easy' | 'medium' | 'hard';

interface DifficultyConfig {
    pairs: number;
    gridCols: number;
    timeLimit: number;
    name: string;
}

const MemoryGame: React.FC = () => {
    const [cards, setCards] = useState<Card[]>([]);
    const [flippedCards, setFlippedCards] = useState<number[]>([]);
    const [isChecking, setIsChecking] = useState<boolean>(false);
    const [matchedPairs, setMatchedPairs] = useState<number>(0);
    const [moves, setMoves] = useState<number>(0);
    const [timeLeft, setTimeLeft] = useState<number>(0);
    const [gameStarted, setGameStarted] = useState<boolean>(false);
    const [gameWon, setGameWon] = useState<boolean>(false);
    const [gameLost, setGameLost] = useState<boolean>(false);
    const [difficulty, setDifficulty] = useState<Difficulty>('easy');

    const difficulties: Record<Difficulty, DifficultyConfig> = {
        easy: { pairs: 6, gridCols: 4, timeLimit: 60, name: 'Easy (6 pairs)' },
        medium: { pairs: 8, gridCols: 4, timeLimit: 90, name: 'Medium (8 pairs)' },
        hard: { pairs: 12, gridCols: 6, timeLimit: 120, name: 'Hard (12 pairs)' }
    };

    const symbols = ['🎮', '🎯', '🎨', '🎪', '🎭', '🎸', '🎺', '🎼', '🏆', '🏅', '⭐', '🌟', '💎', '🔮', '🎲', '🃏', '🎊', '🎉'];

    const shuffleArray = <T,>(array: T[]): T[] => {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    };

    const initializeGame = (selectedDifficulty: Difficulty): void => {
        const config = difficulties[selectedDifficulty];
        const selectedSymbols = symbols.slice(0, config.pairs);
        const cardPairs = [...selectedSymbols, ...selectedSymbols];
        const shuffledCards = shuffleArray(cardPairs);

        const initialCards: Card[] = shuffledCards.map((symbol, index) => ({
            id: index,
            symbol,
            isMatched: false
        }));

        setCards(initialCards);
        setFlippedCards([]);
        setIsChecking(false);
        setMatchedPairs(0);
        setMoves(0);
        setTimeLeft(config.timeLimit);
        setGameStarted(true);
        setGameWon(false);
        setGameLost(false);
        setDifficulty(selectedDifficulty);
    };

    const flipCard = (cardId: number): void => {
        // Only prevent clicking if we're checking or game is over
        if (gameWon || gameLost || isChecking) return;
        
        const card = cards.find(c => c.id === cardId);
        if (!card || card.isMatched) return;

        // Count currently flipped unmatched cards
        const currentlyFlippedUnmatched = flippedCards.filter(id => {
            const c = cards.find(card => card.id === id);
            return c && !c.isMatched;
        });

        // If we already have 2 unmatched cards flipped, don't allow more
        if (currentlyFlippedUnmatched.length === 2 && !flippedCards.includes(cardId)) return;

        // If card is already flipped, don't flip again
        if (flippedCards.includes(cardId)) return;

        const newFlippedCards = [...flippedCards, cardId];
        setFlippedCards(newFlippedCards);

        // Count unmatched cards in the new array
        const newUnmatchedFlipped = newFlippedCards.filter(id => {
            const c = cards.find(card => card.id === id);
            return c && !c.isMatched;
        });

        if (newUnmatchedFlipped.length === 2) {
            setMoves(prev => prev + 1);
            setIsChecking(true);
            setTimeout(() => checkForMatch(newUnmatchedFlipped), 1000);
        }
    };

    const checkForMatch = (cardsToCheck: number[]): void => {
        const [firstId, secondId] = cardsToCheck;
        const firstCard = cards.find(c => c.id === firstId);
        const secondCard = cards.find(c => c.id === secondId);

        console.log('Checking match:', firstCard?.symbol, secondCard?.symbol);

        if (firstCard && secondCard && firstCard.symbol === secondCard.symbol) {
            console.log('MATCH FOUND! Cards will stay visible forever');
            // Cards match - mark them as matched and keep them in flippedCards
            setCards(prevCards =>
                prevCards.map(c => 
                    c.id === firstId || c.id === secondId 
                        ? { ...c, isMatched: true }
                        : c
                )
            );
            setMatchedPairs(prev => prev + 1);
            // KEEP the matched cards in flippedCards - they stay visible forever!
        } else {
            console.log('NO MATCH - hiding cards');
            // No match - remove these cards from flippedCards so they flip back
            setFlippedCards(prev => prev.filter(id => id !== firstId && id !== secondId));
        }
        
        setIsChecking(false);
    };

    const resetGame = (): void => {
        setGameStarted(false);
        setCards([]);
        setFlippedCards([]);
        setIsChecking(false);
        setMatchedPairs(0);
        setMoves(0);
        setTimeLeft(0);
        setGameWon(false);
        setGameLost(false);
    };

    const formatTime = (seconds: number): string => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    // Timer effect
    useEffect(() => {
        if (gameStarted && timeLeft > 0 && !gameWon && !gameLost) {
            const timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
            return () => clearTimeout(timer);
        } else if (timeLeft === 0 && gameStarted && !gameWon) {
            setGameLost(true);
        }
    }, [gameStarted, timeLeft, gameWon, gameLost]);

    // Win condition check
    useEffect(() => {
        if (gameStarted && matchedPairs === difficulties[difficulty].pairs) {
            setGameWon(true);
        }
    }, [matchedPairs, gameStarted, difficulty]);

    // No cleanup needed - matched cards stay in flippedCards forever!

    if (!gameStarted) {
        return (
            <>
                <h2>Memory Card Game</h2>
                <div className={styles.projectDesc}>
                    <p>
                        <em>Test your memory skills!</em> Flip cards to find matching pairs. 
                        Choose your difficulty level and race against time!
                    </p>
                    
                    <div className={styles.memoryGameSetup}>
                        <h3>Select Difficulty:</h3>
                        <div className={styles.difficultyButtons}>
                            {Object.entries(difficulties).map(([key, config]) => (
                                <button
                                    key={key}
                                    className={styles.difficultyButton}
                                    onClick={() => initializeGame(key as Difficulty)}
                                >
                                    <div className={styles.difficultyName}>{config.name}</div>
                                    <div className={styles.difficultyDetails}>
                                        {config.timeLimit}s • {config.pairs} pairs
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <h2>Memory Card Game</h2>
            <div className={styles.projectDesc}>
                <div className={styles.memoryGameHeader}>
                    <div className={styles.gameStats}>
                        <div className={styles.statItem}>
                            <span className={styles.statLabel}>Time:</span>
                            <span className={`${styles.statValue} ${timeLeft <= 10 ? styles.timeWarning : ''}`}>
                                {formatTime(timeLeft)}
                            </span>
                        </div>
                        <div className={styles.statItem}>
                            <span className={styles.statLabel}>Moves:</span>
                            <span className={styles.statValue}>{moves}</span>
                        </div>
                        <div className={styles.statItem}>
                            <span className={styles.statLabel}>Pairs:</span>
                            <span className={styles.statValue}>
                                {matchedPairs}/{difficulties[difficulty].pairs}
                            </span>
                        </div>
                    </div>

                    <button 
                        className={styles.gameButton}
                        onClick={resetGame}
                    >
                        Back to Menu
                    </button>
                </div>

                {gameWon && (
                    <div className={styles.gameResult}>
                        <div className={styles.winMessage}>
                            🎉 Congratulations! You won in {moves} moves!
                        </div>
                        <button 
                            className={`${styles.gameButton} ${styles.primaryButton}`}
                            onClick={() => initializeGame(difficulty)}
                        >
                            Play Again
                        </button>
                    </div>
                )}

                {gameLost && (
                    <div className={styles.gameResult}>
                        <div className={styles.loseMessage}>
                            ⏰ Time's up! Better luck next time!
                        </div>
                        <button 
                            className={`${styles.gameButton} ${styles.primaryButton}`}
                            onClick={() => initializeGame(difficulty)}
                        >
                            Try Again
                        </button>
                    </div>
                )}

                <div 
                    className={styles.memoryGameBoard}
                    style={{ gridTemplateColumns: `repeat(${difficulties[difficulty].gridCols}, 1fr)` }}
                >
                    {cards.map((card) => {
                        // Card should be visible if it's in flippedCards (either temporarily or permanently matched)
                        const isFlipped = flippedCards.includes(card.id);
                        
                        console.log(`Card ${card.id} (${card.symbol}): inFlippedCards=${isFlipped}, matched=${card.isMatched}`);
                        
                        return (
                            <div
                                key={card.id}
                                className={`${styles.memoryCard} ${
                                    isFlipped ? styles.flipped : ''
                                } ${card.isMatched ? styles.matched : ''}`}
                                onClick={() => flipCard(card.id)}
                            >
                                <div className={styles.cardFront}>?</div>
                                <div className={styles.cardBack}>
                                    {card.symbol}
                                    {/* Debug info */}
                                    <small style={{fontSize: '10px', position: 'absolute', bottom: '2px', right: '2px', color: 'white'}}>
                                        {flippedCards.includes(card.id) ? 'F' : ''}{card.isMatched ? 'M' : ''}
                                    </small>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default MemoryGame;