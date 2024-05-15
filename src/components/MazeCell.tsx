import React from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";

const MazeCell = ({
  color,
  size,
  x,
  y,
  type,
}: {
  color: string;
  size: number;
  x: number;
  y: number;
  type: string;
}) => {
  return (
    <div>
      <div
        data-tooltip-id={`cell-${x}-${y}`}
        style={{
          width: size,
          height: size,
          backgroundColor: color,
          border: "1px solid black",
        }}
        className="rounded-md"
      />
      <ReactTooltip id={`cell-${x}-${y}`} place="top">
        {x}:{y} {type}
      </ReactTooltip>
    </div>
  );
};

export default MazeCell;
