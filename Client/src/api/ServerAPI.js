import axios from "axios";

export const analyzeResume = async (prompt, role) => {
  try {
    const response = await API.post("https://resmeanalyzer.onrender.com/analyze", { prompt, role });
    return response.data;
  } catch (error) {
    console.error("Error fetching response from server:", error);
    throw error;
  }
};
