import express from 'express';
import pg from 'pg';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const PORT = 4000;
const Query = `
    SELECT 
        G.game_id, 
        G.name AS game_name, 
        G.publisher, 
        G.genre, 
        G.image_url,
        L.condition, 
        L.price AS price, 
        CASE 
            WHEN L.is_rent = 'Y' THEN 'Available for Rent' 
            ELSE 'Not Available for Rent' 
        END AS availability
    FROM 
        Games G 
    JOIN 
        Listings L 
    ON 
        G.game_id = L.game_id 
    WHERE 
        L.is_rent = $1
`;
const userEmailQuery = `SELECT * FROM USERS WHERE email = $1 AND password = $2`;


app.use(cors());


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

const db = new pg.Client({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'GameStore',
    password: process.env.DB_PASSWORD || '@AGAsaki1',
    port: process.env.DB_PORT || 5432,
});



db.connect(err => {
    if (err)
        console.log('database connection error');
    else
        console.log('connected to database');

});


app.get('/home/buy', async (req, res) => {
    const buyStatus = 'N'; ///// when rent status is N then it is buy status
    try {
        const result = await db.query(Query, [buyStatus]); ///query for buy
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
    const rentStatus = 'Y';
    try {
        const result = await db.query(Query, [rentStatus]);  /////// query to check the rentable games
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


app.post('/home/sell', async (req, res) => {
    console.log(req.body);
    ////add to the databases
});

app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const cred = await db.query(userEmailQuery, [username, password]);
        console.log(cred.rowCount);
        if (cred.rowCount > 0) {
            res.json({ message: 'Login successful', userAllowed: true });
        } else {
            res.json({ userAllowed: false, message: "Invalid username or password" });
        }
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });

    }
});


app.listen(PORT, () => {
    console.log(`Listening on server ${PORT}`);
});
