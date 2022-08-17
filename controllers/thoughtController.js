const Thought = require('../models/Thought');
const User = require('../models/User');

module.exports = {
    // Get all thoughts
    getThoughts(req, res) {
        Thought.find()
            .then(async (thoughts) => {
                const thoughtObj = {
                    thoughts,
                };
                return res.json(thoughtObj);
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    // Get a single thought
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .select('-__v')
            .then(async (thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with that ID' })
                    : res.json({
                        thought,
                    })
            )
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    // create a new thought
    createThought(req, res) {
        Thought.create(req.body)
            // putting this new thought into the relevant user's thought array
            .then((thought) =>
                User.findOneAndUpdate(
                    { username: req.body.username },
                    { $push: { thoughts: thought._id } },
                    { new: true }
                )
            )
            .then((response) =>
                !response
                    ? res.status(404).json({ message: 'Thought created but no such user found' })
                    : res.json(response)
            )
            .catch((err) => res.status(500).json(err));
    },
    // update a thought
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No such thought exists' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    // delete a thought
    deleteThought(req, res) {
        Thought.findOneAndRemove({ _id: req.params.thoughtId })
            // removing this thought from the relevant user's thought array
            .then(() =>
                User.findOneAndUpdate(
                    { thoughts: req.params.thoughtId },
                    { $pull: { thoughts: req.params.thoughtId } },
                    { new: true }
                )
            )
            .then((response) =>
                !response
                    ? res.status(404).json({ message: 'Thought deleted but no such user found' })
                    : res.json(response)
            )
            .catch((err) => res.status(500).json(err));
    },

    // add a reaction to a thought
    addReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res
                        .status(404)
                        .json({ message: 'No thought found with that ID :(' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    // remove a reaction from a thought
    removeReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.body.reactionId } } },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res
                        .status(404)
                        .json({ message: 'No thought found with that ID :(' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
};
