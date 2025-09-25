// controllers/activityController.js
import { supabase } from '../config/supabase.js';

// ... vos fonctions getActivities et createActivity existantes ...

// --- NOUVEAU : Récupérer UN SEUL événement par son ID ---
export const getActivityById = async (req, res) => {
  const { id } = req.params; // Récupère l'ID depuis l'URL (ex: /api/activities/5)
  try {
    const { data, error } = await supabase
      .from('activities')
      .select('*')
      .eq('id', id)
      .single(); // .single() pour obtenir un objet unique

    if (error) throw error;
    if (!data) return res.status(404).json({ error: "Événement non trouvé." });

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// --- NOUVEAU : Mettre à jour (Modifier) un événement ---
export const updateActivity = async (req, res) => {
  const { id } = req.params;
  const updates = req.body; // Les nouvelles données viennent du formulaire

  try {
    const { data, error } = await supabase
      .from('activities')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// --- NOUVEAU : Supprimer un événement ---
export const deleteActivity = async (req, res) => {
  const { id } = req.params;

  try {
    const { error } = await supabase
      .from('activities')
      .delete()
      .eq('id', id);

    if (error) throw error;
    // 204 No Content est une réponse standard pour une suppression réussie
    res.status(204).send(); 
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};