const moment = require("moment");
const fromDb = require("../controller/controller");

module.exports = app => {
    app.get("/", (req, res) => {
        fromDb.getArticles((dbArticles) => {
            dbArticles.forEach(a => {
                a.formatDatePub =  moment(a.datePub).format("M/D/YYYY");
            });
            res.render("index", { dbArticles: dbArticles });
        });
    });
};