const { Schema, model } = require('mongoose');

// Schema to create Reaction model
const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            min: 1,
            max: 280,
        },
        // foreign key for this reaction's user
        username: {
            type: String,
            required: true,
            ref: 'User',
        },
        createdAt: {
            type: Date,
            default: Date.now(),
        },
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
reactionSchema
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

module.exports = reactionSchema;
