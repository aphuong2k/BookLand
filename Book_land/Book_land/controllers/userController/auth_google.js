const GoogleStrategy = require('passport-google-oauth20').Strategy;
const auth_userModel = require('./../../models/user/auth_userModel');

const passport = require('passport');
// login gg
let auth_google = () => {
    passport.use(new GoogleStrategy({
        clientID: '656609692565-8pmpjdheb354jc04ug1uc2pcjo0s1h70.apps.googleusercontent.com',
        clientSecret: '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',
        callbackURL: "http://localhost:5000/auth/google/callback"
      },
      
      async (accessToken, refreshToken, profile, done) => {
        let fullname = profile.displayName.split(" ").join("");
        let newUser = {
            name: fullname,
            email: profile.emails[0].value,
            password: '',
            phone: '',
            genre: 'google'
        };
        try {
           let user = await auth_userModel.findUserByEmail(newUser.email);
           if(user){
                if(user.status == 0){
                    return done(null, false, { message: `This user email "${user.email}" is deactivate`});
                }else{
                    done(null,user)
                }
           }else{
                await auth_userModel.createNewUser(newUser);
                await auth_userModel.createNewUserShoppingCart(newUser.email)
                user = await auth_userModel.findUserByEmail(newUser.email);
                done(null,user)
           }
        } catch (err) {
            return done(null, false, { message: err });
        }
    }));
}
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        auth_userModel.findUserById(id).then((user) => {
        return done(null, user);
    }).catch(error => {
        return done(error, null)
    });
});
module.exports = auth_google;