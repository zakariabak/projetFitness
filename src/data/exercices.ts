import { Exercice } from '../models/Exercice';

export async function seedExercices() {
  try {
    await Exercice.deleteMany({});

    await Exercice.insertMany([
      // Pectoraux
      { nom: 'Développé couché', groupeMusculaire: 'Pectoraux' },
      { nom: 'Pompes', groupeMusculaire: 'Pectoraux' },
      { nom: 'Développé incliné', groupeMusculaire: 'Pectoraux' },
      { nom: 'Développé décliné', groupeMusculaire: 'Pectoraux' },
      { nom: 'Écarté couché', groupeMusculaire: 'Pectoraux' },
      { nom: 'Écarté incliné', groupeMusculaire: 'Pectoraux' },
      { nom: 'Dips', groupeMusculaire: 'Pectoraux' },
      { nom: 'Pec deck', groupeMusculaire: 'Pectoraux' },
      { nom: 'Pompes surélevées', groupeMusculaire: 'Pectoraux' },

      // Jambes
      { nom: 'Squat', groupeMusculaire: 'Jambes' },
      { nom: 'Fentes', groupeMusculaire: 'Jambes' },
      { nom: 'Presse à jambes', groupeMusculaire: 'Jambes' },
      { nom: 'Soulevé de terre jambes tendues', groupeMusculaire: 'Jambes' },
      { nom: 'Mollets debout', groupeMusculaire: 'Jambes' },
      { nom: 'Mollets assis', groupeMusculaire: 'Jambes' },
      { nom: 'Leg curl allongé', groupeMusculaire: 'Jambes' },
      { nom: 'Leg extension', groupeMusculaire: 'Jambes' },
      { nom: 'Hack squat', groupeMusculaire: 'Jambes' },
      { nom: 'Hip thrust', groupeMusculaire: 'Jambes' },

      // Bras
      { nom: 'Curl biceps', groupeMusculaire: 'Bras' },
      { nom: 'Curl marteau', groupeMusculaire: 'Bras' },
      { nom: 'Curl concentré', groupeMusculaire: 'Bras' },
      { nom: 'Curl à la poulie', groupeMusculaire: 'Bras' },
      { nom: 'Curl inversé', groupeMusculaire: 'Bras' },
      { nom: 'Extension triceps', groupeMusculaire: 'Bras' },
      { nom: 'Barre au front', groupeMusculaire: 'Bras' },
      { nom: 'Dips sur banc', groupeMusculaire: 'Bras' },
      { nom: 'Kickback triceps', groupeMusculaire: 'Bras' },
      { nom: 'Poulie corde triceps', groupeMusculaire: 'Bras' },

      // Dos
      { nom: 'Soulevé de terre', groupeMusculaire: 'Dos' },
      { nom: 'Tirage horizontal', groupeMusculaire: 'Dos' },
      { nom: 'Tirage vertical', groupeMusculaire: 'Dos' },
      { nom: 'Tractions', groupeMusculaire: 'Dos' },
      { nom: 'Rowing barre', groupeMusculaire: 'Dos' },
      { nom: 'Rowing unilatéral haltère', groupeMusculaire: 'Dos' },
      { nom: 'Pull-over', groupeMusculaire: 'Dos' },
      { nom: 'Superman', groupeMusculaire: 'Dos' },
      { nom: 'Oiseau à la poulie', groupeMusculaire: 'Dos' },

      // Épaules
      { nom: 'Développé militaire', groupeMusculaire: 'Épaules' },
      { nom: 'Développé haltères assis', groupeMusculaire: 'Épaules' },
      { nom: 'Élévations latérales', groupeMusculaire: 'Épaules' },
      { nom: 'Élévations frontales', groupeMusculaire: 'Épaules' },
      { nom: 'Oiseau', groupeMusculaire: 'Épaules' },
      { nom: 'Face pull', groupeMusculaire: 'Épaules' },
      { nom: 'Développé Arnold', groupeMusculaire: 'Épaules' },
      { nom: 'Tirage menton', groupeMusculaire: 'Épaules' },

      // Abdos
      { nom: 'Crunch', groupeMusculaire: 'Abdos' },
      { nom: 'Crunch câble', groupeMusculaire: 'Abdos' },
      { nom: 'Relevé de jambes', groupeMusculaire: 'Abdos' },
      { nom: 'Planche', groupeMusculaire: 'Abdos' },
      { nom: 'Russian twist', groupeMusculaire: 'Abdos' },
      { nom: 'Mountain climbers', groupeMusculaire: 'Abdos' },
      { nom: 'Gainage latéral', groupeMusculaire: 'Abdos' },
      { nom: 'Ab wheel', groupeMusculaire: 'Abdos' }
    ]);

    console.log("Exercices ajoutés à la base");
  } catch (error) {
    console.error("❌ Erreur lors du seed des exercices:", error);
  }
}
