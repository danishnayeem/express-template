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
                        Utils.Config.ProjectAuth,
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

    static Verify(){
        // Continue to add auth key in user table and then from here/
    }
}

module.exports = {
    Basic : BasicInfo,
    Contact : ContactInfo
};