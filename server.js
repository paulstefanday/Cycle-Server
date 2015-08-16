global.__base = __dirname + '/';

var app = module.exports = require('koa')(),
	  http = require('http'),
    config = require('./config/config'),
    middleware = require('./config/middleware'),
    mount = require('koa-mount'),
    socketIo  = require('socket.io'),
    M = require('./models'),
   	route = require('koa-route'),
    router = require('koa-router'),
   	render = require('co-render'),
   	session = require('koa-session'),
    Grant = require('grant-koa'),
    grant = new Grant(config.oauth),
   	bodyParser = require('koa-bodyparser');

var server, io;

// Middleware
// app.use(middleware.logs);
app.keys = ['grant'];
app.use(bodyParser());
app.use(session(app));
app.use(mount(grant));
app.use(middleware.cors);
app.use(middleware.errors);
app.use(middleware.permissions);
app.use(middleware.auth);

app.use(route.get('/', function *() { this.body = yield render('client/views/join.jade'); }));
app.use(route.get('/map', function *() { this.body = yield render('client/views/map.jade'); }));

// HTTP routes
app.use(mount('/api/v1', require('./api/v1/routes')));

// Setup socket server
server = http.Server(app.callback());
io = socketIo(server);

// IO routes
require('./api/v1/controllers/io').activity(io);

// Listern to port
app.listen(config.port, function() {
  console.log('App is running at http://localhost:' + config.port + '/'); // Tell us that we're up and running
});



