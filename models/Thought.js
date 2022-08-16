const { Schema, model } = require('mongoose');

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
        // self-referential foreign key for this user's friends
        reactions: [reactionSchema],
    },
    // including virtuals in JSON responses
    {
        toJSON: {
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
        // MMMM DD, YYYY at HH:MM:SS, returned in 24h time
        return `${months[this.createdAt.getMonth()]} ${this.createdAt.getDate()}, ${this.createdAt.getFullYear()} at ${this.createdAt.getHours()}:${this.createdAt.getMinutes()}:${this.createdAt.getSeconds()}`
    });

// creating Thought to export
const Thought = model('thought', thoughtSchema);

module.exports = Thought;
