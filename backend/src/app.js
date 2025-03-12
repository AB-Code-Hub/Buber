import express from 'express'
import cors from 'cors'
import {dbConnect} from "./db/db.js"
import { router as userRoutes } from './routes/user.route.js'
import cookieparser from 'cookie-parser'
export const app = express()
dbConnect();
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieparser())


app.get('/', (req, res) => {
    res.send("Hello World")
})

app.use('/users', userRoutes)


