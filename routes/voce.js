const express = require('express');
const Joi = require('joi');
const mysql = require('mysql');


const pool = mysql.createPool({
    connectionLimit: 100,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'skriptjezik-zamrznutovoce'
});

const route = express.Router();
route.use(express.json());

const schemaMalina = Joi.object().keys({
    idMalina: Joi.number().allow(),
    vrsta: Joi.string().max(100).required(),
    cenaPoKg: Joi.number().max(99999).required()

});

const schemaKupina = Joi.object().keys({
    idKupina: Joi.number().allow(),
    vrsta: Joi.string().max(100).required(),
    cenaPoKg: Joi.number().max(99999).required()
});




route.get('/malina', (req, res) => {
    // Saljemo upit bazi
    pool.query('select * from malina', (err, rows) => {
        if (err)
            res.status(500).send(err.sqlMessage);  // Greska servera
        else
            res.send(rows);
    });
});

route.post('/malina', (req, res) => {
    let { error } = schemaMalina.validate(req.body);
    if (error)
        res.status(400).send(error.details[0].message);  // Greska zahteva
    else {

        let query = "insert into malina (vrsta, cenaPoKg ) values (?, ?)";
        let formated = mysql.format(query, [req.body.vrsta, req.body.cenaPoKg]);

        pool.query(formated, (err, response) => {
            if (err)
                res.status(500).send(err.sqlMessage);
            else {
                query = 'select * from malina where idMalina=?';
                formated = mysql.format(query, [response.insertId]);

                pool.query(formated, (err, rows) => {
                    if (err)
                        res.status(500).send(err.sqlMessage);
                    else
                        res.send(rows[0]);
                });
            }
        });
    }
});
//
// route.get('/malina/:naziv', (req, res) => {
//     let query = 'select * from malina where vrsta=?';
//     let formated = mysql.format(query, [req.params.vrsta]);
//
//     pool.query(formated, (err, rows) => {
//         if (err)
//             res.status(500).send(err.sqlMessage);
//         else
//             res.send(rows);
//     });
// });

route.post('/malina/update', (req, res) => {
    let { error } = schemaMalina.validate(req.body);

    if (error)
        res.status(400).send(error.details[0].message);
    else {
        let query = "update malina set vrsta=?, cenaPoKG=? where idMalina=?";
        let formated = mysql.format(query, [req.body.vrsta, req.body.cenaPoKg, req.body.idMalina]);

        pool.query(formated, (err, response) => {
            if (err)
                res.status(500).send(err.sqlMessage);
            else {

                let query = 'select * from malina';

                pool.query(query, (err, rows) => {
                    if (err)
                        res.status(500).send(err.sqlMessage);
                    else
                        res.send(rows);
                });
            }
        });

        }
});

route.post('/malina/delete', (req, res) => {
    let query = 'delete from malina where idMalina=?';

    let formated = mysql.format(query, [req.body.id]);

    pool.query(formated, (err, rows) => {
        if (err)
            res.status(500).send(err.sqlMessage);
        else{

            let query = 'select * from malina';

            pool.query(query, (err, rows) => {
                if (err)
                    res.status(500).send(err.sqlMessage);
                else
                    res.send(rows);
            });
        }
    });
});


route.get('/kupina', (req, res) => {
    // Saljemo upit bazi
    pool.query('select * from kupina', (err, rows) => {
        if (err)
            res.status(500).send(err.sqlMessage);  // Greska na serveru
        else
            res.send(rows);
    });
});

route.post('/kupina', (req, res) => {
    let { error } = schemaKupina.validate(req.body);
    if (error)
        res.status(400).send(error.details[0].message);  // Greska zahteva
    else {

        let query = "insert into kupina (vrsta, cenaPoKg ) values (?, ?)";
        let formated = mysql.format(query, [req.body.vrsta, req.body.cenaPoKg]);

        pool.query(formated, (err, response) => {
            if (err)
                res.status(500).send(err.sqlMessage);
            else {
                query = 'select * from kupina where idKupina=?';
                formated = mysql.format(query, [response.insertId]);

                pool.query(formated, (err, rows) => {
                    if (err)
                        res.status(500).send(err.sqlMessage);
                    else
                        res.send(rows[0]);
                });
            }
        });
    }
});
//
// route.get('/kupina/:naziv', (req, res) => {
//     let query = 'select * from kupina where vrsta=?';
//     let formated = mysql.format(query, [req.params.vrsta]);
//
//     pool.query(formated, (err, rows) => {
//         if (err)
//             res.status(500).send(err.sqlMessage);
//         else
//             res.send(rows);
//     });
// });

route.post('/kupina/update', (req, res) => {
    let { error } = schemaKupina.validate(req.body);

    if (error)
        res.status(400).send(error.details[0].message);
    else {
        let query = "update kupina set vrsta=?, cenaPoKG=? where idKupina=?";
        let formated = mysql.format(query, [req.body.vrsta, req.body.cenaPoKg, req.body.idKupina]);

        pool.query(formated, (err, response) => {
            if (err)
                res.status(500).send(err.sqlMessage);
            else {

                let query = 'select * from kupina';

                pool.query(query, (err, rows) => {
                    if (err)
                        res.status(500).send(err.sqlMessage);
                    else
                        res.send(rows);
                });
            }
        });

    }
});

route.post('/kupina/delete', (req, res) => {
    let query = 'delete from kupina where idKupina=?';

    let formated = mysql.format(query, [req.body.id]);

    pool.query(formated, (err, rows) => {
        if (err)
            res.status(500).send(err.sqlMessage);
        else{

            let query = 'select * from kupina';

            pool.query(query, (err, rows) => {
                if (err)
                    res.status(500).send(err.sqlMessage);
                else
                    res.send(rows);
            });
        }
    });
});




module.exports = route;

