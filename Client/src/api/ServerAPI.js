import axios from "axios";

export const analyzeResume = async (prompt, role) => {
  try {
    const { data } = await axios.post("http://localhost:5000/analyze", { prompt, role });
    return data.response;
  } catch (error) {
    console.error("Error fetching response from server:", error);
    throw new Error("An error occurred while fetching the response.");
  }
};

