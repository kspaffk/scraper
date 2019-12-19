const express = require("express");
const hndlbr = require("express-handlebars");
const mongoose = require("mongoose");

const scrapeArticles = require("./controller/scrape");

mongoose.set('useUnifiedTopology', true);
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/scraper";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useCreateIndex: true });