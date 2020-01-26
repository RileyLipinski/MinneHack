// Built-in Node.js modules

var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');

// NPM modules
var express   = require('express');
var sqlite3   = require('sqlite3'); //is this a db stuff if we do account stuff


var public_dir = path.join(__dirname, 'public');
var db_filename = path.join(__dirname, 'db', 'realdatabase.sqlite3');

var app  = express();
var port = 8000;
var cors = require('cors');

app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());
// app.use(express.static(public_dir));


var db = new sqlite3.Database(db_filename, sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.log('Error opening ' + db_filename);
    }
    else {
        console.log('Now connected to ' + db_filename);
    }
});

app.get('/posts', (req,res) =>{
    var dataToSend = {};
    // var dbCallStart = "SELECT * FROM Table Help ORDER BY Date";
    db.each("SELECT * FROM TableHelp ORDER BY Date", (err,row) =>{
        var postToAdd = {
            date: row.Date,
            time: row.Time,
            postCreatorName: row.PostCreatorName,
            title: row.ProblemSubject,
            postContent: row.PostContent,
            commentIDs: row.CommentIDs
        }
        dataToSend[row.UID] = postToAdd;
    }, () =>{
        res.type('json').send(dataToSend);
    });
});

app.get('/comments', (req, res) =>{
    new Promise((resolve, reject) =>{
        if(req.query.hasOwnProperty("postid") == false)
        {
            reject("needs query with postid");
        }
        else
        {
            console.log(req.query.postid);
            var commentsToSend = {};
            db.each("SELECT * FROM CommentsTable WHERE CommentPostID=?",[req.query.postid], (err, row) =>{
                if(err)
                {
                    reject(err);
                }
                console.log(row);
                var commentToAdd = {
                    name: row.CommentName,
                    content: row.CommentContent,
                    postid: row.CommentPostID
                }
                console.log(commentToAdd);
                commentsToSend[row.CommentUID] = commentToAdd;
            }, () =>{
                resolve(commentsToSend);
            });
        }
    }).then((data) => {
        res.type('json').send(data);
    });
});


// app.get('/' , (req, res) => {
//     // ReadFile(path.join(public_dir, 'index.html')).then((template) => {  


//     // WriteHtml(res, response);
//     // })
    
//     res.sendFile(path.join(public_dir, 'index.html'));
// });




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





console.log('Now listening on port ' + port);
var server = app.listen(port);