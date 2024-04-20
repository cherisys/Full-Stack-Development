const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router();
const mongoose = require('mongoose')
const db = "mongodb://eventhubu:eventhubp09@ds147033.mlab.com:47033/eventhub"

const User = require('../models/user')

mongoose.connect(db,err=>{
    if(err){
        console.error('Error! ' + err);
    }else{
        console.log('Connected to MongoDB');
    }
})

function verifyToken(req,res,next){
    if(!req.headers.authorization){
        return res.status(401).send("Unauthorized Request")
    }
    
    let token = req.headers.authorization.split(' ')[1];
    if(token === 'null'){
        return res.status(401).send("Unauthorized Request")
    }
    
    let payload = jwt.verify(token,"secretKey",(err,decoded)=>{
        if(err) return null;
        else return decoded;
    });
    
    if(!payload){
        return res.status(401).send("Unauthorized Request")
    }

    req.userId = payload.signature
    next()
}

router.get('/',(req,res)=>{
    res.send("From API router");
});

router.post('/register',(req,res)=>{
    let userData = req.body
    let user = new User(userData)
    user.save((error,registeredUser)=>{
        if(error) 
            console.error('Error! ' + error)
        else 
        {
            let payload = {signature: registeredUser._id}
            let token = jwt.sign(payload,"secretKey")
            res.status(200).send({token})
        }
    })
})

router.post('/login',(req,res)=>{
    let userData = req.body
    User.findOne({email:userData.email},(error,user)=>{
        if(error) console.error(error);
        else
        {
            if(!user){
                res.status(401).send("Invalid Email");
            }
            else if(user.password !== userData.password){
                res.status(401).send("Invalid Password");
            }
            else
            {
                let payload = {signature: user._id}
                let token = jwt.sign(payload,"secretKey")
                res.status(200).send({token})
            }
        }
    })
})

router.get('/events',(req,res)=>{
    let events = [
        {
          "_id": "1",
          "name": "Auto Expo",
          "description": "lorem ipsum",
          "date": "2012-04-23T18:25:43.511Z"
        },
        {
          "_id": "2",
          "name": "Auto Expo",
          "description": "lorem ipsum",
          "date": "2012-04-23T18:25:43.511Z"
        },
        {
          "_id": "3",
          "name": "Auto Expo",
          "description": "lorem ipsum",
          "date": "2012-04-23T18:25:43.511Z"
        },
        {
          "_id": "4",
          "name": "Auto Expo",
          "description": "lorem ipsum",
          "date": "2012-04-23T18:25:43.511Z"
        },
        {
          "_id": "5",
          "name": "Auto Expo",
          "description": "lorem ipsum",
          "date": "2012-04-23T18:25:43.511Z"
        },
        {
          "_id": "6",
          "name": "Auto Expo",
          "description": "lorem ipsum",
          "date": "2012-04-23T18:25:43.511Z"
        }
    ]

    res.json(events)
});

router.get('/specials', verifyToken, (req,res)=>{
    let specialEvents = [
        {
          "_id": "1",
          "name": "Auto Expo Special",
          "description": "lorem ipsum",
          "date": "2012-04-23T18:25:43.511Z"
        },
        {
          "_id": "2",
          "name": "Auto Expo Special",
          "description": "lorem ipsum",
          "date": "2012-04-23T18:25:43.511Z"
        },
        {
          "_id": "3",
          "name": "Auto Expo Special",
          "description": "lorem ipsum",
          "date": "2012-04-23T18:25:43.511Z"
        },
        {
          "_id": "4",
          "name": "Auto Expo Special",
          "description": "lorem ipsum",
          "date": "2012-04-23T18:25:43.511Z"
        },
        {
          "_id": "5",
          "name": "Auto Expo Special",
          "description": "lorem ipsum",
          "date": "2012-04-23T18:25:43.511Z"
        },
        {
          "_id": "6",
          "name": "Auto Expo Special",
          "description": "lorem ipsum",
          "date": "2012-04-23T18:25:43.511Z"
        }
      ]
      res.json(specialEvents)
});

module.exports = router