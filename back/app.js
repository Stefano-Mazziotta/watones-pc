const express = require('express');

const cors = require('cors');
const app = express();

const mongoose = require('mongoose');
const bodyParser= require('body-parser');

const pibes = require('./models/cartas')

require('dotenv/config');

//MIDDLEWARE
// app.use(cors()); 
app.use(bodyParser.json(), cors());

//ROUTES
app.get('/', async (req, res) => {
    try{
        const pibardos = await pibes.find();
        res.json(pibardos);
    }catch (err) {
        res.json({message: err});
    }

})

app.post('/pibe', (req, res) => { 
 console.log(req.body);


 const Pibe = new pibes({
     name:  req.body.name1,
     stat1: req.body.stat1,
     porc1: req.body.porc1});

 Pibe.save()
     .then(() => {
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