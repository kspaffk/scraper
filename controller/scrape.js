const axios = require("axios");
const cheerio = require("cheerio");
const controller = require("./controller");

const scrapeArticles = function() {
    axios.get("https://tomshardware.com/news").then(function(response) {
        var $ = cheerio.load(response.data);
        var articleArray = [];

        $(".listingResult > a").each(function(i, element) {
            var article = {};

            article.link = $(element).attr("href");
            article.title = $(element).attr("aria-label");
            article.imgLink = $(element)
                .children()
                .children()
                .children()
                .attr("data-original");
            article.text = $(element)
                .children()
                .children()
                .children("p.synopsis")
                .text();
            article.datePub = $(element)
                .children()
                .children(".content")
                .children("header")
                .children(".byline")
                .children("time")
                .attr("datetime");
            articleArray.push(article);
        });
        controller.importArticles(articleArray);
    });
};

module.exports = { scrapeArticles: scrapeArticles };
