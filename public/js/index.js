$(document).ready(() => {
    $(".import-articles").on("click", event => {
        importArticles();
    });

    $(".add-note").on("click", function(event) {
        let articleId = $(this)
            .parents()
            .eq(2)
            .attr("id");
        let noteText = $(this)
            .siblings(".note-text")
            .val();
        if (noteText !== "") {
            let noteJSON = { articleId: articleId, noteText: noteText };
            $(this)
                .siblings(".note-text")
                .val("");
            createNote(noteJSON);
        }
    });

    $(".delete-note").on("click", function(event) {
        let noteId = $(this)
            .siblings(".note")
            .attr("id");
        deleteNote(noteId);
    });
});

const importArticles = function() {
    $.get("/api/scrape/").then(function() {
        setTimeout(() => {
            window.location.reload();
        }, 1500);
    });
};

const createNote = function(noteJSON) {
    $.post("/api/note", noteJSON).then(function() {
        window.location.reload();
    });
};

const deleteNote = function(noteId) {
    noteIdObj = {_id: noteId};
    $.ajax({
        url: "/api/note/",
        type: "DELETE",
        data: noteIdObj,
    }).then(function() {
        window.location.reload();
    });
};
