const UserService = require('../services/UserService');
const logger = require('../utils/logger');

class UserController {
    async register(req, res) {
        const { personal_info, account_info } = req.body;

        try {
            await UserService.registerUser(personal_info, account_info);
            res.status(201).json({ message: 'User registered successfully' });
        } catch (error) {
            logger.error(`Error in UserController - register: ${error.message}`);
            res.status(500).json({ message: 'Server error' });
        }
    }

    async login(req, res) {
        const { username, password } = req.body;

        try {
            const { token } = await UserService.loginUser(username, password);
            res.status(200).json({ token });
        } catch (error) {
            logger.error(`Error in UserController - login: ${error.message}`);
            res.status(400).json({ message: 'Invalid credentials' });
        }
    }

    async getProfile(req, res) {
        try {
            const user = await UserService.getUserProfile(req.user.user_id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(user);
        } catch (error) {
            logger.error(`Error in UserController - getProfile: ${error.message}`);
            res.status(500).json({ message: 'Server error' });
        }
    }

    async updateProfile(req, res) {
        const { personal_info, account_info } = req.body;

        try {
            await UserService.updateUserProfile(req.user.user_id, personal_info, account_info);
            res.status(200).json({ message: 'Profile updated successfully' });
        } catch (error) {
            logger.error(`Error in UserController - updateProfile: ${error.message}`);
            res.status(500).json({ message: 'Server error' });
        }
    }

    async logout(req, res) {
        // JWT is stateless; therefore, logout can be handled on the client side
        res.status(200).json({ message: 'Logged out successfully' });
    }
}

module.exports = new UserController();
