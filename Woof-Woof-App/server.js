const express = require('express'); // Require Express library.
const app = express(); // Create application for Express(Init Express).
const cors = require('cors'); // Gain access to server from front end.
const mongoose = require('mongoose');// Require to connect to mongoDB database:
const morgan = require('morgan'); // HTTP request logger middleware.
const helmet = require('helmet');

// Gain access to env file that holds sensitive data:
require('dotenv').config();

// Middleware:
app.use(cors()); // Automatically add cors headers to use server.
app.use(morgan('dev')); // Visualise api requests.
app.use(express.json()); // Built in express JSON body parser middelware.
app.use(helmet()); // Help to secure Express app.

// database uri:
const uri = process.env.ATLAS_URI;
// Pass in uri where database is stored:
mongoose.connect(uri, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
})
// Once connected to database, log in console that connection is successfull: 
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection successfully established!");
})
    .catch(err => console.log("Failed to connect to mongoDB database!", err))

// Import Routes:
const authRoutes = require('./routes/auth.routes');
const barkRoutes = require('./routes/bark.routes');
const userRoutes = require('./routes/user.routes');

// Use Routes:
app.use('/auth', authRoutes);
app.use('/barks', barkRoutes);
app.use('/users', userRoutes);

// Port that server will be listening on:
const port = process.env.PORT || 8080;
// Server will listen for user requests on port 8080:
app.listen(port, () => {
    console.log(`Server is running & listening on port: ${port}`);
});

module.exports = app;