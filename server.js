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
import error404Route from './routes/404';
import * as url from 'url';
import { setCheckAuthAsHxTrigger, checkAuthenticatedUserAndRedirect } from './src/js/middlewares/auth.middleware';
import { checkHTMXRequest } from "./src/js/middlewares/htmx.middleware";
import { populateUserSessionInContext } from "./src/js/middlewares/session.middleware";
import { error404NotFound, error500Handler, popupalteCurrentRouteInContext } from "./src/js/middlewares/http.middleware";
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

app.use(popupalteCurrentRouteInContext);
app.use(checkHTMXRequest);
app.use(populateUserSessionInContext);
app.use('/', setCheckAuthAsHxTrigger, homeRoute);
app.use('/about', setCheckAuthAsHxTrigger, aboutRoute);
app.use('/contact', setCheckAuthAsHxTrigger, contactRoute);
app.use('/blog', setCheckAuthAsHxTrigger, blogRoute);
app.use('/team', setCheckAuthAsHxTrigger, teamsRoute);
app.use('/login', checkAuthenticatedUserAndRedirect, loginRoute);
app.use('/users', setCheckAuthAsHxTrigger, userRoute);
app.use('/api', apiRoute);
app.use(error404NotFound);
// app.use('*', error404Route);
app.use(error500Handler);

app.listen(port, () => {
    console.log("Server running");
});