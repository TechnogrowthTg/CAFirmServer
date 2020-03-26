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

// var AuthRoute = require('./app/routes/Authentication/AuthenticationRoute');
var ClientGroupRoute = require('./app/routes/ClientGroup/client.group.route');
var ClientRoute = require('./app/routes/Client/client.route');
var ContactRoute = require('./app/routes/Contact/contact.route');
var ServiceGroupRoute = require('./app/routes/Service/serviceGroup.route');
var SubServiceGroupRoute = require('./app/routes/Service/service.Subgroup.route');
var PaytypeRoute = require('./app/routes/Service/servicePaytype.route');
var ServicePayRoute = require('./app/routes/Service/servicePay.route');
// var ServiceRoute = require('./app/routes/Service/ServiceRoute');

// app.use('/auth', AuthRoute)
app.use('/group', ClientGroupRoute);
app.use('/client', ClientRoute);
app.use('/contact', ContactRoute)
app.use('/serviceGroup', ServiceGroupRoute);
app.use('/subserviceGroup', SubServiceGroupRoute);
app.use('/paytype', PaytypeRoute);
app.use('/pay', ServicePayRoute);

app.listen(port, () => console.log(`server listening on port ${port}!`));
