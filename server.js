import { config } from "dotenv";
import express from 'express';
import hbs from "express-hbs";
import session from 'express-session';
import { array, misc, string, comparison, math, number, collection, object, html, regex, url } from 'useful-handlebars-helpers';
import customHelpers from './src/js/helpers';
import bodyParser from "body-parser";
import cookieParser from 'cookie-parser';
import path from "path";
import homeRoute from './routes/home';
import aboutRoute from './routes/about';
import contactRoute from './routes/contact';
import teamsRoute from './routes/team';
import posts1Route from './routes/posts-1';
import posts2Route from './routes/posts-2';
import loginRoute from './routes/login';
import userRoute from './routes/user';
import apiRoute from './routes/api';
import productRoute from './routes/products';
import error404Route from './routes/404';
import { setCheckAuthAsHxTrigger, checkAuthenticatedUserAndRedirect } from './src/js/middlewares/auth.middleware';
import { checkHTMXRequest } from "./src/js/middlewares/htmx.middleware";
import { populateUserSessionInContext } from "./src/js/middlewares/session.middleware";
import { error404NotFound, error500Handler, popupalteCurrentURLInContext } from "./src/js/middlewares/http.middleware";
import { port } from "./src/js/utils/url.util";
import { __dirname } from "./src/js/utils/file.util";
config();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({ secret: process.env.SESSION_SECRET, resave: false }));

[array, misc, string, comparison, math, number, collection, object, html, regex, url, customHelpers].forEach(helper => hbs.registerHelper(helper));

// => Here we expose the views so it can be rendered.
app.engine('.hbs', hbs.express4({
    partialsDir: __dirname + '/views/partials',
    layoutsDir: __dirname + '/views/layouts'
}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));
// => Here we expose your dist folder
app.use(express.static(path.join(__dirname, 'public')));

app.use(popupalteCurrentURLInContext);
app.use(checkHTMXRequest);
app.use(populateUserSessionInContext);
/* Have to specify with a regex to only take "/" route */
app.use(/\//g, setCheckAuthAsHxTrigger, homeRoute);
app.use('/about', setCheckAuthAsHxTrigger, aboutRoute);
app.use('/contact', setCheckAuthAsHxTrigger, contactRoute);
app.use('/posts-1', setCheckAuthAsHxTrigger, posts1Route);
app.use('/posts-2', setCheckAuthAsHxTrigger, posts2Route);
app.use('/team', setCheckAuthAsHxTrigger, teamsRoute);
app.use('/products', setCheckAuthAsHxTrigger, productRoute);
app.use('/login', checkAuthenticatedUserAndRedirect, setCheckAuthAsHxTrigger, loginRoute);
app.use('/users', setCheckAuthAsHxTrigger, userRoute);
app.use('/api', apiRoute);
app.use(error404NotFound);
// app.use('*', error404Route);
app.use(error500Handler);

app.listen(port, () => {
    console.log("Server running");
});