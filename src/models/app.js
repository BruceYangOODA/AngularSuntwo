//var express = require("express");
//var fs = require('fs');
//var app = express();

//app.set("view engine","ejs");
//app.get("/", function(req,res){ res.render("whatever",{"thing":"八手機","spend":100*3})});

//app.listen(3333);
var http = require('http');
var url = require('url'); 
var querystring = require('querystring');
//import url from 'url';
var db = require("./db.js");
var server = http.createServer(function(req, res){
    var pathname = url.parse(req.url).pathname; 
    console.log("pathname",pathname);
    if(pathname == "/data"){
        if(req.method =="GET"){
  
            db.getData(function(data){
            //var jsonObj = JSON.parse(data.toString());
            //var result = JSON.parse(data)
            res.setHeader("Content-Type","text/plain; charset=utf-8");
            var result = JSON.stringify(data);            
            res.end(result);            
            //res.end("GG");
            });       

        }
        else if(req.method =="POST"){
            var chunks = []
            req.on("data", chunk =>{ chunks.push(chunk);});
            req.on("end",()=>{ 
                var data = Buffer.concat(chunks);
                console.log(data);
            })
            res.end();
        }
        else { 
            console.log("不同的網路方法");
            res.end();

        } 
    }
    else if(pathname == "/favicon.ico"){
        res.end();
    }
    else if(pathname == "/data/get"){
        /*
        console.log("/data/get", pathname);
        var urljson = url.parse( req.url, true );
        var qs = urljson.query;    
        console.log("qs",qs);
        db.getOrderList(qs.userID, function(oderList){            
            res.setHeader("Content-Type","text/plain; charset=utf-8");
            var result = JSON.stringify(oderList);      
            res.end(result);           
        });       */
        //res.end("456789");     
        db.test(res);
    }
    else if(pathname == "/data/add"){        
        var chunks = []
        req.on("data", chunk =>{ chunks.push(chunk);});
        req.on("end",()=>{ 
            var data = Buffer.concat(chunks);
            var jsonObj = JSON.parse(data);
 
            if (!jsonObj.userID){ console.log("FAIL USER ORDER"); res.end(); return;}
            db.insertOrder(jsonObj); 
        })
        res.end();
    }
    else if(pathname == "/data/user"){        
        if(req.method =="GET"){            
            var urljson = url.parse( req.url, true );
            var queryString = urljson.query;    
            db.queryUserLogin(queryString, res); 
        }
        else if (req.method =="POST"){
            var chunks = []
            req.on("data", chunk =>{ chunks.push(chunk);});
            req.on("end",()=>{
                let data = Buffer.concat(chunks).toString();
                let dataObj = JSON.parse(data);
                dataObj["ip"] = req.socket.remoteAddress;
                db.insertUser(dataObj, res);
            });            
        }
        else if(req.method =="PUT"){
            var chunks = []
            req.on("data", chunk =>{ chunks.push(chunk);});
            req.on("end",()=>{
                var data = Buffer.concat(chunks).toString();                
                db.updateUser(data, res);
            }); 
        }
        else { console.log("其他方法",pathname,req.method); res.end();}
    }
    else if(pathname == "/data/admin/user"){
        if(req.method =="PUT"){
            var chunks = []
            req.on("data", chunk =>{ chunks.push(chunk);});
            req.on("end",()=>{
                var data = Buffer.concat(chunks).toString();                
                db.updateUser(data, res);
            }); 
        }
        else { console.log("其他方法",pathname,req.method); res.end();}
    }
    else if(pathname == "/data/admin/order"){
        if(req.method =="GET"){            
            db.getAdminOrderList(res);
        }
        else if(req.method =="POST"){}
        else { console.log("其他方法",pathname,req.method); res.end();}
        
    }
    else if(pathname == "/data/user/order"){
        if (req.method == "GET"){             
            db.getUserOrder(req, res);            
         }
        else if(req.method == "POST"){
            var chunks = []
            req.on("data", chunk =>{ chunks.push(chunk);});
            req.on("end",()=>{
                var data = Buffer.concat(chunks).toString();                
                db.insertUserOrder(data, res);
            });  
        }
        else if(req.method == "PUT"){            
            var chunks = []
            req.on("data", chunk =>{ chunks.push(chunk);});
            req.on("end",()=>{
                var data = Buffer.concat(chunks).toString();                
                db.updateUserOrder(data, res);
            });  
        }
        else if(req.method == "DELETE"){                                                    
            db.deleteUserOrder(req, res);
        }
        else { console.log("其他方法",pathname,req.method); res.end();}
    }
    else{
        console.log("GG pathname",pathname);
        res.end();
    }

});
server.listen(3333);
console.log("SERVER SERVE AT PORT 3333");


        