import { v4 as uuidv4 } from "uuid";
import exQuery from "../config/db.js";
import rankingController from "./ranking.controller.js";
import multer from "multer";
import sharp from "sharp";

const newTeam = async (idGente, email) => {
  const idTeam = uuidv4();
  const teamName = email.split("@")[0] + " FC";
  const query = `INSERT INTO team (idTeam, idGente, teamName) VALUES ('${idTeam}','${idGente}','${teamName}')`;
  const datos = await exQuery(query);
  return datos;
  // Pendiente ejecutar un partido amistoso inicial.
};

const getTeam = async (req, res) => {
  const idTeam = req.query.id;
  const query = `SELECT * FROM team WHERE idTeam = '${idTeam}'`;
  const datos = await exQuery(query);
  res.json(datos[0]);
};

const getTeamByEmail = async (req, res) => {
  const email = req.query.email;
  const query = `SELECT * FROM team as t inner join gente as g WHERE t.idGente=g.idGente and g.email = '${email}' limit 1`;
  const datos = await exQuery(query);
  res.json(datos[0]);
};

const getTeamStats = async (req, res) => {
  const idTeam = req.query.id;
  const query = `SELECT * FROM teamstats WHERE idTeam = '${idTeam}'`;
  const datos = await exQuery(query);
  const nElo = datos[0].elo;
  const ranking = await rankingController.getRankingTeam(idTeam, nElo);
  datos[0].ranking = ranking;
  res.json(datos[0]);
};

const updateTeam = async (req, res) => {
  const { team } = req.body;
  const query = `UPDATE team SET teamName = '${team.teamName}', stamp='${team.stamp}' WHERE idTeam = '${team.idTeam}'`;
  const datos = await exQuery(query);
  res.json(datos);
};

const getTeamHistory = async (req, res) => {
  const idTeam = req.query.id;
  const query = `SELECT * FROM teamhistory WHERE idTeam = '${idTeam}'`;
  const datos = await exQuery(query);
  res.json(datos[0]);
};

const getTotalTeam = async (req, res) => {
  const query = `SELECT count(*) as total FROM team`;
  const datos = await exQuery(query);
  res.json(datos[0]);
};

const updateStamp = async (req, res) => {
  const { idTeam, file } = req.body;
  const upload = multer({
    limits: {
      fileSize: 100000,
    },
    fileFilter(req, file, cb) {
      if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
        return cb(new Error("Please upload an image"));
      }
      cb(undefined, true);
    },
  });

  const buffer = await sharp(file.buffer)
    .resize({ width: 150, height: 150 })
    .png()
    .toFile("/src/public/stamps/" + idTeam + ".png");

  const query = `UPDATE team SET stamp = '${idTeam}.png' WHERE idTeam = '${idTeam}'`;
  const datos = await exQuery(query);
  res.json(datos);
};

export default {
  newTeam,
  getTeam,
  getTeamByEmail,
  getTeamStats,
  updateTeam,
  getTeamHistory,
  updateStamp,
  getTotalTeam,
};
