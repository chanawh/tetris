import React from 'react';
import './styles.css';

const Piece = ({ shape, position }) => {
  return (
    <div className="piece" style={{ top: position.y, left: position.x }}>
      {shape.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((cell, cellIndex) => (
            <div key={cellIndex} className={`cell ${cell}`}></div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Piece;
