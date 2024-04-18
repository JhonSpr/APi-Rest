const animeService = require('../services/AnimeService')

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

module.exports = {
  getAllAnimes,
}
