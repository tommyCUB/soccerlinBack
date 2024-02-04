import exQuery from "../config/db.js";

const getRankingTeam = async (idTeam, elo) => {
  const result = await exQuery(
    "select count(idTeam) as rank from teamstats where elo > " +
      elo +
      " and idTeam!='" +
      idTeam +
      "'"
  );
  return parseInt(result[0].rank) + 1;
};

const getRanking = async (req, res) => {
  const { page, limit, orderBy, orientation } = req.query;
  let result = await exQuery(
    "select * from team as t inner join teamstats as s where t.idTeam=s.idTeam order by " +
      orderBy +
      " " +
      orientation +
      " limit " +
      limit +
      " offset " +
      (page - 1) * limit
  );

  result = result.map(async (element, index) => {
    const rk = await getRankingTeam(element.idTeam, element.elo);
    element.ranking = rk;
    return element;
  });

  result = await Promise.all(result);

  res.json(result);
};

export default { getRankingTeam, getRanking };
