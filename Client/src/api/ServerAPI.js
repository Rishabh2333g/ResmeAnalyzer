import axios from "axios";

const API = axios.create({
  baseURL: "https://resmeanalyzer.onrender.com", // Backend URL
});

export const analyzeResume = async (prompt, role) => {
  try {
    const response = await API.post("/analyze", { prompt, role });
    return response.data;
  } catch (error) {
    console.error("Error fetching response from server:", error);
    throw error;
  }
};
