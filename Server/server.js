const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Configure CORS to allow requests from specific origins
app.use(
  cors({
    origin: [
      "https://resume-scanner1.netlify.app", // Allow your Netlify frontend
      "http://localhost:3000",              // Allow localhost for development
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allowed HTTP methods
    credentials: true, // Include credentials if necessary (e.g., cookies)
  })
);

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Your existing routes
const { analyzeResume } = require("./services/groqService");

app.post("/analyze", async (req, res) => {
  const { prompt, role } = req.body;

  if (!prompt || !role) {
    return res.status(400).json({ error: "Prompt and role are required." });
  }

  try {
    const response = await analyzeResume(prompt, role);
    res.json({ response });
  } catch (error) {
    console.error("Error analyzing resume:", error);
    res.status(500).json({ error: "An error occurred while processing the request." });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
