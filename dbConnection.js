const mongoose = require('mongoose');
//const CONFIG = require('./config/config');
const mongoDB= 'mongodb+srv://admin:admin1234@cluster0-tuc2s.mongodb.net/test?retryWrites=true&w=majority'; //CONFIG.db_dialect+`://`+CONFIG.db_host+`/`+CONFIG.db_name;
console.log(mongoDB);

mongoose.Promise = global.Promise;

mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

module.exports = mongoose;
