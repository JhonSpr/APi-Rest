const express = require('express')
const cors = require('cors')
const v1animeRouter = require('./v1/routes/animeRoutes')
const db = require('./database/Recientes.json')
const firebaseSync = require('./firebaseConfig')
const app = express()
const PORT = process.env.PORT || 3000
setInterval(() => {
  firebaseSync()
}, 500)
app.disable('x-powered-by')
app.use(cors())
app.use(express.json())

// Rutas específicas primero
app.use('/api/v1/animes', v1animeRouter)
app.get('/api/v1/recien-agregados', (req, res) => {
  res.send({ recientes: db.recientes })
})

// Luego la ruta genérica
app.get('/', (req, res) => res.send(`<h1>OK</h1>`))

// Manejo de caché
app.use((req, res, next) => {
  res.header('Cache-Control', 'no-cache, no-store, must-revalidate')
  res.header('Pragma', 'no-cache')
  res.header('Expires', '0')
  next()
})

app.listen(PORT, () => {
  console.log(`🚀 Server listening on port http://localhost:${PORT}`)
})
