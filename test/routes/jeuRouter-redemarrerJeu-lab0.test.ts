import supertest from 'supertest';
import 'jest-extended';
import app from '../../src/app';
import { JeuDeDes } from '../../src/core/jeuDeDes';

const request = supertest(app);
const controleurJeu = new JeuDeDes();

beforeAll(async () => {
  // Crée deux joueurs avant l'exécution des tests
  await request.post('/api/v1/jeu/demarrerJeu').send({ nom: 'Joueur1' });
  await request.post('/api/v1/jeu/demarrerJeu').send({ nom: 'Joueur2' });
});

describe('GET /api/v1/jeu/redemarrerJeu', () => {

  // Test de la réussite de l'opération (statut HTTP)
  it('devrait répondre avec succès (200) et un JSON', async () => {
    const response = await request.get('/api/v1/jeu/redemarrerJeu');
    expect(response.status).toBe(200);
    expect(response.type).toBe("application/json");
  });

  // Test de la postcondition du contrat d'opération
  it('devrait valider la postcondition : plus de joueurs dans le jeu', async () => {
    expect(controleurJeu.joueurs).toEqual('[]');
  });
});