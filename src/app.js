const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const routers = require('./routers');
const app = express();
const port = 8080;
app.use(express.json());

const publicDirPath = path.join(__dirname, '../public');

app.use(express.static(publicDirPath));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/',(req, res) =>{

})

routers.apiRouters(app);

app.listen(port, function () {
    console.log('Listening port' + port);
})
