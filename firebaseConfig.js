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

firebaseAnimesRef.on('value', (snapshot) => {
  const firebaseAnimesData = snapshot.val()

  if (!firebaseAnimesData || typeof firebaseAnimesData !== 'object') {
    console.log('Los datos obtenidos de Firebase no son válidos.')
    return
  }

  Object.values(db.animes).forEach((localAnime) => {
    if (!localAnime.id) return

    const firebaseAnime = firebaseAnimesData[localAnime.id.toLowerCase()]

    if (!firebaseAnime) {
      const { rating, voto, visitas } = localAnime
      firebaseAnimesRef.child(localAnime.id.toLowerCase()).set({
        rating: rating || 0,
        voto: voto || 0,
        visitas: visitas || 0,
      })
    } else {
      if (firebaseAnime.hasOwnProperty('rating')) {
        localAnime.rating = firebaseAnime.rating
      }
      if (firebaseAnime.hasOwnProperty('voto')) {
        localAnime.voto = firebaseAnime.voto
      }
      if (firebaseAnime.hasOwnProperty('visitas')) {
        localAnime.visitas = firebaseAnime.visitas
      }
    }
  })
})

module.exports = db
