// controllers/activityController.js
import { supabase } from '../config/supabase.js';

export const createActivity = async (req, res) => {
  // On récupère les données envoyées par le frontend depuis le corps de la requête
  const { title, description, date, location, max_people } = req.body;

  // Validation simple (vous pouvez l'améliorer)
  if (!title || !date || !location) {
    return res.status(400).json({ error: 'Le titre, la date et le lieu sont obligatoires.' });
  }

  try {
    // On utilise le client Supabase pour insérer une nouvelle ligne dans la table 'activities'
    const { data, error } = await supabase
      .from('activities')
      .insert([
        { 
          title, 
          description, 
          date, 
          location, 
          // On s'assure que max_people est un nombre
          max_people: Number(max_people) 
        }
      ])
      .select(); // .select() permet de retourner la ligne qui vient d'être créée

    if (error) {
      // S'il y a une erreur de la part de Supabase
      console.error('Erreur Supabase:', error.message);
      return res.status(500).json({ error: error.message });
    }

    // Si tout s'est bien passé, on renvoie un statut 201 (Created) et les données créées
    res.status(201).json(data);

  } catch (err) {
    console.error('Erreur serveur:', err.message);
    res.status(500).json({ error: 'Une erreur est survenue sur le serveur.' });
  }
};