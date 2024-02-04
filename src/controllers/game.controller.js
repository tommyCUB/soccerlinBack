import exQuery from "../config/db.js";

const getGamesByTeam = async (req, res) => {
  const { id } = req.query;
  const { page } = req.query;
  const { limit } = req.query;
  const offset = (page - 1) * limit;
  const query = `SELECT * FROM game WHERE executed=1 and (idTeam1 = '${id}' OR idTeam2 = '${id}') order by utcExecuted LIMIT ${limit} OFFSET ${offset}`;
  const data = await exQuery(query);
  res.status(200).json(data);
};

const getTotalGamesByTeam = async (req, res) => {
  const { id } = req.query;
  const query = `SELECT count(*) as total FROM game WHERE executed=1 and (idTeam1 = '${id}' OR idTeam2 = '${id}')`;
  const data = await exQuery(query);
  res.status(200).json(data[0]);
};

export default { getGamesByTeam, getTotalGamesByTeam };
