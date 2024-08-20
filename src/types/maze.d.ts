export interface Coordinate {
  x: number;
  y: number;
}

export interface PlayerMaze {
  actions: Action[];
  score: number;
}

export interface Action {
  actionId: string;
  userId: string;
  mazeId: string;
  actionType: ActionType;
  position: Coordinate;
  success: boolean;
  timeTs: string;
  actionData: any;
}

export enum ActionType {
  Move = "MOVE",
  Start = "START",
  Eat = "EAT",
  Exit = "EXIT",
  Smell = "SMELL",
  Grab = "GRAB",
  Drop = "DROP",
}

export enum CellType {
  Open = "Open",
  Wall = "Wall",
  Cheese = "Cheese",
  Entrance = "Start",
  Exit = "Exit",
}

export enum CategoryColor {
  MOVE = "#bfdbfe",
  START = "#bbf7d0",
  EAT = "#ffef89",
  EXIT = "#ff0008",
  SMELL = "#e9d5ff",
  GRAB = "#24a39b",
  DROP = "#9b36ac",
}

export enum CellColor {
  Wall = "#020712",
  Open = "#415572",
  Cheese = "#c7da53",
  Exit = "#00ff79",
  Start = "#8bbcf8",
}

export interface Cell {
  type: CellType;
  surroundings: Surroundings;
}

export interface AdminCell extends Cell {
  coordinates: Coordinates;
}

export interface Maze {
  id: string;
  cells: AdminCell[];
  cheese: Coordinate[];
  exit: Coordinate;
  start: Coordinate;
  dimensions: {
    horizontal: number;
    vertical: number;
  };
  open_square_count: number;
  locked: boolean;
}
