module.exports = ()=>{
    
    const passport = require('passport');
    const db = require('../database');
    const local = require('./localStrategy');

    passport.serializeUser((user,done)=>{
        done(null, user.id); // 아이디는 user_id가 아니고 INT 형식의 id
    });

    passport.deserializeUser((id,done)=>{
        db.query('SELECT id,user_id,password,nickname,about_me FROM user WHERE id = ?',
        [id],
        (err,results)=>{
            if(err){
                console.log(err);
            }
            if(results[0]){
                return done(null,results[0])
            }
        }
        )
    });

    local();
}


