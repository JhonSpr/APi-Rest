const animeService = require("../services/animeServices");

const getAllAnimes = (req, res) => {
  const { mode, name } = req.query;
  try {
    const AllANIMES = animeService.getAllAnimes({ mode, name });
    res.send(AllANIMES);
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};
module.exports = {
  getAllAnimes,
};
