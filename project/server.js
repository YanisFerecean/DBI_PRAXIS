const express = require('express');
const oracledb = require('oracledb');
const app = express();
const port = 3000;

app.use(express.static('public')); // Serve static files from public directory

// Oracle DB connection configuration
const dbConfig = {
    user: 'your_username',
    password: 'your_password',
    connectString: 'your_connect_string' // e.g., 'localhost/XE'
};

// Function to fetch highscores
app.get('/highscores', async (req, res) => {
    let connection;

    const topN = parseInt(req.query.topN) || 10;
    const page = parseInt(req.query.page) || 1;
    const offset = (page - 1) * 10; // Calculate offset

    try {
        connection = await oracledb.getConnection(dbConfig);
        const result = await connection.execute(
            `SELECT user_name, score
             FROM Highscores
             ORDER BY score DESC
             OFFSET :offset ROWS FETCH NEXT :limit ROWS ONLY`,
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

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
