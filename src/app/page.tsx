"use client";

import React, { SVGProps, useEffect, useMemo, useState } from "react";
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
import { AdminView } from "@/components/AdminView";
import { Action } from "@/types/maze";
import { ReactFlowProvider } from "@xyflow/react";

const Home = () => {
  const api = useAPI();
  const {
    width: mazeWidth,
    height: mazeHeight,
    ref: mazeRef,
  } = useResizeDetector();
  const actions = useMemo(() => api.data?.actions || [], [api.data?.actions]);
  const [sliderValue, setSliderValue] = useState(0);
  const [filteredData, setFilteredData] = useState<Action[]>([]);

  const handleSliderChange = (e: { target: { value: any } }) => {
    setSliderValue(Number(e.target.value));
  };

  useEffect(() => {
    handleSliderChange({ target: { value: actions.length - 1 } });
  }, [actions.length, api.data]);

  useEffect(() => {
    if (!api.data || !actions) return;
    if (actions[sliderValue] && actions[sliderValue].timeTs) {
      const newFilteredData = actions.filter(
        (action) =>
          new Date(action.timeTs).getTime() <=
          new Date(actions[sliderValue].timeTs).getTime()
      );
      setFilteredData(newFilteredData);
    }
  }, [sliderValue, api.data, actions]);

  return (
    <div className="flex flex-col h-screen">
      <header className="bg-gray-800 text-white py-4 px-6 flex items-center justify-between flex-col md:flex-row gap-4">
        <h1 className="text-2xl font-bold">Maze</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:flex justify-between items-center gap-4 lg:gap-1">
          <div className={`text-white px-4 py-2 rounded-md text-nowrap`}>
            {api.me.name}
          </div>
          {api.me.role ? (
            <div
              className={`flex justify-center items-center py-2 rounded-md w-32 ${
                api.me.role === "ADMIN"
                  ? "bg-red-500"
                  : api.me.role === "DEVELOPER"
                  ? "bg-yellow-500"
                  : "bg-green-500"
              }`}
            >
              {api.me.role}
            </div>
          ) : null}
          <div className="relative">
            <input
              className="bg-gray-800 w-44 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter API Token"
              value={api.apiKey}
              type="password"
              onChange={(e) => api.updateApiKey(e.target.value)}
            />
            {api.apiKey ? null : (
              <KeyIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            )}
          </div>
          <div className="relative">
            <input
              className="bg-gray-800 w-44 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
              {api.mazes.map((maze) => (
                <SelectItem key={maze.id} value={maze.id}>
                  {maze.id}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <button
            className={`text-white px-4 py-2 rounded-md w-24 ${
              !api.selectedMaze ? "bg-gray-500" : "bg-blue-500"
            }`}
            onClick={() => {
              api.refreshData();
            }}
          >
            Update
          </button>
        </div>
      </header>
      {api.data ? (
        <main className="flex-1 bg-gray-900 flex justify-center items-center p-4 h-[calc(100%-6rem)]">
          {api.me.role === "ADMIN" ? (
            <AdminView api={api} />
          ) : (
            <PanelGroup direction="horizontal">
              <Panel id="maze" minSize={25} order={1}>
                <div
                  className="bg-gray-800 shadow-lg rounded-lg p-4 w-full h-full"
                  ref={mazeRef}
                >
                  <div className="flex justify-center items-center w-full">
                    {api.mazeData &&
                    mazeHeight &&
                    mazeWidth &&
                    api.mazeData.dimensions ? (
                      <ReactFlowProvider>
                        <MazeGrid
                          mazeData={api.mazeData}
                          mazeHeight={mazeHeight}
                          mazeWidth={mazeWidth}
                          moveData={filteredData}
                          hideTooltip
                        />
                      </ReactFlowProvider>
                    ) : null}
                  </div>
                </div>
              </Panel>
              <PanelResizeHandle
                className={`w-1 cursor-col-resize bg-stone-400 visible rounded-md`}
              />
              <Panel id="moves" minSize={25} order={2}>
                <div className="bg-gray-800 shadow-lg rounded-lg p-4 w-full h-full overflow-auto">
                  <div className="flex justify-center items-center w-full flex-col">
                    <input
                      type="range"
                      min={0}
                      max={actions.length - 1}
                      value={sliderValue}
                      onChange={handleSliderChange}
                      step={1}
                      className="w-full mb-4"
                    />
                    {api.data ? (
                      <MoveList
                        tableData={filteredData}
                        resetMaze={api.resetMaze}
                        score={api.data.score}
                      />
                    ) : null}
                  </div>
                </div>
              </Panel>
            </PanelGroup>
          )}
        </main>
      ) : null}
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
