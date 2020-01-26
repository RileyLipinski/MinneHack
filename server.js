// Built-in Node.js modules

var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');

// NPM modules
var express   = require('express');
var sqlite3   = require('sqlite3'); //is this a db stuff if we do account stuff


var public_dir = path.join(__dirname, 'public');

var app  = express();
var port = 8000;
var cors = require('cors');

app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());
app.use(express.static(public_dir));




app.get('/' , (req, res) => {
    // ReadFile(path.join(public_dir, 'index.html')).then((template) => {  


    // WriteHtml(res, response);
    // })
    
    res.sendFile(path.join(public_dir, 'index.html'));
});




function ReadFile(filename) {
    return new Promise((resolve, reject) => {
        fs.readFile(filename, (err, data) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(data.toString());
            }
        });
    });
}