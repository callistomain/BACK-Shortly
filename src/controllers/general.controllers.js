import { connection } from "../database/database.js";

export async function ranking (req, res) {
  try {
    const ranking = await connection.query(`
      SELECT us.id, us.name, COUNT(ur.id) AS "linksCount", COALESCE(SUM(ur."visitCount"), 0) AS "visitCount"
      FROM users AS us
      LEFT JOIN urls AS ur ON us.id = ur.user_id
      GROUP BY us.id
      ORDER BY "visitCount" DESC, "linksCount" DESC
      LIMIT 10
    `);
    res.send(ranking.rows);
  } catch (err) {
    console.log(err.message);
    res.sendStatus(500);
  }
};
