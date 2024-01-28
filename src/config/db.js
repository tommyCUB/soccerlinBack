import mysql from "promise-mysql";

const con = mysql.createConnection({
  user: "rooter",
  password: "rooter",
  host: "localhost",
  port: 3306,
  database: "futbolin",
});

export default async function exQuery(query) {
  const conn = await pool();
  const datos = conn.query(query);
  return datos;
}

export const pool = () => {
  return con;
};
