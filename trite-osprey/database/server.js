const express = require('Express')
const app = express();
const pgp = require('pg-promise')()
const bodyParser = require('body-parser')
const{Beermo} = require('../backend/db.js')
const cors = require('cors')
// Parses the text as JSON and exposes the resulting object on
app.use(bodyParser.json())
//this turns of the encoding of the response body
app.use(bodyParser.urlencoded({extended:false}))
//the glue between express and react server
app.use(cors())



app.get('/beers', function(req,res) {
  Beermo.getAll()
  .then((results) =>
    res.json({results})
  )
})

app.get('/:id', function(req,res) {
  const id = req.params.id
  Beermo.getOne(id)
  .then((results) =>
    res.json({results})
  )
})

app.delete('/:id', function(req,res) {
  const id = req.params.id
  Beermo.deleteOne(id)
  .then(() =>
    res.json({1:'success'})
  )
})

app.post('/', function(req,res) {
  const {beer} = req.body
  Beermo.createOne(beer)
  .then(() =>
    res.json({1:'beer added'})
  )
})

app.delete('/:id', function(req,res) {
  const id = req.params.id
  Beermo.deleteOne(id)
  .then(() =>
    res.json({1:'success'})
  )
})

app.put('/:id', function(req,res) {
  const id = req.params.id
  const {beer} = req.body
  Beermo.updateOne(id,beername,price,category,description,brewery)
  .then(() =>
    res.json({1:'beer updated!'})
  )
})

app.listen(5000, function(){
  console.log('Database for Beermo is listening on port 5000!')
})
