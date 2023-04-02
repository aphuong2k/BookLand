const express = require('express');
const handlebars  = require('express-handlebars');
let H = require('just-handlebars-helpers');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const session = require('express-session');
const connectFlash = require('connect-flash');
const fileUpload = require('express-fileupload');
const path = require('path');
const Swal = require('sweetalert2')
const app = express();
const port = 5000; 
// const UserRoutes = require('./routes/user');
// const HomeRoutes = require('./routes/home');
const route = require('./routes');
//const ProfileRoutes = require('./routes/profile');

app.use(express.static(path.join(__dirname + '/public')));
app.engine('hbs', handlebars.engine({
  extname: '.hbs',
  defaultLayout: 'main',
  helpers:{
    'iff' :(v1,operator,v2,options) => {
      switch (operator) {
        case '==':
            return (v1 == v2) ? options.fn(this) : options.inverse(this);
        case '===':
            return (v1 === v2) ? options.fn(this) : options.inverse(this);
        case '!=':
            return (v1 != v2) ? options.fn(this) : options.inverse(this);
        case '!==':
            return (v1 !== v2) ? options.fn(this) : options.inverse(this);
        case '<':
            return (v1 < v2) ? options.fn(this) : options.inverse(this);
        case '<=':
            return (v1 <= v2) ? options.fn(this) : options.inverse(this);
        case '>':
            return (v1 > v2) ? options.fn(this) : options.inverse(this);
        case '>=':
            return (v1 >= v2) ? options.fn(this) : options.inverse(this);
        case '&&':
            return (v1 && v2) ? options.fn(this) : options.inverse(this);
        case '||':
            return (v1 || v2) ? options.fn(this) : options.inverse(this);
        default:
            return options.inverse(this);
    }
    },
    sum: (a,b) => a + b,
    mul: (a,b) => a*b
  }
}))
app.use(fileUpload());
app.use(cookieParser('secret'));

//config session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // 86400000 1 day
    }
}));
//Enable flash message
app.use(connectFlash());

//Config passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname,'resource','views'))
app.use(methodOverride('_method'));

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

// UserRoutes(app);
// HomeRoutes(app);
route(app);
//ProfileRoutes(app);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  }) 