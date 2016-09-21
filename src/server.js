import express from 'express'

var app = express();

app.get('/', function(req, res) {
    res.send('hi friend')
});

app.use(express.static(__dirname + '/public'))

app.listen(3000);
