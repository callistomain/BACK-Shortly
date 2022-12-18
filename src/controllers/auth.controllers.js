import { connection } from "../database/database.js";

export async function signup (req, res) {
  const { name, email, password } = res.locals.data;

  try {
    const userFound = await connection.query(`SELECT * FROM users WHERE email=$1`, [email]);
    if (userFound.rowCount > 0) return res.sendStatus(409);

    await connection.query(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3)`, [name, email, password]);
    return res.sendStatus(201);
    
  } catch (err) {
    console.log(err.message);
    res.sendStatus(500);
  }
};
