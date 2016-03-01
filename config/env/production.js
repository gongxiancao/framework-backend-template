'use strict';
module.exports = {
  connections: {
    rabbitmq: {
      transport: 'seneca-amqp-transport',
      options: {
        name: 'create_act.queue', // This is optional
        type: 'amqp'
      }
    },
    mongo: {
      host: '127.0.0.1',
      database: 'BackendTemplate'
    }
  }
};