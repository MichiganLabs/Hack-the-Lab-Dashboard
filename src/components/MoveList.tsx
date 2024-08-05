import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import { Action, ActionType, CategoryColor } from "@/types/maze.d";

interface IndexedAction extends Action {
  index: number;
}
function TableItem(props: IndexedAction) {
  const actionData = () => {
    try {
      switch (props.actionType) {
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
        backgroundColor: props.success ? "#1f2937" : "#7f1c1d",
      }}
    >
      <TableCell className="rounded-l-md">
        <span style={{}} className={`px-2 py-1 rounded-md text-white`}>
          {props.index}
        </span>
      </TableCell>
      <TableCell className="rounded-l-md">
        <span
          style={{ backgroundColor: CategoryColor[props.actionType] }}
          className={`px-2 py-1 rounded-md text-black`}
        >
          {props.actionType}
        </span>
      </TableCell>
      <TableCell className="rounded-l-md">
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
      <TableCell className="rounded-r-md">{`${props.success}`}</TableCell>
    </TableRow>
  );
}

interface MoveListProps {
  tableData: Action[];
  score: number;
  resetMaze: () => void;
}
export function MoveList(props: MoveListProps) {
  return (
    <div className="flex w-full text-white">
      <main className="flex-grow p-0">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-lg font-medium">Move List</h1>
          <h1 className="text-lg font-medium">Score: {props.score}</h1>
          <button
            onClick={props.resetMaze}
            className="px-4 py-2 bg-red-500 text-white rounded-md"
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
