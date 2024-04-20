1. Setup Express Server
    a) create server folder
    b) on server folder, run npm init --yes, this will generate package.json
    c) on server folder, run npm install express body-parser --save
    d) express is our web server and body parser is middleware to handle forms data.
    e) create server.js file in server folder.
    f) on server folder, run command node server.
    g) to keep, apis separately; create routes-->api.js
    h) Allow cors, npm install --save cors
    i) npm install jsonwebtoken --save
2. Setup MongoDB
    a) Signup to mlab.com
    b) Create a database
    c) create collection
    d) create database user
    e) on server folder, run npm install --save mongoose
    f) Mongoose is an ODM for mongodb.
    g) on server folder, create models --> user.js
3. Create RESTful APIs
    a) Register new user
    b) Login user
    c) Fetch regular events
    d) Fetch special events
4. Test using Postman
5. Angular App using Angular CLI
6. Autheticating the Angular App
