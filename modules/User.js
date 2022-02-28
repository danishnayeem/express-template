const Db = require('../modules/Database');
const Utils = require( '../modules/Utils' );

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
                        Utils.Auth.Keys.ProjectAuth,
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
        }
    ){

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
}

module.exports = {
    Basic : BasicInfo,
    Contact : ContactInfo,
    Auth : Auth
};