module.exports = (app)=>{
    
    const passport = require('passport');
    const bcrypt = require('bcrypt');
    const db = require('./database');
    LocalStrategy = require('passport-local').Strategy;

    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser((user,done)=>{
        done(null, user.id);
    })

    passport.deserializeUser((id,done)=>{
        db.query('SELECT user_id,password,nickname FROM user WHERE user_id = ?',
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
    })

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
                if(results[0].user_id === username){
                    if(results[0].password === password){
                        // 이부분은 나중에 bcrpyt을 사용해 해쉬값으로 변경된 패스워드를 비교하는 문장으로 변경해야함 
                        return done(null, results[0])
                    } else {
                        return done(null, false, { message: 'Incorrect PassWord!' });
                    }
                } else {
                    return done(null, false, { message: 'Incorrect id!' });
                }
            });
        }
    ));
    return passport;
}


