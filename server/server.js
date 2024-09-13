const express = require('express');
const App = express();
App.use(express.json());
require('dotenv').config();
const dbconfig = require('./config/dbConfig')
const port = process.env.PORT || 5000;
const cors = require('cors');


const usersRoute = require('./routes/usersRoute');
const productsRoute = require('./routes/productsRoute');
const bidsRoute = require('./routes/bidsRoute');
const notificationsRoute = require("./routes/notificationsRoute");

App.use(cors());
App.use('/api/users', usersRoute);
App.use('/api/products', productsRoute);
App.use('/api/bids', bidsRoute);
App.use('/api/notifications', notificationsRoute);


//deployment config
const path = require("path");
__dirname = path.resolve();
//render deployment
if(process.env.NODE_ENV === "production"){
    App.use(express.static(path.join(__dirname, "/client/build")));
    App.get("*", (req, res) =>{
        res.sendFile(path.join(__dirname, "client", "build", "index.html"));
    });
}

App.listen(port, () => console.log( `Node/Express server started on port ${port}`));
