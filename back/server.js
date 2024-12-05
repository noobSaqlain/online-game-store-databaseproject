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
const userQuery =
    ` SELECT u.user_id, u.first_name, u.last_name, u.city, u.email, u.phone_number,
         g.name as game_name
    FROM Users u
    LEFT JOIN Listings l 
        ON l.user_id = u.user_id
    LEFT JOIN Games g
         ON g.game_id = l.game_id;`
const signupQuery = `
            INSERT INTO Users (user_id, first_name, last_name, email, address, city, phone_number, password)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        ;`;
const numberOfGamesQuery = `select count(*) from games`;
const numberofPurchases = `select count(*) from purchases`;
const numberOfRents = `select count(*) from rentals`;
const shipped = `select count(*) from delivery where delivery_status = 'Shipped'`;
const inTransit = `select count(*) from delivery where delivery_status = 'In Transit'`;
const delivered = `select count(*) from delivery where delivery_status = 'Delivered'`;

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

app.get('/admin', async (req, res) => {
    try {
        const result = await db.query(userQuery);
        const noOfgames = await db.query(numberOfGamesQuery);
        const noOfPurchases = await db.query(numberofPurchases);
        const noOfRents = await db.query(numberOfRents);
        const dShipped = await db.query(shipped);
        const dInTransit = await db.query(inTransit);
        const dDelivered = await db.query(delivered);
        res.status(200).json({
            success: true,
            games: noOfgames,
            purchases: noOfPurchases,
            rents: noOfRents,
            transit: dInTransit,
            delivered: dDelivered,
            shipped: dShipped,
            data: result.rows,
        });
    } catch (error) {
        console.error('Error executing query', error);
        res.status(500).json({
            success: false,
            gamesCount: 0,
            purchases: 0,
            rents: 0,
            transit: 0,
            delivered: 0,
            shipped: 0,
            message: 'Failed to fetch data',
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

app.delete('/admin/:user_id', async (req, res) => {
    const { user_id } = req.params;
    console.log('Delete clicked for user:', user_id);

    const deleteRentals = `DELETE FROM Rentals WHERE listing_id IN (SELECT listing_id FROM Listings WHERE user_id = $1)`;
    const deletePurchases = `DELETE FROM Purchases WHERE listing_id IN (SELECT listing_id FROM Listings WHERE user_id = $1)`;
    const deleteListings = `DELETE FROM Listings WHERE user_id = $1`;
    const deleteUser = `DELETE FROM Users WHERE user_id = $1`;

    try {
        await db.query('BEGIN');
        await db.query(deleteRentals, [user_id]);
        await db.query(deletePurchases, [user_id]);
        await db.query(deleteListings, [user_id]);
        const result = await db.query(deleteUser, [user_id]);

        if (result.rowCount === 0) {
            throw new Error('User not found');
        }

        await db.query('COMMIT');

        res.json({ success: true, message: 'User deleted successfully' });
    } catch (err) {
        console.error('Error deleting user:', err);
        // Rollback the transaction in case of an error
        await db.query('ROLLBACK');
        res.status(500).json({ success: false, message: 'Error deleting user' });
    }
});



app.post('/sign-up', async (req, res) => {
    const { firstName, lastName, email, address, city, phone, password } = req.body;
    console.log(req.body)

    try {
        const result = await db.query('SELECT user_id FROM users ORDER BY user_id DESC LIMIT 1');
        let lastUserId = result.rows[0]?.user_id || 'U000';


        const newUserId = `U${String(parseInt(lastUserId.substring(1)) + 1).padStart(3, '0')}`;

        const query = `
            INSERT INTO Users (user_id, first_name, last_name, email, address, city, phone_number, password)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        `;
        await db.query(query, [newUserId, firstName, lastName, email, address, city, phone, password]);

        res.status(201).json({ success: true, message: 'User signed up successfully', userId: newUserId });
    } catch (error) {
        console.error('Error signing up user:', error.message);
        res.status(500).json({ success: false, message: 'Failed to sign up user' });
    }
});


app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const cred = await db.query(userEmailQuery, [username, password]);
        console.log(typeof (cred.rows[0].user_id));
        if (cred.rowCount > 0) {
            res.json({ message: 'Login successful', userAllowed: true, user_id: cred.rows[0].user_id });
        } else {
            res.json({ userAllowed: false, message: "Invalid username or password", user_id: "000" });
        }
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });

    }
});

app.post('/home/sell', async (req, res) => {
    const { name, publisher, genre, condition, imageUrl, price, ratePerDay, isRent, user_id } = req.body;

    // Validate input
    if (!name || !publisher || !genre || !condition || !imageUrl || !price || !user_id) {
        return res.status(400).json({ message: "All fields are required!" });
    }

    try {
        await db.query('BEGIN');

        const insertGameText = `
            INSERT INTO games (name, publisher, genre, condition, image_url)
            VALUES ($1, $2, $3, $4, $5) RETURNING game_id;
        `;
        const gameResult = await db.query(insertGameText, [name, publisher, genre, condition, imageUrl]);
        console.log('Game Insert Result:', gameResult.rows);
        const insertListingText =
            ` INSERT INTO listings (game_id, user_id, condition, price, rate_per_day, is_rent)
                VALUES ($1, $2, $3, $4, $5, $6) RETURNING listing_id;	`;

        // console.log(typeof (user_id));
        // console.log(typeof (condition));
        // console.log(typeof (price));
        // console.log(typeof (ratePerDay));
        // console.log(typeof (isRent));
        const convertedPrice = parseFloat(price);
        const convertedRatePerDay = parseFloat(ratePerDay);
        const convertedIsRent = String(isRent).trim();
        await db.query(insertListingText, [gameResult.rows[0].game_id, user_id, condition, convertedPrice, convertedRatePerDay, convertedIsRent]);
        await db.query('COMMIT');
        res.status(201).json({
            message: 'Game listed successfully!',
        });

    } catch (error) {
        await db.query('ROLLBACK');
        // console.error('Error listing game:', error);
        res.status(500).json({
            message: 'An error occurred while submitting the game details. Please try again.',
            error: error.message
        });
    }
});



app.listen(PORT, () => {
    console.log(`Listening on server ${PORT}`);
});
