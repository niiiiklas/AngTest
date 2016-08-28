

exports.initdb = function(db){
    db.serialize(function(){
        db.run("CREATE TABLE Snippets (id INTEGER PRIMARY KEY AUTOINCREMENT, content VARCHAR, tags VARCHAR, contentType VARCHAR)")
    });
}

exports.addtestdata = function(db){
    exports.insert(db, {
        content : "This is a file with lots of data.. not;",
        tags : "ASD, First, jaha",
        contentType : "text"
    }, function() {});
}

exports.logall = function(db){
    exports.selectall(db, function(res){
        console.log(res);
    })
}


exports.selectall = function(db, callback){
    var q = "SELECT id, content, tags, contentType FROM Snippets";
    db.all(q, function(err, rows){
        if(err)
            console.log(err);
        callback(rows);
    });
}

exports.selectid = function(db, id, callback){
    var q = "SELECT id, content, tags, contentType FROM Snippets WHERE id=?";
    db.get(q, id, function(err, row){
        if(err){ console.log(err); }
        callback(row);
    })
}

exports.insert = function(db, content, callback){
    var q = "INSERT INTO Snippets (content, tags, contentType) VALUES(?,?,?)";
    db.run(q, [content.content, content.tags, content.contentType], function(err, res){
        if(err){console.log(err);}
        console.log(this.lastID);
        exports.selectid(db, this.lastID, callback);
        //callback(db.lastInsertedRowId);
    })
}

exports.updateContent = function(db, id, contentString, callback){
    var q = "UPDATE Snippets (content) VALUES(?) WHERE id=?";
    db.run(q, [contentString, id], function(err,res){
        if(err){console.log(err);}
        callback(db.lastInsertedRowId);
    })
}