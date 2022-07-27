require('dotenv').config()
const Sequelize = require('sequelize')

const {CONNECTION_STRING} = process.env

const sequelize = new Sequelize(process.env.CONNECTION_STRING, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
})

module.exports = {
    seed: (req, res) => {
        sequelize.query(`
            drop table if exists ratings;
            drop table if exists tattoos;

            CREATE TABLE tattoos (
                tattoo_id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                image_path VARCHAR(255) NOT NULL
            );

            CREATE TABLE ratings (
                rating_id SERIAL PRIMARY KEY,
                tattoo_id INTEGER REFERENCES tattoos(tattoo_id),
                rating INTEGER NOT NULL
            );
            
            INSERT INTO tattoos(name, image_path) 
            VALUES ('AquaCup', './images/tattoos/AquaCup.jpg'),
            ('Cubone', './images/tattoos/Cubone.jpeg'),
            ('Hermoine', './images/tattoos/Hermoine.jpg'),
            ('TacoDog', './images/tattoos/TacoDog.jpg'),
            ('KillerBee', './images/tattoos/KillerBee.jpeg'),
            ('Otter', './images/tattoos/Otter.jpeg'),
            ('Phoenix', './images/tattoos/Phoenix.jpeg'),
            ('PurpleFairy', './images/tattoos/PurpleFairy.jpg'),
            ('R2D2', './images/tattoos/R2D2.jpeg'),
            ('Squirtle', './images/tattoos/Squirtle.jpg');

            INSERT INTO ratings(tattoo_id, rating)
            VALUES (1, 5),
            (1, 5),
            (2, 5),
            (2, 4),
            (3, 5),
            (3, 3),
            (4, 5),
            (4, 4),
            (5, 4),
            (5, 4),
            (6, 5),
            (6, 4),
            (7, 5),
            (7, 4),
            (8, 5),
            (8, 4),
            (9, 5),
            (9, 5),
            (10, 4),
            (10, 3);
        `)
        .then(() => {
            console.log('DB seeded!')
            res.sendStatus(200)
        })
        .catch(err => console.log('error seeding DB', err))
    },
    getTattoos: (req, res) => {
        sequelize.query(`
            SELECT t.tattoo_id, name, image_path, r.tattoo_id, ROUND(AVG(rating), 1) AS avgRating, COUNT(rating) AS ratingTotal
            FROM tattoos AS t
            JOIN ratings AS r
            ON t.tattoo_id = r.tattoo_id
            GROUP BY r.tattoo_id, t.tattoo_id
            ORDER BY avgRating DESC;
        `)
        .then(dbRes => res.status(200).send(dbRes[0]))
        .catch(err => console.log(err))
    },   
    rateTattoo: (req, res) => {
        let {tattooId, rating} = req.body

        sequelize.query(`
            INSERT INTO ratings(tattoo_id, rating)
            VALUES (${tattooId}, ${rating});

            SELECT t.tattoo_id, name, image_path, r.tattoo_id, ROUND(AVG(rating), 1) AS avgRating, COUNT(rating) AS ratingTotal
            FROM tattoos AS t
            JOIN ratings AS r
            ON t.tattoo_id = r.tattoo_id
            GROUP BY r.tattoo_id, t.tattoo_id
            ORDER BY avgRating DESC;
        `)
        .then(dbRes => res.status(200).send(dbRes[0]))
        .catch(err => console.log(err))
    }    
}