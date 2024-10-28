import React, { useState } from 'react';
import './App.css'; 
import GameBoard from './components/GameBoard';

const App = () => {
    const [currentLevel, setCurrentLevel] = useState(1);

    const handleLevelChange = (newLevel) => {
        setCurrentLevel(newLevel);
    };

    return (
        <div className="app">
            <h1>Memory Game</h1>
            <h2>Level: {currentLevel}</h2>
            <GameBoard onLevelChange={handleLevelChange} />
        </div>
    );
};

export default App;
