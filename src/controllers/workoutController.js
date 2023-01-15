const animeService = require("../services/workoutService");

const getAllWorkouts = (req, res) => {
  const {mode, name, year, estado, episodios, page} = req.query;
  try {
    const animes = animeService.getAllWorkouts({
      mode,
      name,
      year,
      estado,
      episodios,
      page,
    });
    res.send(animes);
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({status: "FAILED", data: {error: error?.message || error}});
  }
};

const getOneWorkout = (req, res) => {
  const {
    params: {workoutId},
  } = req;

  if (!workoutId) {
    res.status(400).send({
      status: "FAILED",
      data: {error: "Parameter ':workoutId' can not be empty"},
    });
    return;
  }

  try {
    const workout = animeervice.getOneWorkout(workoutId);
    res.send({workout});
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({status: "FAILED", data: {error: error?.message || error}});
  }
};

const createNewWorkout = (req, res) => {
  const {body} = req;

  if (
    !body.id ||
    !body.name ||
    !body.anime ||
    !body.mode ||
    !body.descripcion ||
    !body.image ||
    !body.estado ||
    !body.year ||
    !body.classEstado ||
    !body.episodios ||
    !body.sec1 ||
    !body.sec2 ||
    !body.sec3 ||
    !body.generos ||
    !body.genero1 ||
    !body.genero2 ||
    !body.genero3 ||
    !body.genero4 ||
    !body.genero5 ||
    !body.genero6 ||
    !body.genero7
  ) {
    res.status(400).send({
      status: "FAILED",
      data: {
        error: "No se Pudo Crear",
      },
    });
  }

  const newWorkout = {
    id: body.id,
    name: body.name,
    mode: body.mode,
    anime: body.anime,
    descripcion: body.descripcion,
    year: body.year,
    image: body.image,
    estado: body.estado,
    classEstado: body.classEstado,
    generos: body.generos,
    genero1: body.genero1,
    genero2: body.genero2,
    genero3: body.genero3,
    genero4: body.genero4,
    genero5: body.genero5,
    genero6: body.genero6,
    genero7: body.genero7,
  };

  try {
    const createdWorkout = animeService.createNewWorkout(newWorkout);
    res.status(201).send({status: "OK", data: createdWorkout});
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({status: "FAILDED", data: {error: error?.message || error}});
  }
};

const updateOneWorkout = (req, res) => {
  const {
    body,
    params: {workoutId},
  } = req;

  if (!workoutId) {
    res.status(400).send({
      status: "FAILED",
      data: {error: "Parameter ':workoutId' can not be empty"},
    });
  }

  try {
    const updatedWorkout = animeService.updateOneWorkout(workoutId, body);
    res.send({status: "OK", data: updatedWorkout});
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({status: "FAILED", data: {error: error?.message || error}});
  }
};

const deleteOneWorkout = (req, res) => {
  const {
    params: {workoutId},
  } = req;

  if (!workoutId) {
    res.status(400).send({
      status: "FAILED",
      data: {error: "Parameter ':workoutId' can not be empty"},
    });
  }

  try {
    animeService.deleteOneWorkout(workoutId);
    res.status(204).send({status: "OK"});
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({status: "FAILED", data: {error: error?.message || error}});
  }
};

module.exports = {
  getAllWorkouts,
  getOneWorkout,
  createNewWorkout,
  updateOneWorkout,
  deleteOneWorkout,
};
