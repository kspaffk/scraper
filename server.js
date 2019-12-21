const express = require("express");
const hndlbr = require("express-handlebars");
const mongoose = require("mongoose");

mongoose.set('useFindAndModify', false);
mongoose.set('useUnifiedTopology', true);
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/scraper";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useCreateIndex: true });

var PORT = process.env.PORT || 3000;
var app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.engine("handlebars", hndlbr({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);


app.listen(PORT, () => {
    console.log(`App running on port: ${PORT}!`)
});