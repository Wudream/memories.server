import express from 'express'   
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'

import postRoutes from './routes/posts.js'
import userRoutes from './routes/user.js'

const app = express()

//json解析器
app.use(bodyParser.json({limit:"30mb",extended:true}))
//正文解析器
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}))
app.use(cors())

app.use('/posts', postRoutes)
app.use('/user', userRoutes)

//设置数据库端口
const CONNECTION_URL = 'mongodb+srv://javascriptmastery:javascriptmastery123@cluster0.iq9brfa.mongodb.net/?retryWrites=true&w=majority'
const PORT = process.env.PORT||5000
mongoose.connect(CONNECTION_URL)
    .then(() => app.listen(PORT, () => console.log(`数据库连接成功:http://localhost:${PORT}`)))
    .catch((error) => console.log(`${error} did not connect`))


