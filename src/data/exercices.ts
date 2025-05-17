import { Exercice } from '../models/Exercice';

export async function seedExercices() {
  try {
    await Exercice.deleteMany({});

    await Exercice.insertMany([
      // Pectoraux
      // Pectoraux
{ nom: 'Développé couché à la barre', groupeMusculaire: 'Pectoraux' },
{ nom: 'Développé couché aux haltères', groupeMusculaire: 'Pectoraux' },
{ nom: 'Développé incliné à la barre', groupeMusculaire: 'Pectoraux' },
{ nom: 'Développé incliné aux haltères', groupeMusculaire: 'Pectoraux' },
{ nom: 'Développé décliné à la barre', groupeMusculaire: 'Pectoraux' },
{ nom: 'Développé décliné aux haltères', groupeMusculaire: 'Pectoraux' },
{ nom: 'Développé couché à la Smith machine', groupeMusculaire: 'Pectoraux' },
{ nom: 'Développé incliné à la Smith machine', groupeMusculaire: 'Pectoraux' },
{ nom: 'Développé assis à la machine convergente', groupeMusculaire: 'Pectoraux' },
{ nom: 'Chest press machine', groupeMusculaire: 'Pectoraux' },
{ nom: 'Pec deck', groupeMusculaire: 'Pectoraux' },
{ nom: 'Dips', groupeMusculaire: 'Pectoraux' },
{ nom: 'Écarté couché avec haltères', groupeMusculaire: 'Pectoraux' },
{ nom: 'Écarté incliné avec haltères', groupeMusculaire: 'Pectoraux' },
{ nom: 'Écarté décliné avec haltères', groupeMusculaire: 'Pectoraux' },
{ nom: 'Écarté à la poulie haute (crossover)', groupeMusculaire: 'Pectoraux' },
{ nom: 'Écarté à la poulie basse', groupeMusculaire: 'Pectoraux' },
{ nom: 'Écarté à la poulie vis-à-vis', groupeMusculaire: 'Pectoraux' },
{ nom: 'Développé debout à la poulie', groupeMusculaire: 'Pectoraux' },
{ nom: 'Pullover à la poulie', groupeMusculaire: 'Pectoraux' }
,

      // Jambes
{ nom: 'Squat à la barre libre', groupeMusculaire: 'Jambes' },
{ nom: 'Squat aux haltères', groupeMusculaire: 'Jambes' },
{ nom: 'Squat à la Smith machine', groupeMusculaire: 'Jambes' },
{ nom: 'Front squat (squat avant)', groupeMusculaire: 'Jambes' },
{ nom: 'Goblet squat', groupeMusculaire: 'Jambes' },
{ nom: 'Fentes avec haltères', groupeMusculaire: 'Jambes' },
{ nom: 'Fentes à la barre', groupeMusculaire: 'Jambes' },
{ nom: 'Fentes à la Smith machine', groupeMusculaire: 'Jambes' },
{ nom: 'Fentes marchées', groupeMusculaire: 'Jambes' },
{ nom: 'Fentes arrière', groupeMusculaire: 'Jambes' },
{ nom: 'Presse à jambes horizontale', groupeMusculaire: 'Jambes' },
{ nom: 'Presse à jambes inclinée', groupeMusculaire: 'Jambes' },
{ nom: 'Leg extension', groupeMusculaire: 'Jambes' },
{ nom: 'Leg curl allongé', groupeMusculaire: 'Jambes' },
{ nom: 'Leg curl assis', groupeMusculaire: 'Jambes' },
{ nom: 'Leg curl debout unilatéral', groupeMusculaire: 'Jambes' },
{ nom: 'Soulevé de terre à la barre', groupeMusculaire: 'Jambes' },
{ nom: 'Soulevé de terre jambes tendues avec haltères', groupeMusculaire: 'Jambes' },
{ nom: 'Soulevé de terre jambes tendues à la barre', groupeMusculaire: 'Jambes' },
{ nom: 'Soulevé de terre jambes tendues à la Smith machine', groupeMusculaire: 'Jambes' },
{ nom: 'Mollets debout à la machine', groupeMusculaire: 'Jambes' },
{ nom: 'Mollets assis à la machine', groupeMusculaire: 'Jambes' },
{ nom: 'Mollets debout à la Smith machine', groupeMusculaire: 'Jambes' },
{ nom: 'Mollets avec haltères', groupeMusculaire: 'Jambes' },
{ nom: 'Hack squat', groupeMusculaire: 'Jambes' },
{ nom: 'Hip thrust avec barre', groupeMusculaire: 'Jambes' },
{ nom: 'Hip thrust à la Smith machine', groupeMusculaire: 'Jambes' },
{ nom: 'Hip thrust à la machine', groupeMusculaire: 'Jambes' },
{ nom: 'Adducteurs à la machine', groupeMusculaire: 'Jambes' },
{ nom: 'Abducteurs à la machine', groupeMusculaire: 'Jambes' },
{ nom: 'Glute kickback à la poulie', groupeMusculaire: 'Jambes' }
,

     // Bras

// Biceps
{ nom: 'Curl biceps à la barre droite', groupeMusculaire: 'Bras' },
{ nom: 'Curl biceps à la barre EZ', groupeMusculaire: 'Bras' },
{ nom: 'Curl biceps aux haltères', groupeMusculaire: 'Bras' },
{ nom: 'Curl marteau', groupeMusculaire: 'Bras' },
{ nom: 'Curl concentré', groupeMusculaire: 'Bras' },
{ nom: 'Curl incliné aux haltères', groupeMusculaire: 'Bras' },
{ nom: 'Curl pupitre à la barre EZ', groupeMusculaire: 'Bras' },
{ nom: 'Curl pupitre aux haltères', groupeMusculaire: 'Bras' },
{ nom: 'Curl à la poulie basse', groupeMusculaire: 'Bras' },
{ nom: 'Curl à la poulie vis-à-vis', groupeMusculaire: 'Bras' },
{ nom: 'Curl inversé (prise pronation)', groupeMusculaire: 'Bras' },
{ nom: 'Curl biceps à la machine guidée', groupeMusculaire: 'Bras' },

// Triceps
{ nom: 'Extension triceps à la poulie haute (barre)', groupeMusculaire: 'Bras' },
{ nom: 'Extension triceps à la poulie haute (corde)', groupeMusculaire: 'Bras' },
{ nom: 'Extension triceps unilatérale à la poulie', groupeMusculaire: 'Bras' },
{ nom: 'Extension triceps couché avec haltères', groupeMusculaire: 'Bras' },
{ nom: 'Barre au front (skull crusher) à la barre EZ', groupeMusculaire: 'Bras' },
{ nom: 'Barre au front avec haltères', groupeMusculaire: 'Bras' },
{ nom: 'Kickback triceps', groupeMusculaire: 'Bras' },
{ nom: 'Dips sur banc', groupeMusculaire: 'Bras' },
{ nom: 'Dips entre deux barres (triceps)', groupeMusculaire: 'Bras' },
{ nom: 'Triceps à la machine guidée', groupeMusculaire: 'Bras' },
{ nom: 'Close grip bench press (développé serré)', groupeMusculaire: 'Bras' }
,

      // Dos
{ nom: 'Soulevé de terre classique', groupeMusculaire: 'Dos' },
{ nom: 'Soulevé de terre jambes tendues', groupeMusculaire: 'Dos' },
{ nom: 'Soulevé de terre sumo', groupeMusculaire: 'Dos' },
{ nom: 'Soulevé de terre à la Smith machine', groupeMusculaire: 'Dos' },
{ nom: 'Tirage vertical à la poulie (prise large)', groupeMusculaire: 'Dos' },
{ nom: 'Tirage vertical à la poulie (prise neutre)', groupeMusculaire: 'Dos' },
{ nom: 'Tirage vertical prise inversée', groupeMusculaire: 'Dos' },
{ nom: 'Tirage horizontal à la poulie basse', groupeMusculaire: 'Dos' },
{ nom: 'Tirage horizontal à la machine convergente', groupeMusculaire: 'Dos' },
{ nom: 'Rowing barre en pronation', groupeMusculaire: 'Dos' },
{ nom: 'Rowing barre en supination', groupeMusculaire: 'Dos' },
{ nom: 'Rowing haltère unilatéral', groupeMusculaire: 'Dos' },
{ nom: 'Rowing à la T-bar', groupeMusculaire: 'Dos' },
{ nom: 'Rowing à la poulie basse', groupeMusculaire: 'Dos' },
{ nom: 'Rowing à la machine', groupeMusculaire: 'Dos' },
{ nom: 'Rowing à la Smith machine', groupeMusculaire: 'Dos' },
{ nom: 'Tractions pronation', groupeMusculaire: 'Dos' },
{ nom: 'Tractions supination', groupeMusculaire: 'Dos' },
{ nom: 'Tractions assistées à la machine', groupeMusculaire: 'Dos' },
{ nom: 'Pull-over à la poulie haute', groupeMusculaire: 'Dos' },
{ nom: 'Pull-over aux haltères', groupeMusculaire: 'Dos' },
{ nom: 'Pulldown unilatéral à la poulie', groupeMusculaire: 'Dos' },
{ nom: 'Superman', groupeMusculaire: 'Dos' },
{ nom: 'Extensions lombaires au banc', groupeMusculaire: 'Dos' },
{ nom: 'Oiseau à la poulie', groupeMusculaire: 'Dos' },
{ nom: 'Reverse fly à la machine', groupeMusculaire: 'Dos' }
,

      // Épaules

// avant de l'épaule
{ nom: 'Développé militaire à la barre', groupeMusculaire: 'Épaules' },
{ nom: 'Développé militaire à la Smith machine', groupeMusculaire: 'Épaules' },
{ nom: 'Développé haltères assis', groupeMusculaire: 'Épaules' },
{ nom: 'Développé haltères debout', groupeMusculaire: 'Épaules' },
{ nom: 'Développé Arnold', groupeMusculaire: 'Épaules' },
{ nom: 'Développé à la machine guidée (épaules)', groupeMusculaire: 'Épaules' },
{ nom: 'Élévations frontales aux haltères', groupeMusculaire: 'Épaules' },
{ nom: 'Élévations frontales à la barre', groupeMusculaire: 'Épaules' },
{ nom: 'Élévations frontales à la poulie', groupeMusculaire: 'Épaules' },

//côté de l'épaule
{ nom: 'Élévations latérales aux haltères', groupeMusculaire: 'Épaules' },
{ nom: 'Élévations latérales à la poulie', groupeMusculaire: 'Épaules' },
{ nom: 'Élévations latérales à la machine', groupeMusculaire: 'Épaules' },
{ nom: 'Tirage menton à la barre', groupeMusculaire: 'Épaules' },
{ nom: 'Tirage menton à la poulie', groupeMusculaire: 'Épaules' },

// arrière de l'épaule
{ nom: 'Oiseau aux haltères', groupeMusculaire: 'Épaules' },
{ nom: 'Oiseau à la poulie', groupeMusculaire: 'Épaules' },
{ nom: 'Reverse fly à la machine', groupeMusculaire: 'Épaules' },
{ nom: 'Face pull à la poulie', groupeMusculaire: 'Épaules' }
,

      // Abdos

{ nom: 'Crunch au sol', groupeMusculaire: 'Abdos' },
{ nom: 'Crunch sur ballon suisse', groupeMusculaire: 'Abdos' },
{ nom: 'Crunch câble à genoux (rope crunch)', groupeMusculaire: 'Abdos' },
{ nom: 'Crunch machine', groupeMusculaire: 'Abdos' },
{ nom: 'Crunch sur banc incliné', groupeMusculaire: 'Abdos' },
{ nom: 'Relevé de jambes suspendu', groupeMusculaire: 'Abdos' },
{ nom: 'Relevé de jambes au sol', groupeMusculaire: 'Abdos' },
{ nom: 'Relevé de jambes à la chaise romaine', groupeMusculaire: 'Abdos' },
{ nom: 'Relevé de genoux à la poulie basse', groupeMusculaire: 'Abdos' },
{ nom: 'Ab wheel (roue abdominale)', groupeMusculaire: 'Abdos' },


{ nom: 'Russian twist au poids', groupeMusculaire: 'Abdos' },
{ nom: 'Russian twist à la poulie', groupeMusculaire: 'Abdos' },
{ nom: 'Flexions latérales avec haltère', groupeMusculaire: 'Abdos' },
{ nom: 'Gainage latéral', groupeMusculaire: 'Abdos' },
{ nom: 'Twist à la machine oblique', groupeMusculaire: 'Abdos' },

{ nom: 'Planche au sol', groupeMusculaire: 'Abdos' },
{ nom: 'Planche avec charge', groupeMusculaire: 'Abdos' },
{ nom: 'Planche sur ballon instable', groupeMusculaire: 'Abdos' },
{ nom: 'Mountain climbers', groupeMusculaire: 'Abdos' },
{ nom: 'Dead bug', groupeMusculaire: 'Abdos' },
{ nom: 'Hollow hold', groupeMusculaire: 'Abdos' }

    ]);

    console.log("Exercices ajoutés à la base");
  } catch (error) {
    console.error(" Erreur lors du seed des exercices:", error);
  }
}
export { Exercice };
