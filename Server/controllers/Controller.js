// analyzeRoute.js
const express = require("express");
const { analyzeResume } = require("../services/groqService");

const router = express.Router();

// POST /analyze
router.post("/", async (req, res) => {
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

module.exports = router;
