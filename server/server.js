var express = require('express');
var app = express();

var fs = require("fs");

//DBINIT
var dbfile = "test.db";
var exists = fs.existsSync(dbfile);
var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(dbfile);
db.serialize(function (){
    if(!exists){
        //Workspace
        db.run("CREATE TABLE Workspaces (id INTEGER PRIMARY KEY AUTOINCREMENT, content text)");

        //Snippet
        db.run("CREATE TABLE Snippets (id INTEGER PRIMARY KEY AUTOINCREMENT, title varchar, content text)");
    }

//INITIAL ADDING OF TEST VALUES: ----
    var contentTest = {
        
    };
    var stmt = db.prepare("INSERT INTO Snippets (title, content) VALUES(?,?)");
    stmt.run("Test1", "Allting");
    stmt.finalize();
//---

//Display info for current db:
    db.each("SELECT id, title, content FROM Snippets", function(err, row){
        if(row)
            console.log("ID: " + row.id + " : " + row.title);
    });
});

//db.close();

//helpers..
function logResp(res){

}

function logRequest(req){

}

//Something
// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:8080');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});


//Workspace

app.get('/workspaces', function (req, res){

});


//Snippet
//GET id
app.get('/snippets', function (req, res){

    console.log(req.baseUrl);
    var id = req.query["id"];
    console.log("requested id: " + id);

    db.each("SELECT id, title, content FROM Snippets WHERE id = ?",
        id,
        function(err, row) {
            if(err){
                console.log(err);
            }
            if(row){
                console.log(row.id + "  " + row.content);
                res.json({
                    id: row.id,
                    title : row.title,
                    content : row.content
                });
            }else{
                res.send("Not found")
            }
        });
});

app.post('/snippets', function(req, res){
    console.log(req.query);
    var title = req.query.title;
    var content = req.query.content;

    var stmt = db.prepare("INSERT INTO Snippets (title, content) VALUES(?,?)");
    stmt.run(title, content);
    stmt.finalize();

    res.status(202);
});

var server = app.listen(8081, function () {

    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)
})