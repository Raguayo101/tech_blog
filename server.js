const path = require('path');
const express = require('express');
const session = require('express-session');
const handlebars = require('express-handlerbars');
const helper = require('./utils/helpers');

const app = express();
const port = process.env.PORT || 3001;

const sequelize = require('./config/config');
const sequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
    secret: 'Super secret secret',
    cookie: {},
    resave: false,
    saveUnitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(session(sess));

// letting us use handlebars
const hbs = exphbs.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.listen(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./controllers/'));

// listening to the our port, making sure we are connect. 
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
    sequelize.sync({ force: false });
});