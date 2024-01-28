import { v4 as uuidv4 } from "uuid";
import exQuery from "../config/db.js";
import { schemasEmail } from "../config/schemas.js";
import { getSystemConfig } from "../models/systemconfig.model.js";
import { newTeam } from "./team.controller.js";

export const newGente = async (email) => {
  const { error } = schemasEmail.email.validate(email);

  if (error) {
    throw error;
  }
  const systemConfig = await getSystemConfig();
  const { defaultCoin, gamePrice } = systemConfig[0];
  const idGente = uuidv4();

  const query = `INSERT INTO gente (idGente, email, coin) VALUES ('${idGente}','${email}','${
    parseInt(defaultCoin) + parseInt(gamePrice)
  }')`;

  try {
    await newTeam(idGente, email);
  } catch (error) {
    throw error;
  }

  const datos = await exQuery(query);
  return datos;
};

export const getGente = async (req, res) => {
  const email = req.query.email;

  const { error } = schemasEmail.email.validate(email);

  if (error) {
    throw error;
  }
  const query = `SELECT * FROM gente WHERE email = '${email}'`;
  const datos = await exQuery(query);
  res.json(datos[0]);
};

export default { newGente, getGente };
