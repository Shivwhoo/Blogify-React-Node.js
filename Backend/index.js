import dotenv from 'dotenv'
import connectDb from './database/index.js'
import {app} from './app.js'
dotenv.config({path:'./.env'})



connectDb()
.then(app.listen(process.env.PORT  ,() => {console.log("Server running at port : ",process.env.PORT)}))
.catch(err =>{console.log("Server problem",err)})