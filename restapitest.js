const fs = require("fs");
const csv = require('csvtojson');
const {Parser} = require('json2csv');
const http = require ('http');
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());

async function importcsv() {

    const colleges = await csv().fromFile("colleges.csv");
    
    app.all('/', function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        next();
      });
    
    

    app.get('/', (req, res, next) => {
        
        res.send(colleges);
       
        
    
    });



    app.get('/colleges/name', (req, res, next) => {
        
        let x = colleges.filter((p) => p["lowercased"].includes(req.query.name));
        res.send(x);
        
        
    
    });
    
    app.get('/colleges/filter', (req, res, next) => {
        let select = req.query.selectivity;
        let afford = req.query.affordability;
        var x;
        
        if (!select && !afford) {
            res.send(colleges);
        } else if (!select) {
            x = colleges.filter((p) => p["afford"] == afford);
            res.send(x);
        } else if (!afford) {
            x = colleges.filter((p) => p["afford"] == afford);
            res.send(x);
        } else {
            x = colleges.filter((p) => p["selectivity2"] == select);
            res.send(x);
        }
        
        

    
    });

    app.get('/colleges/id', (req, res, next) => {
        
        let x = colleges.filter((p) => p["unitid"].includes(req.query.id));
        res.send(x);
        
        
    
    });
};


importcsv();




let port = process.env.PORT || 3000;
app.listen(port, () => console.log("Listening on port 3000"));

