import { connection } from "../database/database.js";
import { nanoid } from 'nanoid'

export async function shorten (req, res) {
  const { token, url } = res.locals.data;
  let shortUrl, shortFound;

  try {
    do {
      shortUrl = nanoid(8);
      shortFound = await connection.query(`SELECT * FROM urls WHERE "shortUrl"=$1`, [shortUrl]);
    } while (shortFound.rowCount > 0);

    const queryUser = await connection.query(`
      SELECT u.* FROM users AS u
      JOIN sessions AS s ON u.id = s.user_id
      WHERE s.token = $1
    `, [token]);
    const user = queryUser.rows[0];

    await connection.query(`INSERT INTO urls (url, "shortUrl", user_id) VALUES ($1, $2, $3)`, [url, shortUrl, user.id]);
    res.status(201).send({shortUrl});
  } catch (err) {
    console.log(err.message);
    res.sendStatus(500);
  }
};

export async function getUrlById (req, res) {
  const { id } = req.params;

  try {
    const urlFound = await connection.query(`SELECT id, "shortUrl", url FROM urls WHERE id=$1`, [id]);
    if (urlFound.rowCount === 0) return res.sendStatus(404);
    res.send(urlFound.rows[0]);
  } catch (err) {
    console.log(err.message);
    res.sendStatus(500);
  }
};

export async function openUrl (req, res) {
  const { shortUrl } = req.params;

  try {
    const urlFound = await connection.query(`SELECT * FROM urls WHERE "shortUrl"=$1`, [shortUrl]);
    if (urlFound.rowCount === 0) return res.sendStatus(404);

    const url = urlFound.rows[0];
    await connection.query(`UPDATE urls SET "visitCount"=$1 WHERE id=$2`, [url.visitCount+1, url.id])
    res.redirect(url.url);
  } catch (err) {
    console.log(err.message);
    res.sendStatus(500);
  }
};

export async function deleteUrlById (req, res) {
  const { id } = req.params;
  const { token } = res.locals;

  try {
    const urlFound = await connection.query(`SELECT * FROM urls WHERE id=$1`, [id]);
    if (urlFound.rowCount === 0) return res.sendStatus(404);
    const url = urlFound.rows[0];

    const queryUser = await connection.query(`
      SELECT u.* FROM users AS u
      JOIN sessions AS s ON u.id = s.user_id
      WHERE s.token = $1
    `, [token]);
    const user = queryUser.rows[0];

    if (url.user_id !== user.id) return res.sendStatus(401);

    await connection.query(`DELETE FROM urls WHERE id=$1`, [id])
    res.sendStatus(204);
  } catch (err) {
    console.log(err.message);
    res.sendStatus(500);
  }
};
