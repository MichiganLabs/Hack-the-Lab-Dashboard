export interface Coordinate {
  x: number;
  y: number;
}

export interface Action {
  actionId: string;
  userId: string;
  mazeId: string;
  actionType: ActionType;
  position: Coordinate;
  success: boolean;
}

export enum ActionType {
  Move = "MOVE",
  Start = "START",
  Eat = "EAT",
  Exit = "EXIT",
  Smell = "SMELL",
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
}
