const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    provider: {
        type: String,
        enum: ['google', 'github'],
        required: true,
    },
    providerId: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        lowercase: true,
        trim: true,
        required: true,
        unique: true,
    },
    name: String,
    avatar: String,
    createdAt: {
        type: Date,
        default: Date.now,
    },
    lastLogin: Date,
});

module.exports = mongoose.model('User', userSchema);