import React from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";

const MazeCell = ({
  color,
  size,
  x,
  y,
  type,
  traversedInstances,
  cellIndex, 
  className,
  hideTooltip,
}: {
  color: string;
  size: number;
  x: number;
  y: number;
  type: string;
  traversedInstances: any;
  cellIndex: number;
  className: string | undefined;
  hideTooltip?: boolean;
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
      className={className}
    >
      <div
        data-tooltip-id={`cell-${x}-${y}`}
        style={{
          width: 10,
          height: 10,
          backgroundColor: color,
        }}
        className="rounded-sm"
      />
      {traversedInstances.length > 0 ? (
        <div
          style={{
            display: "grid",
            width: "100%",
            height: "100%",
            position: "absolute",
            zIndex: 1,
          }}
        >
          {[traversedInstances[traversedInstances.length - 1]].map(
            (instance: any, index: number) => (
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
                    width: 8,
                    height: 8,
                    borderRadius: 0.8,
                    backgroundColor: instance.traversalColor,
                    justifyContent: "center",
                    alignItems: "center",
                    display: "flex",
                    color: "black",
                    fontSize: "3px",
                  }}
                >{`${cellIndex}`}</div>
              </div>
            )
          )}
        </div>
      ) : null}
      {hideTooltip ? null : (
        <ReactTooltip id={`cell-${x}-${y}`} place="top">
          {x}:{y} {type}
        </ReactTooltip>
      )}
    </div>
  );
};

export default React.memo(MazeCell);
