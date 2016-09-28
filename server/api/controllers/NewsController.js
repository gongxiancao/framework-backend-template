'use strict';

module.exports = {
  query: function (msg, done) {
    var query = {
    };

    News.count(query)
      .then(function (total) {
        if(total === 0) {
          return {total: 0, news: []};
        }
        return News.find(query)
          .skip(msg.skip || 0)
          .limit(msg.limit || 10)
          .lean()
          .then(function (news) {
            return {total: total, news: news};
          });
      })
      .then(function (result) {
        done(null, result);
      })
      .catch(Errors.OperationalError, function (err) {
        done(null, err.response());
      })
      .catch(function (err) {
        logger.error(err);
        done(null, new Errors.InternalError().response());
      });
  }
};
