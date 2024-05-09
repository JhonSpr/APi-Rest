const admin = require('firebase-admin')
const db = require('./database/db.json') // Importa tu base de datos local

const serviceAccount = require('../serviceAccountKey.json')
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
      const { name } = localAnime
      firebaseAnimesRef.child(localAnime.id.toLowerCase()).set({
        nombre: name || 'Nombre predeterminado',
        visitas: 0,
        voto: 0,
        rating: 0,
      })
    } else {
      if (firebaseAnime.hasOwnProperty('nombre')) {
        localAnime.nombre = firebaseAnime.nombre
      }
      if (firebaseAnime.hasOwnProperty('visitas')) {
        localAnime.visitas = firebaseAnime.visitas
      }
      if (firebaseAnime.hasOwnProperty('voto')) {
        localAnime.voto = firebaseAnime.voto
      }
      if (firebaseAnime.hasOwnProperty('rating')) {
        localAnime.rating = firebaseAnime.rating
      }
    }
  })
})

module.exports = db
