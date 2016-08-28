
exports.initdb = function(db){
    db.serialize(function(){
        db.run("CREATE TABLE Directory (id INTEGER PRIMARY KEY AUTOINCREMENT, userId INTEGER, title VARCHAR, tags VARCHAR, snippetId INTEGER, parentId INTEGER)");
    });
}

exports.addtestdata = function(db){
    db.serialize( function(){
        var stmt = db.prepare("INSERT INTO Directory (userid, title, parentId) VALUES (?,?,?)");
        stmt.run(1, "Root", null);
        stmt.run(1, "Sub 1" , 1);
        stmt.run(1, "Sub 2", 1);
        stmt.run(1, "File 1", 2);

        stmt.finalize();
    });
}

exports.logall = function(db){
    exports.selectall(db, function(res){
        console.log(res);
    });

    exports.selectRootsForUser(db, 1, function(res){
        console.log("FROM USERID ROOTS: ");
        console.log(res);
    })
}

 var qAll = "id, userId, title, tags, snippetId, parentId";

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

exports.selectRootsForUser = function(db, userid, callback){
    var q = "SELECT " + qAll + " FROM Directory WHERE userId=? AND parentId IS NULL";
    db.all(q, userid, function(err, rows){
        console.log(rows);
        if(err)
            console.log(err);
        callback(rows);
    })
}

exports.selectChildrenOfId = function(db, id, callback){
    var q = "SELECT " + qAll + " FROM Directory WHERE parentId=?";
    db.all(q, id, function(err, rows){
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
    var q = "INSERT INTO (userId, title, tags, snippetId, parentId) VALUES(?,?,?,?,?)";
    db.run(q, [
            content.userId,
            content.title,
            content.tags,
            content.snippetId,
            content.parentId
            ],
        function(err, res){
        if(err)
            console.log(err);
        callback(res);
    });
}
