const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const session = require('express-session');
const cookieParser = require('cookie-parser');
const cors = require('cors'); 
const passport = require('passport');
const passportconfig = require('./lib/passport/passport');
passportconfig();
const app = express();

const PostRouter = require('./router/post');
const authRouter = require('./router/auth');
const regiRouter = require('./router/register');

app.set('port', process.env.PORT || 8000);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use('/post', PostRouter);
app.use('/auth',authRouter);
app.use('/register',regiRouter);

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  //에러핸들러
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(8000, () => {
  console.log('Example app listening on port 8000!');
});
