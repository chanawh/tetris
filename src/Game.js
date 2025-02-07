import React, { useState, useEffect } from 'react';
import Board from './Board';
import Piece from './Piece';

// Define the functions before the component
const createEmptyGrid = () => {
  return Array.from({ length: 20 }, () => Array(10).fill(''));
};

const createRandomPiece = () => {
  // Example piece (a square)
  return { shape: [['O', 'O'], ['O', 'O']], position: { x: 4, y: 0 } };
};

const Game = () => {
  const [grid, setGrid] = useState(createEmptyGrid());
  const [currentPiece, setCurrentPiece] = useState(createRandomPiece());
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    const handleKeyPress = (event) => {
      switch (event.key) {
        case 'ArrowLeft':
          movePieceLeft();
          break;
        case 'ArrowRight':
          movePieceRight();
          break;
        case 'ArrowDown':
          movePieceDown();
          break;
        case 'ArrowUp':
          rotatePiece();
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  useEffect(() => {
    const gameLoop = () => {
      movePieceDown();
    };

    const id = setInterval(gameLoop, 1000); // Move piece down every second
    setIntervalId(id);

    return () => clearInterval(id);
  }, [grid, currentPiece]);

  const isCollision = (piece, newPos) => {
    for (let y = 0; y < piece.shape.length; y++) {
      for (let x = 0; x < piece.shape[y].length; x++) {
        if (piece.shape[y][x] !== '' && (grid[y + newPos.y] && grid[y + newPos.y][x + newPos.x]) !== '') {
          return true;
        }
      }
    }
    return false;
  };

  const movePiece = (dx, dy) => {
    const newPos = { x: currentPiece.position.x + dx, y: currentPiece.position.y + dy };
    if (!isCollision(currentPiece, newPos)) {
      setCurrentPiece({ ...currentPiece, position: newPos });
    } else if (dy > 0) {
      placePiece();
    }
  };

  const movePieceLeft = () => movePiece(-1, 0);
  const movePieceRight = () => movePiece(1, 0);
  const movePieceDown = () => movePiece(0, 1);

  const rotatePiece = () => {
    const rotatedShape = currentPiece.shape[0].map((_, i) => currentPiece.shape.map(row => row[i]).reverse());
    const newPiece = { ...currentPiece, shape: rotatedShape };
    if (!isCollision(newPiece, currentPiece.position)) {
      setCurrentPiece(newPiece);
    }
  };

  const placePiece = () => {
    const newGrid = grid.map(row => row.slice());
    currentPiece.shape.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell !== '') {
          newGrid[y + currentPiece.position.y][x + currentPiece.position.x] = cell;
        }
      });
    });
    setGrid(clearLines(newGrid));
    setCurrentPiece(createRandomPiece());
  };

  const clearLines = (grid) => {
    const newGrid = grid.filter(row => row.some(cell => cell === ''));
    const emptyRows = Array.from({ length: 20 - newGrid.length }, () => Array(10).fill(''));
    return [...emptyRows, ...newGrid];
  };

  return (
    <div className="game">
      <Board grid={grid} />
      <Piece shape={currentPiece.shape} position={currentPiece.position} />
    </div>
  );
};

export default Game;
