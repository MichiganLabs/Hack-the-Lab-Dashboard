import React, { useMemo, useState, useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";
import MazeCell from "./MazeCell";
import {
  Action,
  ActionType,
  CategoryColor,
  CellType,
  Maze,
} from "@/types/maze.d";

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
  const { cells, cheese, exit, start, dimensions } = mazeData;
  const { horizontal, vertical } = dimensions;

  const [debouncedWidth, setDebouncedWidth] = useState(mazeWidth);
  const [debouncedHeight, setDebouncedHeight] = useState(mazeHeight);

  const debouncedResize = useDebouncedCallback((width, height) => {
    setDebouncedWidth(width);
    setDebouncedHeight(height);
  }, 10);

  useEffect(() => {
    debouncedResize(mazeWidth - 50, mazeHeight);
  }, [mazeWidth, mazeHeight, debouncedResize]);

  const cellSize = Math.min(
    debouncedWidth ? debouncedWidth / (horizontal || 0) : 0,
    debouncedHeight ? debouncedHeight / (vertical || 0) : 0
  );

  const grid = useMemo(() => {
    const gridArray = [];
    for (let y = 0; y < vertical; y++) {
      for (let x = 0; x < horizontal; x++) {
        const cell = cells.find(
          (c: { coordinates: { x: number; y: number } }) =>
            c.coordinates.x === x && c.coordinates.y === y
        );
        const cellType = cell ? cell.type : CellType.Wall;
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

        gridArray.push({ color, x, y, cellType });
      }
    }
    return gridArray;
  }, [cells, vertical, horizontal]);

  if (!mazeData || !mazeData.cells || !mazeData.dimensions) {
    return null;
  }
  return (
    <div
      style={{
        display: "grid",
        height: "100%",
        width: "100%",
        gridTemplateColumns: `repeat(${horizontal}, ${cellSize}px)`,
        //gridTemplateRows: `repeat(${vertical}, ${cellSize}px)`,
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
        return cell.cellType === CellType.Wall ? (
          <div key={index} />
        ) : (
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
