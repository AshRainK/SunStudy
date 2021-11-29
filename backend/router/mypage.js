const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../lib/database');
const router = express.Router();
const session = require('express-session');
const saltRounds = 10;
const passport = require('passport');

router.patch("/update/aboutme",(req,res,next)=>{
    const aboutme = req.body.aboutme;
    db.query(`UPDATE user SET about_me = ? WHERE id = ?`,
    [aboutme,req.user.id],
    (err)=>{
        if(err){
            next(err);
        }
        db.query(`SELECT id,user_id,nickname,about_me FROM user WHERE id = ?`,
        [req.user.id],
        (err,user_result)=>{
            if(err){
                next(err);
            }
            db.query('SELECT genre FROM genre WHERE id = ?',
            [req.user.id],
            (err,genre_result)=>{
                if(err){
                    next(err);
                }
                res.status(200).send({code : 200, payload : {user : user_result[0], genres : genre_result}});
            });
        });
    });
});

module.exports = router;