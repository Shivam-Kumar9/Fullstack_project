import express from 'express';
import cors from 'cors';
import connectionToDB from './config/db.js'
import userRouter from './routes/user.route.js';
import noteRouter from './routes/note.route.js'
import auth from './middleware/auth.middleware.js';

const app = express()
const PORT = process.env.PORT || 5000 ;

app.use(cors({origin : '*'}))
app.use(express.json())
app.use('/note',auth,noteRouter)
app.use('/user',userRouter)


app.get('/',(req,res)=>{
 
 res.send("server is running fine")
})

app.listen(PORT ,async()=>{
    try {
        await connectionToDB
        console.log(`Server is running on port ${PORT} and db is also connected`);
    } catch (error) {
        console.log('Db connection error :-', error.message);
    }
})