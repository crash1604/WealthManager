const express = require('express');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const cors = require('cors');

require('dotenv').config();

const app = express();

app.use(cors({
    origin: process.env.CLIENT_ORIGIN || 'http://localhost:3000',
    credentials: true,
}));

app.use(session({
    secret: process.env.SESSION_SECRET || 'supersecret',
    resave: false,
    saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

// Serialize and deserialize user
passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((obj, done) => {
    done(null, obj);
});

// Google OAuth Strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL || '/auth/google/callback',
}, (accessToken, refreshToken, profile, done) => {
    // Here you can save/find user in DB if needed
    return done(null, { provider: 'google', id: profile.id, displayName: profile.displayName, emails: profile.emails });
}));

// GitHub OAuth Strategy
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL || '/auth/github/callback',
}, (accessToken, refreshToken, profile, done) => {
    // Here you can save/find user in DB if needed
    return done(null, { provider: 'github', id: profile.id, displayName: profile.displayName, emails: profile.emails });
}));

// Routes
app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/auth/failure', session: true }),
    (req, res) => {
        res.redirect(process.env.AUTH_SUCCESS_REDIRECT || '/auth/success');
    }
);

app.get('/auth/github',
    passport.authenticate('github', { scope: ['user:email'] })
);

app.get('/auth/github/callback',
    passport.authenticate('github', { failureRedirect: '/auth/failure', session: true }),
    (req, res) => {
        res.redirect(process.env.AUTH_SUCCESS_REDIRECT || '/auth/success');
    }
);

app.get('/auth/success', (req, res) => {
    if (req.isAuthenticated()) {
        res.json({ success: true, user: req.user });
    } else {
        res.status(401).json({ success: false });
    }
});

app.get('/auth/failure', (req, res) => {
    res.status(401).json({ success: false, message: 'Authentication failed' });
});

app.get('/auth/logout', (req, res) => {
    req.logout(() => {
        res.json({ success: true });
    });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Auth server running on port ${PORT}`);
});