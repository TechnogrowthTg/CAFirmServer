const jwt = require('jsonwebtoken');
const Router = require('express').Router();
const config = require('./config/config');
Router.get('/user/:UserId', isAuthorized);

function isAuthorized(req, res) {
	// check header or url parameters or post parameters for token
	var token = req.params.UserId;
	if (token) {
		// verifies secret and checks exp
		jwt.verify(token, config.secret, function (err, decoded) {
			if (err) {
				return res.json({ success: false, message: 'Failed to authenticate token.', sessionEnd: true });
			} else {
				// if everything is good, save to request for use in other routes
				res.json({ success: true, sessionEnd: false })
			}
		});
	} else {
		 // Return an error, if token not found.
         return res.send({
			success: false,
			message: 'No token provided.',
			sessionEnd: true
		});
	}
}

// const isAuthorized = (req, res) => {
//     // check header or url parameters or post parameters for token
//     var token = req.params.UserId;
//     if (token) {
//         // verifies secret and checks exp
//         jwt.verify(token, config.secret, (err, decode) => {
//             if (err) {
//                 return res.json({ success: false, message: 'Failed to authenticate token.', sessionEnd: true });
//             } else {
//                 // if everything is good, save to request for use in other routes
//                 res.json({ success: true, sessionEnd: false })
//             }
//         })
//     } else {
//         // Return an error, if token not found.
//         return res.send({
// 			success: false,
// 			message: 'No token provided.',
// 			sessionEnd: true
// 		});
//     }
// }

module.exports = Router;