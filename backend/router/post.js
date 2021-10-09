const express = require('express');
const router = express.Router();
const util = require('../lib/auth_util');
const db = require('../lib/database');

//Create
router.post('/create', (req, res, next) => { // DB에 저장하고 쿼리문을 통해 결과물 전송
    if(!util.IsOwner(req,res)){
        return res.status(400).send({code : 400, data : '로그인이 필요합니다.'});
    }
    const {title,post_body} = req.body;
    db.query(`INSERT INTO post(title,post_body,created_date,id) 
    VALUES(?,?,NOW(),?);`,
    [title, post_body,req.user.id],
    (err)=>{
        if(err){
            next(err);
        }
        db.query(`SELECT post_num,title,post_body,created_date,updated_date,id as writer_id FROM post WHERE title = ? and post_body = ?;`,
        [title, post_body],
        (err,results)=>{
            if(err){
                next(err);
            }
            res.status(201).send({code : 201, data : results[0]});
        });
    });
});

//UPDATE
router.patch('/update',(req,res,next)=>{
    const {post_num,post_body,title} = req.body;
    if(!util.IsOwner(req,res)){
        return res.status(400).send({code : 400, data : '로그인이 필요합니다.'});
    }
    db.query(`SELECT * from post WHERE post_num = ?;`,
    [post_num],
    (err,results)=>{
        if(results[0].id !== req.user.id){
            return res.status(400).send({code : 400, 
                data : '다른 사람이 작성한 글이므로 수정 할 수 없습니다.'});
        }else{
            db.query(`UPDATE post SET title=?, post_body=?, updated_date=NOW() WHERE post_num = ?;`,
            [title,post_body,post_num],
            (err)=>{
                if(err){
                    next(err);
                }
                db.query(`SELECT post_num,title,post_body,created_date,updated_date,id as writer_id FROM post WHERE post_num = ?;`,
                [post_num],
                (err, result)=>{
                    if(err){
                        next(err);
                    }
                    res.status(201).send({code : 201, data : result[0]});
                });
            });
        }
    });
});

//DELETE
router.delete('/:post_num',(req,res,next)=>{
    if(!util.IsOwner(req,res)){
        return res.status(400).send({code : 400, data : '로그인이 필요합니다.'});
    }
    db.query(`SELECT * FROM post WHERE post_num = ?;`,
    [req.params.post_num],
    (err,results)=>{
        if(results[0].id !== req.user.id){
            return res.status(400).send({code : 400, 
                data : '다른 사람이 작성한 글이므로 삭제 할 수 없습니다.'});
        }else{
            db.query(`DELETE FROM post WHERE post_num = ?;`,
            [req.params.post_num],
            (err)=>{
                if(err){
                    next(err);
                }
                res.status(200).send({code : 200, data : '삭제가 완료 되었습니다.'});
            });
        }
    });
});

//READ
router.get('/:post_num',(req,res,next)=>{
    db.query(`SELECT post_num,title,post_body,created_date,updated_date,id as writer_id FROM post WHERE post_num = ?;`,
    [req.params.post_num],
    (err,result)=>{
        if(err){
            next(err);
        }
        if(result.length==0){
            res.status(404).send({code:404, data : "게시글을 찾을 수 없습니다."});
        }
        db.query(`SELECT user.id,user_id,nickname FROM user JOIN post WHERE post_num = ?;`,
        [req.params.post_num],
        (err,user_result)=>{
            if(err){
                next(err);
            }
            res.status(200).send({code : 200, data : {post : result[0], user : user_result[0]}});
        });
    });
});

module.exports = router;