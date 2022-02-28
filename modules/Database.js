const mysqlx = require( "@mysql/xdevapi" );
class Core{
    static ProjectAuth = "8c85193fdf943fe310ad4696b3c4cc0a"
    static Config = {
        host : "localhost",
        port : 33060,
        user : "danish",
        password : "C80b905b65fc@",
        schema : "iDan_Core"
    }
    
    static Session = null;

    static Connect(){
        mysqlx.getSession(Core.Config).then(
            session=>{
                Core.Session = session;
            }
        );
    }

    static Procedure(
        spName,
        spPara,
        Callback
    ){
        spPara = spPara ? spPara : [];
        var Params = [];
        spPara.map(x=>{
            Params.push( '?' );
        });
        Params = Params.join(',');
        var Sql = 'CALL ' + spName + '(' + Params + ');';
        const query = Core.Session.sql( Sql ).bind( spPara );
        query.execute().then(
            res=>{
                Callback( res );
            }
        )
    }
}

module.exports = {
    CoreDb : Core
}