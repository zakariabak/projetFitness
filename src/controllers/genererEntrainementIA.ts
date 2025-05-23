import { Request, Response } from 'express';
import { Exercice } from '../data/exercices';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
import User from '../models/User';

dotenv.config();
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

interface GeminiResponse {
  candidates?: {
    content?: {
      parts?: { text?: string }[];
    };
  }[];
}

interface AuthRequest extends Request {
  user?: { id: string }; // user connecté
}

// nettoie la valeur répétitions pour toujours retourner un nombre
function nettoyerRepetitions(rep: any): number {
  if (typeof rep === 'number') return rep;
  if (typeof rep === 'string') {
    const texte = rep.toLowerCase();
    if (texte.includes('amrap') || texte.includes('maxrep')) return 10; // valeur par défaut max reps
    if (texte.includes('seconde')) return 10; // si durée, on met 10 reps

    const match = texte.match(/\d+/);
    if (match) return parseInt(match[0], 10);
  }
  return 10; // défaut si pas reconnu
}

export const genererEntrainementIA = async (req: AuthRequest, res: Response): Promise<void> => {
  if (!GEMINI_API_KEY) {
    // clé API manquante
    res.status(500).json({ error: "Clé API manquante" });
    return;
  }

  try {
    const utilisateur = await User.findById(req.user?.id);
    if (!utilisateur || !utilisateur.entrainement) {
      // user ou type d'entrainement absent
      res.status(400).json({ error: "Utilisateur ou type d'entraînement non défini" });
      return;
    }

    const type = utilisateur.entrainement.toLowerCase();
    const exosDispo = await Exercice.find({});
    const noms = exosDispo.map(e => e.nom);

    // prompt envoyé à l'IA, liste les exos dispo et demande un programme adapté
    const prompt = `
Tu es un coach sportif IA. Voici une liste d’exercices disponibles :
${noms.join(", ")}

Génère un programme ${type}.
Utilise uniquement ces exercices.

Si le programme est divisé en plusieurs jours (comme "push pull legs", "upper lower", etc.), renvoie un objet JSON avec chaque jour comme clé, et un tableau d'exercices en valeur. Exemple :

{
  "Push": [
    { "nom": "Développé couché", "series": 4, "repetitions": 10 }
  ],
  "Pull": [
    { "nom": "Tractions", "series": 3, "repetitions": "MaxRep" }
  ]
}

Sinon, renvoie un tableau d'exercices si c'est un entraînement unique (ex: full body).

Réponds uniquement avec du JSON, dans un bloc \`\`\`json.
`;

    console.log(" Prompt envoyé à Gemini :\n", prompt);

    const body = {
      contents: [{ parts: [{ text: prompt }] }]
    };

    // appel API Gemini pour générer contenu
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      }
    );

    const data = await response.json() as GeminiResponse;
    console.log(" Réponse brute de Gemini :", JSON.stringify(data, null, 2));

    const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    console.log(" Texte brut retourné :", rawText);

    if (!rawText) {
      res.status(400).json({ error: "Réponse IA vide ou mal formatée" });
      return;
    }

    let parsed;
    let jsonText: string | null = null;

    try {
      // extraction bloc JSON dans la réponse
      jsonText = rawText.match(/```json\s*([\s\S]*?)\s*```/)?.[1]?.trim() ?? null;
      if (!jsonText) throw new Error("Bloc JSON non trouvé");

      console.log(" JSON extrait :", jsonText);

      parsed = JSON.parse(jsonText);
      console.log(" Donnée parsée :", parsed);

    } catch (err) {
      console.error(" Erreur de parsing du JSON IA :", err);
      res.status(400).json({ error: "Impossible de parser le JSON IA" });
      return;
    }

    const isRoutineObj = typeof parsed === "object" && !Array.isArray(parsed);

    if (isRoutineObj) {
      // programme multi-jours
      const jours = Object.entries(parsed)
        .filter(([_, exercices]) => Array.isArray(exercices) && exercices.length > 0)
        .map(([jour, exercices]: [string, any[]], i) => ({
          nom: `Jour ${i + 1} ${type} IA`,
          exercices: exercices.map(ex => ({
            ...ex,
            repetitions: nettoyerRepetitions(ex.repetitions) // normalisation reps
          }))
        }));

      console.log(" Programme multi-jours structuré :", jours);
      res.status(200).json({ entrainements: jours });

    } else if (Array.isArray(parsed)) {
      // programme simple
      const entrainement = parsed.map(ex => ({
        ...ex,
        repetitions: nettoyerRepetitions(ex.repetitions)
      }));
      console.log(" Programme simple structuré :", entrainement);

      res.status(200).json({
        entrainements: [{ nom: `${type} IA`, exercices: entrainement }]
      });

    } else {
      res.status(400).json({ error: "Format de programme inattendu" });
    }

  } catch (err) {
    console.error(" Erreur IA :", err);
    res.status(500).json({ error: "Erreur serveur lors de la génération IA" });
  }
};
