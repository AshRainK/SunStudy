module.exports = (app)=>{
    
    const passport = require('passport');
    const db = require('../database');
    const local = require('./localStrategy');

    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser((user,done)=>{
        done(null, user.id);
    });

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
    });

    local();
    
    return passport;
}


