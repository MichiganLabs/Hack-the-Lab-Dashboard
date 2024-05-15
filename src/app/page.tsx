"use client";

import React, { SVGProps } from "react";
import MazeGrid from "../components/MazeGrid";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import oneTurn from "./oneTurn.json";
import straightMaze from "./straightMaze.json";
import { useResizeDetector } from "react-resize-detector";

const Home = () => {
  const [mazeData, setMazeData] = React.useState<any>(straightMaze);
  const { width, height, ref } = useResizeDetector();

  const handleSelectChange = (value: any) => {
    switch (value) {
      case "oneTurn":
        setMazeData(oneTurn);
        break;
      case "straightMaze":
      default:
        setMazeData(straightMaze);
        break;
    }
  };

  const cellSize = Math.min(
    width ? width / mazeData.dimensions.horizontal : 0,
    height ? height / mazeData.dimensions.vertical : 0
  );
  return (
    <div className="flex flex-col h-screen">
      <header className="bg-gray-900 text-white py-4 px-6 flex items-center justify-between flex-col md:flex-row gap-4">
        <h1 className="text-2xl font-bold">Maze Dashboard</h1>
        <div className="flex items-center space-x-4 flex-col md:flex-row gap-4">
          <div className="relative">
            <input
              className="bg-gray-800 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
              placeholder="Enter API Token"
              type="text"
            />
            <KeyIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          </div>
          <Select onValueChange={handleSelectChange}>
            <SelectTrigger className="bg-gray-800 w-48 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <SelectValue placeholder="Select Maze" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="straightMaze">Straight Maze</SelectItem>
              <SelectItem value="oneTurn">One Turn</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </header>
      <main className="flex-1 bg-gray-100 dark:bg-gray-900 flex justify-center items-center p-8 h-[calc(100%-6rem)]">
        <div
          className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 w-full max-w-4xl h-full"
          ref={ref}
        >
          <div className="flex justify-center items-center w-full">
            <MazeGrid mazeData={mazeData} cellSize={cellSize} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;

function KeyIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="7.5" cy="15.5" r="5.5" />
      <path d="m21 2-9.6 9.6" />
      <path d="m15.5 7.5 3 3L22 7l-3-3" />
    </svg>
  );
}
