

## Table of Contents

1. Setting up environment

2. Deployment


### Setting up environment

1. Clone project
2. cd client && npm install
3. In project root folder, npm install
4. node setup.js
5. For building sass-files, cd client && run watch-css
6. In project root folder, npm run watch
This will start both backend server with nodemon and webpack frontend server.
Backend-server will run at port 3001, React-client runs on port 3000.

### Deployment
1. cd client && npm run build
2. Commit changes, git push heroku master