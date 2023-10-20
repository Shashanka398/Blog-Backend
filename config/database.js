const mongoose = require("mongoose");
require("dotenv").config();

const dbConnect = () => {
    mongoose.connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true // Corrected typo here
    }).then(() => {
        console.log("Connection with DB successful!!");
    }).catch((error) => {
        console.log("Issue in db");
        process.exit(1);
    })
};

module.exports = dbConnect;
