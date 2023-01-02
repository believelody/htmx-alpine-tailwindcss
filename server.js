import { config } from "dotenv";
import express from 'express';
import hbs from "express-hbs";
import { array, misc, string, comparison, math, number } from 'useful-handlebars-helpers';
import customHelpers from './helpers';
import bodyParser from "body-parser";
import path from "path";
import homeRoute from './routes/home';
import aboutRoute from './routes/about';
import contactRoute from './routes/contact';
import teamsRoute from './routes/team';
import blogRoute from './routes/blog';
import loginRoute from './routes/login';
import apiRoute from './routes/api';
import * as url from 'url';
config();

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const port = 8000;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

[array, misc, string, comparison, math, number, customHelpers].forEach(helper => hbs.registerHelper(helper));

// => Here we expose the views so it can be rendered.
app.engine('.hbs', hbs.express4({
    partialsDir: __dirname + '/views/partials',
    layoutsDir: __dirname + '/views/layouts'
}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));
// => Here we expose your dist folder
app.use(express.static(path.join(__dirname, 'public')));

app.use(async (req, res, next) => {
    if (req.headers['hx-request']) {
        req.ctx = { ...req.ctx, layout : null, fromHTMX: true };
    }
    req.ctx = { ...req.ctx, user: { subscribed: false } }
    // await new Promise(r => setTimeout(r, 2000));
    next();
});

app.use('/', homeRoute);
app.use('/about', aboutRoute);
app.use('/contact', contactRoute);
app.use('/blog', blogRoute);
app.use('/team', teamsRoute);
app.use('/login', loginRoute);
app.use('/api', apiRoute);
app.use((error, req, res, next) => {
    res.status(500).send({ error });
});

app.listen(port, () => {
    console.log("Server running");
});