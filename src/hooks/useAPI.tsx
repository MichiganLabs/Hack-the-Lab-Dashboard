import { useEffect, useState } from "react";
import axios from "axios";
import { Action, Maze } from "@/types/maze";
import { toast } from "@/components/ui/use-toast";

const useAPI = () => {
  const [baseUrl, setBaseUrl] = useState<string>(
    localStorage.getItem("baseUrl") || ""
  );
  const [apiKey, setApiKey] = useState<string>(
    localStorage.getItem("apiKey") || ""
  );
  const [selectedMaze, setSelectedMaze] = useState<string>(
    localStorage.getItem("selectedMaze") || ""
  );
  const [mazes, setMazes] = useState<string[]>([]);
  const [data, setData] = useState<Action[]>();
  const [mazeData, setMazeData] = useState<Maze>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMazes();
  }, []);

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
    localStorage.setItem("selectedMaze", maze);
    setSelectedMaze(maze);
  };

  const updateBaseUrl = (url: string) => {
    localStorage.setItem("baseUrl", url);
    setBaseUrl(url);
  };

  const updateApiKey = (key: string) => {
    localStorage.setItem("apiKey", key);
    setApiKey(key);
  };

  const resetMaze = async () => {
    try {
      setLoading(true);
      const response = await axios({
        url: `${baseUrl}/rat/reset`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": apiKey,
        },
        data: {
          mazeId: selectedMaze,
        },
      });
      await refreshData();
    } catch (error: any) {
      toast({
        description: `${error}`,
      });
    } finally {
      setLoading(false);
    }
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

  const fetchMazes = async () => {
    try {
      setLoading(true);
      const response = await axios({
        url: `${baseUrl}/mazes`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": apiKey,
        },
      });
      setMazes(response.data);
    } catch (error: any) {
      setMazes([]);
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
        ...response.data.actions.sort(
          (a: Action, b: Action) => parseInt(a.actionId) - parseInt(b.actionId)
        ),
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
    mazes,
    resetMaze,
  };
};

export default useAPI;
