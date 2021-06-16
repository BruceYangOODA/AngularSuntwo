var MongoClient = require("mongodb").MongoClient;  
var dburl = "mongodb://localhost:27017";  
var dbName = "student";
var docName = "school";

getAllStudent = function(callback){
    MongoClient.connect(dburl, function(err,client){
        if(err){ console.log("db connect failed"); return;}
        var col = client.db(dbName).collection(docName);
        col.find().toArray(function(err,arr){
            if(err){ console.log("db connect failed"); return;}
            callback(arr);
            client.close();
        });
    });
}

getAllStudent(function(data){
    console.log(data);
});
