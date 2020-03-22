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

var AuthRoute = require('./app/routes/Authentication/AuthenticationRoute');
var ClientGroupRoute = require('./app/routes/ClientGroup/GroupRoute');
var ClientRoute = require('./app/routes/ClientGroup/ClientRoute');
var ContactRoute = require('./app/routes/Contact/ContactRoute');
var ServiceRoute = require('./app/routes/Service/ServiceRoute');

app.use('/auth', AuthRoute)
app.use('/group', ClientGroupRoute);
app.use('/client', ClientRoute);
app.use('/contact', ContactRoute)
app.use('/service', ServiceRoute);

app.listen(port, () => console.log(`server listening on port ${port}!`));
