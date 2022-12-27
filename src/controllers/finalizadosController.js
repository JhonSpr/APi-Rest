const finalizadoService = require("../services/emisionService");

const getAllEmisiones = (req, res) => {
  const { estado } = req.query;
  try {
    const AllEmisiones = emisionService.getAllEmisiones({ estado });
    res.send(AllEmisiones);
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

module.exports = {
  getAllFinalizados,
};
