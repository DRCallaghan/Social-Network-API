const connection = require('../config/connection');
const Thought = require('../models/Thought');
const User = require('../models/User');

const usernames = [
    'Aaran',
    'Aaren',
    'Aarez',
    'Aarman',
    'Aaron',
    'Aaron-James',
    'Aarron',
    'Abdisalam',
    'Abdul',
    'Abdul-Aziz',
    'Abdulbasir',
    'Abdulkadir',
    'Abdulkarem',
    'Smith',
    'Jones',
    'Coollastname',
    'Zinedine',
    'Zion',
    'Zishan',
    'Ziya',
    'Ziyaan',
    'Zohaib',
    'Zohair',
    'Zoubaeir',
    'Zubair',
    'Zubayr',
    'Mark',
    'Tamar',
    'Farish',
    'Sarah',
    'Nathaniel',
    'Parker',
];

let emails = [];

usernames.forEach(el => {
    emails.push(`${el}@mail.com`)
});

let users = [];

// gets all users
const getAllUsers = () => {
    for (i = 0; i < usernames.length; i++) {
        let user = {
            username: usernames[i],
            email: emails[i]
        }
        users.push(user);
    }
    return users;
}

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');

    // drop existing users if they exist
    await User.deleteMany({});

    // drop existing thoughts if they exist
    await Thought.deleteMany({});

    getAllUsers();

    // add users to the collection once all 20 have been created
    await User.collection.insertMany(users);

    // Log out the seed data to indicate what should appear in the database
    console.table(users);
    console.info('Seeding complete! 🌱');
    process.exit(0);
});
