

exports.initdb = function(db){
    db.serialize(function(){
        db.run("CREATE TABLE Snippets (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR, directoryid INTEGER, content VARCHAR, tags VARCHAR, contentType VARCHAR)")
    });
}

exports.addtestdata = function(db){
    exports.insert(db, {
        directoryid : 1,
        name: "Anteckning 1",
        content : "This is a file with lots of data.. not;",
        tags : "ASD, First, jaha",
        contentType : "text"
    }, function() {});

    exports.insert(db, {
        directoryid : 1,
        name : "HTML Test",
        content : "<html><body>dsads</body></html>",
        tags : "",
        contentType : "C#"
    }, function() {});

    exports.insert(db, {
        directoryid : 1,
        name : "HTML Test",
        content : '<div class="row form-group">' + 
            '<div class="col-md-3">' +
            '    <label>Name</label>' +
            '</div>'+
            '<div class="col-md-9">'+
            '    <input type="text" class="form-control" ng-model="displaycontent.name" ng-change="onNameChanged();"></input>'+
            '</div>'+
            '</div>',
        tags : "",
        contentType : "C#"
    }, function() {});
}

exports.logall = function(db){
    exports.selectall(db, function(res){
        console.log(res);
    })
}


exports.selectall = function(db, callback){
    var q = "SELECT id, directoryid, name, content, tags, contentType FROM Snippets";
    db.all(q, function(err, rows){
        if(err)
            console.log(err);
        callback(rows);
    });
}

exports.selectid = function(db, id, callback){
    var q = "SELECT id, directoryid, name, content, tags, contentType FROM Snippets WHERE id=?";
    db.get(q, id, function(err, row){
        if(err){ console.log(err); }
        callback(row);
    })
}

exports.selectAllInDirectory = function(db, dirid, callback){
    var q = "SELECT id, directoryid, name, content, tags, contentType FROM Snippets WHERE directoryid=?";
    db.all(q, dirid, function(err, rows){
        if(err){ console.log(err); }
        callback(rows)
    })
}

exports.selectForDirectoryListing = function(db, dirid, callback){
    var q = "SELECT id, directoryid, name, contentType FROM Snippets WHERE directoryid=?";
    db.all(q, dirid, function(err, rows){
        if(err){ console.log(err); }
        callback(rows)
    })
}

exports.insert = function(db, content, callback){
    var q = "INSERT INTO Snippets (directoryid, name, content, tags, contentType) VALUES(?,?,?,?,?)";
    db.run(q, [content.directoryid, content.name, content.content, content.tags, content.contentType], function(err, res){
        if(err){console.log(err);}
        console.log(this.lastID);
        exports.selectid(db, this.lastID, callback);
        //callback(db.lastInsertedRowId);
    })
}


exports.updateContent = function(db, id, contentString, callback){
    var q = "UPDATE Snippets SET (content) VALUES(?) WHERE id=?";
    db.run(q, [contentString, id], function(err,res){
        if(err){console.log(err);}
        callback(db.lastInsertedRowId);
    })
}

exports.updateName = function(db, id, newName, callback){
    var q = "UPDATE Snippets SET name = ? WHERE id=?";
    db.run(q, [newName, id], function(err, res){
        if(err){console.log(err);}
        callback(db.lastInsertedRowId);
    });
}

exports.updateContentType = function(db, id, newContentType, callback){
    var q = "UPDATE Snippets SET (contentType) VALUES(?) WHERE id=?";
    db.run(q, [newContentType, id], function(err, res){
        if(err){console.log(err);}
        callback(db.lastInsertedRowId);
    });
}

exports.updateTags = function(db, id, allTags, callback){
    var q = "UPDATE Snippets SET (tags) VALUES(?) WHERE id=?";
    db.run(q, [allTags, id], function(err, res){
        if(err){console.log(err);}
        callback(db.lastInsertedRowId);
    });
}