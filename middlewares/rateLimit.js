var RateLimit = require('express-rate-limit');
 
var limiter = new RateLimit({
  windowMs: 1*60*1000, // 15 minutes
  max: 5, // limit each IP to 100 requests per windowMs
  delayMs: 0 // disable delaying - full speed until the max limit is reached
});

module.exports = limiter;