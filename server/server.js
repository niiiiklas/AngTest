var express = require('express');
var app = express();
var bodyParser = require('body-parser')

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
        db.run("CREATE TABLE Snippets (id INTEGER PRIMARY KEY AUTOINCREMENT, workspaceid INTEGER, title varchar, content text, FOREIGN KEY(workspaceid) REFERENCES Workspaces(id))");
    }

//INITIAL ADDING OF TEST VALUES: ----
    var doAddTestValues = false;

    if(doAddTestValues){
        var contentTest = {
            
        };
        var stmt = db.prepare("INSERT INTO Snippets (title, content) VALUES(?,?)");
        stmt.run("Test1", "Allting");
        stmt.finalize();
    }
//---


//Display info for current db:
    db.each("SELECT id, title, content FROM Snippets", function(err, row){
        if(row)
            console.log("ID: " + row.id + " : " + row.title);
    });
});

//db.close();

//helpers..
function logResponse(res){
    console.log("responded");
    
}

function logRequest(req){
    console.log(req.query);
    var id = req.query["id"];
    if(id)
        console.log("Id: " + id);
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

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


//Snippet
//GET id
app.get('/snippets', function (req, res){

    logRequest(req);
    var id = req.query["id"];
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
//POST
app.post('/snippets', function(req, res){
    
    var title = req.query.title;
    var content = req.query.content;

    var stmt = db.prepare("INSERT INTO Snippets (title, content) VALUES(?,?)");
    stmt.run(title, content);
    stmt.finalize();

    res.status(202);
});

//Workspace
app.get('/workspaces', function (req, res){
    logRequest(req);
    var resultData = [];
    var rowIndex = 0;
    db.each("SELECT id, content FROM Workspaces", function(err, row){
        if(err){
            console.log(err);
        }else if(row){
            console.log(row);
            var newObj = {
                id: row.id,
                content : row.content
            };
            resultData.push(newObj);
        }
    });
    res.json(resultData);
    logResponse(res);
});

app.post('/workspaces', function (req, res){
    logRequest(req);
    console.log("-- " + req.body);
    var content = req.query.items;

    var stmt = db.prepare("INSERT INTO Workspaces (content) VALUES(?)");
    stmt.run(content);
    stmt.finalize();

    res.status(202);
});

var server = app.listen(8081, function () {

    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)
})