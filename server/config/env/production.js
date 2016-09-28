'use strict';
module.exports = {
  connections: {
    rabbitmq: {
      transport: 'seneca-amqp-transport',
      options: {
        url: 'amqp://backend.com',
        type: 'amqp',
        pin: 'role:backend',
        username: '',
        password: '',
        consume: {
          noAck: true
        }
      }
    },
    mongo: {
      hosts: [
        { host: 'replica-set-1-1.backend.com', port: 27017 },
        { host: 'replica-set-1-2.backend.com', port: 27017 }
      ],
      database: 'backend',
      username: 'backendUser',
      password: '',
      options: {
        replicaSet: 'mlop',
        readPreference: 'nearest',
        readConcernLevel: 'majority',
        w: 'majority'
      }
    }
  }
};
