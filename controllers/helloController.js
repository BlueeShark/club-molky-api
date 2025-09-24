// controllers/helloController.js - NOUVELLE VERSION (ES Modules)

export const hello = (req, res) => { // <-- Ajoutez "export" ici
  res.send('Hello World!');
};

// Supprimez l'ancienne ligne module.exports