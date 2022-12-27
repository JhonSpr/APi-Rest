const finalizadoService = require("../services/finalizadoService");

const getAllFinalizados = (req, res) => {
  const { mode, name } = req.query;
  try {
    const AllFinalizados = finalizadoService.getAllFinalizados({
      mode,
      name,
    });
    res.send(AllFinalizados);
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

module.exports = {
  getAllFinalizados,
};
