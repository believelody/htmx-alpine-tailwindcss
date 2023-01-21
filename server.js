import { config } from "dotenv";
import express from 'express';
import hbs from "express-hbs";
import session from 'express-session';
import { array, misc, string, comparison, math, number, collection, object, html } from 'useful-handlebars-helpers';
import customHelpers from './src/js/helpers';
import bodyParser from "body-parser";
import path from "path";
import homeRoute from './routes/home';
import aboutRoute from './routes/about';
import contactRoute from './routes/contact';
import teamsRoute from './routes/team';
import blogRoute from './routes/blog';
import loginRoute from './routes/login';
import userRoute from './routes/user';
import apiRoute from './routes/api';
import * as url from 'url';
import { checkUserSession, checkAuthenticatedUserAndRedirect, checkUnauthenticatedUserAndRedirect } from './src/js/middlewares/auth.middleware';
config();

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const port = 8000;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'yeswecan', resave: false }));

[array, misc, string, comparison, math, number, collection, object, html, customHelpers].forEach(helper => hbs.registerHelper(helper));

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
    req.ctx = { ...req.ctx, user: { ...req.session?.user }, isAuthenticated: !!req.session?.user }
    // await new Promise(r => setTimeout(r, 2000));
    next();
});

app.use('/', checkUserSession, homeRoute);
app.use('/about', checkUserSession, aboutRoute);
app.use('/contact', checkUserSession, contactRoute);
app.use('/blog', checkUserSession, blogRoute);
app.use('/team', checkUserSession, teamsRoute);
app.use('/login', checkAuthenticatedUserAndRedirect, loginRoute);
app.use('/users', checkUnauthenticatedUserAndRedirect, checkUserSession, userRoute);
app.use('/api', apiRoute);
app.use((error, req, res, next) => {
    console.log(error);
    res.status(500).send({ error });
});

app.listen(port, () => {
    console.log("Server running");
});