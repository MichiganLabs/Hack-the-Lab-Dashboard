import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import useAPI from "@/hooks/useAPI";
import { Action, ActionType, CategoryColor } from "@/types/maze.d";

interface IndexedAction extends Action {
  index: number;
}
function TableItem(props: IndexedAction) {
  const actionData = () => {
    try {
      switch (props.actionType) {
        case ActionType.Grab:
        case ActionType.Drop:
          return `${props.actionData.x}:${props.actionData.y}`;
        case ActionType.Exit:
        case ActionType.Start:
          return "N/A";
        case ActionType.Move:
          return props.actionData.direction;
        case ActionType.Smell:
          return props.actionData.distance;
        default:
          return JSON.stringify(props.actionData);
      }
    } catch (e) {
      return "";
    }
  };
  return (
    <TableRow
      style={{
        backgroundColor: props.success ? "#1f2937" : "rgba(127, 28, 29, 0.5)",
      }}
    >
      <TableCell>
        <span style={{}} className={`px-2 py-1 rounded-md text-white`}>
          {props.index}
        </span>
      </TableCell>
      <TableCell>
        <span
          style={{ backgroundColor: CategoryColor[props.actionType] }}
          className={`px-2 py-1 rounded-md text-black`}
        >
          {props.actionType}
        </span>
      </TableCell>
      <TableCell>
        <span
          style={{ backgroundColor: CategoryColor[props.actionType] }}
          className={`px-2 py-1 rounded-md text-black`}
        >
          {actionData()}
        </span>
      </TableCell>
      <TableCell>
        {props.position.x}:{props.position.y}
      </TableCell>
      <TableCell>{`${props.success}`}</TableCell>
    </TableRow>
  );
}

interface MoveListProps {
  api: ReturnType<typeof useAPI>;
  tableData: Action[];
  score: number;
  resetMaze: () => void;
}
export function MoveList(props: MoveListProps) {
  const {api} = props;
  const isResetDisabled = api.loading || api.data === null;
  const resetButtonClassName = `px-4 py-2 text-white rounded-md ${isResetDisabled ? "cursor-not-allowed bg-gray-500" : "cursor-pointer bg-red-500"}`;

  return (
    <div className="flex w-full text-white">
      <main className="flex-grow p-0">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-lg font-medium">Move List</h1>
          <h1 className="text-lg font-medium">Score: {props.score}</h1>
          <button
            disabled={isResetDisabled}
            onClick={props.resetMaze}
            className={resetButtonClassName}
          >
            Reset Rat
          </button>
        </div>
        <Table className="overflow-auto h-full">
          <TableHeader>
            <TableRow>
              <TableHead className="text-white">Move #</TableHead>
              <TableHead className="text-white">Action Type</TableHead>
              <TableHead className="text-white">Details</TableHead>
              <TableHead className="text-white">Coordinate</TableHead>
              <TableHead className="text-white">Success</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {props.tableData
              .map((item, originalIndex) => ({ ...item, originalIndex }))
              .reverse()
              .map((item, index) => (
                <TableItem
                  key={index}
                  {...{ ...item, index: item.originalIndex }}
                />
              ))}
          </TableBody>
        </Table>
      </main>
    </div>
  );
}
