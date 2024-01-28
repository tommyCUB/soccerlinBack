import { v4 as uuidv4 } from "uuid";
import exQuery from "../config/db.js";

export const newTeam = async (idGente, email) => {
  const idTeam = uuidv4();
  const teamName = email.split("@")[0] + " FC";
  const query = `INSERT INTO team (idTeam, idGente, teamName) VALUES ('${idTeam}','${idGente}','${teamName}')`;
  const datos = await exQuery(query);
  return datos;
  // Pendiente ejecutar un partido amistoso inicial.
};
