import useAPI from "@/hooks/useAPI";
import MazeGrid from "./MazeGrid";

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
                <div>{participant.name}</div>
                <div className="flex justify-center mt-4">
                  <MazeGrid
                    mazeData={api.mazeData}
                    moveData={participant.data}
                    mazeWidth={600}
                    mazeHeight={600}
                    hideTooltip
                  />
                </div>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};
