const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const mainRoutes = require("./routes/getRoutes/mainRoutes");
const dynamicRoutes = require("./routes/postRoutes/dynamicRoutes");
const bodyParser = require("body-parser");
const formidable = require("formidable");
const multer = require("multer");

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Example configuration for handling multipart/form-data with multer
const upload = multer();

// MongoDB connection setup
// mongoose.connect("your-url", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// });
mongoose.connect("mongodb+srv://anshulbadoni359:yatogod360@todoapp.ic4k40z.mongodb.net/?retryWrites=true&w=majority&appName=todoapp", {
});

app.get("/", (req, res) => {
    res.send("Hello World!");
});

// Routes setup
app.use(mainRoutes);
app.use(dynamicRoutes);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
