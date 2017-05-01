let express = require('express'),
    app = express(),
    path = require('path');

app.use(express.static(path.join(__dirname + '/public')));
app.use('/assets', express.static(__dirname + '/public/assets'));
app.use('/resources', express.static(__dirname + '/public/resources'));


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

let port = process.env.PORT || 8080;

app.listen(port, function() {
    console.log("application running at 0.0.0.0:" + port);
});


