const express = require('express');
const app = express();
const cors = require('cors');


// Middleware
app.use(express.urlencoded({ extended: false }));       // BodyParser
app.use(express.json());                                // BodyParser
app.use(cors());                                        // CORS


// Configuration
require('dotenv').config()                    // Setting up Environment Variables
require('./config/db');                       // Database (MongoDB Atlas)


// Constants
const PORT = process.env.PORT || 3333;


// Routes
app.get('/', (req, res) => {
    res.send(
        `Routes liSt Comes here`
    )
});



// Fireup Server
app.listen(PORT, () => console.log('Server running on port ' + PORT));