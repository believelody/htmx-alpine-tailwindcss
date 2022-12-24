require("dotenv").config();
const express = require("express");
const hbs = require("express-hbs");
const { array, misc, string } = require('useful-handlebars-helpers');
const bodyParser = require("body-parser");
const port = 8000;
const path = require("path");
const { routes } = require('./routes');
const homeRoute = require('./routes/home');
const aboutRoute = require('./routes/about');
const contactRoute = require('./routes/contact');
const teamsRoute = require('./routes/teams');
const blogRoute = require('./routes/blog');
const loginRoute = require('./routes/login');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

hbs.registerHelper('let', function (ctx) {
    Object.entries(ctx.hash).forEach(([key, value]) => {
        ctx.data.root[key] = value;
    })
});
hbs.registerHelper('routes', ctx => {
    return routes;
});
[array, misc, string].forEach(helper => hbs.registerHelper(helper));
hbs.registerHelper('partial', function (partialName, options) {
    if (!partialName) {
        console.error('No partial name given.');
        return '';
    }
    const partial = hbs.handlebars.partials[partialName];
    if (!partial) {
        console.error('Couldnt find the compiled partial: ' + partialName);
        return '';
    }
    return new hbs.SafeString(partial(options.hash));
});
hbs.registerHelper('toString', function (name, options) {
    if (!name) {
        console.error('No name given.');
        return '';
    }
    return name;
});
hbs.registerHelper('switch', function(value, options) {
    this.switchValue = { value, found : false };
    return options.fn(this);
});
hbs.registerHelper('case', function(value, options) {
    if (value == this.switchValue.value) {
        this.switchValue.found = true;
        return options.fn(this);
    }
});
hbs.registerHelper('default', function(options) {
    return !this.switchValue.found ? options.fn(this) : null; ///We can add condition if needs
});
hbs.registerHelper('withDefault', (testedValue, defaultValue, options) => {
    return testedValue || defaultValue;
});

// => Here we expose the views so it can be rendered.
app.engine('.hbs', hbs.express4({
    partialsDir: __dirname + '/views/partials',
    layoutsDir: __dirname + '/views/layouts'
}))
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));
// => Here we expose your dist folder
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    if (req.headers['hx-request']) {
        req.ctx = { layout : null };
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