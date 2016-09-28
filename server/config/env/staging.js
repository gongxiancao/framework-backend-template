'use strict';
module.exports = {
  connections: {
    rabbitmq: {
      transport: 'seneca-amqp-transport',
      options: {
        url: 'amqp://staging.backend.com',
        type: 'amqp',
        pin: 'role:backend',
        consume: {
          noAck: true
        }
      }
    },
    mongo: {
      hosts: [
        {
          host: 'stage.mongo.backend.com',
          port: 27017
        }
      ],
      database: 'backendStaging',
      username: 'backendStagingUser',
      password: ''
    }
  }
};
