import React from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";

const MazeCell = ({
  color,
  size,
  x,
  y,
  type,
  traversedInstances,
}: {
  color: string;
  size: number;
  x: number;
  y: number;
  type: string;
  traversedInstances: any;
}) => {
  return (
    <div
      style={{
        position: "relative",
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
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
      {traversedInstances.length > 0 ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${traversedInstances.length}, 1fr)`,
            width: "100%",
            height: "100%",
            position: "absolute",
            zIndex: 1,
          }}
        >
          {traversedInstances.map((instance: any, index: number) => (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100%",
                position: "relative",
              }}
            >
              <div
                style={{
                  width: "80%",
                  aspectRatio: "1/1",
                  borderRadius: "50%",
                  backgroundColor: instance.traversalColor,
                  border: "1px solid black",
                }}
              />
            </div>
          ))}
        </div>
      ) : null}
      <ReactTooltip id={`cell-${x}-${y}`} place="top">
        {x}:{y} {type}
      </ReactTooltip>
    </div>
  );
};

export default MazeCell;
