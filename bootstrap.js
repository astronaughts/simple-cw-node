var cw = require('./lib/chatwork')();

cw.init({ token: process.env.CHATWORK_API_TOKEN });

cw.get('me').done(function (res) {
    console.log(res.body);
}).fail(function (err) {
    console.log(err)
});