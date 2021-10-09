const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const bcrypt = require('bcrypt');
const db = require('../database');

module.exports = () =>{
    passport.use(new LocalStrategy(
        {
            usernameField : 'id',
            passwordField : 'password'
        },
        function(username,password,done){
            db.query('SELECT id,user_id,password,nickname FROM user WHERE user_id = ?',
            [username],
            (err,results)=>{
                if(err){
                    return done(err);
                }
                if(results[0]?.user_id === username){
                    bcrypt.compare(password, results[0].password, function(err, result) {
                        //만약 password와 results[0].password가 같으면 result = ture
                        if(err){
                            return done(err);
                        }
                        if(result){
                            return done(null, results[0]);
                        }
                        else{
                            return done(null, false, { message: '잘못된 비밀번호를 입력하였습니다.' });
                        }
                    });
                } else {
                    return done(null, false, { message: '존재하지 않는 아이디입니다.' });
                }
            });
        }
    ));
}