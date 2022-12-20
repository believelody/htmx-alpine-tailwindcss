require("dotenv").config();
const express = require("express");
const ejs = require("express");
const bodyParser = require("body-parser");
const port = 3000;
const app = express();
const path = require("path");
const EJSLayout = require('express-ejs-layouts');

app.use(bodyParser.urlencoded({ extended: true }));

// => Here we expose the views so it can be rendered.
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(EJSLayout);
// => Here we expose your dist folder
app.use(express.static(path.join(__dirname, 'public')))

app.get("/", (req, res) => {
    res.render("pages/index", { layout: !req.headers['hx-request'] });
});

app.get("/about", (req, res) => {
    res.render("pages/about", { layout: !req.headers['hx-request'] });
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