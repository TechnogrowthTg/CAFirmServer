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


var Validator = require('./validator');
var AuthRoute = require('./app/routes/auth.route');
var ClientGroupRoute = require('./app/routes/clientGroup.route');
var ClientRoute = require('./app/routes/client.route');
var ContactRoute = require('./app/routes/contact.route');
var ServiceGroupRoute = require('./app/routes/serviceGroup.route');
var ServiceSubGroupRoute = require('./app/routes/serviceSubgroup.route');
var PaytypeRoute = require('./app/routes/servicePaytype.route');
var ServicePayRoute = require('./app/routes/servicePay.route');
var ServiceRoute = require('./app/routes/service.route');


app.use('/auth/validate', Validator);
app.use('/auth', AuthRoute);
app.use('/group', ClientGroupRoute);
app.use('/client', ClientRoute);
app.use('/contact', ContactRoute)
app.use('/serviceGroup', ServiceGroupRoute);
app.use('/subserviceGroup', ServiceSubGroupRoute);
app.use('/paytype', PaytypeRoute);
app.use('/pay', ServicePayRoute);
app.use('/service', ServiceRoute);

app.listen(port, () => console.log(`server listening on port ${port}!`));
