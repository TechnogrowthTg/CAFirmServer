const express = require("express");
const app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
var path = require('path');
var port = process.env.PORT || 53124; // used to create, sign, and verify tokens

app.use(cors())
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json({
    limit: 1024102420,
    type: 'application/json'
}));

app.use('/', express.static(path.join(__dirname, 'public')))

var auth = require('./app/route/auth/auth.route')
var client = require('./app/route/client/client.route')
var service = require('./app/route/service/service.route')
app.use('/auth', auth)
app.use('/client',client)
app.use('/service',service)

app.listen(port, () => console.log(`server listening on port ${port}!`));
