module.exports = (app)=>{
    
    const passport = require('passport');
    const db = require('../database');
    const local = require('./localStrategy');

    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser((user,done)=>{
        done(null, user.id); // 아이디는 user_id가 아니고 INT 형식의 id
    });

    passport.deserializeUser((id,done)=>{
        db.query('SELECT id,user_id,password,nickname FROM user WHERE id = ?',
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
    
    return passport;
}


