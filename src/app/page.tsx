"use client";

import React, { SVGProps, useEffect } from "react";
import MazeGrid from "../components/MazeGrid";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useResizeDetector } from "react-resize-detector";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { MoveList } from "@/components/MoveList";
import useAPI from "@/hooks/useAPI";
import { Toaster } from "@/components/ui/toaster";

const Home = () => {
  const api = useAPI();
  const {
    width: mazeWidth,
    height: mazeHeight,
    ref: mazeRef,
  } = useResizeDetector();

  return (
    <div className="flex flex-col h-screen">
      <header className="bg-gray-900 text-white py-4 px-6 flex items-center justify-between flex-col md:flex-row gap-4">
        <h1 className="text-2xl font-bold">Maze</h1>
        <div className="flex items-center space-x-4 flex-col md:flex-row gap-4 md:gap-0">
          <div className="relative">
            <input
              className="bg-gray-800 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter API Token"
              value={api.apiKey}
              type="text"
              onChange={(e) => api.updateApiKey(e.target.value)}
            />
            {api.apiKey ? null : (
              <KeyIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            )}
          </div>
          <div className="relative">
            <input
              className="bg-gray-800 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Base URL"
              value={api.baseUrl}
              type="text"
              onChange={(e) => api.updateBaseUrl(e.target.value)}
            />
          </div>
          <Select
            onValueChange={api.updateSelectedMaze}
            defaultValue={api.selectedMaze || undefined}
          >
            <SelectTrigger className="bg-gray-800 w-48 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <SelectValue placeholder="Select Maze" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="straightMaze">Straight Maze</SelectItem>
              <SelectItem value="oneTurn">One Turn</SelectItem>
            </SelectContent>
          </Select>
          <button
            className={`text-white px-4 py-2 rounded-md ${
              !api.selectedMaze ? "bg-gray-500" : "bg-blue-500"
            }`}
            onClick={() => {
              api.refreshData();
            }}
            disabled={!api.selectedMaze}
          >
            Refresh
          </button>
        </div>
      </header>
      <main className="flex-1 bg-gray-100 dark:bg-gray-900 flex justify-center items-center p-4 h-[calc(100%-6rem)]">
        <PanelGroup direction="horizontal">
          <Panel id="maze" minSize={25} order={1}>
            <div
              className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 w-full h-full"
              ref={mazeRef}
            >
              <div className="flex justify-center items-center w-full">
                {api.mazeData && mazeHeight && mazeWidth ? (
                  <MazeGrid
                    mazeData={api.mazeData}
                    mazeHeight={mazeHeight}
                    mazeWidth={mazeWidth}
                    moveData={api.data}
                  />
                ) : null}
              </div>
            </div>
          </Panel>
          <PanelResizeHandle
            className={`w-1 cursor-col-resize bg-stone-400 visible rounded-md`}
          />
          <Panel id="moves" minSize={25} order={2}>
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 w-full h-full overflow-auto">
              <div className="flex justify-center items-center w-full">
                {api.data ? <MoveList tableData={api.data} /> : null}
              </div>
            </div>
          </Panel>
        </PanelGroup>
      </main>
      <Toaster />
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
