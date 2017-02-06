const fs = require('fs')

if(fs.existsSync('.env') ){
  require('dotenv').config()
}

const connectingString = process.env.DATABASE_URL

const pgp = require('pg-promise')()

const db = pgp(connectingString)

const GET_ALL = 'SELECT * FROM beermo ORDER BY category ASC'

const DELETE_ONE = 'DELETE FROM beermo WHERE id=$1'

const CREATE_ONE = 'INSERT INTO beermo VALUES($1,$2,$3,$4,$5)'

const UPDATE_ONE ='UPDATE beermo SET beername =$1, price =$2, category=$3 description =$4, brewery = $5 WHERE id=$1'

const GET_ONE = 'SELECT  * FROM beermo WHERE id=$1'

const Beermo = {
  getAll: () => {
    return db.any(GET_ALL,[])
  },

  deleteOne: (id) => {
    return db.none(DELET_ONE,[id])
  },

  createOne: (beername,price,category,description,brewery) => {
    return db.none(CREATE_ONE,[beername,price,category,description,brewery])
  },

  updateOne: (beername,price,category,description,brewery) => {
    return db.none(UPDATE_ONE,[id,beername,price,category,description,brewery])
  },

  getOne: (id) => {
    return db.one(GET_ONE,[id])
  }

}
module.exports = { Beermo }
