import { connection } from "../database/database.js";

export async function userInfo (req, res) {
  const { token } = res.locals;

  try {
    const query = await connection.query(`
      SELECT us.id, us.name, SUM(ur."visitCount") AS "visitCount",
      JSON_AGG(JSON_BUILD_OBJECT('id', ur.id, 'shortUrl', ur."shortUrl", 'url', ur.url, 'visitCount', ur."visitCount")) AS "shortenedUrls"
      FROM users AS us
      JOIN urls AS ur ON us.id = ur.user_id
      JOIN sessions AS s ON us.id = s.user_id
      WHERE s.token = $1
      GROUP BY us.id
    `, [token]); 
    
    if (query.rowCount === 0) res.sendStatus(404);
    res.send(query.rows[0]);
    
  } catch (err) {
    console.log(err.message);
    res.sendStatus(500);
  }
};
