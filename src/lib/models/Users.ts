import {model, Schema} from "mongoose"
const userSchema = new Schema({
    id : {
        type : String,
    }, name : {
        type : String,
        required : true
    }, email : {
        type : String,
        unique : true,
        lowercase : true,
        required : true
    }, passwordHash : {
        type : String,
        required : true
    }, role : {
        type : String,
        enum : ["seeker", "employer"],
        required : true,
        default : "seeker"
    }, companyId : {
        type : Schema.Types.ObjectId,
        default : null,
        ref : "Company"
    }
})

const Users = model("Users", userSchema);

export default Users;