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
            return res.redirect('/auth/login');
        }
        req.logIn(user,(err)=>{
            if(err){
                return next(err);
            }
            return req.session.save(()=>{
                res.redirect('/');
            })
        })
    })
});

router.get('/login',(req,res)=>{
    // 어떻게 짜지?
});

router.get('/logout',(req,res)=>{
    req.logout();
    req.session.save(()=>{
        res.redirect('/');
    });
});
