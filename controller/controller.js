var db = require("../models");

var importArticle = function(articles, cb) {
    var articlesCreatedArray = [];
    articles.forEach(article => {
        console.log(article);
        db.Article.create(article, function(err, articleCreated) {
            if (err) {
                return console.log(`Article not created.`);
            }
            
            articlesCreatedArray.push(articleCreated);
            return cb(articlesCreatedArray);
        });
    });
};

var getArticles = function(cb) {
    db.Article.find({}, function(err, articles) {
        if(err) {
            return console.log(`There was an error retrieving articles`);
        }

        return cb(articles);
    });
};

module.exports = importArticle;