// firebaseConfig.js

const admin = require('firebase-admin')
const db = require('./src/database/db.json') // Importa tu base de datos local

const serviceAccount = require('./serviceAccountKey.json')
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://animesz-f90c0-default-rtdb.firebaseio.com',
})
const firebaseDb = admin.database()

// Obtén una referencia a la ubicación de los animes en la base de datos de Firebase
const firebaseAnimesRef = firebaseDb.ref('animes')

// Escucha los cambios en la ubicación de los animes en Firebase
firebaseAnimesRef.on('child_changed', (snapshot) => {
  const firebaseAnime = snapshot.val()
  const animeId = snapshot.key

  // Verifica si el anime cambiado es válido
  if (firebaseAnime && typeof firebaseAnime === 'object') {
    // Actualiza el anime correspondiente en la base de datos local
    const localAnime = db.animes[animeId]

    if (localAnime) {
      localAnime.visitas = firebaseAnime.visitas || 0
      localAnime.rating = firebaseAnime.rating || 0
    }
  }
})

firebaseAnimesRef.on('child_added', (snapshot) => {
  const firebaseAnime = snapshot.val()
  const animeId = snapshot.key

  // Verifica si el anime añadido es válido
  if (firebaseAnime && typeof firebaseAnime === 'object') {
    // Verifica si el anime ya existe en la base de datos local
    if (!db.animes[animeId]) {
      // Crea el anime en la base de datos local con los datos de Firebase
      db.animes[animeId] = {
        ...firebaseAnime,
        visitas: firebaseAnime.visitas || 0,
        rating: firebaseAnime.rating || 0,
      }
    }
  }
})

module.exports = db
