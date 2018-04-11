const express = require('express');
const app = express();
const engine = require('./engine');
const data = require('./data');

app.get('/', function (req, res) {

    const result = engine.dijkstra(3, 9);  
    res.send(`response : ${result}`);

})

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})