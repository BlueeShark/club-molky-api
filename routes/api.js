const express = require("express");
const { supabase } = require("../config/supabase");
const router = express.Router();

router.get("/hello", (req, res) => {
  res.json({
    message: "Hello from API!",
    data: {
      server: "Express.js",
      version: "1.0.0",
    },
  });
});

router.get("/activities", async (req, res) => {
  try {
    const { data, error } = await supabase.from("activities").select("*");

    if (error) throw error;

    res.json({
      success: true,
      count: data.length,
      data: data,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
});

module.exports = router;
