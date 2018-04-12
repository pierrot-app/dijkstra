const express = require('express');
const app = express();
const engine = require('./engine');

app.get('/', function (req, res) {

    res.send(`response : ${result}`);

})

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})
