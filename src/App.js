import React, { useState, useEffect } from 'react';
import Board from './Board';
import './App.css'; // Optional: For styling the app

const createEmptyBoard = (rows, columns) => {
  return Array.from({ length: rows }, () => Array(columns).fill(0));
};

const App = () => {
  const [board, setBoard] = useState(createEmptyBoard(20, 10));

  // Add logic to update the board, handle user inputs, etc.

  return (
    <div className="App">
      <h1>Tetris Game</h1>
      <Board board={board} />
    </div>
  );
};

export default App;
