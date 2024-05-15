// components/MazeGrid.js
import React from "react";
import MazeCell from "./MazeCell";

const MazeGrid = ({
  mazeData,
  cellSize,
}: {
  mazeData: any;
  cellSize: number;
}) => {
  const { cells, cheese, exit, start, dimensions } = mazeData;
  const { horizontal, vertical } = dimensions;

  const grid = [];
  for (let y = 0; y < vertical; y++) {
    for (let x = 0; x < horizontal; x++) {
      const cell = cells.find(
        (c: { coordinates: { x: number; y: number } }) =>
          c.coordinates.x === x && c.coordinates.y === y
      );
      const cellType = cell ? cell.type : "Empty"; // Default to 'Empty' if no cell is found

      let color;
      switch (cellType) {
        case "Wall":
          color = "black";
          break;
        case "Open":
          color = "grey";
          break;
        case "Cheese":
          color = "yellow";
          break;
        case "Exit":
          color = "green";
          break;
        case "Start":
          color = "blue";
          break;
        default:
          color = "white"; // Default color for unknown types
          break;
      }

      grid.push({ color, x, y, cellType });
    }
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${horizontal}, ${cellSize}px)`,
        gridTemplateRows: `repeat(${vertical}, ${cellSize}px)`,
        gap: "1px",
      }}
    >
      {grid.map((cell, index) => (
        <MazeCell
          key={index}
          color={cell.color}
          size={cellSize}
          x={cell.x}
          y={cell.y}
          type={cell.cellType}
        />
      ))}
    </div>
  );
};

export default MazeGrid;
