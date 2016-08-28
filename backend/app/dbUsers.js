
//INITS
exports.initdb = function (db) {
    db.serialize(function (){
        db.run("CREATE TABLE Users (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR, secret VARCHAR)");
    });
}

//Helpers
exports.addtestdata = function(db){
    db.serialize(function (){
        var stmt = db.prepare("INSERT INTO Users (name, secret) VALUES(?,?)");
        stmt.run("Niklas", "mypass");
        stmt.run("Peter norr", "otherbadpassword");
        stmt.finalize();
    })

    exports.insert(db, "Jonas", "ddd", function(){});
}

exports.logall = function(db){
    exports.selectAll(db, function(res){
        console.log(res);
    });

    console.log("FirstDBUSer");
    exports.selectid(db, 2, function(res){
        console.log(res);
    })

}


//Functions

exports.selectAll = function(db, callback){
    var q = "SELECT id, name FROM Users";
    db.all(q, function(err, rows){
        callback(rows);
    });
}

exports.selectid = function(db, id, callback){
    var q = "SELECT id, name FROM Users Where id=?";
    db.get(q, id, function (err,row){
        callback(row);
    });
}

exports.insert = function(db, name, secret, callback){
    var q = "INSERT INTO Users (name, secret) VALUES(?,?)";
    db.run(q, [name, secret], function(err){
        if(err)
            callback(0);
        callback(1);
    })
}

exports.update = function(db, id, name, secret, callback){
    var q = "UPDATE Users (name, secret) VALUES(?,?) WHERE id=?";
    db.run(q, [name,secret,id], function(err){
        if(err){
            console.log(err);
            callback(0);
        };
        callback(1);
    })
}

