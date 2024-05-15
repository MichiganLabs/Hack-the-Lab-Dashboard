import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import { JSX, SVGProps } from "react";

interface Coordinate {
  x: number;
  y: number;
}

interface Action {
  actionId: string;
  userId: string;
  mazeId: string;
  actionType: ActionType;
  position: Coordinate;
  success: boolean;
}

enum ActionType {
  Move = "MOVE",
  Start = "START",
  Eat = "EAT",
  Exit = "EXIT",
  Smell = "SMELL",
}

enum CategoryColor {
  MOVE = "blue",
  START = "green",
  EAT = "yellow",
  EXIT = "red",
  SMELL = "purple",
}

function TableItem(props: Action) {
  return (
    <TableRow className={props.success ? "" : "bg-red-900"}>
      <TableCell className="rounded-l-md">{props.actionId}</TableCell>
      <TableCell>{props.userId}</TableCell>
      <TableCell>{props.mazeId}</TableCell>
      <TableCell>
        <span
          className={`px-2 py-1 rounded-md bg-${
            CategoryColor[props.actionType]
          }-200 text-${CategoryColor[props.actionType]}-800`}
        >
          {props.actionType}
        </span>
      </TableCell>
      <TableCell>
        {props.position.x}:{props.position.x}
      </TableCell>
      <TableCell className="rounded-r-md">{`${props.success}`}</TableCell>
    </TableRow>
  );
}

export function MoveList() {
  const tableData = [
    {
      actionId: "1",
      userId: "user4",
      mazeId: "maze1",
      actionType: ActionType.Start,
      position: { x: 5, y: 10 },
      success: true,
    },
    {
      actionId: "2",
      userId: "user4",
      mazeId: "maze1",
      actionType: ActionType.Eat,
      position: { x: 3, y: 7 },
      success: false,
    },
    {
      actionId: "3",
      userId: "user4",
      mazeId: "maze1",
      actionType: ActionType.Move,
      position: { x: 8, y: 2 },
      success: true,
    },
    {
      actionId: "4",
      userId: "user4",
      mazeId: "maze1",
      actionType: ActionType.Smell,
      position: { x: 6, y: 9 },
      success: false,
    },
  ];

  return (
    <div className="flex w-full">
      <main className="flex-grow p-0">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-lg font-medium">Move List</h1>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Action ID</TableHead>
              <TableHead>User ID</TableHead>
              <TableHead>Maze ID</TableHead>
              <TableHead>Action Type</TableHead>
              <TableHead>Coordinate</TableHead>
              <TableHead>Success</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableData.map((item, index) => (
              <TableItem key={index} {...item} />
            ))}
          </TableBody>
        </Table>
      </main>
    </div>
  );
}
