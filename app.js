const express = require('express');
const path = require('path');
const config = require('./config/config');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logg = config.logger;
const routes = require('./routes/index');

const app = express();

app.set('env', config.debug ? 'development' : 'production');
app.set('port', process.env.PORT || config.port);
app.set('trust proxy', config.proxy); 		// 指定子网和 IP 地址
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

routes(app);

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    logg.error(err);
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.json({status: 500, msg: err.message});
});

/* istanbul ignore next */
if (!module.parent) {
    app.listen(config.port, function () {
        console.log('listening on port: ' + config.port);
    });
}

module.exports = app;
