const express = require("express");
const router = express.Router();
const util = require("../lib/auth_util");
const db = require("../lib/database");

//Create
router.post("/create", (req, res, next) => {
  // DB에 저장하고 쿼리문을 통해 결과물 전송
  /*
    if(!util.IsOwner(req,res)){
        return res.status(400).send({code : 400, payload : '로그인이 필요합니다.'});
    }
    */
  const { post_num, comment } = req.body;
  db.query(
    `INSERT INTO comment(comment,written_date,post_num,id)
    VALUES(?,NOW(),?,?)`,
    [comment, post_num, 201710939],
    (err) => {
      if (err) {
        next(err);
      }
    }
  );
  db.query(
    `SELECT post_num,comment_num,comment,written_date,updated_date,comment.id as commenter,nickname FROM comment LEFT JOIN user on comment.id = user.id WHERE post_num = ? ORDER BY written_date DESC`,
    [post_num],
    (err, result) => {
      if (err) {
        next(err);
      }
      res.status(201).send({ code: 201, payload: result });
    }
  );
});

//UPDATE
router.patch("/update", (req, res, next) => {
  /*
    if(!util.IsOwner(req,res)){
        return res.status(400).send({code : 400, payload : '로그인이 필요합니다.'});
    }
    */
  const { comment_num, comment } = req.body;
  db.query(`SELECT id AS commenter FROM comment WHERE comment_num = ?`, [comment_num], (err, result) => {
    if (err) {
      next(err);
    }
    //if(result[0].commenter !== 201710939){
    //return res.status(400).send({code : 400, payload : "다른 사용자가 작성한 댓글입니다."})
    //} else {
    db.query(`UPDATE comment SET comment=?,updated_date=NOW() WHERE comment_num = ?`, [comment, comment_num], (err) => {
      if (err) {
        next(err);
      }
    });
    db.query(`SELECT post_num FROM comment WHERE comment_num = ?`,
    [comment_num],
    (err,result)=>{
      db.query(
        `SELECT post_num,comment_num,comment,written_date,updated_date,comment.id as commenter,nickname FROM comment LEFT JOIN user on comment.id = user.id WHERE post_num = ? ORDER BY written_date DESC`,
        [result[0].post_num],
        (err, result) => {
          if (err) {
            next(err);
          }
          res.status(200).send({ code: 200, payload: result });
        }
      );
    })
    //}
  });
});

//DELETE
router.delete("/:comment_num", (req, res, next) => {
  /*
    if(!util.IsOwner(req,res)){
        return res.status(400).send({code : 400, payload : '로그인이 필요합니다.'});
    }
    */
  db.query(`SELECT id AS commenter FROM comment WHERE comment_num = ?`, [req.params.comment_num], (err, result) => {
    if (err) {
      next(err);
    }
    //if(result[0].commenter !== 201710939){
    //return res.status(400).send({code : 400, payload : "다른 사용자가 작성한 댓글입니다."})
    //} else {
  db.query(`SELECT post_num FROM comment WHERE comment_num = ?`,
  [req.params.comment_num],
  (err,results)=>{
    db.query(`DELETE FROM comment WHERE comment_num = ?`, [req.params.comment_num], (err) => {
      if (err) {
        next(err);
      }
    });
    db.query(
    `SELECT post_num,comment_num,comment,written_date,updated_date,comment.id as commenter,nickname FROM comment LEFT JOIN user on comment.id = user.id WHERE post_num = ? ORDER BY written_date DESC`,
    [results[0].post_num],
    (err, result) => {
      if (err) {
        next(err);
      }
      res.status(200).send({ code: 200, payload: result });
    });
  });
    //}
  });
});

//READ
router.get("/:post_num", (req, res, next) => {
  db.query(
    `SELECT post_num,comment_num,comment,written_date,updated_date,comment.id as commenter,nickname FROM comment LEFT JOIN user on comment.id = user.id WHERE post_num = ? ORDER BY written_date DESC`,
    [req.params.post_num],
    (err, result) => {
      if (err) {
        next(err);
      }
      res.status(200).send({ code: 200, payload: result });
    }
  );
});
module.exports = router;
