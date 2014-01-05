var pack        = require('../package.json'),
    agent       = require('superagent'),
    _           = require('lodash'),
    http_verbs  = ['get', 'post', 'put', 'del'];

// enable deferred.
_.mixin(require('underscore.deferred'));

module.exports = function () {

    var chatwork = {
        apiVersion: 'v1',
        sdkVersion: pack.version,
        token: undefined,
        // ----------------------
        Deferred: _.Deferred,
        when: _.when
    };

    var ua = 'Simple-CW-Node/' + chatwork.sdkVersion;

    chatwork.init = function (params) {
        params = params || {};
        this.token = params.token;
    };

    chatwork.api = function (method, api) {
        var callback, dfd, done, url, request,
            params = arguments[2];

        if (_.isFunction(arguments[3])) {
            callback = arguments[3];
        } else if (_.isFunction(arguments[2])) {
            callback = arguments[2];
        } else {
            dfd = _.Deferred();
        }

        done = function (err, res) {
            err = err || res.body.errors;
            if (callback) callback(err, res);
            if (dfd) return err ? dfd.reject(err) : dfd.resolve(res);
        };

        url     = 'https://api.chatwork.com/' + this.apiVersion + '/' + api;
        request = agent[method];

        request(url)
        .type('form')
        .set('User-Agent', ua)
        .set('X-ChatWorkToken', this.token)
        .send(params)
        .end(done);

        return dfd;
    };

    // methods
    _.each(http_verbs, function (verb) {
        chatwork[verb] = _.partial(chatwork.api, verb);
    });

    return chatwork;
};