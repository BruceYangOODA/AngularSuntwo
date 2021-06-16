const MongoClient = require("mongodb").MongoClient;  
const url = require('url'); 
const dburl = "mongodb://localhost:27017";  
const dbName = "suntwo";
const docOrder = "orders";
const docUser = "users";

//res.setHeader("Content-Type","application/json");

exports.test = function(res){
    res.end("456789");
}
exports.getData = function(callback){
    MongoClient.connect(dburl, function(err,client){
        if(err){ console.log("db connect failed"); return;}
        var col = client.db(dbName).collection(docName);
        col.find().toArray(function(err,arr){
            if(err){ console.log("db search failed"); return;}            
            //var result = JSON.parse(arr.toString());
            //console.log("result",result);
            callback(arr);
            client.close();
        });
    });
}
exports.queryUserLogin = function(queryString, res){
    MongoClient.connect(dburl, function(err,client){
        if(err){ console.log("db connect failed"); return;}
        var userID = queryString.userID;
        var password = queryString.password;        
        var col = client.db(dbName).collection(docUser);
        col.find({userID:userID}).toArray(function(err,resultArr){
            if( resultArr.length === 1){
                var account = resultArr[0];
                if (password === account.password){
                    var reply = {"reply": "登入成功",
                                "account": account
                                    };                    
                    res.end(JSON.stringify(reply));
                    client.close();
                }
                else {
                    var reply = {"reply":"密碼錯誤",
                                "account": null};                         
                    res.end(JSON.stringify(reply));
                    client.close();
                }
            }
            else {
                var reply = {"reply":"無此帳號",
                                "account": null};                 
                res.end(JSON.stringify(reply));
                client.close();
            }
        });
    });
}
exports.insertUser = function(data, res){   
    MongoClient.connect(dburl, function(err,client){
        if(err){ console.log("db connect failed"); return;}
        let col = client.db(dbName).collection(docUser);        
        let tString = new Date().toISOString().substring(0,16);
        data["isAdmin"] = false;
        data["regiDate"] = tString;
        col.insertOne(data);
        res.end("200");
    });
}
exports.insertUserOrder = function(data, res){                       
        MongoClient.connect(dburl, function(err,client){
        if(err){ console.log("db connect failed"); return;}
        let orderObj = JSON.parse(data); 
        let col = client.db(dbName).collection(docOrder);
        let reciveTime = new Date();
        let orderID = reciveTime.toISOString().substring(0,16);
        orderObj["orderID"] = orderID;
        orderObj["status"] = "送單";
        orderObj["reciveTime"] = reciveTime;        
        orderObj["produceTime"] = null;
        orderObj["payupTime"] = null;        
        col.insertOne(orderObj);
        client.close();
        res.end("200");
    });    
}
exports.deleteUserOrder = function(req, res){
    let queryObj = url.parse( req.url, true ).query;  
    MongoClient.connect(dburl, function(err,client){ //docOrder docUser
        if(err){ console.log("db connect failed"); return;}     
        var col = client.db(dbName).collection(docOrder);
        col.deleteOne(queryObj)           
        client.close();
        res.end();
    });
}
exports.getUserOrder = function(req, res){
    res.setHeader("Content-Type","application/json");
    let queryObj = url.parse( req.url, true ).query;        
    MongoClient.connect(dburl, function(err,client){
        if(err){ console.log("db connect failed"); return;}
        var col = client.db(dbName).collection(docOrder);        
        col.find(queryObj).toArray(function(err,userOrderList){
            if(err){ console.log("db dbsearch failed"); return;}            
            qLength = Object.keys(queryObj).length;            
            if( userOrderList.length === 0) {
                let reply = {reply:"沒有資料",
                            userOrder:null}                
                res.end(JSON.stringify(reply));
            }
            else if ( qLength === 1 ){
                let reply = {reply:"",
                            userOrder:userOrderList[0]}
                res.write(JSON.stringify(userOrderList));
                res.end();
            }
            else if ( qLength > 1){
                res.write(JSON.stringify(userOrderList[0]));
                res.end();
            }
            else { console.log("db.getUserOrder WRONG"); res.end(); }
            client.close();            
        });
    });
}

exports.getAdminOrderList = function(res){
    MongoClient.connect(dburl, function(err,client){
        if(err){ console.log("db connect failed"); return;}
        var col = client.db(dbName).collection(docOrder);
        col.find().toArray(function(err,resultArr){
            if(err){ console.log("db dbsearch failed"); return;}
            if(resultArr.length === 0){
                res.end();
            }
            else {
                var orderList = [];
                resultArr.forEach(ele =>{
                    if (ele.status!=="結帳") { 
                        orderList.push(ele);
                    }
                });
                res.end(JSON.stringify(orderList));
            }            
            client.close();
        });
    });
}
exports.updateUser = function(reqData, res){
    let reqObj = JSON.parse(reqData);
    let queryParams = reqObj['queryParams'];
    let updateParams = reqObj['updateParams'];
    MongoClient.connect(dburl, function(err,client){ //docOrder docUser        
        var col = client.db(dbName).collection(docUser);    
        col.updateOne(queryParams,{$set:updateParams});
        client.close();
        res.end("200");
        });
}
exports.updateUserOrder = function(reqData,res){
    let reqObj = JSON.parse(reqData);
    let queryParams = reqObj['queryParams'];
    let updateParams = reqObj['updateParams'];
    if(updateParams.status == "收單"){ updateParams["produceTime"] = new Date(); }
    else if(updateParams.status == "結帳"){  updateParams["payupTime"] = new Date(); }    
    MongoClient.connect(dburl, function(err,client){ //docOrder docUser        
        var col = client.db(dbName).collection(docOrder);    
        col.updateOne(queryParams,{$set:updateParams});
        client.close();
        res.end("200");
        });
}


insertDummy = function(){
    MongoClient.connect(dburl, function(err,client){
        if(err){ console.log("db connect failed"); return;}
        var col = client.db(dbName).collection(docOrder);
        var dummy = { userID:"1234", shop:"四維", order:"{[{'id':10},{'id':11}]}"};
        col.insertOne(dummy);
        client.close();
    });
   
}


dropDummy = function(){
    MongoClient.connect(dburl, function(err,client){
        if(err){ console.log("db connect failed"); return;}
        //docOrder docUser
        client.db(dbName).collection(docUser).drop();
        client.close();
    });
    
}
printDummy = function(){
    MongoClient.connect(dburl, function(err,client){
        if(err){ console.log("db connect failed"); return;}
        //docOrder docUser
        var col = client.db(dbName).collection(docOrder);
        col.find().toArray(function(err,arr){
            if(arr == undefined){ console.log("NO DATA")}
            console.log("DUMMY 1 ");
            console.log(arr);     
        });
        /*var col = client.db(dbName).collection(docOrder);
        col.find().toArray(function(err,arr){
            if(arr == undefined){ console.log("NO DATA")}
            console.log("DUMMY 2 ");
            console.log(arr);     
        });*/
        
        client.close();
    });
   
}
updateDummy = function(){
    MongoClient.connect(dburl, function(err,client){
                //docOrder docUser
        var col = client.db(dbName).collection(docOrder);                            
        var update = {status:"送單",reciveTime:new Date()};
        col.updateOne({userID:'0919178497'},{$set:update});
        //col.update({userID:userID},{userID:"1234"});
        client.close();
    });
}
//insertDummy();
//dropDummy();
//updateDummy();
printDummy();



