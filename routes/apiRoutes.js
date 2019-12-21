const moment = require("moment");
const controller = require("../controller/controller");
const scrape = require("../controller/scrape");

module.exports = app => {
    app.get("/api/articles", (req, res) => {
        console.log(`getting articles`);
        controller.getArticles(dbArticles => {
            dbArticles.forEach(a => {
                a.formatDatePub = moment(a.datePub).format("MM/DD/YYYY");
            });
            res.json(dbArticles);
        });
    });

    app.get("/api/scrape/", (req, res) => {
        console.log(`importing articles`);
        scrape.scrapeArticles();
        res.send();
    });

    app.post("/api/note", (req, res) => {
        console.log(`creating note`);
        controller.createNote(req.body);
        res.send();
    });

    app.delete("/api/note", (req, res) => {
        console.log(`deleting note: ${JSON.stringify(req.body)}`);
        controller.deleteNote(req.body);
        res.send();
    });
};