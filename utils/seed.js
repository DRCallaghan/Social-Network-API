const connection = require('../config/connection');
const { User, Thought } = require('../models');
const getRandomUser = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');

    // drop existing users if they exist
    await User.deleteMany({});

    // drop existing thoughts if they exist
    await Thought.deleteMany({});

    // create empty array to hold random users
    const users = [];

    // create 20 random users to be added to the empty users array above
    for (let i = 0; i < 20; i++) {
        users.push(getRandomUser());
    }

    // add users to the collection once all 20 have been created
    await User.collection.insertMany(users);

    // Log out the seed data to indicate what should appear in the database
    console.table(users);
    console.info('Seeding complete! 🌱');
    process.exit(0);
});
