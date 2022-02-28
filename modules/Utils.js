const AuthenticationManager = require("@mysql/xdevapi/lib/Authentication/AuthenticationManager");
const User = require("./User");

class Config{
    static ProjectAuth = "8c85193fdf943fe310ad4696b3c4cc0a";
    static LogValues = "";
}

class Auth{
    static Keys = {};

    //User related
    static IsLoggedIn = false;
    static UserId = 0;

    static Init( req, res, next ){
        try{
            Config.LogValues = {
                Headers : req.headers,
                IP : req.socket.remoteAddress
            };
            Auth.Keys = JSON.parse(req.headers.authorization);
            next();
        }catch( e ){
            res.send( {
                Status : false,
                Type : "AUTH",
                Message : "INVALID_KEY",
                Log : e.message
            } );
        }
    }

    static VerifyProject( req, res, next ){
        try{
            if( !Auth.Keys.ProjectAuth )
                throw 'ProjectAuth Key not supplied';
            else{
                if( Auth.Keys.ProjectAuth==Config.ProjectAuth  )
                    next();
                else{
                    throw "Project Key does not match";
                }
            }
        }catch( e ){
            res.send( {
                Status : false,
                Message : "Project Key Verification Failed",
                Log : e.message
            } );
        }
    }

    static ConfigureUser( req, res, next ){
        try{
            if( !Auth.Keys.UserAuth ){
                Auth.IsLoggedIn = false;
                Auth.UserId = 0;
                console.log( "Called" );
                next();
            }else{
                User.Auth.VerifyAuth(
                    Auth.Keys.UserAuth
                ).then(
                    rs=>{
                        if( !rs.Status ){
                            Auth.IsLoggedIn = false;
                            Auth.UserId = 0;
                            res.send({
                                Status : false,
                                Type : "USER_AUTH",
                                Message : rs.Message
                            });
                        }else{
                            Auth.IsLoggedIn = true;
                            Auth.UserId = rs.UserId;
                            next();
                        }
                    }
                );
            }
        }catch( e ){
            res.send({
                Status : false,
                Type : "USER_AUTH",
                Message : "CANNOT_VERIFY",
                Log : e.message
            });
        }
    }
}

module.exports = {
    Config : Config,
    Auth : Auth
}