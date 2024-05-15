"use client";

import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from "@/components/ui/select";
import { ResponsiveHeatMap } from "@nivo/heatmap";
import {
  JSX,
  ClassAttributes,
  HTMLAttributes,
  SVGProps,
  useState,
} from "react";

export function Sandbox() {
  const [apiKey, setApiKey] = useState("");

  return (
    <div className="flex flex-col h-screen">
      <header className="bg-gray-900 text-white py-4 px-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Maze Dashboard</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              className="bg-gray-800 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
              placeholder="Enter API Token"
              type="text"
            />
            <KeyIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          </div>
          <Select>
            <SelectTrigger className="bg-gray-800 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <SelectValue placeholder="Select Maze" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="maze1">Maze 1</SelectItem>
              <SelectItem value="maze2">Maze 2</SelectItem>
              <SelectItem value="maze3">Maze 3</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </header>
      <main className="flex-1 bg-gray-100 dark:bg-gray-900 flex justify-center items-center">
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 w-full max-w-4xl">
          <div className="flex justify-center">
            <HeatmapChart className="w-full aspect-square" />
          </div>
        </div>
      </main>
    </div>
  );
}

function HeatmapChart(
  props: JSX.IntrinsicAttributes &
    ClassAttributes<HTMLDivElement> &
    HTMLAttributes<HTMLDivElement>
) {
  return (
    <div {...props}>
      <ResponsiveHeatMap
        data={[
          {
            id: "A",
            data: [
              {
                x: "1",
                y: 4415,
              },
              {
                x: "2",
                y: -59456,
              },
              {
                x: "3",
                y: -79886,
              },
              {
                x: "4",
                y: 14478,
              },
              {
                x: "5",
                y: -63874,
              },
              {
                x: "6",
                y: -47542,
              },
              {
                x: "7",
                y: 16635,
              },
              {
                x: "8",
                y: -30278,
              },
              {
                x: "9",
                y: -95178,
              },
            ],
          },
          {
            id: "B",
            data: [
              {
                x: "1",
                y: 41241,
              },
              {
                x: "2",
                y: -77516,
              },
              {
                x: "3",
                y: -19422,
              },
              {
                x: "4",
                y: 61220,
              },
              {
                x: "5",
                y: -65044,
              },
              {
                x: "6",
                y: -59254,
              },
              {
                x: "7",
                y: 9299,
              },
              {
                x: "8",
                y: -58470,
              },
              {
                x: "9",
                y: 51828,
              },
            ],
          },
          {
            id: "C",
            data: [
              {
                x: "1",
                y: 94426,
              },
              {
                x: "2",
                y: 31248,
              },
              {
                x: "3",
                y: -15766,
              },
              {
                x: "4",
                y: 22271,
              },
              {
                x: "5",
                y: 86246,
              },
              {
                x: "6",
                y: -23717,
              },
              {
                x: "7",
                y: 97595,
              },
              {
                x: "8",
                y: -69800,
              },
              {
                x: "9",
                y: 74453,
              },
            ],
          },
          {
            id: "D",
            data: [
              {
                x: "1",
                y: -49899,
              },
              {
                x: "2",
                y: 13864,
              },
              {
                x: "3",
                y: -45673,
              },
              {
                x: "4",
                y: -20270,
              },
              {
                x: "5",
                y: 99430,
              },
              {
                x: "6",
                y: 17283,
              },
              {
                x: "7",
                y: -6514,
              },
              {
                x: "8",
                y: -21766,
              },
              {
                x: "9",
                y: -52610,
              },
            ],
          },
          {
            id: "E",
            data: [
              {
                x: "1",
                y: 81123,
              },
              {
                x: "2",
                y: -25153,
              },
              {
                x: "3",
                y: 2577,
              },
              {
                x: "4",
                y: 24409,
              },
              {
                x: "5",
                y: 82923,
              },
              {
                x: "6",
                y: 51283,
              },
              {
                x: "7",
                y: 10208,
              },
              {
                x: "8",
                y: 4055,
              },
              {
                x: "9",
                y: -14699,
              },
            ],
          },
        ]}
        margin={{ top: 0, right: 10, bottom: 30, left: 30 }}
        axisTop={null}
        axisBottom={{
          tickSize: 0,
          tickPadding: 16,
        }}
        axisLeft={{
          tickSize: 0,
          tickPadding: 16,
        }}
        colors={{
          type: "sequential",
          scheme: "blue_green",
        }}
        theme={{
          tooltip: {
            chip: {
              borderRadius: "9999px",
            },
            container: {
              fontSize: "12px",
              textTransform: "capitalize",
              borderRadius: "6px",
            },
          },
        }}
        role="application"
        ariaLabel="A heatmap chart/matrix"
        sizeVariation={false}
        cellComponent={"rect"}
      />
    </div>
  );
}

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
