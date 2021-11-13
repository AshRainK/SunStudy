const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../lib/database');
const router = express.Router();
const session = require('express-session');
const saltRounds = 10;

router.post('/check_id',(req,res,next)=>{
    const id = req.body.id;
    db.query(`SELECT id FROM user WHERE user_id = ?;`,
    [id],
    (err,results)=>{
        if(err){
            next(err);
        }
        if(results[0]){
            res.json({already_exist : true});
        }else{
            res.json({already_exist : false});
        }
    });
})

router.post('/check_nickname',(req,res,next)=>{
    const nickname = req.body.nickname;
    db.query(`SELECT id FROM user WHERE nickname = ?;`,
    [nickname],
    (err,results)=>{
        if(err){
            next(err);
        }
        if(results[0]){
            res.json({already_exist : true});
        }else{
            res.json({already_exist : false});
        }
    });
})


router.post('/',(req,res)=>{
    const {id, password, nickname} = req.body // id,password,nickname으로 받아온다고 가정.
    bcrypt.hash(password, saltRounds, function(err, hash) {
        if(err){
            res.status(409).send({code:409, data : err})
        }
        db.query("INSERT INTO user(user_id,password,nickname) VALUES (?,?,?);",
        [id,hash,nickname],
        (err2)=>{
            if(err2){
                res.status(400).send({code:400, data : err2});
            }
        });
    });
    
    db.query(`SELECT * FROM user WHERE user_id = ?`,
    [id],
    (err,result)=>{
        if(err){
            next(err);
        }
        let user = result[0];
        req.logIn(user,(err)=>{
            if(err){
                return next(err);
            }
            return req.session.save((err)=>{
                if(err){
                    return next(err);
                }
                res.status(200).send({code : 200, data : user});
            })
        })
    })
})

module.exports = router;