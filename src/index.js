const express = require('express')
const cors = require('cors')
const v1animeRouter = require('./v1/routes/animeRoutes')
const db = require('./database/Recientes.json')
const DB = require('./database/db.json')
const app = express()
const PORT = process.env.PORT || 3001
const fs = require('fs')
const path = require('path')
app.disable('x-powered-by')
app.use(cors())
app.use(express.json())
app.use('/api/v1/animes/', v1animeRouter)
app.use('/api/v1/recien-agregados', (req, res) => {
  res.send({ recientes: db.recientes })
})

app.put('/api/v1/animes/:id/rating', (req, res) => {
  const animeId = req.params.id
  const rating = parseFloat(req.body.rating)

  // Verifica si el rating es un número válido
  if (!isNaN(rating)) {
    // Encuentra el anime por su ID en tu base de datos y actualiza el rating
    const anime = DB.animes.find((anime) => anime.id === animeId)

    if (anime) {
      anime.rating = rating
      res.send({ message: 'Rating actualizado correctamente.' })
    } else {
      res.status(404).send({ error: 'Anime no encontrado.' })
    }
  } else {
    res.status(400).send({ error: 'El rating no es un número válido.' })
  }
})

app.put('/api/v1/animes/:id/visita', (req, res) => {
  const animeId = req.params.id
  const visita = parseInt(req.body.visitas)

  // Verifica si la visita es un número válido
  if (!isNaN(visita)) {
    // Encuentra el anime por su ID en tu base de datos y actualiza las visitas
    const anime = DB.animes.find((anime) => anime.id === animeId)

    if (anime) {
      anime.visitas = visita

      // Ruta del archivo JSON de la base de datos
      const dbPath = './database/db.json' // Reemplaza con la ruta correcta de tu archivo JSON

      // Escribe los cambios en el archivo JSON
      fs.writeFile(dbPath, JSON.stringify(DB), (err) => {
        if (err) {
          res
            .status(500)
            .send({ error: 'Error al escribir en la base de datos.' })
          console.error(err) // Imprime el error en la consola para depuración
          return
        }
        res.send({ message: 'Visitas actualizadas correctamente.' })
      })
    } else {
      res.status(404).send({ error: 'Anime no encontrado.' })
    }
  } else {
    res.status(400).send({ error: 'La visita no es un número válido.' })
  }
})

app.post('/api/v1/animes-agregar', (req, res) => {
  try {
    const nuevoAnime = req.body

    DB.animes.unshift(nuevoAnime)

    // Guarda los cambios en el archivo db.json utilizando una ruta absoluta
    const dbFilePath = path.resolve(__dirname, 'database', 'db.json')
    fs.writeFileSync(dbFilePath, JSON.stringify(DB, null, 2))

    res
      .status(201)
      .send({ message: 'Anime agregado correctamente', anime: nuevoAnime })
  } catch (error) {
    console.error('Error al agregar el anime:', error)

    // Devuelve detalles del error en la respuesta
    res
      .status(500)
      .send({ error: 'Error interno del servidor', details: error.message })
  }
})

app.post('/api/v1/propiedad', (req, res) => {
  try {
    const nuevoAnime = req.body

    // Itera sobre todos los objetos en tu base de datos
    DB.animes.forEach((anime) => {
      // Verifica si el objeto ya tiene la propiedad "rating"
      if (!anime.hasOwnProperty('rating')) {
        // Si no tiene la propiedad "rating", agrégala con el valor que desees
        anime.rating = 5.2 // Aquí puedes establecer el valor que prefieras para "rating"
      }
      if (!anime.hasOwnProperty('visitas')) {
        // Si no tiene la propiedad "rating", agrégala con el valor que desees
        anime.visitas = 0 // Aquí puedes establecer el valor que prefieras para "rating"
      }
    })

    // Guarda los cambios en el archivo db.json utilizando una ruta absoluta
    const dbFilePath = path.resolve(__dirname, 'database', 'db.json')
    fs.writeFileSync(dbFilePath, JSON.stringify(DB, null, 2))

    res
      .status(201)
      .send({ message: 'Rating agregado correctamente a todos los animes' })
  } catch (error) {
    console.error('Error al agregar el rating a los animes:', error)

    // Devuelve detalles del error en la respuesta
    res
      .status(500)
      .send({ error: 'Error interno del servidor', details: error.message })
  }
})

app.use((req, res, next) => {
  res.header('Cache-Control', 'no-cache, no-store, must-revalidate')
  res.header('Pragma', 'no-cache')
  res.header('Expires', '0')
  next()
})

app.use('/api/v1/recien-agregados', (req, res) => {
  res.send({ recientes: db.recientes })
})
app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`)
  app, PORT
})
