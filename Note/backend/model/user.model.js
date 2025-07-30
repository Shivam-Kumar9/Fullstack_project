import mongoose  from 'mongoose' ;

const userSchema  = new mongoose.Schema({
    name : { type : String ,require : true },
    email : { type : String ,require : true },
    password : { type : String ,require : true },
    gender : {type : String ,enum : ['male','female'] ,  require : true },
    age : { type : Number , require : true}
},{
    versionKey : false,
    timestamps : true
})

const UserModel = mongoose.model('User',userSchema)

 export  { UserModel } ;  