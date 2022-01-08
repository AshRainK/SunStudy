const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../lib/database');
const router = express.Router();
const session = require('express-session');
const saltRounds = 10;
const passport = require('passport');

router.patch("/aboutme",(req,res,next)=>{
    const aboutme = req.body.aboutme;
    db.query(`UPDATE user SET about_me = ? WHERE id = ?;`,
    [aboutme,req.user.id],
    (err)=>{
        if(err){
            next(err);
        }
        db.query(`SELECT id,user_id,nickname,about_me FROM user WHERE id = ?;`,
        [req.user.id],
        (err,user_result)=>{
            if(err){
                next(err);
            }
            db.query('SELECT genre FROM genre WHERE id = ?;',
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

router.patch("/password",(req,res,next)=>{
    const id = req.user.id;
    const {old_Password,new_Password} = req.body;
    db.query(`SELECT * FROM user WHERE id = ?;`,
    [id],
    (err, results)=>{
        if(err){
            next(err);
        }
        bcrypt.compare(old_Password,results[0].password,(err,result)=>{
            if(err){
                next(err);
            }
            if(!result){
                res.status(400).send({code : 400, payload : "현재 비밀번호가 틀립니다."});
            }else{
                bcrypt.hash(new_Password,saltRounds,(err2,hash)=>{
                    if(err2){
                        next(err2);
                    }
                    db.query(`UPDATE user SET password = ? WHERE id = ?;`,
                    [hash,id],
                    (err3,result)=>{
                        if(err3){
                            next(err3);
                        }
                        res.status(201).send({code : 201, payload : "비밀번호가 변경 되었습니다."});
                    })
                });
            }
        });
    });
});

router.patch("/nickname",(req,res,next)=>{
    const id = req.user.id;
    const nickname = req.body.nickname;
    db.query(`UPDATE user SET nickname = ? WHERE id = ?;`,
    [nickname,id],
    (err)=>{
        if(err){
            next(err);
        }
        res.status(201).send({code : 201, payload : "닉네임이 변경 되었습니다."});
    })
});

router.patch("/genre",(req,res,next)=>{
    const genre = req.body.genre;
    const id = req.user.id;
    db.query(`DELETE FROM genre WHERE id = ?;`,
    [id],
    (err)=>{
        if(err){
            next(err);
        }
    });
    for(let i=0; i<genre.length; i++){
        db.query(`INSERT INTO genre(genre,id) VALUES(?,?);`,
        [genre[i],id],
        (err)=>{
            if(err){
                next(err);
            }
        });
    };
    res.status(201).send({code : 201 , payload : "선호 장르 업데이트가 완료 되었습니다."});
});

router.get("/",(req,res,next)=>{
    const id = req.user.id;
    db.query(`SELECT * FROM user WHERE id = ?;`,
    [id],
    (err,user_result)=>{
        if(err){
            next(err);
        }
        db.query(`SELECT genre FROM genre WHERE id = ?;`,
        [id],
        (err2,genre_result)=>{
            if(err2){
                next(err2);
            }
            res.status(200).send({code : 200, payload : {user : user_result[0], genre : genre_result}});
        })
    });
});

module.exports = router;