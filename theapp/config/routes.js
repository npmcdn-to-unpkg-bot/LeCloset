var express = require('express');
var router = express.Router();
var passport = require('passport');


// Require controllers.
var usersController = require('../controllers/users_controller');
var productsController = require('../controllers/products_controller');
var retailersController = require('../controllers/retailers_controller');

// var authController = require('../controllers/auth_controller');

/* GET users listing. */
router.get('/', usersController.home);

// google oauth login route
router.get('/auth/google', passport.authenticate(
  'google',
  { scope: ['profile', 'email'] }
));

// google oauth callback route
router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect : '/close?action=register',
    failureRedirect : '/'
  }
));

// successRedirect will go to a new path that will contain logic inside of its controller that determines whether or not the user exists.
// If the user exists they will go to "/close?action=login".
// If the user does not exist they will go to "/close?action=register"
// In Main.js line 8:  IF close?action=login THEN redirect to products page
// In Main.js line 8:  IF close?action=register THEN close window.


// OAuth logout route
router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

// eventually needs authController.verify
router.get('/users/:id', usersController.show);
// closes any window sent to this route
router.get('/close', usersController.close);
// eventually needs authController.verify
router.get('/users/:id', usersController.edit);
router.put('/users/:id', usersController.update);
router.delete('/users/:id', usersController.destroy);

router.get('/products/', productsController.index);
router.get('/products/:id', productsController.show);
router.put('/products/:id', productsController.update);
router.delete('/products/:id', productsController.destroy);


router.put('/retailers', retailersController.create);
router.delete('/retailers', retailersController.destroy);

module.exports = router;