const express = require("express");
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

router.get("/hello/:name", (req, res) => {
  const { name } = req.params;
  res.json({
    message: `Hello ${name}!`,
    greeting: `Bienvenue ${name} sur notre API`,
  });
});

module.exports = router;
