const { MongoClient } = require('mongodb');


const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

(async ()=>{
  try{
    await client.connect()
    console.log('Connected to MongoDB');
  }catch(error){
    console.log('Error connecting to MongoDB:', error);
  }
})

const db = client.db('eduwork-mongo')

module.exports = db

