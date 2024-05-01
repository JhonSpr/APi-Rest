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
firebaseAnimesRef.on('value', (snapshot) => {
  // Obtén los datos de todos los animes en Firebase
  const firebaseAnimesData = snapshot.val()

  // Verifica si los datos obtenidos de Firebase son válidos
  if (firebaseAnimesData && typeof firebaseAnimesData === 'object') {
    // Convierte el objeto en un array de objetos
    const firebaseAnimesArray = Object.values(firebaseAnimesData)

    // Itera sobre los animes en la base de datos local
    Object.keys(db.animes).forEach((animeKey) => {
      const localAnime = db.animes[animeKey]

      // Verifica que el identificador del anime no sea undefined
      if (localAnime.id?.toLowerCase()) {
        // Busca el anime correspondiente en Firebase
        const firebaseAnime = firebaseAnimesArray.find(
          (anime) => anime.id?.toLowerCase() === localAnime.id?.toLowerCase()
        )

        // Si se encuentra el anime en Firebase y tiene la propiedad 'visitas'
        if (firebaseAnime && firebaseAnime.hasOwnProperty('visitas')) {
          // Actualiza la propiedad 'visitas' en la base de datos local
          localAnime.visitas = firebaseAnime.visitas
        } else {
          // Si el anime no existe en Firebase, créalo con las visitas de la base de datos local
          firebaseAnimesRef.child(localAnime.id).set({
            ...localAnime,
            visitas: 0, // Puedes establecer el valor inicial de visitas como desees
          })
        }

        // Actualiza el rating del anime
        if (firebaseAnime && firebaseAnime.hasOwnProperty('rating')) {
          localAnime.rating = firebaseAnime.rating
        } else {
          // Si el anime no tiene rating en Firebase, establece un valor inicial (opcional)
          localAnime.rating = 0
        }
      } else {
      }
    })
  } else {
    console.log('Los datos obtenidos de Firebase no son válidos.')
  }
})
module.exports = db
