require("dotenv").config();
const express = require("express");
const hbs = require("express-hbs");
const { array, misc, string } = require('useful-handlebars-helpers');
const bodyParser = require("body-parser");
const port = 8000;
const path = require("path");
const { routes } = require('./routes')

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

hbs.registerHelper('let', function (ctx) {
    Object.entries(ctx.hash).forEach(([key, value]) => {
        ctx.data.root[key] = JSON.parse(value);
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

// => Here we expose the views so it can be rendered.
app.engine('.hbs', hbs.express4({
    partialsDir: __dirname + '/views/partials',
    layoutsDir: __dirname + '/views/layouts'
}))
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));
// => Here we expose your dist folder
app.use(express.static(path.join(__dirname, 'public')))

app.get("/", (req, res) => {
    let ctx = {};
    if (req.headers['hx-request']) {
        ctx.layout = null;
    }
    res.render("pages/index", ctx);
});

app.get("/about", (req, res) => {
    let ctx = {};
    if (req.headers['hx-request']) {
        ctx.layout = null;
    }
    res.render("pages/about", ctx);
});

app.get("/contact", (req, res) => {
    let ctx = {};
    if (req.headers['hx-request']) {
        ctx.layout = null;
    }
    res.render("pages/contact", ctx);
});

app.get("/teams", (req, res) => {
    let ctx = {};
    if (req.headers['hx-request']) {
        ctx.layout = null;
    }
    res.render("pages/teams", ctx);
});

app.get("/blog", (req, res) => {
    let ctx = {};
    if (req.headers['hx-request']) {
        ctx.layout = null;
    }
    res.render("pages/blog", ctx);
});

app.listen(port, () => {
    console.log("Server running");
});