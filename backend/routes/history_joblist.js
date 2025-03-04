const express = require("express");
const router = express.Router();
const sql = require("mssql");
const { getJobHistory, moveToHistory } = require("../models/history_joblist");

// GET all job history items
router.get("/", async (req, res) => {
  try {
    const result = await getJobHistory();
    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching job history:", error.message);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

// Move job to history
router.post("/move-to-history/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await moveToHistory(id);
    res.status(200).json(result);
  } catch (error) {
    if (error.message === "Job not found") {
      res.status(404).json({ error: error.message });
    } else {
      console.error("Error moving job to history:", error.message);
      res.status(500).json({
        message: "Internal Server Error",
        error: error.message,
      });
    }
  }
});

module.exports = router;
