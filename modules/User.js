const Db = require('../modules/Database');
const Config = require( '../modules/Config' );

class BasicInfo{
    static Filter(
        {
            prUserId = 0,
            prFirstName = "",
            prLastName = "", 
            prFullName = "",
            prGender = "All",
            prUserStatus = "All",
            prPageNumber = 1,
            prResultPerPage = 50
        } = {}
    ){
        return new Promise(
            (Resolve, Reject)=>{
                Db.CoreDb.Procedure(
                    "spUser_BasicInfo_Filter",
                    [
                        Config.Project.Auth,
                        prUserId,
                        prFirstName,
                        prLastName,
                        prFullName,
                        prGender,
                        prUserStatus,
                        prPageNumber,
                        prResultPerPage
                    ],
                    (res)=>{
                        Resolve( res.fetchAll() );
                    }
                );
            }
        );
    }

    static Update(
        {
            prOnId,
            prFirstName = "",
            prLastName = ""
        }={}
    ){
        return new Promise(
            (Resolve, Reject)=>{
                Db.CoreDb.Procedure(
                    "spUser_BasicInfo_Update",
                    [
                        Config.Project.Auth,
                        Config.Client.UserId,
                        prOnId,
                        prFirstName,
                        prLastName,
                        Config.Client.LogValues
                    ],
                    res=>{
                        Resolve( res.fetchAll() );
                    }
                );
            }
        );
    }
}

class ContactInfo{
    static Filter(){
        return [
            {
                email : "dnshnayeem@gmai.com"
            }
        ]
    }
}


class Auth{
    static Login(
        prLoginId, 
        prLoginPassword
    ){

    }

    static VerifyAuth( AuthKey ){
        return new Promise(
            (Resolve,Rej)=>{
                if( !AuthKey )
                    Resolve({
                        Status : false,
                        Message : "NO_AUTH"
                    });
                Db.CoreDb.Procedure(
                    'spUser_VerifyAuth',
                    [AuthKey],
                    res=>{
                        res = res.fetchAll();
                        res = res[0];
                        if( !res.Exist )
                            Resolve({
                                Status : false,
                                Message : "NOT_EXIST"
                            });
                        else{
                            Resolve({
                                Status : (res.Status=='Active' ? true : false),
                                Message : 'USER_' + res.Status.toUpperCase(),
                                UserId : res.Id
                            });
                        }
                    }
                );
            }
        );
    }

    static VerifyApi( ApiPath ){
        return new Promise(
            (Resolve, Reject)=>{
                Db.CoreDb.Procedure(
                    "spUser_VerifyApi",
                    [
                        Config.Client.UserId,
                        ApiPath,
                        '{"name":1}'
                    ],
                    res=>{
                        Resolve( res.fetchAll()[0][0] );
                    }
                );
            }
        );
    }
}

module.exports = {
    Basic : BasicInfo,
    Contact : ContactInfo,
    Auth : Auth
};