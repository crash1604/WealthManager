const mongoose = require('mongoose'); // Add this line
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserDAO = require('../dao/UserDAO');
const logger = require('../utils/logger');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

class UserService {
    async registerUser(personalInfo, accountInfo) {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(accountInfo.password_hash, salt);

            const user = {
                user_id: new mongoose.Types.ObjectId().toString(), // This is where mongoose is needed
                personal_info: personalInfo,
                account_info: {
                    ...accountInfo,
                    password_hash: hashedPassword,
                    registration_date: new Date()
                }
            };

            return await UserDAO.createUser(user);
        } catch (error) {
            logger.error(`Error in UserService - registerUser: ${error.message}`);
            throw error;
        }
    }

    async loginUser(username, password) {
        try {
            const user = await UserDAO.findUserByUsername(username);
            if (!user) {
                throw new Error('Invalid credentials');
            }

            const isMatch = await bcrypt.compare(password, user.account_info.password_hash);
            if (!isMatch) {
                throw new Error('Invalid credentials');
            }

            const token = jwt.sign({ user_id: user.user_id }, JWT_SECRET, { expiresIn: '1h' });
            user.account_info.last_login = new Date();
            await UserDAO.updateUser(user.user_id, { account_info: user.account_info });

            return { token };
        } catch (error) {
            logger.error(`Error in UserService - loginUser: ${error.message}`);
            throw error;
        }
    }

    async getUserProfile(userId) {
        try {
            return await UserDAO.findUserById(userId);
        } catch (error) {
            logger.error(`Error in UserService - getUserProfile: ${error.message}`);
            throw error;
        }
    }

    async updateUserProfile(userId, personalInfo, accountInfo) {
        try {
            if (accountInfo && accountInfo.password_hash) {
                const salt = await bcrypt.genSalt(10);
                accountInfo.password_hash = await bcrypt.hash(accountInfo.password_hash, salt);
            }

            return await UserDAO.updateUser(userId, { personal_info: personalInfo, account_info: accountInfo });
        } catch (error) {
            logger.error(`Error in UserService - updateUserProfile: ${error.message}`);
            throw error;
        }
    }
}

module.exports = new UserService();
