const express = require("express");
const router = express.Router();
const util = require("../lib/auth_util");
const db = require("../lib/database");

//Create
router.post("/create", (req, res, next) => {
  // DB에 저장하고 쿼리문을 통해 결과물 전송
  if (!util.IsOwner(req, res)) {
    return res.status(400).send({ code: 400, payload: "로그인이 필요합니다." });
  }
  const { title, artist, post_body, genre, rating, url } = req.body;
  let insert_url;
  if (url === "") {
    insert_url = url;
  } else {
    insert_url = "https://www.youtube.com/embed/" + url.split("/")[3];
  }
  db.query(
    `INSERT INTO post(title,artist,rating,url,post_body,created_date,id,genre) 
    VALUES(?,?,?,?,?,NOW(),?,?);`,
    [title, artist, rating, insert_url, post_body, req.user.id, genre],
    (err) => {
      if (err) {
        next(err);
      }
      db.query(
        `SELECT post_num,artist,title,rating,url,post_body,created_date,updated_date,post.id as writer_id, genre, nickname FROM post LEFT JOIN user on post.id = user.id WHERE title = ? and post_body = ? ORDER BY created_date DESC;`,
        [title, post_body],
        (err, results) => {
          if (err) {
            next(err);
          }
          res.status(201).send({ code: 201, payload: results[0] });
        }
      );
    }
  );
});

//UPDATE
router.patch("/update", (req, res, next) => {
  const { post_num, artist, post_body, title, genre, rating, url } = req.body;
  let updated_url;
  if (url === "") {
    updated_url = url;
  } else if (url.split("/")[3] === "embed") {
    updated_url = url;
  } else {
    updated_url = "https://www.youtube.com/embed/" + url.split("/")[3];
  }
  if (!util.IsOwner(req, res)) {
    return res.status(400).send({ code: 400, payload: "로그인이 필요합니다." });
  }
  db.query(`SELECT * from post WHERE post_num = ?;`, [post_num], (err, results) => {
    if (results[0].id !== req.user.id) {
      return res.status(400).send({ code: 400, payload: "다른 사람이 작성한 글이므로 수정 할 수 없습니다." });
    } else {
      db.query(
        `UPDATE post SET title=?, artist=?, post_body=?, updated_date=NOW(), genre=?, rating=?, url=? WHERE post_num = ?;`,
        [title, artist, post_body, genre, rating, updated_url, post_num],
        (err) => {
          if (err) {
            next(err);
          }
          db.query(
            `SELECT post_num,artist,rating,title,url,post_body,created_date,updated_date,post.id as writer_id, genre,nickname FROM post LEFT JOIN user on post.id = user.id WHERE post_num = ?;`,
            [post_num],
            (err, result) => {
              if (err) {
                next(err);
              }
              res.status(201).send({ code: 201, payload: result[0] });
            }
          );
        }
      );
    }
  });
});

//DELETE
router.delete("/:post_num", (req, res, next) => {
  if (!util.IsOwner(req, res)) {
    return res.status(400).send({ code: 400, payload: "로그인이 필요합니다." });
  }
  db.query(`SELECT * FROM post WHERE post_num = ?;`, [req.params.post_num], (err, results) => {
    if (results[0].id !== req.user.id) {
      return res.status(400).send({ code: 400, payload: "다른 사람이 작성한 글이므로 삭제 할 수 없습니다." });
    } else {
      db.query(`DELETE FROM post WHERE post_num = ?;`, [req.params.post_num], (err) => {
        if (err) {
          next(err);
        }
        res.status(200).send({ code: 200, payload: "삭제가 완료 되었습니다." });
      });
    }
  });
});

//READ
router.get("/:post_num", (req, res, next) => {
  db.query(
    `SELECT post_num,artist,title,rating,url,post_body,created_date,updated_date,id as writer_id,genre FROM post WHERE post_num = ?;`,
    [req.params.post_num],
    (err, result) => {
      if (err) {
        next(err);
      }
      if (result.length == 0) {
        res.status(404).send({ code: 404, payload: "게시글을 찾을 수 없습니다." });
      }
      db.query(
        `SELECT user.id,user_id,nickname FROM user LEFT JOIN post on user.id = post.id WHERE post_num = ?;`,
        [req.params.post_num],
        (err, user_result) => {
          if (err) {
            next(err);
          }
          res.status(200).send({ code: 200, payload: { ...result[0], nickname: user_result[0].nickname } });
        }
      );
    }
  );
});

//Recent
router.get("/", (req, res, next) => {
  let count = req.query.count ? req.query.count : 20;
  db.query(
    `SELECT post.post_num,artist,title,rating,url,post_body,created_date,post.updated_date,post.id as writer_id,post.genre,post.nickname,count(comment.post_num) as comment_count FROM (SELECT post.post_num,artist,rating,title,url,post_body,created_date,post.updated_date,post.id,post.genre,nickname FROM post LEFT  JOIN user on post.id = user.id) AS post LEFT JOIN comment on post.post_num = comment.post_num GROUP BY post_num ORDER BY post_num DESC LIMIT ${count}`,
    (err, result) => {
      if (err) {
        next(err);
      }
      res.status(200).send({ code: 200, payload: result });
    }
  );
});

module.exports = router;
