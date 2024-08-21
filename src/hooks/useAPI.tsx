import { useEffect, useState } from "react";
import axios from "axios";
import { Action, Maze, PlayerMaze } from "@/types/maze";
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
  const [actionData, setActionData] = useState<PlayerMaze>();
  const [mazeData, setMazeData] = useState<Maze>();
  const [participantMazeData, setParticipantMazeData] = useState<
    {
      id: number;
      name: string;
      role: string;
      data: PlayerMaze;
    }[]
  >([]);

  const [fetchingData, setFetchingData] = useState<boolean>(false);
  const [fetchingMazeData, setFetchingMazeData] = useState<boolean>(false);
  const [fetchingMazing, setFetchingMazing] = useState<boolean>(false);
  const [fetchingMe, setFetchingMe] = useState<boolean>(false);
  const [fetchingPlayerData, setFetchingPlayerData] = useState<boolean>(false);
  const [fetchingParticipants, setFetchingParticipants] = useState<boolean>(
    false
  );
  const [lockingMaze, setLockingMaze] = useState<boolean>(false);
  const [resetting, setResetting] = useState<boolean>(false);

  const loading = fetchingData ||
    fetchingMazeData ||
    fetchingMazing ||
    fetchingMe ||
    fetchingPlayerData ||
    fetchingParticipants ||
    lockingMaze ||
    resetting;


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
    await fetchActionData();
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
      setFetchingMe(true);
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
      setFetchingMe(false);
    }
  };

  const resetMaze = async () => {
    try {
      setResetting(true);
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
      setResetting(false);
    }
  };

  const fetchParticipants = async (): Promise<
    { id: number; name: string; role: string }[]
  > => {
    let participants: { id: number; name: string; role: string }[] = [];
    try {
      setFetchingParticipants(true);
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
      setFetchingParticipants(false);
    }
    return participants;
  };

  const fetchMazeData = async () => {
    try {
      console.log("fetching maze data");
      setFetchingMazeData(true);
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
      setFetchingMazeData(false);
    }
  };

  const fetchMazes = async () => {
    try {
      setFetchingMazing(true);
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
      setFetchingMazing(false);
    }
  };

  const fetchActionData = async (): Promise<boolean> => {
    try {
      setFetchingData(true);
      const response = await axios({
        url: `${baseUrl}/rat/${selectedMaze}/actions`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": apiKey,
        },
      });
      setActionData({
        actions: [
          ...response.data.actions.sort(
            (a: Action, b: Action) =>
              parseInt(a.actionId) - parseInt(b.actionId)
          ),
        ],
        score: response.data.score,
      });
      return true;
    } catch (error: any) {
      setActionData({ actions: [], score: 0 });
      toast({
        description: `${error}`,
      });
      return false;
    } finally {
      setFetchingData(false);
    }
  };

  const fetchPlayerData = async (playerId: string): Promise<PlayerMaze> => {
    let playerData: PlayerMaze = { actions: [], score: 0 };
    try {
      setFetchingPlayerData(true);
      const response = await axios({
        url: `${baseUrl}/maze/${selectedMaze}/actions/${playerId}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": apiKey,
        },
      });
      playerData = {
        actions: [
          ...response.data.actions.sort(
            (a: Action, b: Action) =>
              parseInt(a.actionId) - parseInt(b.actionId)
          ),
        ],
        score: response.data.score,
      };
    } catch (error: any) {
      toast({
        description: `${error}`,
      });
    } finally {
      setFetchingPlayerData(false);
    }
    return playerData;
  };

  const fetchAllParticipantData = async () => {
    const participants = await fetchParticipants();
    const localParticipantData: {
      id: number;
      name: string;
      role: string;
      data: PlayerMaze;
    }[] = await Promise.all(
      participants.map(async (participant) => {
        const data = await fetchPlayerData(`${participant.id}`);
        return { data, ...participant };
      })
    );
    setParticipantMazeData([...localParticipantData]);
  };

  const toggleLockMaze = async (locked: boolean) => {
    try {
      setLockingMaze(true);
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
          description: `${selectedMaze} is already ${locked ? "locked" : "unlocked"
            }`,
        });
      }
    } finally {
      setLockingMaze(false);
    }
  };

  return {
    actionData,
    loading,
    fetchActionData,
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
    toggleLockMaze,
  };
};

export default useAPI;
