import React, { useEffect, useMemo } from "react";
import MazeCell from "./MazeCell";
import {
  Action,
  ActionType,
  CategoryColor,
  CellColor,
  CellType,
  Maze,
} from "@/types/maze.d";
import { Background, Controls, ReactFlow, useReactFlow } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import Legend from "./Legend";

const MazeFlow = ({
  mazeData,
  moveData,
  mazeWidth,
  mazeHeight,
  hideTooltip,
}: {
  mazeData: Maze;
  moveData?: Action[];
  mazeWidth: number;
  mazeHeight: number;
  hideTooltip?: boolean;
}) => {
  const reactFlowInstance = useReactFlow();
  const fitView = () => {
    // wait 1 second
    setTimeout(() => {
      reactFlowInstance.fitView({ padding: 1 });
    }, 100);
  };
  const { cells, dimensions } = mazeData;
  const { horizontal, vertical } = dimensions || { horizontal: 0, vertical: 0 };

  const cellSize = Math.min(
    mazeWidth ? mazeWidth / (horizontal || 0) : 0,
    mazeHeight ? mazeHeight / (vertical || 0) : 0
  );

  const nodes = useMemo(() => {
    if (!cells) return [];
    return cells.map((cell, index) => {
      const { x, y } = cell.coordinates;
      const color = CellColor[cell.type as CellType];

      const traversedInstances =
        moveData
          ?.filter((move) => move.position.x === x && move.position.y === y)
          .map((move, moveIndex) => ({
            ...move,
            traversalColor: CategoryColor[move.actionType as ActionType],
            cellIndex: moveIndex,
          })) ?? [];

      const cellIndex = moveData
        ? moveData.length -
          1 -
          [...moveData]
            .reverse()
            .findIndex((move) => move.position.x === x && move.position.y === y)
        : -1;

      const isLastCell = cellIndex == (moveData?.length ?? 0) - 1;

      return {
        id: `cell-${x}-${y}`,
        position: { x: x * 10, y: y * 10 },
        data: {
          color,
          size: cellSize,
          x,
          y,
          type: cell.type,
          traversedInstances,
          cellIndex: cellIndex >= 0 ? cellIndex : 0,
          className: isLastCell ? "animate-pulse" : "",
          hideTooltip,
        },
        style: {
          width: cellSize,
          height: cellSize,
        },
        type: "mazeCell",
      };
    });
  }, [cells, moveData, cellSize, hideTooltip]);

  const nodeTypes = useMemo(
    () => ({
      mazeCell: MazeCellNode,
    }),
    []
  );

  const filteredNodes = nodes.filter(
    (node) => node.data.type !== CellType.Wall
  );

  useEffect(() => {
    fitView();
  }, [mazeData.id]);

  return (
    <div style={{ height: mazeHeight, width: mazeWidth }}>
      <ReactFlow
        nodesDraggable={false}
        colorMode="dark"
        nodes={filteredNodes}
        nodeTypes={nodeTypes}
        proOptions={{ hideAttribution: true }}
        maxZoom={10}
        minZoom={0.5}
        fitView
        draggable={false}
      >
        <Controls />
        <Legend />
      </ReactFlow>
    </div>
  );
};

const MazeCellNode = ({ data }: { data: any }) => {
  return (
    <div style={{ width: data.size, height: data.size }}>
      <MazeCell {...data} />
    </div>
  );
};

export default MazeFlow;
