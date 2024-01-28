import exQuery from "../config/db.js";

export async function getSystemConfig() {
  const query = `SELECT * FROM systemconfig where idSystemConfig = 'master1' limit 1`;
  const datos = await exQuery(query);
  return datos;
}
