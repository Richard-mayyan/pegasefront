// Test simple pour vérifier que NodeCoachingsRepo fonctionne
import { NodeCoachingsRepo } from './src/logic/infra/repos/nodeapi/NodeCoachingsRepo.js';

const repo = new NodeCoachingsRepo();

// Test de récupération des coachings
async function testFindAllCoachings() {
  try {
    console.log('Test: Récupération de tous les coachings...');
    const coachings = await repo.findAllCoachings();
    console.log('✅ Coachings récupérés:', coachings.length);
    console.log('Premier coaching:', coachings[0]);
  } catch (error) {
    console.error('❌ Erreur lors de la récupération des coachings:', error);
  }
}

// Test de création d'un coaching
async function testCreateCoaching() {
  try {
    console.log('Test: Création d\'un coaching...');
    const newCoaching = await repo.createCoaching({
      name: 'Test Coaching',
      description: 'Description de test',
      link: 'https://example.com',
      price: 1500, // 15€
      startAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // +1 jour
      endAt: new Date(Date.now() + 25 * 60 * 60 * 1000).toISOString(), // +1 jour + 1 heure
    });
    console.log('✅ Coaching créé:', newCoaching);
    return newCoaching;
  } catch (error) {
    console.error('❌ Erreur lors de la création du coaching:', error);
    return null;
  }
}

// Test de mise à jour d'un coaching
async function testUpdateCoaching(coachingId) {
  if (!coachingId) return;
  
  try {
    console.log('Test: Mise à jour du coaching...');
    const updatedCoaching = await repo.updateCoaching(coachingId, {
      name: 'Test Coaching Modifié',
      description: 'Description modifiée',
    });
    console.log('✅ Coaching mis à jour:', updatedCoaching);
  } catch (error) {
    console.error('❌ Erreur lors de la mise à jour du coaching:', error);
  }
}

// Test de suppression d'un coaching
async function testDeleteCoaching(coachingId) {
  if (!coachingId) return;
  
  try {
    console.log('Test: Suppression du coaching...');
    await repo.deleteCoaching(coachingId);
    console.log('✅ Coaching supprimé');
  } catch (error) {
    console.error('❌ Erreur lors de la suppression du coaching:', error);
  }
}

// Exécuter tous les tests
async function runAllTests() {
  console.log('🚀 Démarrage des tests NodeCoachingsRepo...\n');
  
  await testFindAllCoachings();
  console.log('');
  
  const newCoaching = await testCreateCoaching();
  console.log('');
  
  if (newCoaching) {
    await testUpdateCoaching(newCoaching.id);
    console.log('');
    
    await testDeleteCoaching(newCoaching.id);
    console.log('');
  }
  
  console.log('🏁 Tests terminés !');
}

// Exécuter les tests si le fichier est appelé directement
if (import.meta.url === `file://${process.argv[1]}`) {
  runAllTests();
}

export { runAllTests };
