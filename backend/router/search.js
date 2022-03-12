const express = require("express");
const router = express.Router();
const db = require("../lib/database");

router.get('/',(req,res,next)=>{
    let title = req.query.tl ? "%"+req.query.tl+"%" : "%%";
    let artist = req.query.arti ? req.query.arti : "%%";
    let body = req.query.body ? "%"+req.query.body+"%" : "%%";
    let genre = req.query.genre ? req.query.genre : "%%";
    let rating = req.query.rate ? req.query.rate : 0;
    db.query(
    'SELECT post.post_num,artist,title,rating,url,post_body,created_date,post.updated_date,post.id as writer_id,post.genre,post.nickname,count(comment.post_num) as comment_count FROM (SELECT post.post_num,artist,title,rating,url,post_body,created_date,post.updated_date,post.id,post.genre,nickname FROM post LEFT  JOIN user on post.id = user.id) AS post LEFT JOIN comment on post.post_num = comment.post_num WHERE title LIKE ? and artist LIKE ? and post_body LIKE ? and genre LIKE ? and rating >= ? GROUP BY post_num  ORDER BY post.created_date DESC',
    [title,artist,body,genre,rating],
    (err,result)=>{
        if(err){
            next(err);
        }
        res.status(200).send({code : 200, payload : result});
    });
});
module.exports = router;