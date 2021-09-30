const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const bcrpyt = require('bcrypt');
const db = require('../database');

module.exports = () =>{
    passport.use(new LocalStrategy(
        {
            usernameField : 'id',
            passwordField : 'password'
        },
        function(username,password,done){
            db.query('SELECT user_id,password,nickname FROM user WHERE user_id = ?',
            [username],
            (err,results)=>{
                if(err){
                    return done(err);
                }
                if(results[0]?.user_id === username){//results[0]?를 통해서 result[0]이 존재하는지 확인
                    if(results[0].password === password){
                        // 이부분은 나중에 bcrpyt을 사용해 해쉬값으로 변경된 패스워드를 비교하는 문장으로 변경해야함 
                        return done(null, results[0])
                    } else {
                        return done(null, false, { message: '잘못된 비밀번호를 입력하였습니다.' });
                    }
                } else {
                    return done(null, false, { message: '존재하지 않는 아이디입니다.' });
                }
            });
        }
    ));
}