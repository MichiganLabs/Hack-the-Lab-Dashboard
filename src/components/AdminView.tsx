import useAPI from "@/hooks/useAPI";
import MazeGrid from "./MazeGrid";

export const AdminView = (props: { api: ReturnType<typeof useAPI> }) => {
  const { api } = props;

  return (
    <div>
      <div>Admin View</div>
      <div className="flex justify-center items-center w-full">
        {api.participantMazeData.map((participant, index) => {
          if (api.mazeData) {
            return (
              <div key={index}>
                <div>{participant.name}</div>
                <MazeGrid
                  mazeData={api.mazeData}
                  mazeHeight={200}
                  mazeWidth={200}
                  moveData={participant.data}
                  hideTooltip
                />
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};
