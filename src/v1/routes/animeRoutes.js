const express = require('express')
const animeController = require('../../controllers/AnimeController')
const router = express.Router()
const db = require('../../database/Recientes.json')
const calendarioDb = require('../../database/Calendario.json')
const DB = require('../../database/db.json')
const fs = require('fs')
const path = require('path')
const moment = require('moment-timezone')
router.get('/', animeController.getAllAnimes)
router.get('/:genero/:animeName', animeController.getAnimeRecommendations)
router.get('/:tipo', animeController.getAllAnimes)

router.put('/:id/services', (req, res) => {
  const animeId = req.params.id
  const capNumber = req.body.capNumber
  const capUrl = req.body.capUrl
  const name = req.body.name
  const imageEpisode = req.body.imageEpisode
  const animeIndex = DB.animes.findIndex((anime) => anime.id === animeId)

  if (animeIndex !== -1) {
    const anime = DB.animes[animeIndex]
    if (!anime.hasOwnProperty('services')) {
      anime.services = []
    }

    if (
      !anime.services.some(
        (service) => Object.keys(service)[0] === `cap${capNumber}`
      )
    ) {
      anime.services.push({
        [`cap${capNumber}`]: [{ url: capUrl, image: imageEpisode, name: name }],
      })
      anime.episodios = capNumber

      if (
        !anime.episodes__overlay.some(
          (episode) => episode.episode === capNumber
        )
      ) {
        anime.episodes__overlay.push({
          episode: capNumber,
          image: imageEpisode,
        })
      }

      // Agregar información al archivo recientes.json
      const recientesData = {
        nombre: anime.name,
        episode: `episodio ${capNumber}`,
        number: capNumber,
        image: imageEpisode,
        fechaAgregado: new Date().toISOString(),
      }

      const recientesFilePath = path.resolve(
        __dirname,
        '../../database',
        'recientes.json'
      )
      let recientes = []
      try {
        recientes = JSON.parse(fs.readFileSync(recientesFilePath, 'utf8'))
      } catch (error) {
        console.error('Error al leer recientes.json:', error)
      }

      // Agregar el nuevo episodio al inicio de la lista
      recientes.recientes.unshift(recientesData)

      // Definir el número máximo de elementos en recientes.json
      const MAX_RECENTS = 10
      // Eliminar el último elemento si ya hay el máximo definido
      if (recientes.length > MAX_RECENTS) {
        recientes.pop()
      }

      fs.writeFileSync(recientesFilePath, JSON.stringify(recientes, null, 2))

      // Guardar los cambios en el archivo db.json
      const dbFilePath = path.resolve(__dirname, '../../database', 'db.json')
      fs.writeFileSync(dbFilePath, JSON.stringify(DB, null, 2))

      res.send({ message: `Cap${capNumber} agregado correctamente.` })
    } else {
      res
        .status(400)
        .send({ error: `El capítulo ${capNumber} ya existe para este anime.` })
    }
  } else {
    res.status(404).send({ error: 'Anime no encontrado.' })
  }
})

router.get('/calendario/data', (req, res) => {
  try {
    const dbFilePath = path.resolve(
      __dirname,
      '../../database',
      'Calendario.json'
    )

    // Leer el archivo JSON de la base de datos
    const calendarioData = JSON.parse(fs.readFileSync(dbFilePath, 'utf-8'))

    // Enviar los datos recuperados como respuesta
    res.status(200).send(calendarioData)
  } catch (error) {
    console.error('Error al recuperar el calendario:', error)

    // Devolver detalles del error en la respuesta
    res
      .status(500)
      .send({ error: 'Error interno del servidor', details: error.message })
  }
})
router.get('/proximos-animes/data', (req, res) => {
  try {
    const dbFilePath = path.resolve(__dirname, '../../database', 'db.json')

    // Leer el archivo JSON de la base de datos
    const dbAnimes = JSON.parse(fs.readFileSync(dbFilePath, 'utf-8'))

    let proximos__Animes = dbAnimes.animes.filter(
      (e) => e.estado == 'proximamente'
    )

    res.status(200).send({ datos: proximos__Animes })
  } catch (error) {
    console.error('Error al recuperar el calendario:', error)

    // Devolver detalles del error en la respuesta
    res
      .status(500)
      .send({ error: 'Error interno del servidor', details: error.message })
  }
})

router.put('/:id/rating', (req, res) => {
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

router.put('/animes/:id/visitas', (req, res) => {
  const animeId = req.params.id
  const visitas = parseInt(req.body.visitas)

  // Verifica si la visita es un número válido
  if (!isNaN(visitas)) {
    // Encuentra el anime por su ID en tu base de datos y actualiza las visitas
    const anime = DB.animes.find((anime) => anime.id === animeId)

    if (anime) {
      anime.visitas = visitas
      res.send({ message: 'Visitas actualizadas correctamente.' })
    } else {
      res.status(404).send({ error: 'Anime no encontrado.' })
    }
  } else {
    res.status(400).send({ error: 'La visita no es un número válido.' })
  }
})

router.post('/agregar-anime', (req, res) => {
  try {
    const nuevoAnime = req.body
    nuevoAnime.fechaAgregado = moment().tz('America/Bogota').format()
    DB.animes.unshift(nuevoAnime)

    // Guarda los cambios en el archivo db.json utilizando una ruta absoluta
    const dbFilePath = path.resolve(__dirname, '../../database', 'db.json')
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

router.post('/agregar-ultimo-episodio', (req, res) => {
  try {
    const nuevoAnime = req.body
    nuevoAnime.fechaAgregado = moment().tz('America/Bogota').format()
    db.recientes.unshift(nuevoAnime)

    const dbFilePath = path.resolve(
      __dirname,
      '../../database',
      'Recientes.json'
    )
    fs.writeFileSync(dbFilePath, JSON.stringify(db, null, 2))

    res.status(201).send({
      message: 'Episodio agregado correctamente',
      recientes: nuevoAnime,
    })
  } catch (error) {
    console.error('Error al agregar el anime:', error)

    // Devuelve detalles del error en la respuesta
    res
      .status(500)
      .send({ error: 'Error interno del servidor', details: error.message })
  }
})
router.post('/calendario/agregar', (req, res) => {
  try {
    const nuevoAnime = req.body
    nuevoAnime.fechaAgregado = moment().tz('America/Bogota').format()
    calendarioDb.calendario.push(nuevoAnime)

    const dbFilePath = path.resolve(
      __dirname,
      '../../database',
      'Calendario.json'
    )
    fs.writeFileSync(dbFilePath, JSON.stringify(calendarioDb, null, 2))

    res.status(201).send({
      message: 'el calendario se actualizado correctamente correctamente',
      calendario: nuevoAnime,
    })
  } catch (error) {
    console.error('Error al agregar el anime:', error)

    // Devuelve detalles del error en la respuesta
    res
      .status(500)
      .send({ error: 'Error interno del servidor', details: error.message })
  }
})
router.post('/calendario/:fechaEstreno/actualizar', (req, res) => {
  try {
    const fechaEstreno = req.params.fechaEstreno
    const updateData = req.body

    const animeIndex = calendarioDb.calendario.findIndex(
      (anime) => anime.fechaEstreno === fechaEstreno
    )

    if (animeIndex !== -1) {
      const anime = calendarioDb.calendario[animeIndex]
      Object.keys(updateData).forEach((key) => {
        anime[key] = updateData[key]
      })

      const dbFilePath = path.resolve(
        __dirname,
        '../../database',
        'Calendario.json'
      )
      fs.writeFileSync(dbFilePath, JSON.stringify(calendarioDb, null, 2))

      res.status(200).send({
        message: `Fechas actualizadas`,
      })
    } else {
      res.status(404).send({ error: 'Anime no encontrado.' })
    }
  } catch (error) {
    console.error('Error al actualizar las propiedades del anime:', error)
    res
      .status(500)
      .send({ error: 'Error interno del servidor', details: error.message })
  }
})

router.post('/:id/update', (req, res) => {
  try {
    const animeId = req.params.id
    const updateData = req.body

    const animeIndex = DB.animes.findIndex((anime) => anime.id === animeId)

    if (animeIndex !== -1) {
      const anime = DB.animes[animeIndex]
      Object.keys(updateData).forEach((key) => {
        if (updateData[key] !== undefined) {
          anime[key] = updateData[key]
        } else {
          delete anime[key]
        }
      })

      // Guarda los cambios en el archivo db.json utilizando una ruta absoluta
      const dbFilePath = path.resolve(__dirname, '../../database', 'db.json')
      fs.writeFileSync(dbFilePath, JSON.stringify(DB, null, 2))

      res.status(200).send({
        message: `Propiedades actualizadas correctamente para el anime con ID: ${animeId}`,
      })
    } else {
      res.status(404).send({ error: 'Anime no encontrado.' })
    }
  } catch (error) {
    console.error('Error al actualizar las propiedades del anime:', error)
    res
      .status(500)
      .send({ error: 'Error interno del servidor', details: error.message })
  }
})
router.post('/agregar-propiedad', (req, res) => {
  try {
    const { propiedad, valor } = req.body

    DB.animes.forEach((anime) => {
      if (!anime.hasOwnProperty(propiedad)) {
        anime[propiedad] = valor
      }
    })

    const dbFilePath = path.resolve(__dirname, '../../database', 'db.json')
    fs.writeFileSync(dbFilePath, JSON.stringify(DB, null, 2))

    res.status(201).send({
      message: `Propiedad "${propiedad}" agregada correctamente a todos los animes`,
    })
  } catch (error) {
    console.error('Error al agregar la propiedad a los animes:', error)

    res
      .status(500)
      .send({ error: 'Error interno del servidor', details: error.message })
  }
})

router.post('/eliminar-propiedad', (req, res) => {
  try {
    const propiedadAEliminar = req.body.propiedad

    // Itera sobre todos los objetos en tu base de datos
    DB.animes.forEach((anime) => {
      // Verifica si el objeto tiene la propiedad que quieres eliminar
      if (anime.hasOwnProperty(propiedadAEliminar)) {
        // Elimina la propiedad del anime
        delete anime[propiedadAEliminar]
      }
    })

    // Guarda los cambios en el archivo db.json utilizando una ruta absoluta
    const dbFilePath = path.resolve(__dirname, '../../database', 'db.json')
    fs.writeFileSync(dbFilePath, JSON.stringify(DB, null, 2))

    res.status(200).send({
      message: `Propiedad ${propiedadAEliminar} eliminada correctamente de todos los animes`,
    })
  } catch (error) {
    console.error('Error al eliminar la propiedad de los animes:', error)

    // Devuelve detalles del error en la respuesta
    res
      .status(500)
      .send({ error: 'Error interno del servidor', details: error.message })
  }
})

module.exports = router
