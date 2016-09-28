'use strict';
module.exports = {
  connections: {
    rabbitmq: {
      transport: 'seneca-amqp-transport',
      options: {
        type: 'amqp',
        pin: 'role:backend',
        consume: {
          noAck: true
        }
      }
    },
    poiMongo: {
      hosts: [
        { host: '127.0.0.1', port: 27017 }
      ],
      database: 'backendTest'
    }
  }
};
