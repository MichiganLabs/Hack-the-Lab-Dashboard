import useAPI from "@/hooks/useAPI";
import MazeGrid from "./MazeGrid";
import { ReactFlowProvider } from "@xyflow/react";

export const AdminView = (props: { api: ReturnType<typeof useAPI> }) => {
  const { api } = props;

  return (
    <div className="h-full overflow-auto w-full">
      <div className="flex flex-row gap-4 mb-4">
        <button
          className={`text-white px-4 py-2 rounded-md w-44 bg-yellow-500`}
          onClick={() => {
            api.toogleLockMaze(true);
          }}
        >
          Lock Maze
        </button>
        <button
          className={`text-white px-4 py-2 rounded-md w-44 bg-green-500`}
          onClick={() => {
            api.toogleLockMaze(false);
          }}
        >
          Unlock Maze
        </button>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 w-full pb-24">
        {api.participantMazeData.map((participant, index) => {
          if (api.mazeData) {
            return (
              <div
                key={index}
                className="w-full flex justify-center items-center flex-col border-white rounded-md border-2 p-4"
              >
                <div className="text-white font-bold flex flex-row gap-2">
                  <div className="text-gray-300 font-light">
                    {participant.name}
                  </div>
                  <div className="text-gray-300 font-light">-</div>
                  {participant.data.score.toLocaleString()}
                </div>
                <div className="flex justify-center mt-4">
                  <ReactFlowProvider>
                    <MazeGrid
                      mazeData={api.mazeData}
                      moveData={participant.data.actions}
                      mazeWidth={600}
                      mazeHeight={600}
                      hideTooltip
                    />
                  </ReactFlowProvider>
                </div>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};
