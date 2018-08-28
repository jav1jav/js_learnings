/*
this is a comment
*/
list of projects listed chronologically
https://docs.google.com/spreadsheets/d/1kFTCkWu_J5UGQiDwY8VaXqj9jHWvYsGF1mfp9Myd5gQ/edit#gid=0


//*************************
//*************************
//** DIRECTORY STRUCTURE  *
//*************************
//*************************





//*************************
//*************************
//***** NODE EXPRESS ******
//*************************
//*************************

previous projects:
~/GitHub/Solution.Wikistack1
tripplanner-spa-start



//*************************
// ***** initialize a project:
//*************************

npm init -y
git init
create the repo in github, then add it as a remote and then push it

npm install
-dependencies
  * volleyball // or (morgan('dev'))
  * pg
  * express
  * SEQUELIZE
-dev dependencies
  * nodemon
  * webpack
  * webpack-cli

other dependencies =
html-template-tag = for use in tagging html in components with static html


//*************************
// ***** get server running  MIDDLEWARE = app.js
//*************************

const express = require ('express')
const volleyball = require ('volleyball')
const path = require ('path')
const PORT = 3000;
const router = require('./server/router')
// const errorPage = require('.views.error') // if you want to pull in an error page

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
//app.use(express.static('public')) // path.join(__dirname, './public')
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use(volleyball)

app.use(router) //or app.use(require('path for /server/router'))

app.get('/', function(req, res) {
  res.redirect('/someFolderWithARouter')
})


//*************************
// ***** error handling ***
//*************************

// catch 404 (i.e., no route was hit) and forward to error handler
app.use((req, res, next) => {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error catching endware
app.use((err, req, res, next) => {
  console.error(err, typeof next)
  console.error(err.stack)
  res.status(err.status || 500).send(err.message || 'Internal server error.')
})

// handle all errors (anything passed into `next()`)
// app.use((err, req, res, next) => {
//   res.status(err.status || 500);
//   console.error(err);
//   // res.send('Something went wrong: ' + err.message);
//   res.json({ message: err.message });
// });


//*************************
// ***** start the app  ***
//*************************

// testing puppybook, start.js file
const app = require('./app');
const db = require('./db');
const init = async () => {
  try {
    await db.sync();
    app.listen(PORT, () => {
      console.log(`listening on port ${PORT}`);
    });
  } catch (err) {
    console.log('***** error in init, app.js *****')
    console.error(err);
  }
};
init();


// FROM LOGIN PAIR EXERCISE:
db.sync()
  .then(() => {
    console.log('The database is synced!')
    app.listen(PORT, () => console.log(`

      Listening on port ${PORT}
      http://localhost:3000/

    `))
  })




// const init = async () => {
//   await db.sync({ force: false }).then(console.log('database synced'));
//   app.listen(PORT, () => {
//     console.log(`listening on port ${PORT}`);
//   });
// };
// init();


// const init = async () => {
//   //sync creates the table if it does not exist. alter true creates the tables and makes any changes to keep the modules in sync
//   server.listen(PORT, () => {
//     await models.User.sync()
//     await models.Page.sync()
//     console.log(`Server is listening on port ${PORT}!`);
//   });
// }
// init();


// const PORT = 8080
// const server = require('./index') // points to index.js (the main app file) to get the app
// const {db} = require('./db')

// db.sync()
//   .then(() => {
//     server.listen(PORT, () => console.log(`
//         Listening on port ${PORT}
//         http://localhost:${PORT}/
//     `))
//   })







