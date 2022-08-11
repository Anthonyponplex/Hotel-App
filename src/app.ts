import createError from'http-errors';
import express, { Request, Response, NextFunction} from 'express';
import path from 'path';
// import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import listingsRouter from "./routes/listings";
import pagesRouter from './routes/pages';
import usersRouter from './routes/users';
import db from './config/databaseConfig'

// dotenv.config()


db.sync({force:true}).then(()=>{
  console.log('Database connected successfully')
}).catch(err=>{
  console.log(err)
})


const app = express();

// view engine setup
app.set('views', path.join(__dirname, "..", 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,"..", 'public')));

app.use('/hotel', usersRouter);
app.use('/users', listingsRouter);
app.use("/", pagesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err: createError.HttpError, req: Request, res: Response, next: NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;