require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// Configure CORS to allow requests only from specific origins
app.use(
  cors({
    origin: [
      "https://resume-analyzer123.netlify.app", // Frontend hosted on Netlify
      "http://localhost:3000",                 // Frontend for local development
    ],
  })
);

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// POST /analyze - directly handled within the route
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
