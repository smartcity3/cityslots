const jwt = require('jsonwebtoken');
const configs = require('../config');
const database = require('../database');
const crypto = require('crypto');
const boom = require('boom');

async function authenticateUser(username, password) {
    let answer = {};
    try {
        let user = await database.Users.getUserByUserName(username, "", "", "");
        
        if(user != null && Object.keys(user).length > 0 && user.password == crypto.createHash('md5').update(password).digest("hex")) {
            delete user.password;
            answer = generateToken(user);
        }
            
    } catch(error) {
        console.log(error);
        answer = null;
    }
    return answer;   
}

function generateToken(dataToTokenize) {
    let answer = null;
    try {
        answer = jwt.sign(dataToTokenize, configs.ProductionConfigs.configs.generalConfigs.jwtSecretToken, {});
    } catch(error) {
        console.log(error);
    }
    return answer;  
}

function tokenCheckerMiddleware(req, res, next) {
    const token = req.body.token || req.params.token || req.query.token || req.headers['x-access-token'];
    
    if (req.url.indexOf('login') > 0) {
        //No need for token check in Login
        next();
    } else {
        // decode token
        if (token) {
            // verifies secret and checks exp
            jwt.verify(token, configs.ProductionConfigs.configs.generalConfigs.jwtSecretToken, function (error, decoded) {
                if (error) {
                    res.json(boom.badRequest('Invalid Request Token required').output.payload);
                    return;
                } else {
                    // if everything is good, save to request for use in other routes
                    req.decoded = decoded;
                    next();
                    return;
                }
            });
        } else {
            // if there is no token
            // return an error
            res.json(boom.badRequest('Invalid Request Token required').output.payload);
            return;
        }
    }
}

module.exports = {
    authenticateUser: authenticateUser,
    generateToken: generateToken,
    tokenCheckerMiddleware: tokenCheckerMiddleware
};