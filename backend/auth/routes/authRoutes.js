const express = require('express');
const passport = require('passport');

const router = express.Router();

// Google OAuth login
router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

// Google OAuth callback
router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/login', session: false }),
    (req, res) => {
        // Successful authentication
        // You can generate a JWT or set a session here
        res.redirect('/dashboard');
    }
);

// GitHub OAuth login
router.get('/github', passport.authenticate('github', {
    scope: ['user:email']
}));

// GitHub OAuth callback
router.get('/github/callback',
    passport.authenticate('github', { failureRedirect: '/login', session: false }),
    (req, res) => {
        // Successful authentication
        // You can generate a JWT or set a session here
        res.redirect('/dashboard');
    }
);

module.exports = router;