const mongoose = require('mongoose');


// Load Keys
const MONGO_URI = process.env.MONGO_URI


const connection_params = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}

mongoose.connect(MONGO_URI, connection_params)
    .then(() => console.log(`MongoDB Connected`))
    .catch(err => console.error(`${err} :: Error Connecting Database`));
