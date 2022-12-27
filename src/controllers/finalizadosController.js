const finalizadoService = require("../services/finalizadoService");

const getAllFinalizados = (req, res) => {
  const { estado, mode } = req.query;
  try {
    const AllFinalizados = finalizadoService.getAllFinalizados({
      estado,
      mode,
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
