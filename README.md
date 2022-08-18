# Social Network API

  ## Licensing:
  [![license](https://img.shields.io/badge/license-MIT_License-blue)](https://shields.io/)

  See the licensing file for more information about this project's copyright information.

  ## Table of Contents
  - [Description](#description)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Contribution](#contribution)
  - [Testing](#testing)
  - [Additional Info](#additional-info)

  ## Description:
  - This project was built to create posts and relationships between multiple users on a social media app.
  - This project solves the backend for any social media app in a basic way.
  - I learned how to properly format an API on the backend by working on this project. I also learned about how to set up multiple api requests in Insomnia at the same time. Additionally, this project helped solidify my knowledge of mongoDB and its operators.
  - My project stands out for its easy to change formatting, especially in regards to the multiple timestamp formats.

  ## Installation:
  To use this backend API, pull down this code into your editor. Then, run `npm i` to install all dependencies. From there, if you need sample data, you can run `npm run seed`. Afterwards, running `npm start` will launch the server. Alternatively, you can follow this [video walkthrough](https://drive.google.com/file/d/118-mHPec93E7H033jzXtA20Stsm3RTgQ/view?usp=sharing).

  ## Usage:
  Once this project is installed, you can use several routes for either Users, Thoughts, Friends, or Reactions. Available routes for Users include a GET for all users, GET for one user, POST one new user, PUT to update one user, and DELETE for one user. For GET all and POST, the route is `/api/users/`. For GET one, PUT, and DELETE, the route is `/api/users/:userId`. Available routes for Thoughts are identical to those for Users, but with `/api/thoughts/` rather than `/api/users/`. Available routes for Friends are a POST and DELETE, with POST accessible via `/api/users/:userId/friends/:friendId`, where :friendId is the user Id of the user who is being followed. Available routes for Reactions are a POST and DELETE accessible via `/api/thoughts/:thoughtId/reactions`. Alternatively, you can refer to this [video walkthrough](https://drive.google.com/file/d/118-mHPec93E7H033jzXtA20Stsm3RTgQ/view?usp=sharing).

  ## Outside Resources
  There were no collaborators on this project. My information can be found in Additional Info.
  Third-party assets used in this project are as follows:
  - [Node.js](https://nodejs.org/en/)
  - [Express.js](https://www.npmjs.com/package/express)
  - [Mongoose](https://www.npmjs.com/package/mongoose)
  - [MongoDB](https://www.mongodb.com/)

  ## Contribution
  There are no guidelines for contribution as this project is closed.

  ## Additional Info
  - Github: [DRCallaghan](https://github.com/DRCallaghan)
  - Email: dennis.callaghan87@gmail.com

  If you would like to reach me for additional questions on this project, you can send me an email at the address listed above. Please title your email "Social Network API - Additional Questions" so I know to reply.