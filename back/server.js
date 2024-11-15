import express from 'express';
import pg from 'pg';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 4000;


app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

const db = new pg.Client({
    user: process.env.DB_USER || "postgres",
    host: process.env.DB_HOST || "localhost",
    database: process.env.DB_NAME || "GameStore",
    password: process.env.DB_PASSWORD || "@AGAsaki1",
    port: process.env.DB_PORT || 5432,
});


db.connect(err => {
    if (err)
        console.log('database connection error');
    else
        console.log('connected to database');
});


app.get('/home/buy', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM "Games"'); ///query for buy
        console.log('Games fetched from database:', result.rows);
        res.status(200).json({
            success: true,
            data: result.rows,
        });
    } catch (error) {
        console.error('Error fetching games:', error.message);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch games',
        });
    }
});

app.get('/home/rent', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM "Games"');  /////// query to check the rentable games
        console.log('Games fetched from database:', result.rows);
        res.status(200).json({
            success: true,
            data: result.rows,
        });
    } catch (error) {
        console.error('Error fetching games:', error.message);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch games',
        });
    }
});


app.get('/home/sell', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM "Games"'); // query for games for sell
        console.log('Games fetched from database:', result.rows);
        res.status(200).json({
            success: true,
            data: result.rows,
        });
    } catch (error) {
        console.error('Error fetching games:', error.message);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch games',
        });
    }
});



app.listen(PORT, () => {
    console.log(`Listening on server ${PORT}`);
});
