const Db = require('../modules/Database');
class BasicInfo{
    static Filter(
        {
            prProjectAuth="",
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
                        prProjectAuth,
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
                        Resolve( res );
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

module.exports = {
    Basic : BasicInfo,
    Contact : ContactInfo
};