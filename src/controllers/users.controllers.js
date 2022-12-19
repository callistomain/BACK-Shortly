import { connection } from "../database/database.js";
/*
{
  "id": id do usuário,
	"name": nome do usuário,
	"visitCount": soma da quantidade de visitas de todos os links do usuário,
	"shortenedUrls": [
		{
			"id": 1,
			"shortUrl": "...",
			"url": "...",
			"visitCount": soma da quantidade de visitas do link
		},
		{
			"id": 2,
			"shortUrl": "...",
			"url": "...",
			"visitCount": soma da quantidade de visitas do link
		}
	]
}
*/

await connection.query(`

`);

export async function userInfo (req, res) {
  const { token } = res.locals;

  try {
    const query = await connection.query(`
    SELECT us.id, us.name, SUM(ur."visitCount")::INT AS "visitCount",
    ARRAY_TO_JSON(ARRAY_AGG(ROW_TO_JSON(au))) AS "shortenedUrls"
    FROM users AS us
    JOIN sessions AS s ON us.id = s.user_id
    JOIN urls AS ur ON us.id = ur.user_id
    JOIN 
      (SELECT id, "shortUrl", url, "visitCount" FROM urls ORDER BY "createAt")
      AS au ON ur.id = au.id
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
