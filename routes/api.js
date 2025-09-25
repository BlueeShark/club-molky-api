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
router.post("/activities", async (req, res) => {
  try {
    const { title, description, date, location, max_people } = req.body;
    
    if (!title || !date || !location) {
      return res.status(400).json({ error: "Champs requis manquants." });
    }

    const { data, error } = await supabase
      .from("activities")
      .insert([{ title, description, date, location, max_people }])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json({ success: true, data: data });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

router.delete("/activities/:id", async (req, res) => {
  try {
    // On récupère l'ID depuis les paramètres de l'URL
    const { id } = req.params;

    // On exécute la suppression dans Supabase
    const { error } = await supabase
      .from("activities")
      .delete()
      .eq("id", id);

    // S'il y a une erreur, on la renvoie
    if (error) throw error;

    // Si la suppression réussit, on envoie une réponse "204 No Content"
    // C'est la réponse standard pour une suppression réussie.
    res.status(204).send();

  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
});

router.get("/activities/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from("activities")
      .select("*")
      .eq("id", id)
      .single();
    if (error) throw error;
    if (!data) return res.status(404).json({ success: false, error: "Événement non trouvé." });
    res.json({ success: true, data: data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.put("/activities/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const { data, error } = await supabase
      .from("activities")
      .update(updates)
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    res.json({ success: true, data: data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
