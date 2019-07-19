const router = require('express').Router();
const connection = require('../database');

const mysql = connection.con;

const { registerValidation } = require('../validation');


/* =========================================
==      CREAR NUEVO USUARIO
==========================================*/

router.post('/register', (req, res) => {

    const { error } = registerValidation(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    if(validateEmail(req.body.email)) return res.status(400).send('el email ingresado ya existe!!');

    mysql.query('INSERT INTO user SET ? ', [req.body], (err, rows, fields) => {

        if (err) throw err;

        return res.json({
            status: 200,
            error: null,
            response: rows
        });

    });
});

/* =========================================
==      VALIDAR SI EXISTE EMAIL
==========================================*/

const validateEmail = (email) => {

    mysql.query('SELECT * FROM user WHERE email = ? ', [email], (err, rows, fields) => {

        if (err) throw err;

        return true;

    });

}

module.exports = router;