require("dotenv").config();
const express = require("express");
const hbs = require("express-hbs");
const bodyParser = require("body-parser");
const port = 3000;
const app = express();
const path = require("path");

app.use(bodyParser.urlencoded({ extended: true }));

hbs.registerHelper('let', function (varName, varValue, ctx) {
    this[varName] = varValue;
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
    console.log(ctx);
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
    res.render("pages/contact", { layout: !req.headers['hx-request'] });
});

app.get("/teams", (req, res) => {
    res.render("pages/teams", { layout: !req.headers['hx-request'] });
});

app.get("/blog", (req, res) => {
    res.render("pages/blog", { layout: !req.headers['hx-request'] });
});

app.listen(port, (req, res) => {
    console.log("Server running");
});