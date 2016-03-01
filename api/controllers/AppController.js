'use strict';
module.exports = {
  create: function (msg, done) {
    var app = msg.app;
    app.createdAt = new Date();
    app.updatedAt = app.createdAt;
    App.create(app, function (err, app) {
      if(err) {
        console.error(err);
        return UtilService.respondError(done, UtilService.makeInteralError(new Error('failed to create app'), 41001));
      }
      done(null, app.toJSON());
    });
  },
  get: function (msg, done) {
    App.findOne({_id: msg._id}, function (err, app) {
      if(err) {
        console.error(err);
        return UtilService.respondError(done, UtilService.attachErrorCode(new Error('failed to get app, check if appKey is valid'), 41002));
      }
      if(!app) {
        return UtilService.respondError(done, UtilService.attachErrorCode(new Error('app not exist'), 41003));
      }
      done(null, app.toJSON());
    });
  }
};
