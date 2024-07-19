import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import { Action, CategoryColor } from "@/types/maze.d";

function TableItem(props: Action) {
  return (
    <TableRow
      style={{
        backgroundColor: props.success ? "#1f2937" : "#7f1c1d",
      }}
    >
      <TableCell className="rounded-l-md">
        <span
          style={{ backgroundColor: CategoryColor[props.actionType] }}
          className={`px-2 py-1 rounded-md text-black`}
        >
          {props.actionType}
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
  resetMaze: () => void;
}
export function MoveList(props: MoveListProps) {
  return (
    <div className="flex w-full text-white">
      <main className="flex-grow p-0">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-lg font-medium">Move List</h1>
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
              <TableHead className="text-white">Action Type</TableHead>
              <TableHead className="text-white">Coordinate</TableHead>
              <TableHead className="text-white">Success</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...props.tableData].reverse().map((item, index) => (
              <TableItem key={index} {...item} />
            ))}
          </TableBody>
        </Table>
      </main>
    </div>
  );
}
