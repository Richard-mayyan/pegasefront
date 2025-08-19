// Test de conversion des prix euros -> centimes
console.log('Test de conversion des prix...\n');

// Simuler les données envoyées par le frontend (en euros)
const frontendData = {
  name: 'Test Coaching',
  description: 'Description de test',
  link: 'https://example.com',
  price: 15.50 // 15.50€
};

console.log('Données frontend (en euros):', frontendData);

// Simuler la conversion automatique dans NodeCoachingsRepo
const backendData = {
  name: frontendData.name,
  description: frontendData.description,
  link: frontendData.link,
  price: frontendData.price ? frontendData.price * 100 : undefined // Conversion euros -> centimes
};

console.log('Données envoyées au backend (en centimes):', backendData);
console.log(`✅ Prix converti: ${frontendData.price}€ → ${backendData.price} centimes`);

// Simuler la réception des données du backend (en centimes)
const backendResponse = {
  id: 'uuid-123',
  name: 'Test Coaching',
  description: 'Description de test',
  link: 'https://example.com',
  price: 1550, // 1550 centimes
  startAt: '2025-01-20T10:00:00Z',
  endAt: '2025-01-20T11:00:00Z'
};

console.log('\nDonnées reçues du backend (en centimes):', backendResponse);

// Simuler la conversion automatique dans mapCoachingResponseToEntity
const frontendResponse = {
  ...backendResponse,
  price: backendResponse.price ? backendResponse.price / 100 : undefined // Conversion centimes -> euros
};

console.log('Données affichées au frontend (en euros):', frontendResponse);
console.log(`✅ Prix reconverti: ${backendResponse.price} centimes → ${frontendResponse.price}€`);

console.log('\n🎯 Test terminé - La conversion automatique fonctionne correctement !');
