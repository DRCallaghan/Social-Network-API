const { Schema, model } = require('mongoose');

// Schema to create User model
const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
            // regex to match an email address
            // match: "\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b",
        },
        // foreign key for this user's thoughts
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought',
            },
        ],
        // self-referential foreign key for this user's friends
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
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

// virtual to log friend count in the api responses
userSchema
    .virtual('friendCount')
    //getter
    .get(function () {
        return this.friends.length;
    });

// creating User to export
const User = model('user', userSchema);

module.exports = User;
