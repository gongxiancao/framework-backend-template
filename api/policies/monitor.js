/**
 * monitor
 *
 * @module      :: Policy
 * @description :: Simple policy to monitor server state
 *
 * Error codes:
 *
 * Possible error codes returned from this controller:
 *
 */
'use strict';

module.exports = function(req, res, next) {
  req.requestStartTime = new Date();
  res.on('finish', function () {
    console.log('response time: ' + (new Date() - req.requestStartTime)+ 'ms');
  });
  return next();
};
