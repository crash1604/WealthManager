const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const db = require('../db');

// Local strategy for username/password login
passport.use(new LocalStrategy(
    async (username, password, done) => {
        try {
            const user = await db.getUserByUsername(username);
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        } catch (err) {
            return done(err);
        }
    }
));

// Serialize user to store in session
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
    try {
        const user = await db.getUserById(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});

module.exports = passport;