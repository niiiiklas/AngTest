var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var fs = require("fs");

//My requires
var util = require('./app/util.js');
var dbuser = require('./app/dbUsers.js');
var dbdir = require('./app/dbDir.js');
var dbsnipp = require('./app/dbSnippet');


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

//parse body as json
app.use(bodyParser.json());

var myConfigs = {
    recreateDBOnStart: true,
    addTestData : true,
    logContentOnStart : true
};

var dbfile = "test.db";
if(myConfigs.recreateDBOnStart){
    fs.unlink(dbfile);
}


var exists = fs.existsSync(dbfile);
var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(dbfile);


//init db if needed
if(!exists){
    console.log("Init db");

    dbuser.initdb(db);
    dbdir.initdb(db);
    dbsnipp.initdb(db);

    if(myConfigs.addTestData){
        console.log("Conf-adding test data")
        dbuser.addtestdata(db);
        dbdir.addtestdata(db);
        dbsnipp.addtestdata(db);
    }

    if(myConfigs.logContentOnStart){
        console.log("Conf-log data");
        dbuser.logall(db);
        dbdir.logall(db);
        dbsnipp.logall(db);
    }
    

}

app.get('/users', function(req,res){
    dbuser.selectAll(db, function(r){
        //console.log(r);
        res.json(r);
    })
});

app.get('/users/:id', function(req, res){
    dbuser.selectid(db, req.params["id"], function(r){
        res.json(r);
    })
});

app.post('/users', function(req,res){
    var data = {
        name : req.query["name"],
        secret : req.query["secret"]
    };
    dbuser.insert(db, data.name, data.secret, function(r){
        console.log(r);
        res.status(200).send("OK");
    });
})


app.get('/directories/:', function(req,res){
    var userid = req.query.userid;
    var diritemid = req.query.diritemid;
    console.log("Directories GET");
    if(userid != undefined){
        console.log("Get directories by userid: " + userid);
        dbdir.selectAllForUser(db, userid, function(r){
            res.json(r);
        });
    }else {
        res.json({err:"Invalid userid or none..."});
    }
});

app.post('/directories', function(req,res){
    var userid = req.query.userid;
});


app.get('/snippets/:', function(req, res){
    var id = req.query.id;
    if(id != undefined){
        console.log("GET Snippet by id: " + directoryid);
        dbsnipp.selectid(db, id, function(r){
            res.json(r);
        });
    }

    var directoryid = req.query.directoryid;
    if(directoryid != undefined){
        console.log("GET Snippets for Directory: " + directoryid);
        dbsnipp.selectForDirectoryListing(db, directoryid, function(r){
            res.json(r);
        })
    }
})

app.post('/snippets/:', function(req, res){
    var id = req.query.id;
    if(id == undefined || id == -1)
    {
        console.log(req.body);
        dbsnipp.insert(db, req.body, function(r){
            res.json(r); //Created id
        })
    }
    else if(id)
    {
        console.log("SNIPPETPOST UPDATE: ");
        console.log(req.body);
        var name = req.body.name;
        var content = req.body.content;
        
        if(name){
            dbsnipp.updateName(db, id, name, function(r){
                res.json(r);
            });
        }else if(content){
            dbsnipp.updateContent(db, id, content, function(r){
                res.json(r);
            });
        }
    }
    
})

//Start listening
var server = app.listen(8081, function () {

    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)
})
