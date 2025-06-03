const Thought = require('../models/thought');
const User = require('../models/user');

module.exports = {
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find()
            res.json(thoughts);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Error retrieving thoughts' });
        }
    },  

    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findById(req.params.thoughtId)
            .populate('reactions');
            if (!thought) {
                return res.status(404).json({ message: 'Thought not found' });
            }
            res.json(thought);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Error retrieving thought' });
        }
    },

    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            await User.findByIdAndUpdate(
                req.body.userId,
                { $push: { thoughts: thought._id } },
                { new: true }
            );
            res.status(201).json(thought);
        } catch (err) {
            console.error(err);
            res.status(400).json({ message: 'Error creating thought' });
        }
    },      

    async updateThought(req, res) {
        try {
            const thought = await Thought.findByIdAndUpdate(
                req.params.thoughtId,
                req.body,
                { new: true, runValidators: true }
            );
            if (!thought) {
                return res.status(404).json({ message: 'Thought not found' });
            }
            res.json(thought);
        } catch (err) {
            console.error(err);
            res.status(400).json({ message: 'Error updating thought' });
        }
    },

    async deleteThought(req, res) {
        try {
            const thought = await Thought.findByIdAndDelete(req.params.thoughtId);
            if (!thought) {
                return res.status(404).json({ message: 'Thought not found' });
            }
            await User.findByIdAndUpdate(
                thought.userId,
                { $pull: { thoughts: thought._id } },
                { new: true }
            );
            res.json({ message: 'Thought deleted successfully' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Error deleting thought' });
        }
    },

    async addReaction(req, res) {
        try {
            console.log('Reaction data:', req.body);
            const thought = await Thought.findByIdAndUpdate(
                req.params.thoughtId,
                { $push: { reactions: req.body } },
                { new: true, runValidators: true }
            );
            if (!thought) {
                return res.status(404).json({ message: 'Thought not found' });
            }
            res.json(thought);
        } catch (err) {
            console.error(err);
            res.status(400).json({ message: 'Error adding reaction' });
        }
    },

    async removeReaction(req, res) {
        try {
            const thought = await Thought.findByIdAndUpdate(
                req.params.thoughtId,
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
                { new: true }
            );
            if (!thought) {
                return res.status(404).json({ message: 'Thought not found' });
            }
            res.json(thought);
        } catch (err) {
            console.error(err);
            res.status(400).json({ message: 'Error removing reaction' });
        }
    }
};  