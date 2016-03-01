'use strict';

var svc = module.exports = {
  mongoErrors: {
    duplicateKey: 11000
  },

  isDuplicateKeyError: function (err) {
    return err.code === svc.mongoErrors.duplicateKey;
  },

  attachErrorCode: function (err, code) {
    if(!_.isObject(err)) {
      err = new Error(err);
    }
    err.code = code;
    return err;
  },
  respondError: function (respond, err) {
    respond(null, {errcode: err.code, errmsg: err.message});
  }
};