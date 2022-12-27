const emisionService = require("../services/emisionService");

const getAllEmisiones = (req, res) => {
  const { mode, name } = req.query;
  try {
    const AllEmisiones = emisionService.getAllEmisiones({ mode, name });
    res.send(AllEmisiones);
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

module.exports = {
  getAllEmisiones,
};
