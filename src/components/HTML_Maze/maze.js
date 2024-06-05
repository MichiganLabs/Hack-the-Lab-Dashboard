var mazeData = [
  {
    type: "Wall",
    coordinates: { x: 0, y: 0 },
    surroundings: { east: "Wall", west: "Wall", north: "Wall", south: "Wall" },
  },
  {
    type: "Wall",
    coordinates: { x: 1, y: 0 },
    surroundings: { east: "Wall", west: "Wall", north: "Wall", south: "Wall" },
  },
  {
    type: "Wall",
    coordinates: { x: 2, y: 0 },
    surroundings: { east: "Wall", west: "Wall", north: "Wall", south: "Wall" },
  },
  {
    type: "Wall",
    coordinates: { x: 3, y: 0 },
    surroundings: { east: "Wall", west: "Wall", north: "Wall", south: "Wall" },
  },
  {
    type: "Wall",
    coordinates: { x: 4, y: 0 },
    surroundings: { east: "Wall", west: "Wall", north: "Wall", south: "Wall" },
  },
  {
    type: "Wall",
    coordinates: { x: 5, y: 0 },
    surroundings: { east: "Wall", west: "Wall", north: "Wall", south: "Wall" },
  },
  {
    type: "Wall",
    coordinates: { x: 6, y: 0 },
    surroundings: { east: "Wall", west: "Wall", north: "Wall", south: "Wall" },
  },
  {
    type: "Wall",
    coordinates: { x: 0, y: 1 },
    surroundings: { east: "Wall", west: "Wall", north: "Wall", south: "Wall" },
  },
  {
    type: "Wall",
    coordinates: { x: 1, y: 1 },
    surroundings: { east: "Wall", west: "Wall", north: "Wall", south: "Wall" },
  },
  {
    type: "Wall",
    coordinates: { x: 2, y: 1 },
    surroundings: { east: "Wall", west: "Wall", north: "Wall", south: "Wall" },
  },
  {
    type: "Wall",
    coordinates: { x: 3, y: 1 },
    surroundings: { east: "Wall", west: "Wall", north: "Wall", south: "Wall" },
  },
  {
    type: "Wall",
    coordinates: { x: 4, y: 1 },
    surroundings: { east: "Wall", west: "Wall", north: "Wall", south: "Wall" },
  },
  {
    type: "Wall",
    coordinates: { x: 5, y: 1 },
    surroundings: { east: "Wall", west: "Wall", north: "Wall", south: "Wall" },
  },
  {
    type: "Wall",
    coordinates: { x: 6, y: 1 },
    surroundings: { east: "Wall", west: "Wall", north: "Wall", south: "Wall" },
  },
  {
    type: "Wall",
    coordinates: { x: 0, y: 2 },
    surroundings: { east: "Wall", west: "Wall", north: "Wall", south: "Wall" },
  },
  {
    type: "Wall",
    coordinates: { x: 1, y: 2 },
    surroundings: { east: "Wall", west: "Wall", north: "Wall", south: "Wall" },
  },
  {
    type: "Wall",
    coordinates: { x: 2, y: 2 },
    surroundings: { east: "Wall", west: "Wall", north: "Wall", south: "Wall" },
  },
  {
    type: "Wall",
    coordinates: { x: 3, y: 2 },
    surroundings: { east: "Wall", west: "Wall", north: "Wall", south: "Open" },
  },
  {
    type: "Wall",
    coordinates: { x: 4, y: 2 },
    surroundings: { east: "Wall", west: "Wall", north: "Wall", south: "Open" },
  },
  {
    type: "Wall",
    coordinates: { x: 5, y: 2 },
    surroundings: { east: "Wall", west: "Wall", north: "Wall", south: "Open" },
  },
  {
    type: "Wall",
    coordinates: { x: 6, y: 2 },
    surroundings: { east: "Wall", west: "Wall", north: "Wall", south: "Exit" },
  },
  {
    type: "Wall",
    coordinates: { x: 0, y: 3 },
    surroundings: { east: "Wall", west: "Wall", north: "Wall", south: "Wall" },
  },
  {
    type: "Wall",
    coordinates: { x: 1, y: 3 },
    surroundings: { east: "Wall", west: "Wall", north: "Wall", south: "Wall" },
  },
  {
    type: "Wall",
    coordinates: { x: 2, y: 3 },
    surroundings: { east: "Open", west: "Wall", north: "Wall", south: "Wall" },
  },
  {
    type: "Open",
    coordinates: { x: 3, y: 3 },
    surroundings: {
      east: "Open",
      west: "Wall",
      north: "Wall",
      south: "Cheese",
    },
  },
  {
    type: "Open",
    coordinates: { x: 4, y: 3 },
    surroundings: { east: "Open", west: "Open", north: "Wall", south: "Wall" },
  },
  {
    type: "Open",
    coordinates: { x: 5, y: 3 },
    surroundings: { east: "Exit", west: "Open", north: "Wall", south: "Wall" },
  },
  {
    type: "Exit",
    coordinates: { x: 6, y: 3 },
    surroundings: { east: "Wall", west: "Open", north: "Wall", south: "Wall" },
  },
  {
    type: "Wall",
    coordinates: { x: 0, y: 4 },
    surroundings: { east: "Wall", west: "Wall", north: "Wall", south: "Wall" },
  },
  {
    type: "Wall",
    coordinates: { x: 1, y: 4 },
    surroundings: { east: "Wall", west: "Wall", north: "Wall", south: "Wall" },
  },
  {
    type: "Wall",
    coordinates: { x: 2, y: 4 },
    surroundings: {
      east: "Cheese",
      west: "Wall",
      north: "Wall",
      south: "Wall",
    },
  },
  {
    type: "Cheese",
    coordinates: { x: 3, y: 4 },
    surroundings: { east: "Wall", west: "Wall", north: "Open", south: "Open" },
  },
  {
    type: "Wall",
    coordinates: { x: 4, y: 4 },
    surroundings: {
      east: "Wall",
      west: "Cheese",
      north: "Open",
      south: "Wall",
    },
  },
  {
    type: "Wall",
    coordinates: { x: 5, y: 4 },
    surroundings: { east: "Wall", west: "Wall", north: "Open", south: "Wall" },
  },
  {
    type: "Wall",
    coordinates: { x: 6, y: 4 },
    surroundings: { east: "Wall", west: "Wall", north: "Exit", south: "Wall" },
  },
  {
    type: "Wall",
    coordinates: { x: 0, y: 5 },
    surroundings: { east: "Wall", west: "Wall", north: "Wall", south: "Wall" },
  },
  {
    type: "Wall",
    coordinates: { x: 1, y: 5 },
    surroundings: { east: "Wall", west: "Wall", north: "Wall", south: "Wall" },
  },
  {
    type: "Wall",
    coordinates: { x: 2, y: 5 },
    surroundings: { east: "Open", west: "Wall", north: "Wall", south: "Wall" },
  },
  {
    type: "Open",
    coordinates: { x: 3, y: 5 },
    surroundings: {
      east: "Wall",
      west: "Wall",
      north: "Cheese",
      south: "Start",
    },
  },
  {
    type: "Wall",
    coordinates: { x: 4, y: 5 },
    surroundings: { east: "Wall", west: "Open", north: "Wall", south: "Wall" },
  },
  {
    type: "Wall",
    coordinates: { x: 5, y: 5 },
    surroundings: { east: "Wall", west: "Wall", north: "Wall", south: "Wall" },
  },
  {
    type: "Wall",
    coordinates: { x: 6, y: 5 },
    surroundings: { east: "Wall", west: "Wall", north: "Wall", south: "Wall" },
  },
  {
    type: "Wall",
    coordinates: { x: 0, y: 6 },
    surroundings: { east: "Wall", west: "Wall", north: "Wall", south: "Wall" },
  },
  {
    type: "Wall",
    coordinates: { x: 1, y: 6 },
    surroundings: { east: "Wall", west: "Wall", north: "Wall", south: "Wall" },
  },
  {
    type: "Wall",
    coordinates: { x: 2, y: 6 },
    surroundings: { east: "Start", west: "Wall", north: "Wall", south: "Wall" },
  },
  {
    type: "Start",
    coordinates: { x: 3, y: 6 },
    surroundings: { east: "Wall", west: "Wall", north: "Open", south: "Wall" },
  },
  {
    type: "Wall",
    coordinates: { x: 4, y: 6 },
    surroundings: { east: "Wall", west: "Start", north: "Wall", south: "Wall" },
  },
  {
    type: "Wall",
    coordinates: { x: 5, y: 6 },
    surroundings: { east: "Wall", west: "Wall", north: "Wall", south: "Wall" },
  },
  {
    type: "Wall",
    coordinates: { x: 6, y: 6 },
    surroundings: { east: "Wall", west: "Wall", north: "Wall", south: "Wall" },
  },
];
