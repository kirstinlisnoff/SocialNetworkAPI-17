const User = require('../models/user');
const Thought = require('../models/thought');

module.exports = {
    async getUsers(req, res) {
        try {
            const users = await User.find()
            .populate('friends')
            .populate('thoughts');
            res.json(users);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Error retrieving users' });
        }
    },

    async getSingleUser(req, res) {
        try {
            const user = await User.findById(req.params.userId)
            .populate('friends')
            .populate('thoughts');
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json(user);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Error retrieving user' });
        }
    },

    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.status(201).json(user);
        } catch (err) {
            console.error(err);
            res.status(400).json({ message: 'Error creating user' });
        }
    },

    async updateUser(req, res) {
        try {
            const user = await User.findByIdAndUpdate(req.params.userId, req.body, { 
                new: true 
            });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json(user);
        } catch (err) {
            console.error(err);
            res.status(400).json({ message: 'Error updating user' });
        }
    },

    async deleteUser(req, res) {
        try {
            const user = await User.findByIdAndDelete(req.params.userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            // Also remove user's thoughts
            await Thought.deleteMany({ _id: { $in: user.thoughts } });
            res.json({ message: 'User and associated thoughts deleted' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Error deleting user' });
        }
    },

    async addFriend(req, res) {
        try {
            const user = await User.findByIdAndUpdate(req.params.userId, 
                { $addToSet: { friends: req.params.friendId } },
                { new: true }
            ).populate('friends');
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json(user);
        } catch (err) {
            console.error(err);
            res.status(400).json({ message: 'Error adding friend' });
        }
    },

    async removeFriend(req, res) {
        try {
            const user = await User.findByIdAndUpdate(req.params.userId, 
                { $pull: { friends: req.params.friendId } },
                { new: true }
            ).populate('friends');
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json(user);
        } catch (err) {
            console.error(err);
            res.status(400).json({ message: 'Error removing friend' });
        }
    }
};