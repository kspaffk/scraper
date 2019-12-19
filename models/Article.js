const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var ArticleSchema = new Schema({
    title: { type: String,
        unique: true,
    },
    text: String,
    link: String,
    imgLink: String,
    datePub: Date,
    notes: [
        {
        type: Schema.Types.ObjectId, ref: "Note"
        }
    ]
});

var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;