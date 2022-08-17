const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

// Schema to create thought model
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            min: 1,
            max: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now(),
        },
        // foreign key for this thought's user
        username: {
            type: String,
            required: true,
            ref: 'User',
        },
        // array of nested docs for a reaction schema
        reactions: [reactionSchema],
    },
    // including virtuals in JSON responses
    {
        toJSON: {
            getters: true,
            virtuals: true,
        },
        id: false,
    }
);

// virtual to get formatted timestamp in the api responses
thoughtSchema
    .virtual('timestamp')
    .get(function () {
        // months array to convert .getMonth() to the actual month
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        // internal function to add leading zeros if necessary
        function addZero(i) {
            if (i < 10) { i = "0" + i }
            return i;
        }
        // MMMM DD, YYYY at HH:MM:SS, returned in 24h time
        return `${months[this.createdAt.getMonth()]} ${this.createdAt.getDate()}, ${this.createdAt.getFullYear()} at ${addZero(this.createdAt.getHours())}:${addZero(this.createdAt.getMinutes())}:${addZero(this.createdAt.getSeconds())}`
    });

// virtual to get the number of reactions on a thought in the api responses
thoughtSchema
    .virtual('reactionCount')
    .get(function () {
        return this.reactions.length;
    });

// creating Thought to export
const Thought = model('thought', thoughtSchema);

module.exports = Thought;
