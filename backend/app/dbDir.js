
exports.initdb = function(db){
    db.serialize(function(){
        db.run("CREATE TABLE Directory (id INTEGER PRIMARY KEY AUTOINCREMENT, userId INTEGER, title VARCHAR, tags VARCHAR)");
    });
}

exports.addtestdata = function(db){
    db.serialize( function(){
        var stmt = db.prepare("INSERT INTO Directory (userid, title) VALUES (?,?)");
        stmt.run(1, "Project 1");
        stmt.run(1, "Notes quick");
        stmt.run(1, "DSADS");
        stmt.run(2, "For someone else");

        stmt.finalize();
    });
}

exports.logall = function(db){
    exports.selectall(db, function(res){
        console.log(res);
    });

    exports.selectAllForUser(db, 1, function(res){
        console.log("FROM USERID DIRECTORIES: ");
        console.log(res);
    })
}

 var qAll = "id, userId, title, tags";

exports.selectall = function(db, callback){
    var q = "SELECT " + qAll + " FROM Directory";
    db.all(q, function(err, rows){
        callback(rows);
    })
}

exports.selectbyid = function(db, id, callback){
    var q = "SELECT " + qAll + " FROM Directory WHERE id=?";
    db.get(q, id, function(err, row){
        callback(row);
    })
}

exports.selectAllForUser = function(db, userid, callback){
    var q = "SELECT " + qAll + " FROM Directory WHERE userId=?";
    db.all(q, userid, function(err, rows){
        console.log(rows);
        if(err)
            console.log(err);
        callback(rows);
    })
}

exports.update = function(db, content, callback){
    var id = content.id;

    var title = content.title;

    var q = "UPDATE (title) VALUES(?) WHERE id=?";
    db.run(q, [title, id], function(err, res){
        if(err)
            console.log(err);
        callback(res);
    })
}

exports.insertwithSnippetId = function(db, content, callback){
    var q = "INSERT INTO (userId, title, tags) VALUES(?,?,?)";
    db.run(q, [
            content.userId,
            content.title,
            content.tags
            ],
        function(err, res){
        if(err)
            console.log(err);
        callback(res);
    });
}
