const mongoose = require('mongoose');

mongoose.connect(process.env.mongo_url);

const connection = mongoose.connection;

connection.on('connected', ()=>{
    console.log('mongodb connection successfull');
})

connection.on('error', ()=>{
    console.log('mongodb connection failed');
})

module.exports = connection;
