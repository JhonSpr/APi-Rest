const DB = require('./db.json')
const originalData = [...DB.animes]

const getAllAnime = (filterParams) => {
  try {
    const minRating = parseFloat(filterParams.rating)
    const maxRating = minRating + 0.9

    // Restaurar los datos originales cada vez que se llama a la función
    let animes = [...originalData]

    if (filterParams.letra) {
      return animes.filter(
        (anime) =>
          anime.name.charAt(0).toLowerCase() ===
          filterParams.letra.toLowerCase()
      )
    }
    if (filterParams.studio) {
      return animes.filter(
        (anime) =>
          anime?.studio?.toLowerCase() === filterParams?.studio?.toLowerCase()
      )
    }

    if (filterParams.info) {
      return animes.filter((anime) => anime.name == filterParams.info)
    }

    if (filterParams.name !== undefined && filterParams.name.trim() !== '') {
      animes = animes.filter((anime) =>
        anime.name.toLowerCase().includes(filterParams.name.toLowerCase())
      )
    }

    if (filterParams.años) {
      const años = Array.isArray(filterParams.años)
        ? filterParams.años
        : [filterParams.años]

      animes = animes.filter((animeItem) =>
        años.some((año) => animeItem.year == año)
      )
    }

    if (filterParams.estado) {
      const estado = Array.isArray(filterParams.estado)
        ? filterParams.estado
        : [filterParams.estado]
      animes = animes.filter((animeItem) =>
        estado.some((estado) => animeItem.estado == estado)
      )
    }

    if (filterParams.type) {
      const type = Array.isArray(filterParams.type)
        ? filterParams.type
        : [filterParams.type]

      animes = animes.filter((animeItem) =>
        type.some((type) => animeItem.tipo === type)
      )
    }

    if (filterParams.episodes) {
      animes = animes.filter(
        (anime) => anime.episodios === String(filterParams.episodes)
      )
    }

    if (filterParams.genero) {
      const generos = Array.isArray(filterParams.genero)
        ? filterParams.genero
        : [filterParams.genero]

      animes = animes.filter((anime) =>
        generos.some((genero) =>
          [
            anime.genero1,
            anime.genero2,
            anime.genero3,
            anime.genero4,
            anime.genero5,
            anime.genero6,
            anime.genero7,
          ].includes(genero.toLowerCase())
        )
      )
    }

    if (filterParams.sortBy === 'desc') {
      animes.sort((a, b) => b.name.localeCompare(a.name))
    } else if (filterParams.sortBy === 'asc') {
      animes.sort((a, b) => a.name.localeCompare(b.name))
    }
    if (filterParams.rating) {
      const ratingQueryParam = filterParams.rating.toLowerCase()

      if (ratingQueryParam === 'mayor') {
        animes = animes.filter(
          (animeItem) => animeItem.rating && animeItem.rating > 6
        )
      } else if (ratingQueryParam === 'menor') {
        animes = animes.filter(
          (animeItem) => animeItem.rating && animeItem.rating < 6
        )
      }
    }
    return animes
  } catch (error) {
    throw { status: 500, message: error }
  }
}

module.exports = {
  getAllAnime,
}
