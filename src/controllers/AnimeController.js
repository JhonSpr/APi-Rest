const animeService = require('../services/AnimeService')
const AnimeDB = require('../database/db.json')

const getAllAnimes = async (req, res) => {
  const { name, estado, info } = req.query
  try {
    const limit = parseInt(req.query.limit) || 24
    const page = parseInt(req.query.page) || 1
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const años = req.query.años
    const episodes = req.query.episodes
    const genero = req.query.genero
    const type = req.query.type
    const rating = req.query.rating
    const sortBy = req.query.sortBy ?? 'todos'
    const letra = req.query.letra
    const studio = req.query.studio
    const visitas = req.query.visitas
    const tipo = req.params.tipo
    const episodesDate = req.query.episodesDate

    // Obtener los datos de animeService.getAllAnime()
    const animes = await animeService.getAllAnime({
      name,
      años,
      estado,
      episodes,
      genero,
      type,
      info,
      rating,
      sortBy,
      letra,
      studio,
      visitas,
      tipo,
      episodesDate,
    })

    res.send({
      datos: animes.slice(startIndex, endIndex),
      item: animes.length,
      currentPage: page,
      sort: sortBy,
    })
  } catch (error) {
    res.status(error?.status || 500).send({
      status: 'Algo salió mal',
      data: [],
    })
  }
}

const getAnimeRecommendations = async (req, res) => {
  try {
    const { animeName } = req.params

    const anime = AnimeDB.animes.find((anime) => anime.name === animeName)

    if (!anime) {
      return res
        .status(404)
        .json({ success: false, message: 'Anime no encontrado' })
    }

    const generos = [
      anime.genero1,
      anime.genero2,
      anime.genero3,
      anime.genero4,
      anime.genero5,
      anime.genero6,
      anime.genero7,
    ].filter(Boolean)

    let recommendations = AnimeDB.animes.filter(
      (otherAnime) =>
        otherAnime.name !== animeName &&
        otherAnime.generos.some((g) => generos.includes(g.genero))
    )

    recommendations = shuffleArray(recommendations)

    res.json({ success: true, datos: recommendations.splice(0, 18) })
  } catch (error) {
    // Manejar errores
    console.error(error)
    res
      .status(500)
      .json({ success: false, message: 'Error interno del servidor' })
  }
}

// Función para desordenar aleatoriamente un array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

module.exports = {
  getAllAnimes,
  getAnimeRecommendations,
}
