var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var fs = require("fs");

//My requires
var util = require('./app/util.js');
var dbuser = require('./app/dbUsers.js');


var dbfile = "test.db";
var exists = fs.existsSync(dbfile);
var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(dbfile);


//init db if needed
if(!exists){
    dbuser.initdb(db);
}

console.log("Hello!");


