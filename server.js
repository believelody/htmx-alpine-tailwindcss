import { config } from "dotenv";
import express from 'express';
import hbs from "express-hbs";
import session from 'express-session';
import { array, misc, string, comparison, math, number, collection, object, html, regex, url } from 'useful-handlebars-helpers';
import customHelpers from './src/helpers';
import bodyParser from "body-parser";
import cookieParser from 'cookie-parser';
import path from "path";
import homeRoute from './src/routes/home';
import aboutRoute from './src/routes/about';
import contactRoute from './src/routes/contact';
import teamsRoute from './src/routes/team';
import posts1Route from './src/routes/posts-1';
import posts2Route from './src/routes/posts-2';
import loginRoute from './src/routes/login';
import userRoute from './src/routes/user';
import apiRoute from './src/routes/api';
import productRoute from './src/routes/products';
import error404Route from './src/routes/404';
import { setCheckAuthAsHxTrigger, checkAuthenticatedUserAndRedirect } from './src/middlewares/auth.middleware';
import { checkHTMXRequest } from "./src/middlewares/htmx.middleware";
import { populateUserSessionInContext } from "./src/middlewares/session.middleware";
import { error404NotFound, error500Handler, popupalteCurrentURLInContext } from "./src/middlewares/http.middleware";
import { port } from "./src/utils/url.util";
import { __dirname } from "./src/utils/file.util";
config();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({ secret: process.env.SESSION_SECRET, resave: false }));

[array, misc, string, comparison, math, number, collection, object, html, regex, url, customHelpers].forEach(helper => hbs.registerHelper(helper));

// => Here we expose the views so it can be rendered.
app.engine('.hbs', hbs.express4({
    partialsDir: __dirname + '/src/views/partials',
    layoutsDir: __dirname + '/src/views/layouts'
}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'src/views'));

app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(popupalteCurrentURLInContext);
app.use(checkHTMXRequest);
app.use(populateUserSessionInContext);
// app.use('/', (req, res) => {
//     console.log(req.originalUrl);
//     return res.redirect('home');
// });
app.use('/', setCheckAuthAsHxTrigger, homeRoute);
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