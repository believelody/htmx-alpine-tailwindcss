require("dotenv").config();
const express = require("express");
const hbs = require("express-hbs");
const { array, misc, string, comparison } = require('useful-handlebars-helpers');
const { customHelpers } = require('./helpers');
const bodyParser = require("body-parser");
const port = 8000;
const path = require("path");
const homeRoute = require('./routes/home');
const aboutRoute = require('./routes/about');
const contactRoute = require('./routes/contact');
const teamsRoute = require('./routes/teams');
const blogRoute = require('./routes/blog');
const loginRoute = require('./routes/login');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

[array, misc, string, comparison, customHelpers].forEach(helper => hbs.registerHelper(helper));

// => Here we expose the views so it can be rendered.
app.engine('.hbs', hbs.express4({
    partialsDir: __dirname + '/views/partials',
    layoutsDir: __dirname + '/views/layouts'
}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));
// => Here we expose your dist folder
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    if (req.headers['hx-request']) {
        req.ctx = { layout : null, fromHTMX: true };
    }
    next();
});

app.use('/', homeRoute);
app.use('/about', aboutRoute);
app.use('/contact', contactRoute);
app.use('/blog', blogRoute);
app.use('/teams', teamsRoute);
app.use('/login', loginRoute);

app.listen(port, () => {
    console.log("Server running");
});