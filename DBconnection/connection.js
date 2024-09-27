const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
app = express();
app.use(express.json());

//conncting with mongoose 

dotenv.config({ path:"./config.env"})
const DB = process.env.DB;
const PORT = process.env.PORT;

mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected successfully.");
}).catch((err) => {
    console.log('Unable to connect');
});

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT} Port. You can check same on browser.`);
});



