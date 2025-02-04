import AsyncStorage from "@react-native-async-storage/async-storage";

const API_BASE_URL = "https://driver-api-production.up.railway.app/protected";

export const fetchVehicles = async () => {
  const userToken = await AsyncStorage.getItem("userToken");
  const response = await fetch(`${API_BASE_URL}/driver/plates`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userToken}`,
    },
  });
  return response.json();
};

export const fetchChecklists = async () => {
  const userToken = await AsyncStorage.getItem("userToken");
  const response = await fetch(`${API_BASE_URL}/checklist/all`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userToken}`,
    },
  });
  return response.json();
};

export const fetchCustomChecklistDetails = async (checklistId: string) => {
  const userToken = await AsyncStorage.getItem("userToken");
  const response = await fetch(
    `${API_BASE_URL}/checklist/custom_option/${checklistId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    }
  );
  return response.json();
};

export const submitAnswer = async (data: {
  question: string;
  answer: string;
  asset_id: string;
  driver_id: string;
  right_answer: string;
  answered_at: string;
  observation: string;
  checklist_config_id: string;
}) => {
  const userToken = await AsyncStorage.getItem("userToken");
  const response = await fetch(`${API_BASE_URL}/checklist/answer/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userToken}`,
    },
    body: JSON.stringify(data),
  });
  return response.json();
};