const auth_userModel = require('./../../models/user/auth_userModel')
const passportLocal = require('passport-local')
const passport = require('passport');


let LocalStrategy = passportLocal.Strategy;

let initPassportLocal = () => {
    passport.use(new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        async (req, email, password, done) => {
            try {
                await auth_userModel.findUserByEmail(email).then(async (user) => {
                    if (!user) {
                        return done(null, false, req.flash("errors", `This user email "${email}" doesn't exist`));
                    }
                    if (user) {
                        if(user.verify === 'done' || user.genre ==='google'){
                            let match = await auth_userModel.comparePassword(password, user);
                            if (match === true) {
                                if(user.status == 0){
                                    return done(null, false, req.flash("errors", `This user email "${email}" is deactivate`));
                                }else{
                                    return done(null, user, null)
                                }
                            } else {
                                return done(null, false, req.flash("errors", match)
                                )
                            } 
                        }else{
                            return done(null, false, req.flash("errors", `This user email "${email}" doesn't verify`));
                        }
                    }
                });
            } catch (err) {
                console.log(err);
                return done(null, false, { message: err });
            }
        }));

};

    passport.serializeUser((user, done) => {
    done(null, user.account_id);
    });

    passport.deserializeUser((id, done) => {
        auth_userModel.findUserById(id).then((user) => {
        return done(null, user);
    }).catch(error => {
        return done(error, null)
    });
});

module.exports = initPassportLocal;