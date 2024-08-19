const User = require('../models/User');
const logger = require('../utils/logger');

class UserDAO {
    async createUser(userData) {
        try {
            const user = new User(userData);
            await user.save();
            logger.info(`User with ID ${user.user_id} created successfully.`);
            return user;
        } catch (error) {
            logger.error(`Error creating user: ${error.message}`);
            throw error;
        }
    }

    async findUserByUsername(username) {
        try {
            const user = await User.findOne({ 'account_info.username': username });
            if (!user) {
                logger.warn(`User with username ${username} not found.`);
            } else {
                logger.info(`User with username ${username} retrieved successfully.`);
            }
            return user;
        } catch (error) {
            logger.error(`Error finding user by username: ${error.message}`);
            throw error;
        }
    }

    async findUserById(userId) {
        try {
            const user = await User.findOne({ user_id: userId });
            if (!user) {
                logger.warn(`User with ID ${userId} not found.`);
            } else {
                logger.info(`User with ID ${userId} retrieved successfully.`);
            }
            return user;
        } catch (error) {
            logger.error(`Error finding user by ID: ${error.message}`);
            throw error;
        }
    }

    async updateUser(userId, updateData) {
        try {
            const user = await User.findOneAndUpdate({ user_id: userId }, updateData, { new: true });
            if (!user) {
                logger.warn(`User with ID ${userId} not found for update.`);
            } else {
                logger.info(`User with ID ${userId} updated successfully.`);
            }
            return user;
        } catch (error) {
            logger.error(`Error updating user: ${error.message}`);
            throw error;
        }
    }
}

module.exports = new UserDAO();
