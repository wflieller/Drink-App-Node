module.exports = function(app, passport) {

    var Beer = require('./models/beer.js');
    var Cocktail = require('./models/cocktail.js');

    // normal routes ===============================================================

    // show the home page (will also have our login links)
    app.get('/', function(req, res) {
        res.render('index.ejs'), {
        }
        // Cocktail.find(function(err, cocktails) {
        //     if (err) {
        //         return res.send(err);
        //     }
     
        //     res.render('index.ejs', { cocktails: cocktails});
        //     });

        // Beer.find(function(err, beers) {
        //     if (err) {
        //         return res.send(err);
        //     }
     
        //     res.render('index.ejs', { beers: beers});
        //     });

    });

    // show the about page
    app.get('/about', function(req, res) {
        res.render('about.ejs');
    });
    // show the beers page 
    app.get('/beers', function(req, res) {

        Beer.find(function(err, beers) {
            if (err) {
                return res.send(err);
            }
     
            res.render('beers.ejs', { beers: beers});
            });
    });
    app.post('/beers', function(req, res) {

        var drink = new Beer(req.body);
        drink.save(function(err) {
            if (err) {
                return res.send(err);
            }
        res.redirect('/beers');
        });
    });

    // show a specific beer page 
    app.get('/beers/:id', function(req, res) {

        var id = req.params.id;
        Beer.findById(id, function(err, beer) {
            res.render('beer.ejs', { beer: beer });
        });
    });

    // show the cocktails page 
    app.get('/cocktails', function(req, res) {
        Cocktail.find(function(err, cocktails) {
            if (err) {
                return res.send(err);
            }
     
            res.render('cocktails.ejs', { cocktails: cocktails});
            });
    });
    // post a new cocktail
    app.post('/cocktails', function(req, res) {

        var drink = new Cocktail(req.body);
        
        drink.save(function(err) {
            if (err) {
                return res.send(err);
            }
        res.redirect('/cocktails');
        });
    });

    app.get('/cocktails/:id', function(req, res) {

        var id = req.params.id;
        Cocktail.findById(id, function(err, cocktail) {
            res.render('cocktail.ejs', { cocktail: cocktail });
        });
    });
    app.post('/cocktails/:id', function(req, res) {

        var comment = new comment(req);
        
        comment.save(function(err) {
            if (err) {
                return res.send(err);
            }
        res.redirect('/cocktail/coktail.id');
        });
    });

    // show the search page
    app.get('/search', function(req, res) {
        res.render('search.ejs');
    });


    // PROFILE SECTION =========================
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user : req.user
        });
    });

    // LOGOUT ==============================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

    // locally --------------------------------
        // LOGIN ===============================
        // show the login form
        app.get('/login', function(req, res) {
            res.render('login.ejs', { message: req.flash('loginMessage') });
        });

        // process the login form
        app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

        // SIGNUP =================================
        // show the signup form
        app.get('/signup', function(req, res) {
            res.render('signup.ejs', { message: req.flash('loginMessage') });
        });

        // process the signup form
        app.post('/signup', passport.authenticate('local-signup', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/signup', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

    // facebook -------------------------------

        // send to facebook to do the authentication
        app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

        // handle the callback after facebook has authenticated the user
        app.get('/auth/facebook/callback',
            passport.authenticate('facebook', {
                successRedirect : '/profile',
                failureRedirect : '/'
            }));

    // twitter --------------------------------

        // send to twitter to do the authentication
        app.get('/auth/twitter', passport.authenticate('twitter', { scope : 'email' }));

        // handle the callback after twitter has authenticated the user
        app.get('/auth/twitter/callback',
            passport.authenticate('twitter', {
                successRedirect : '/profile',
                failureRedirect : '/'
            }));


    // google ---------------------------------

        // send to google to do the authentication
        app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

        // the callback after google has authenticated the user
        app.get('/auth/google/callback',
            passport.authenticate('google', {
                successRedirect : '/profile',
                failureRedirect : '/'
            }));

// =============================================================================
// AUTHORIZE (ALREADY LOGGED IN / CONNECTING OTHER SOCIAL ACCOUNT) =============
// =============================================================================

    // locally --------------------------------
        app.get('/connect/local', function(req, res) {
            res.render('connect-local.ejs', { message: req.flash('loginMessage') });
        });
        app.post('/connect/local', passport.authenticate('local-signup', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/connect/local', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

    // facebook -------------------------------

        // send to facebook to do the authentication
        app.get('/connect/facebook', passport.authorize('facebook', { scope : 'email' }));

        // handle the callback after facebook has authorized the user
        app.get('/connect/facebook/callback',
            passport.authorize('facebook', {
                successRedirect : '/profile',
                failureRedirect : '/'
            }));

    // twitter --------------------------------

        // send to twitter to do the authentication
        app.get('/connect/twitter', passport.authorize('twitter', { scope : 'email' }));

        // handle the callback after twitter has authorized the user
        app.get('/connect/twitter/callback',
            passport.authorize('twitter', {
                successRedirect : '/profile',
                failureRedirect : '/'
            }));


    // google ---------------------------------

        // send to google to do the authentication
        app.get('/connect/google', passport.authorize('google', { scope : ['profile', 'email'] }));

        // the callback after google has authorized the user
        app.get('/connect/google/callback',
            passport.authorize('google', {
                successRedirect : '/profile',
                failureRedirect : '/'
            }));

// =============================================================================
// UNLINK ACCOUNTS =============================================================
// =============================================================================
// used to unlink accounts. for social accounts, just remove the token
// for local account, remove email and password
// user account will stay active in case they want to reconnect in the future

    // local -----------------------------------
    app.get('/unlink/local', function(req, res) {
        var user            = req.user;
        user.local.email    = undefined;
        user.local.password = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });

    // facebook -------------------------------
    app.get('/unlink/facebook', function(req, res) {
        var user            = req.user;
        user.facebook.token = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });

    // twitter --------------------------------
    app.get('/unlink/twitter', function(req, res) {
        var user           = req.user;
        user.twitter.token = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });

    // google ---------------------------------
    app.get('/unlink/google', function(req, res) {
        var user          = req.user;
        user.google.token = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });


};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/login');
}