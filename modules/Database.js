const mysqlx = require( "@mysql/xdevapi" );
const e = require("express");

class Response{
    static Error({
        type = "DATABASE_ERROR",
        message = "no message",
        log = "no log"
    }){
        return {
            fetchAll : ()=>{
                return [{
                    Error : true,
                    Type : type,
                    Message : message,
                    Log : log
                }]
            }
        }
    }
}
class Core{
    static ProjectAuth = "8c85193fdf943fe310ad4696b3c4cc0a"
    static Config = {
        host : "localhost",
        port : 33060,
        user : "danish",
        password : "C80b905b65fc@",
        schema : "iDan_Core"
    }

    static Procedure(
        spName,
        spPara,
        Callback
    ){
        try{
            console.log( spPara );
            spPara = spPara ? spPara : [];
            var Params = [];
            spPara.map(x=>{
                Params.push( '?' );
            });
            Params = Params.join(',');
            var Sql = 'CALL ' + spName + '(' + Params + ');';
            mysqlx.getSession(Core.Config).then(
                ses=>{
                    const query = ses.sql( Sql ).bind( spPara );
                    query.execute().then(
                        res=>{
                            Callback( res );
                        }
                    ).catch(
                        err=>{
                            Callback(
                                Response.Error({
                                    type : "PROCEDURE_ERROR",
                                    message : "Procedure executing error",
                                    log : err.message
                                })
                            );
                        }
                    );
                }
            ).catch(
                err=>{
                    Response.Error({
                        type : "CONNECTION_ERROR",
                        message : "Cannot connect to database",
                        log : err.message
                    });
                }
            );
        }catch( e ){
            Callback(
                Response.Error({
                    type : "PROCEDURE_ERROR",
                    message : "Error before executing procedure",
                    log : err.message
                })
            );
        }
    }
}

module.exports = {
    CoreDb : Core
}