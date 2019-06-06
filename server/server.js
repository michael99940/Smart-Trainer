const express = require('express');
const bodyParser = require('body-parser');
const db = require('../db/postgres.js');

const app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser());

//implement more robust login API & cookies

app.get('/metrics/ID=:ID&dateStart=:dateState&dateEnd=:dateEnd', (req, res) => {
    db.getMetrics(req.params.ID, req.params.dateStart, req.params.dateEnd).then(results => {
        res.json(results);
    })
    .catch(() => {
        res.status(500).end();
    })
})

app.get('/exercises/target=:target', (req, res) => {
    db.getExerciseByTarget(req.params.target).then(results => {
        res.json(results);
    })
    .catch(() => {
        res.status(500).end();
    })
})

app.get('/exercises/name=:name', (req, res) => {
    db.getExerciseByName(req.params.name).then(results => {
        res.json(results);
    })
    .catch(() => {
        res.status(500).end();
    })
})

app.get('/login/username=:username&pass=:pass', (req, res) => {
    db.userLogin(req.params.username, req.params.pass).then(results => {
        res.json(results);
    })
    .catch(() => {
        res.status(500).end();
    })
})
//to be refined

app.listen(3000, () => {
    console.log('Smart Trainer hosted on localhost:3000!');
})