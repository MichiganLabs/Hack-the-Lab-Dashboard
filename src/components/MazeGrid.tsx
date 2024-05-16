import React from "react";
import MazeCell from "./MazeCell";
import { Action, ActionType, CategoryColor, Maze } from "@/types/maze.d";

const MazeGrid = ({
  mazeData,
  moveData,
  mazeWidth,
  mazeHeight,
}: {
  mazeData: Maze;
  moveData?: Action[];
  mazeWidth: number;
  mazeHeight: number;
}) => {
  if (!mazeData || !mazeData.cells || !mazeData.dimensions) {
    return null;
  }
  const { cells, cheese, exit, start, dimensions } = mazeData;
  const { horizontal, vertical } = dimensions;
  const cellSize = Math.min(
    mazeWidth ? mazeWidth / (horizontal || 0) : 0,
    mazeHeight ? mazeHeight / (vertical || 0) : 0
  );

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
          color = "#020712";
          break;
        case "Open":
          color = "#415572";
          break;
        case "Cheese":
          color = "#c7da53";
          break;
        case "Exit":
          color = "#00ff79";
          break;
        case "Start":
          color = "#8bbcf8";
          break;
        default:
          color = "white";
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
      {grid.map((cell, index) => {
        const traversedInstances =
          moveData
            ?.filter(
              (move) => move.position.x === cell.x && move.position.y === cell.y
            )
            .map((move) => ({
              ...move,
              traversalColor: CategoryColor[move.actionType as ActionType],
            })) ?? [];
        return (
          <MazeCell
            key={index}
            color={cell.color}
            size={cellSize}
            x={cell.x}
            y={cell.y}
            type={cell.cellType}
            traversedInstances={traversedInstances}
          />
        );
      })}
    </div>
  );
};

export default MazeGrid;
