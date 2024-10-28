import React, { useState, useEffect, useCallback } from 'react';
import Card from './Card';
import './GameBoard.css';

const GameBoard = ({ onLevelChange }) => {
    const [cards, setCards] = useState([]);
    const [firstCard, setFirstCard] = useState(null);
    const [matches, setMatches] = useState(0);
    const [currentLevel, setCurrentLevel] = useState(1);
    const [lockBoard, setLockBoard] = useState(false);

    const startLevel = useCallback((level) => {
        const totalCards = (level - 1) * 4 + 4;
        const newCards = Array.from({ length: totalCards }, (_, index) => ({
            value: String.fromCharCode(65 + (index % (totalCards / 2))),
            isFlipped: false,
            isMatched: false,
        }));
        setCards(shuffle(newCards));
        setMatches(0);
        setFirstCard(null); // Reset firstCard when starting a new level
    }, []);

    const shuffle = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    useEffect(() => {
        startLevel(currentLevel);
    }, [currentLevel, startLevel]);

    const flipCard = (index) => {
        if (lockBoard || cards[index].isFlipped || cards[index].isMatched) return;

        const newCards = [...cards];
        newCards[index].isFlipped = true;
        setCards(newCards);

        if (firstCard === null) {
            // If this is the first card clicked
            setFirstCard(index);
        } else {
            // This is the second card clicked
            setLockBoard(true);
            checkForMatch(index);
        }
    };

    const checkForMatch = (secondCardIndex) => {
        const firstCardValue = cards[firstCard].value;
        const secondCardValue = cards[secondCardIndex].value;

        if (firstCardValue === secondCardValue) {
            const newCards = [...cards];
            newCards[firstCard].isMatched = true;
            newCards[secondCardIndex].isMatched = true;
            setCards(newCards);
            setMatches((prevMatches) => prevMatches + 1);
            resetBoard();
        } else {
            setTimeout(() => {
                const newCards = [...cards];
                newCards[firstCard].isFlipped = false;
                newCards[secondCardIndex].isFlipped = false;
                setCards(newCards);
                resetBoard();
            }, 800);
        }
    };

    const resetBoard = () => {
        setFirstCard(null); // Reset firstCard
        setLockBoard(false); // Allow clicking again
    };

    const nextLevel = () => {
        setCurrentLevel((prevLevel) => {
            const newLevel = prevLevel + 1;
            onLevelChange(newLevel); // Call the level change callback
            return newLevel;
        });
    };

    return (
        <div className="game-board">
            {cards.map((card, index) => (
                <Card
                    key={index}
                    value={card.value}
                    onClick={() => flipCard(index)}
                    isFlipped={card.isFlipped}
                    isMatched={card.isMatched}
                />
            ))}
            {matches === cards.length / 2 && (
                <button onClick={nextLevel}>Next Level</button>
            )}
        </div>
    );
};


export default GameBoard;
