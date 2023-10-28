const express = require('express');
const base64 = require('base-64');
const { User } = require('../models');

const authRouts = express();

//  Routes
authRouts.post('/signup', signup);

authRouts.post('/signin', signin);

// callback functions
async function signup(req, res){
    // on a successful account creation ,return a 201 status with the user object in the body.
    //username and password gets sent on the req.body these will get stored in our model
    const { username, password } = req.body;
    // use a usermodel that we created. That is where we are storing the data
    // we are creating a user with the user model
    await User.createWithHashed(username, password);
    res.send(201);
}

async function signin (req, res, next){
    let authorization = req.header('Authorization');
    if(!authorization.startsWith('Basic ')){
        next( new Error('Invalid authorization scheme'));
        return;
    }
    authorization = base64.decode(authorization.replace('Basic ', ''));

    console.log('Basic authorization request', authorization);

    const [username, password] = authorization.split(':');
    let user = await User.findLoggedIn(username, password);
    if(user){
        res.status(200).send({ username: user.username });
        }else{
            next(new Error('Invalid login'));
        }
    }

    module.exports = { authRouts };