import { useEffect, useState } from "react";
import axios from "axios";
import { Action, Maze } from "@/types/maze";
import { toast } from "@/components/ui/use-toast";

const useAPI = () => {
  const [baseUrl, setBaseUrl] = useState("");
  const [apiKey, setApiKey] = useState<string>(
    "ae28c592c7964ce2afb3b38eb11f916e"
  );
  const [selectedMaze, setSelectedMaze] = useState<string>("");
  const [data, setData] = useState<Action[]>();
  const [mazeData, setMazeData] = useState<Maze>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedMaze !== "" && baseUrl !== "" && apiKey !== "") {
      refreshData();
    }
  }, [selectedMaze]);

  const refreshData = async () => {
    await fetchMazeData();
    await fetchData();
  };

  const updateSelectedMaze = (maze: string) => {
    setSelectedMaze(maze);
  };

  const updateBaseUrl = (url: string) => {
    setBaseUrl(url);
  };

  const updateApiKey = (key: string) => {
    setApiKey(key);
  };

  const fetchMazeData = async () => {
    try {
      setLoading(true);
      const response = await axios({
        url: `${baseUrl}/maze/${selectedMaze}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": apiKey,
        },
      });
      setMazeData(response.data);
    } catch (error: any) {
      setMazeData({} as Maze);
      toast({
        description: `${error}`,
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios({
        url: `${baseUrl}/rat/${selectedMaze}/actions`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": apiKey,
        },
      });
      setData([
        ...response.data.actions,
        ...response.data.actions,
        ...response.data.actions,
        ,
        ...response.data.actions,
        ,
        ...response.data.actions,
        ,
        ...response.data.actions,
        ,
        ...response.data.actions,
      ]);
    } catch (error: any) {
      setData([]);
      toast({
        description: `${error}`,
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    fetchData,
    updateBaseUrl,
    baseUrl,
    fetchMazeData,
    mazeData,
    apiKey,
    updateApiKey,
    selectedMaze,
    updateSelectedMaze,
    refreshData,
  };
};

export default useAPI;
