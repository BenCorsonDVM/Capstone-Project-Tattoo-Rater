require('dotenv').config()
const Sequelize = require('sequelize')

const {DATABASE_URL} = process.env

const sequelize = new Sequelize(DATABASE_URL, {
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
            VALUES (1, 3),
            (1, 3),
            (2, 3),
            (2, 3),
            (3, 3),
            (3, 3),
            (4, 3),
            (4, 3),
            (5, 3),
            (5, 3),
            (6, 3),
            (6, 3),
            (7, 3),
            (7, 3),
            (8, 3),
            (8, 3),
            (9, 3),
            (9, 3),
            (10, 3),
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
            SELECT t.tattoo_id, name, image_path, r.tattoo_id, ROUND(AVG(rating), 1) AS avgrating, COUNT(rating) AS ratingtotal
            FROM tattoos AS t
            JOIN ratings AS r
            ON t.tattoo_id = r.tattoo_id
            GROUP BY r.tattoo_id, t.tattoo_id
            ORDER BY avgrating DESC;
        `)
        .then(dbRes => res.status(200).send(dbRes[0]))
        .catch(err => console.log(err))
    },   
    rateTattoo: (req, res) => {
        let {tattooId, rating} = req.body

        sequelize.query(`
            INSERT INTO ratings(tattoo_id, rating)
            VALUES (${tattooId}, ${rating});

            SELECT t.tattoo_id, name, image_path, r.tattoo_id, ROUND(AVG(rating), 1) AS avgrating, COUNT(rating) AS ratingtotal
            FROM tattoos AS t
            JOIN ratings AS r
            ON t.tattoo_id = r.tattoo_id
            GROUP BY r.tattoo_id, t.tattoo_id
            ORDER BY avgrating DESC;
        `)
        .then(dbRes => res.status(200).send(dbRes[0]))
        .catch(err => console.log(err))
    },
    getOneTattoo: (req, res) => {
        let {id} = req.params 
        id = +id

        sequelize.query(`
            SELECT tattoo_id, name, image_path FROM tattoos
            WHERE ${id} = tattoo_id;   
        `)
        .then(dbRes => res.status(200).send(dbRes[0][0]))
        .catch(err => console.log(err))
    },
    
}