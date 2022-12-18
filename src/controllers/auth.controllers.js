import bcrypt from 'bcrypt';
import { connection } from "../database/database.js";
import { v4 as uuid } from 'uuid';

export async function signup (req, res) {
  const { name, email, password } = res.locals.data;

  try {
    const userFound = await connection.query(`SELECT * FROM users WHERE email=$1`, [email]);
    if (userFound.rowCount > 0) return res.sendStatus(409);

    const hashPassword = bcrypt.hashSync(password, 10);
    await connection.query(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3)`, [name, email, hashPassword]);
    return res.sendStatus(201);
    
  } catch (err) {
    console.log(err.message);
    res.sendStatus(500);
  }
};

export async function signin (req, res) {
  const { email, password } = res.locals.data;
  const token = uuid();
  
  try {
    const userFound = await connection.query(`SELECT * FROM users WHERE email=$1`, [email]);
    if (userFound.rowCount === 0) return res.sendStatus(401);
    
    const user = userFound.rows[0];
    const passwordOk = bcrypt.compareSync(password, user.password);
    if (!passwordOk) return res.sendStatus(401);

    const sessionFound = await connection.query(`SELECT * FROM sessions WHERE user_id=$1`, [user.id]);
    if (sessionFound.rowCount > 0) await connection.query(`UPDATE sessions SET token=$1 WHERE user_id=$2`, [token, user.id]);
    else await connection.query(`INSERT INTO sessions (user_id, token) VALUES ($1, $2)`, [user.id, token]);
    
    res.send({token});
    
  } catch (err) {
    console.log(err.message);
    res.sendStatus(500);
  }
};
