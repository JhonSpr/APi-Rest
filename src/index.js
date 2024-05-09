const express = require('express')
const cors = require('cors')
const v1animeRouter = require('./v1/routes/animeRoutes')
const db = require('./database/Recientes.json')

const app = express()
const PORT = process.env.PORT || 3000

app.disable('x-powered-by')
app.use(cors())
app.use(express.json())

// Rutas específicas primero
app.use('/api/v1/animes', v1animeRouter)
app.get('/api/v1/recien-agregados', (req, res) => {
  res.send({ recientes: db.recientes })
})

// Luego la ruta genérica
app.get('/', (req, res) => res.send('Express on Vercel'))

// Manejo de caché
app.use((req, res, next) => {
  res.header('Cache-Control', 'no-cache, no-store, must-revalidate')
  res.header('Pragma', 'no-cache')
  res.header('Expires', '0')
  next()
})

app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`)
})

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
