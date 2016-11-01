'use strict';
process.chdir(__dirname);
var framework = require('ofa')(); // jshint ignore:line

module.exports = framework
.use('env')
.use('config')
.use('model')
.use('service')
.use('controller')
.use('seneca')
.use('seneca-route')
.lift()
.listen()
.on('error', function (err) {
  logger.error(err.stack);
  process.exit(1);
})
.on('lifted', function () {
  logger.log('lifted');
})
.on('listened', function () {
  /*jshint multistr: true */
  /*jshint multistr: true */
  logger.info('\n\
  __                                             _    \n\
 / _|                                           | |   \n\
| |_ _ __ __ _ _ __ ___   _____      _____  _ __| | __\n\
|  _| \'__/ _` | \'_ ` _ \\ / _ \\ \\ /\\ / / _ \\| \'__| |/ /\n\
| | | | | (_| | | | | | |  __/\\ V  V / (_) | |  |   < \n\
|_| |_|  \\__,_|_| |_| |_|\\___| \\_/\\_/ \\___/|_|  |_|\\_\\\n\
                                                      \n\
                                                      \n\
======================================================\n\
Framework-backend-template started, env=' + ofa.environment);
});


