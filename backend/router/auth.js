const express = require('express');
const router = express.Router();
const session = require('express-session');
const passport = require('passport');

router.post('/login',(req,res,next)=>{
    passport.authenticate('local',(err,user,info)=>{
        if(err){
            return next(err);
        }
        if(!user){
            return res.status(400).send({code : 400, payload : info})
        }
        req.logIn(user,(err)=>{
            if(err){
                return next(err);
            }
            return req.session.save((err)=>{
                if(err){
                    return next(err);
                }
                res.status(200).send({code : 200, payload : user});
            })
        })
    })(req,res,next);
});

router.get('/login',(req,res)=>{
    if(req.isAuthenticated && req.user){
        res.status(200).send({code : 200, payload : req.user});
    } else{
        res.status(400).send({code : 400, payload : null});
    }
});

router.get('/logout',(req,res)=>{
    req.logout();
    req.session.save(()=>{
        res.status(200).send({code : 200, payload : null});
    });
});

module.exports = router;