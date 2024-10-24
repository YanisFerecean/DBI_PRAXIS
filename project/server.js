const express = require('express');
const oracledb = require('oracledb');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(cors());

const dbConfig = {
    user: '', //TODO: username of db-user
    password: '', //TODO: password of db-user
    connectString: 'localhost:15210/XEPDB1' //(should be the same)
};

app.get('/highscores', async (req, res) => {
    let connection;

    const topN = parseInt(req.query.topN) || 10;
    const page = parseInt(req.query.page) || 1;
    const offset = (page - 1) * 10;

    try {
        connection = await oracledb.getConnection(dbConfig);
        const result = await connection.execute(
            ``, //TODO: query for pagination
            {
                offset: offset,
                limit: topN
            }
        );

        const totalCountResult = await connection.execute(
            `SELECT COUNT(*) AS totalCount FROM Highscores`
        );

        const totalCount = totalCountResult.rows[0][0];
        const totalPages = Math.ceil(totalCount / 10);

        res.json({
            scores: result.rows.map(row => ({ user_name: row[0], score: row[1] })),
            totalPages: totalPages
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching highscores');
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error(err);
            }
        }
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
