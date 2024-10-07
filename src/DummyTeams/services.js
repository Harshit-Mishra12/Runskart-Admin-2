// services.js
import { useMutation, useQuery } from "@tanstack/react-query";
import API_URL from "../config";

async function getEventById(token, eventId) {
  console.log("getEventById", eventId);
  const output = await fetch(`${API_URL}/user/events/fetch/${eventId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!output.ok) {
    throw new Error("Something went wrong! Please try again later.");
  }
  const response = await output.json();
  if (response.status_code === 2) {
    throw new Error(response.message);
  }
  return response.data;
}

async function createTeam(token, data) {
  console.log("createTeam", data);
  const output = await fetch(
    `${API_URL}/admin/events/team/create/randomUsers`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  if (!output.ok) {
    throw new Error("Something went wrong! Please try again later.");
  }
  const response = await output.json();
  if (response.status_code === 2) {
    throw new Error(response.message);
  }
  return response.data;
}

async function getSquadsByEvent(token, eventId) {
  console.log("getSquadsByEvent", eventId);
  const output = await fetch(`${API_URL}/user/matchessquad/fetch/${eventId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!output.ok) {
    throw new Error("Something went wrong! Please try again later.");
  }
  const response = await output.json();
  if (response.status_code === 2) {
    return {
      batsman: [],
      bowler: [],
      allrounder: [],
      wicketkeeper: [],
      unknown: [],
    };
  }
  return response.data;
}

async function getDummyUsers(token, eventId) {
  console.log("getDummyUsers 1", token, eventId);
  const data = {
    event_id: eventId,
  };
  const output = await fetch(`${API_URL}/admin/events/user/data`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!output.ok) {
    throw new Error("Something went wrong! Please try again later.");
  }
  const response = await output.json();
  return response.users;
}

export const useGetEventById = (eventId, enabled = false) => {
  const token = JSON.parse(localStorage.getItem("token"));
  const { data, error, isPending, refetch, isSuccess } = useQuery({
    queryKey: ["event", eventId],
    queryFn: () => getEventById(token, eventId),
    enabled: enabled,
  });
  return { data, error, isPending, refetch, isSuccess };
};

export const useCreateTeam = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  const { isPending, error, mutate, reset, isError } = useMutation({
    mutationFn: ({ data }) => createTeam(token, data),
  });
  return { isPending, error, mutate, reset, isError };
};

export const useGetSquadsByEvent = (eventId, enabled = false) => {
  const token = JSON.parse(localStorage.getItem("token"));
  const { data, error, isPending, refetch, isSuccess } = useQuery({
    queryKey: ["squadsbyevent", eventId],
    queryFn: () => getSquadsByEvent(token, eventId),
    enabled: enabled,
  });
  return { data, error, isPending, refetch, isSuccess };
};

export const useGetDummyUsers = (eventId, enabled = false) => {
  const token = JSON.parse(localStorage.getItem("token"));
  const { data, error, isPending, refetch, isSuccess } = useQuery({
    queryKey: ["dummyusers", eventId],
    queryFn: () => getDummyUsers(token, eventId),
    enabled: enabled,
    select: (data) => {
      return data.filter((user) => user.remaining_teams > 0);
    },
  });
  return { data, error, isPending, refetch, isSuccess };
};
