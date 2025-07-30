import mongoose  from 'mongoose';
import dotenv from'dotenv';
dotenv.config() 

const connectionToDB  =  mongoose.connect(process.env.MONGO_URL)

 export default connectionToDB 