const AuthenticationManager = require("@mysql/xdevapi/lib/Authentication/AuthenticationManager");
const User = require("./User");
const Config = require( "./Config" );

class Auth{
    static Keys = {};

    static Init( req, res, next ){
        try{
            Config.Client.LogValues = {
                Headers : req.headers,
                IP : req.socket.remoteAddress
            };
            Config.Client.AuthKeys = JSON.parse(req.headers.authorization);
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
            if( !Config.Client.AuthKeys.ProjectAuth )
                throw 'ProjectAuth Key not supplied';
            else{
                if( Config.Client.AuthKeys.ProjectAuth==Config.Project.Auth  )
                    next();
                else{
                    throw "Project Key does not match";
                }
            }
        }catch( e ){
            res.send( {
                Status : false,
                Message : "Project Key Verification Failed",
                Log : e
            } );
        }
    }

    static ConfigureUser( req, res, next ){
        try{
            if( !Config.Client.AuthKeys.UserAuth ){
                Config.Client.IsLoggedIn = false;
                Config.Client.UserId = 0;
                next();
            }else{
                User.Auth.VerifyAuth(
                    Config.Client.AuthKeys.UserAuth
                ).then(
                    rs=>{
                        if( !rs.Status ){
                            Config.Client.IsLoggedIn = false;
                            Config.Client.UserId = 0;
                            res.send({
                                Status : false,
                                Type : "USER_AUTH",
                                Message : rs.Message
                            });
                        }else{
                            Config.Client.IsLoggedIn = true;
                            Config.Client.UserId = rs.UserId;
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

    static VerifyApi( req, res, next ){
        User.Auth.VerifyApi(
            req.originalUrl
        ).then(
            r=>{
                if( r.Error )
                    res.send(r);
                else if( r.Status )
                    next();
                else
                    res.send( Response.Error({
                        type : "API_ERROR",
                        message : r.Message
                    }) );
            }
        );
    }
}

class Response{

    static Error( {
        type="UNKOWN", 
        message="Error occured", 
        log = "No log"
    }={} ){
        return {
            Error : true,
            Type : type,
            Message : message,
            Log : log,
        }
    }
}

module.exports = {
    Auth : Auth,
    Response : Response
}