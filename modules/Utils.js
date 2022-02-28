class Config{
    static ProjectAuth = "8c85193fdf943fe310ad4696b3c4cc0a";
    static LogValues = "";
}

class Auth{
    static Keys = {};
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
                Message : "Auhorization key invalid",
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
        next();
    }
}

module.exports = {
    Config : Config,
    Auth : Auth
}