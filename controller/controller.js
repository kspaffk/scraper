const db = require("../models");

const importArticles = function(articles) {
    articles.forEach(article => {
        db.Article.create(article, function(err, articleCreated) {
            if (err) {
                return console.log(`Article not created.`);
            }
            console.log(`Article created`);
        });
    });
};

const getArticles = function(cb) {
    db.Article.find({})
        .sort({ datePub: -1 })
        .populate({ path: "notes" })
        .exec(function(err, articles) {
            if (err) {
                return console.log(`There was an error retrieving articles`);
            }
            return cb(articles);
        });
};

const createNote = function(noteJSON) {
    db.Note.create({ text: noteJSON.noteText })
        .then(function(noteCreated) {
            return db.Article.findOneAndUpdate(
                { _id: noteJSON.articleId },
                { $push: { notes: noteCreated._id } },
                { new: true }
            );
        })
        .then(function(dbArticle) {
            if (dbArticle === false) {
                return console.log(`Note not created`);
            }
            return dbArticle;
        });
};

const deleteNote = function(noteId) {
    db.Note.deleteOne({ _id: noteId._id }, function(err) {
        if (err) {
            console.log(`Error deleting id: ${noteId._id}`);
        }
    });
}

module.exports = {
    importArticles: importArticles,
    getArticles: getArticles,
    createNote: createNote,
    deleteNote: deleteNote
};
