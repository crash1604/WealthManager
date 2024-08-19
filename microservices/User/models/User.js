const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    user_id: { type: String, unique: true, required: true },
    personal_info: {
        first_name: { type: String, required: true },
        last_name: { type: String, required: true },
        email: { type: String, unique: true, required: true },
        phone_number: { type: String, required: true },
        address: {
            street: { type: String, required: true },
            city: { type: String, required: true },
            state: { type: String, required: true },
            postal_code: { type: String, required: true },
            country: { type: String, required: true }
        },
        date_of_birth: { type: Date, required: true }
    },
    account_info: {
        username: { type: String, unique: true, required: true },
        password_hash: { type: String, required: true },
        registration_date: { type: Date, required: true },
        last_login: { type: Date },
        account_status: { type: String, enum: ['active', 'suspended', 'closed'], default: 'active' }
    }
});

module.exports = mongoose.model('User', UserSchema);
