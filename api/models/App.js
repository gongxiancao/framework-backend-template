
'use strict';
module.exports = {
  attributes: {
    name: {
      type: String,
      validate: {
        validator: function(v) {
          return /^[a-zA-Z0-9_ ]{6,30}$/.test(v);
        },
        message: '{VALUE} is not a valid app name!'
      }
    },
    secret: {
      type: String
    },
    createdAt: {
      type: Date
    },
    updatedAt: {
      type: Date
    }
  }
};