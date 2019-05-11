var express = require('express');
var router = express.Router();
const security = require('../security');
const boom = require('boom');

router.use(security.Authentication.tokenCheckerMiddleware);

router.post('/login/', async function(req, res, next) {
  let token = await security.Authentication.authenticateUser(req.body.username, req.body.password);
  if(token != null && Object.keys(token).length > 0 )
    res.send({success: true, token: token});
  else
    res.json(boom.unauthorized('Wrong Crendentials').output.payload);
});

module.exports = router;
