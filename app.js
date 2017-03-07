
/**
 * Declare Module dependencies
 */

var express = require('express'),
	path = require('path'),
	config = require('./config'),
	schema = require('./sql/schema'),
	session = require('express-session'),
	favicon = require('serve-favicon'),
	bodyParser = require('body-parser'),
	morgan = require('morgan'),
	cookieParser = require('cookie-parser'),
	methodOverride = require('method-override'),
	errorHandler = require('errorhandler'),
	serveStatic = require('serve-static'),
  sessionstore = require('connect-session-knex')(session);

// Express App Server
var app = express();

// Settings for all environments
app.set('port', config.port);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.set('env', config.env);

var db = require('knex')(config.db);
//var db = Knex.initialize(config.db);

schema.create(db);
config.readHosts(db);

var knexsessions = require('knex')(config.sessionstore);

/**
 * Set up Middleware
 */
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(morgan('dev'));
app.use(bodyParser());
app.use(methodOverride());
app.use(cookieParser());
app.use(session({
	secret: config.sessionSecret,
	cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 },
	store: new sessionstore({knex: knexsessions, tablename: 'sessions'})
}));
//app.use(app.router);
app.use(require('stylus').middleware(__dirname + '/public'));
app.use(serveStatic(path.join(__dirname, 'public')));

// Middleware for Dev Env only
if ('development' == app.get('env')) {
  app.use(errorHandler());
}

var supervisordapi = require('supervisord');

/**
 * Set routes
 */
var routes = require('./routes')({
	'app': app,
	'config': config,
	'supervisordapi': supervisordapi,
	'db': db
});

/**
 * Start Express Server
 */
app.listen(app.get('port'), function(){
	console.log('Nodervisor launched on port ' + app.get('port'));
});
