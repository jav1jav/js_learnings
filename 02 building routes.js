
//*************************
// ***** build routes   ***
//*************************

// build a router
const express = require("express");
const router = express.Router();

// access to database models
const models = require("../models"); //or dbs
const Page = models.Page;
const User = models.User;

// access to views
const { userList, userPages } = require("../views");
//this is from wikistack which was pre-react

//***** GET *****
// * for apis
// * to send 'views'
// * to call react components


router.get("/", async (req, res, next) => { //from wikistack
  try {
    const users = await User.findAll();
    res.send(userList(users)); //users list was a view
  } catch (error) { next(error) }
});

router.get('/:userId', async (req, res, next) => { //from wikistack
  try {
    const user = await User.findById(req.params.userId);
    const pages = await Page.findAll({
      where: {
        authorId: req.params.userId
      }
    });
    res.send(userPages(user, pages));
  } catch (error) {
    next(error);
  }
});


//***** POST *****
// * getting things from forms  so wikistack had a forms
// * the express checkpoint had posts and you had trouble wih the posts


router.post('/', async (req, res, next) => {
  try {
    console.log('inside post /');

    // REMEMBER THAT FIND AND FINDORCREATE ALWAYS RETURN TUPPLES WITH A TRUTH VALUE
    const [user, wasCreated] = await User.findOrCreate({
      where: {
        name: req.body.name,
        email: req.body.email
      }
    });
    console.log('************************');
    console.log(req.body);
    const page = await Page.create(req.body);

    page.setAuthor(user);

    res.redirect('/wiki/' + page.slug);
  } catch (error) {
    next(error);
  }
});

router.post('/:slug', async (req, res, next) => {
  try {
    console.log('inside post /:slug');
    const [updatedRowCount, updatedPages] = await Page.update(req.body, {
      where: {
        slug: req.params.slug
      },
      returning: true
    });

    res.redirect('/wiki/' + updatedPages[0].slug);
  } catch (error) {
    next(error);
  }
});


//***** PUT *****

//
const router = require('express').Router();
const { User } = require('./db');
module.exports = router;

// auth routes go below!
router.put('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
        password: req.body.password
      }
    });
    if (user) {
      res.json(user);
    } else {
      const err = new Error('Incorrect email or password');
      err.status = 401;
      next(err);
    }
  } catch (error) {
    next(error);
  }
});


//***** DELETE *****


router.get('/:slug/delete', async (req, res, next) => {
  try {
    await Page.destroy({
      where: {
        slug: req.params.slug
      }
    });

    res.redirect('/wiki');
  } catch (error) {
    next(error);
  }
});
