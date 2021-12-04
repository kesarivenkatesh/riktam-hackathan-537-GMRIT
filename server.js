const express = require('express');
const app = express();
const cors = require('cors');
const passport = require('passport');


// Middleware
app.use(express.urlencoded({ extended: false }));       // BodyParser
app.use(express.json());                                // BodyParser
app.use(cors());                                        // CORS
app.use(passport.initialize());                         // Passport


// Configuration
require('dotenv').config()                    // Setting up Environment Variables
require('./config/db');                       // Database (MongoDB Atlas)
require('./config/passport')(passport);       // Passport (JWT)


// Constants
const PORT = process.env.PORT || 3333;


// Routes
app.get('/', (req, res) => {
    res.send(
        `/api/signup    :: user Signup <br>
        /api/login     :: user Login <br>
        `
    )
});
app.use('/api', require('./routes/auth'));
app.use('/api/offer', require('./routes/offer'));
app.use('/api/request', require('./routes/request'));



// Fireup Server
app.listen(PORT, () => console.log('Server running on port ' + PORT));