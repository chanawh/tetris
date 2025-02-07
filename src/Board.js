import React from 'react';
import './Board.css';

const Board = ({ board }) => {
  return (
    <div className="board">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((cell, cellIndex) => (
            <div key={cellIndex} className={`cell ${cell ? 'filled' : ''}`}></div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
