import React from 'react';
import './Card.css'; 

const Card = ({ value, onClick, isFlipped, isMatched }) => {
    return (
        <div
            className={`card ${isFlipped ? 'flipped' : ''} ${isMatched ? 'matched' : ''}`}
            onClick={onClick}
            data-value={value}
        >
            {isFlipped ? value : ''}
        </div>
    );
};

export default Card;
