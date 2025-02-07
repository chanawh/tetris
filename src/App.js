import React, { useState, useEffect } from 'react';
import Board from './Board';
import './App.css';

const TETROMINOES = {
  0: { shape: [[0]], color: '0, 0, 0' },
  I: { shape: [[1, 1, 1, 1]], color: '80, 227, 230' },
  J: { shape: [[1, 0, 0], [1, 1, 1]], color: '36, 95, 223' },
  L: { shape: [[0, 0, 1], [1, 1, 1]], color: '223, 173, 36' },
  O: { shape: [[1, 1], [1, 1]], color: '223, 217, 36' },
  S: { shape: [[0, 1, 1], [1, 1, 0]], color: '48, 211, 56' },
  T: { shape: [[0, 1, 0], [1, 1, 1]], color: '132, 61, 198' },
  Z: { shape: [[1, 1, 0], [0, 1, 1]], color: '227, 78, 78' },
};

const randomTetromino = () => {
  const tetrominoes = 'IJLOSTZ';
  const randTetromino = tetrominoes[Math.floor(Math.random() * tetrominoes.length)];
  return TETROMINOES[randTetromino];
};

const createEmptyBoard = (rows, columns) => {
  return Array.from({ length: rows }, () => Array(columns).fill(0));
};

const App = () => {
  const [board, setBoard] = useState(createEmptyBoard(20, 10));
  const [tetromino, setTetromino] = useState(randomTetromino());
  const [position, setPosition] = useState({ x: 3, y: 0 });

  const mergeTetrominoWithBoard = (board, tetromino, position) => {
    const newBoard = board.map(row => row.slice());
    tetromino.shape.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell !== 0) {
          newBoard[y + position.y][x + position.x] = cell;
        }
      });
    });
    return newBoard;
  };

  const moveTetromino = (dir) => {
    setPosition(prev => ({
      ...prev,
      x: prev.x + dir
    }));
  };

  const dropTetromino = () => {
    setPosition(prev => ({
      ...prev,
      y: prev.y + 1
    }));
  };

  const rotateTetromino = () => {
    const rotatedShape = tetromino.shape[0].map((_, index) =>
      tetromino.shape.map(row => row[index]).reverse()
    );
    setTetromino(prev => ({
      ...prev,
      shape: rotatedShape
    }));
  };

  const handleKeyPress = (event) => {
    if (event.key === 'ArrowLeft') {
      moveTetromino(-1);
    } else if (event.key === 'ArrowRight') {
      moveTetromino(1);
    } else if (event.key === 'ArrowDown') {
      dropTetromino();
    } else if (event.key === 'ArrowUp') {
      rotateTetromino();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <div className="App">
      <h1>Tetris Game</h1>
      <Board board={mergeTetrominoWithBoard(board, tetromino, position)} />
    </div>
  );
};

export default App;
