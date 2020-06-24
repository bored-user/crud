const express = require('express'),
    mustache = require('mustache-express'),
    router = require('./routes/index'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    flash = require('express-flash');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.SECRET));
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(flash());
app.use((req, res, next) => {
    res.locals.flashes = req.flash();
    next();
});

app.use('/', router);
app.engine('mst', mustache());
app.set('view engine', 'mst');
app.set('views', `${__dirname}/views`);

module.exports = app;
