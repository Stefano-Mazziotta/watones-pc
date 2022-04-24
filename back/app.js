const express = require('express');

const app = express();

const mongoose = require('mongoose');

const bodyParser= require('body-parser');

const pibe = require('./models/cartas')

require('dotenv/config');

//MIDDLEWARE
    app.use(bodyParser.json());

//ROUTES
app.get('/', (req, res) => {

    res.send('q onda gato')
})

app.post('/pibe', (req, res) => { 
 console.log(req.body);
 const Pibe = new pibe({
     name: req.body.name,
     stat1: req.body.stat1,
     porc1: req.body.porc1});

 Pibe.save()
     .then((data) => {
         res.json(data);
         console.log("creado papi");
     })
     
     .catch((err) => {
        res.json({ message : err});
     })

 })




//Connect to de DB
mongoose.connect(process.env.DB_CONNECTION, { },
    
    () => console.log('entramo pa')
    );
    



//
app.listen(3000);