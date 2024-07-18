import { useEffect, useState } from "react";
import axios from "axios";
import { Action, Maze } from "@/types/maze";
import { toast } from "@/components/ui/use-toast";

const useAPI = () => {
  const [baseUrl, setBaseUrl] = useState<string>("");
  const [apiKey, setApiKey] = useState<string>("");
  const [selectedMaze, setSelectedMaze] = useState<string>("");
  const [me, setMe] = useState<{
    name: string;
    role: string;
  }>({ name: "", role: "" });
  const [mazes, setMazes] = useState<Maze[]>([]);
  const [data, setData] = useState<Action[]>();
  const [mazeData, setMazeData] = useState<Maze>();
  const [loading, setLoading] = useState(false);
  const [participantMazeData, setParticipantMazeData] = useState<
    {
      id: number;
      name: string;
      role: string;
      data: Action[];
    }[]
  >([]);

  useEffect(() => {
    setSelectedMaze(localStorage.getItem("selectedMaze") || "");
    setBaseUrl(localStorage.getItem("baseUrl") || "");
    setApiKey(localStorage.getItem("apiKey") || "");
    if (selectedMaze !== "" && baseUrl !== "" && apiKey !== "") {
      refreshData();
    }
  }, []);

  useEffect(() => {
    if (selectedMaze !== "" && baseUrl !== "" && apiKey !== "") {
      refreshData();
    }
  }, [selectedMaze]);

  const refreshData = async () => {
    await fetchMazeData();
    await fetchData();
    await fetchMazes();
    await fetchMe();
    if (me.role === "ADMIN") {
      await fetchAllParticipantData();
    }
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

  const fetchMe = async () => {
    try {
      setLoading(true);
      const response = await axios({
        url: `${baseUrl}/me`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": apiKey,
        },
      });
      setMe({ ...response.data });
    } catch (error: any) {
      toast({
        description: `${error}`,
      });
    } finally {
      setLoading(false);
    }
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

  const fetchParticipants = async (): Promise<
    { id: number; name: string; role: string }[]
  > => {
    let participants: { id: number; name: string; role: string }[] = [];
    try {
      setLoading(true);
      const response = await axios({
        url: `${baseUrl}/participants`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": apiKey,
        },
      });
      participants = [...response.data];
    } catch (error: any) {
      toast({
        description: `${error}`,
      });
    } finally {
      setLoading(false);
    }
    return participants;
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

  const fetchPlayerData = async (playerId: string): Promise<Action[]> => {
    let playerData: Action[] = [];
    try {
      setLoading(true);
      const response = await axios({
        url: `${baseUrl}/maze/${selectedMaze}/actions/${playerId}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": apiKey,
        },
      });
      playerData = [
        ...response.data.actions.sort(
          (a: Action, b: Action) => parseInt(a.actionId) - parseInt(b.actionId)
        ),
      ];
    } catch (error: any) {
      toast({
        description: `${error}`,
      });
    } finally {
      setLoading(false);
    }
    return playerData;
  };

  const fetchAllParticipantData = async () => {
    const participants = await fetchParticipants();
    const localParticipantData: {
      id: number;
      name: string;
      role: string;
      data: Action[];
    }[] = await Promise.all(
      participants.map(async (participant) => {
        const data = await fetchPlayerData(`${participant.id}`);
        return { data: [...data], ...participant };
      })
    );
    setParticipantMazeData([...localParticipantData]);
  };

  const toogleLockMaze = async (locked: boolean) => {
    try {
      setLoading(true);
      await axios({
        url: `${baseUrl}/maze/${selectedMaze}`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": apiKey,
        },
        data: {
          locked: locked,
        },
      });
    } catch (error: any) {
      if (error.response.status === 403) {
        toast({
          title: `${error}`,
          description: `${selectedMaze} is already ${
            locked ? "locked" : "unlocked"
          }`,
        });
      }
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
    me,
    fetchAllParticipantData,
    participantMazeData,
    toogleLockMaze,
  };
};

export default useAPI;
