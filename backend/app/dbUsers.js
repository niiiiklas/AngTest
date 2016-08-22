

exports.initdb = function (db) {
    db.serialize(function (){
        db.run("CREATE TABLE Users (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR, secret VARCHAR)");
    });
}

exports.selectAll = function(db) {
    db.serialize( function (){
        db.each("SELECT id, name FROM Users", function(err, row){
            if(row)
                console.log("ID: " + row.id + " : " + row.name);
        });
    });
}

exports.selectbyid = function(db, id){

}

