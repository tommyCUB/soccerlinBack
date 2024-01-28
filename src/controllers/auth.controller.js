import exQuery from "../config/db.js";
import { app } from "../config/firebase.js";
import { newGente } from "../controllers/gente.controller.js";

async function registerUser(res, email) {
  const datos = await newGente(email);

  try {
    const testemail = datos[0].email;
    if (testemail === email) {
      res.status(200).message("New user created");
      return true;
    }
  } catch {
    return false;
  }

  return false;
}

const verificarTokenFirebase = async (req, res, next) => {
  const token = req.header("Authorization").split(" ")[1];

  if (!token) {
    return res.status(401).json({ mensaje: "Failed" });
  }

  try {
    await app.auth().verifyIdToken(token);
  } catch (error) {
    return res.status(401).json({ mensaje: "Failed" });
  }

  req.firebaseToken = token;
  next();
};

async function login(req, res) {
  const token = req.firebaseToken;

  const decodedToken = await app.auth().verifyIdToken(token);

  if (decodedToken && decodedToken.email_verified === true) {
    const email = decodedToken.email;
    const query2 = 'SELECT * FROM gente WHERE email = "' + email + '"';
    const datos2 = await exQuery(query2);

    if (datos2.length === 0) {
      const register = await registerUser(res, email);
      if (register) {
        const query =
          " UPDATE gente set utcLast = UTC_TIMESTAMP() where email = '" +
          email +
          "'";
        const datos = await exQuery(query);
        return true;
      }
    }
  }
  return false;
}

export default { login, verificarTokenFirebase };
