import { schemasEmail } from "../config/schemas.js";
import exQuery from "../config/db.js";

export const getNews = async (req, res) => {
  const email = req.query.email;

  const { error } = schemasEmail.email.validate(email);

  if (error) {
    throw error;
  }
  const query = `SELECT idNews, message, utcCreated, seen, type FROM news as n  inner join gente as g  WHERE n.idGente=g.idGente and  g.email = '${email}' limit 25`;
  const datos = await exQuery(query);

  res.json(datos);
};

export const deleteNews = async (req, res) => {
  const id = req.params.id;

  const query = `DELETE FROM news WHERE idNews ='${id}'`;
  const datos = await exQuery(query);
  console.log(datos);
  res.json(datos);
};

export default { getNews, deleteNews };
