# socketiopractice

**Below are instructions for using with a react app, assumes have run command to create a new react app using create react app:**

Set up:

install socket io library for the server using npm i [socket.io](http://socket.io)

Also need to install express for setting up server and then write code for sever (could use express generator if being lazy)

need to install socket.io library in react app client side (front end)

install using npm i socket.io-client

Example github repo is for a simple webchat app, **NB has material UI installed for some additional front end elements**

Also please note server and client front end need to run on separate ports otherwise app cannot run as both trying to use same port

Package versions used:

├── express@4.18.1
├── nodemon@2.0.19
└── socket.io@4.5.1

NB: Material UI is out of date with latest react version - will need to force install to use, no issues so far with using it

To run:

Run following commands in both server and web folders: npm start - will spin up server and launch front end
To test chat functionality open two browser windows (one in incognito mode) and you can have two chat windows that can send messages to each other and also record a chat log of all the messages sent so far
