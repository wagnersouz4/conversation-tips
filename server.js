let express = require('express');
let app = express();
app.use('/', express.static(__dirname + '/public'));

let port = process.env.PORT || 8080;
app.listen(port, function() {
    console.log("application running");
});


