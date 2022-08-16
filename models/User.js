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
            match: "\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b",
        },
        // foreign key for this user's thoughts
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thoughts',
            },
        ],
        // self-referential foreign key for this user's friends
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Users',
            },
        ],
    },
    // including virtuals in JSON responses
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

// virtual to log friend count in the api responses
userSchema.virtual('friendCount').get(function () {
    // using aggregate to make use of $count
    this.aggregate([
        {
            $match: { _id: this._id },
        },
        {
            $unwind: '$friends',
        },
        {
            $group: {
                _id: null,
                friend_count: { $count: {} },
            },
        },
    ])
        .then((numberOfFriends) => numberOfFriends)
});

// creating User to export
const User = model('user', userSchema);

module.exports = User;
